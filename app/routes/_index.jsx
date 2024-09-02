import {
  FEATURED_COLLECTIONS_QUERY,
  HOMEPAGE_FEATURED_PRODUCTS_QUERY,
} from '~/lib/shopify/queries/home';
import Hero from '~/components/home/Hero';
import {defer} from '@shopify/remix-oxygen';
import {seoPayload} from '~/lib/seo.server';
import About from '~/components/home/About';
import {getSeoMeta} from '@shopify/hydrogen';
import {useLoaderData} from '@remix-run/react';
import Container from '~/components/ui/Container';
import TrendingProducts from '~/components/home/TrendingProducts';
import FeaturedCollections from '~/components/home/FeaturedCollections';

export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

async function loadCriticalData({context, request}) {
  const {language, country} = context.storefront.i18n;

  const [{shop, collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTIONS_QUERY, {
      variables: {country, language},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    shop,
    featuredCollections: collections,
    seo: seoPayload.home({url: request.url}),
  };
}

function loadDeferredData({context}) {
  const {language, country} = context.storefront.i18n;

  const featuredProducts = context.storefront
    .query(HOMEPAGE_FEATURED_PRODUCTS_QUERY, {
      variables: {
        /**
         * Country and language properties are automatically injected
         * into all queries. Passing them is unnecessary unless you
         * want to override them from the following default:
         */
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    });

  return {
    featuredProducts,
  };
}

export const meta = ({matches}) => {
  return getSeoMeta(...matches.map((match) => match.data.seo));
};

export default function Homepage() {
  const {shop, featuredProducts, featuredCollections} = useLoaderData();
  return (
    <div className="md:gap-10 gap-4 flex flex-col">
      <Hero data={shop} />
      <Container className="sm:py-6 py-4 md:gap-16 gap-10 flex flex-col">
        <About />
        <TrendingProducts data={featuredProducts} />
        <FeaturedCollections data={featuredCollections} />
        {/* instagram section */}
        <div className="">instagram section</div>
      </Container>
    </div>
  );
}
