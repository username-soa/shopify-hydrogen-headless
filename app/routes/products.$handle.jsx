import {
  Analytics,
  getSeoMeta,
  getSelectedProductOptions,
} from '@shopify/hydrogen';
import {
  PRODUCT_QUERY,
  VARIANTS_QUERY,
  RECOMMENDED_PRODUCTS_QUERY,
} from '~/lib/shopify/queries/product';
import invariant from 'tiny-invariant';
import {useEffect, useState} from 'react';
import {seoPayload} from '~/lib/seo.server';
import {getVariantUrl} from '~/lib/variants';
import {useLoaderData} from '@remix-run/react';
import {AnimatePresence} from 'framer-motion';
import {defer, redirect} from '@shopify/remix-oxygen';
import {useInView} from 'react-intersection-observer';
import ProductMain from '~/components/product/ProductMain';
import ProductMedia from '~/components/product/ProductMedia';
import RelatedProducts from '~/components/product/RelatedProducts';
import FloatingAddToCart from '~/components/product/FloatingAddToCart';

export async function loader(args) {
  const {handle} = args.params;
  invariant(handle, 'Missing productHandle param, check route filename');

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({params, request, context}) {
  const {handle} = params;
  invariant(handle, 'Missing productHandle param, check route filename');

  const selectedOptions = getSelectedProductOptions(request);

  const [{shop, product}] = await Promise.all([
    context.storefront.query(PRODUCT_QUERY, {
      variables: {
        handle,
        selectedOptions,
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response('product', {status: 404});
  }

  if (!product.selectedVariant) {
    throw redirectToFirstVariant({product, request});
  }

  const recommended = context.storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId: product.id},
  });
  // TODO: firstVariant is never used because we will always have a selectedVariant due to redirect
  // Investigate if we can avoid the redirect for product pages with no search params for first variant
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const seo = seoPayload.product({
    product,
    selectedVariant,
    url: request.url,
  });

  return {
    seo,
    shop,
    product,
    recommended,
    storeDomain: shop.primaryDomain.url,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({params, context}) {
  const {handle} = params;
  invariant(handle, 'Missing productHandle param, check route filename');

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deferred query resolves, the UI will update.
  const variants = context.storefront.query(VARIANTS_QUERY, {
    variables: {
      handle,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  return {variants};
}

export const meta = ({matches}) => {
  return getSeoMeta(...matches.map((match) => match.data.seo));
};

function redirectToFirstVariant({product, request}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

export default function Product() {
  const [ref, inView] = useInView({
    threshold: 0.9,
  });
  const [ref2, inView2] = useInView({
    threshold: 0,
  });
  const [showFloatingCart, setShowFloatingCart] = useState(false);
  const {product, variants, recommended, storeDomain} = useLoaderData();
  const {selectedVariant} = product;

  // this was added to hide the visual bug where  the component "FloatingAddToCart" flashes for a split second on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingCart(!inView2);
    }, 100); // Small delay to ensure layout is complete

    return () => clearTimeout(timer);
  }, [inView2]);

  return (
    <>
      {/* min-h-screen */}
      <div className="grid md:grid-cols-2 grid-cols-1 min-h-screen" ref={ref2}>
        <ProductMedia data={product} inView={inView} />
        <div
          ref={ref}
          className="md:sticky md:top-[76px] md:h-[calc(100vh-76px)] flex items-center"
        >
          <ProductMain
            product={product}
            variants={variants}
            storeDomain={storeDomain}
            selectedVariant={selectedVariant}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showFloatingCart && (
          <FloatingAddToCart
            storeDomain={storeDomain}
            selectedVariant={selectedVariant}
          />
        )}
      </AnimatePresence>

      <div className="2xl:container w-full mx-auto sm:py-6 py-4 px-4 sm:px-6 md:px-20 lg:px-32 flex items-center justify-center h-screen">
        <h1 className="font-bold uppercase lg:text-5xl md:text-[calc(-4rem+12.5vw)] text-3xl md:leading-tight lg:leading-tight">
          Extra data, such as product metafields goes in here...
        </h1>
      </div>
      <RelatedProducts recommended={recommended} />
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: product.selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: product.selectedVariant?.id || '',
              variantTitle: product.selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}
