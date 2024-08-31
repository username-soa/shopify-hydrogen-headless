import {
  Analytics,
  useNonce,
  getSeoMeta,
  getShopAnalytics,
} from '@shopify/hydrogen';
import {defer} from '@shopify/remix-oxygen';
import {
  Meta,
  Links,
  Outlet,
  Scripts,
  useMatches,
  useRouteError,
  ScrollRestoration,
  useRouteLoaderData,
  isRouteErrorResponse,
} from '@remix-run/react';
import favicon from './assets/favicon.svg';
import {Layout} from '~/components/Layout';
import {DEFAULT_LOCALE} from './lib/utils';
import {seoPayload} from '~/lib/seo.server';
import {NotFound} from './components/NotFound';
import {getLayoutData} from './lib/shopify/index';
import stylesheet from './styles/tailwind.css?url';
import {GenericError} from './components/GenericError';

/*This is important to avoid re-fetching root queries on sub-navigations*/
export const shouldRevalidate = ({formMethod, currentUrl, nextUrl}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') {
    return true;
  }

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) {
    return true;
  }

  return false;
};

export const useRootLoaderData = () => {
  const [root] = useMatches();
  return root?.data;
};

export function links() {
  return [
    {rel: 'stylesheet', href: stylesheet},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
}

export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({
    ...deferredData,
    ...criticalData,
  });
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({request, context}) {
  const [layout] = await Promise.all([
    getLayoutData(context),
    // Add other queries here, so that they are loaded in parallel
  ]);

  const seo = seoPayload.root({shop: layout.shop, url: request.url});

  const {storefront, env} = context;

  return {
    layout,
    seo,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
    },
    selectedLocale: storefront.i18n,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}) {
  const {cart, customerAccount} = context;

  return {
    isLoggedIn: customerAccount.isLoggedIn(),
    cart: cart.get(),
  };
}

export const meta = ({data}) => {
  return getSeoMeta(data?.seo);
};

function ParentLayout({children}) {
  const nonce = useNonce();
  const data = useRouteLoaderData('root');
  const locale = data?.selectedLocale ?? DEFAULT_LOCALE;
  return (
    <html lang={locale.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* <Layout {...data} key={`${locale.language}-${locale.country}`}>
          {children}
        </Layout> */}
        {data ? (
          <Analytics.Provider
            cart={data.cart}
            shop={data.shop}
            consent={data.consent}
          >
            <Layout {...data} key={`${locale.language}-${locale.country}`}>
              {children}
            </Layout>
          </Analytics.Provider>
        ) : (
          children
        )}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <div id="popup-portal"></div>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ParentLayout>
      <Outlet />
    </ParentLayout>
  );
}

export function ErrorBoundary({error}) {
  const routeError = useRouteError();
  const isRouteError = isRouteErrorResponse(routeError);
  console.log('routeError is : ', routeError);
  let title = 'Error';
  let pageType = 'page';

  if (isRouteError) {
    title = 'Not found';
    if (routeError.status === 404) pageType = routeError.data || pageType;
  }

  return (
    <ParentLayout>
      {isRouteError ? (
        <>
          {routeError.status === 404 ? (
            <NotFound type={pageType} />
          ) : (
            <GenericError
              error={{message: `${routeError.status} ${routeError.data}`}}
            />
          )}
        </>
      ) : (
        <GenericError error={error ? error : undefined} />
      )}
    </ParentLayout>
  );
}
