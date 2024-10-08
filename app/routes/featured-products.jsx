import invariant from 'tiny-invariant';
import {json} from '@shopify/remix-oxygen';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/shopify/fragments/product';

export async function loader({context: {storefront}}) {
  return json(await getFeaturedData(storefront));
}

export async function getFeaturedData(storefront, variables) {
  const data = await storefront.query(FEATURED_ITEMS_QUERY, {
    variables: {
      pageBy: 12,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
      ...variables,
    },
  });

  invariant(data, 'No featured items data returned from Shopify API');

  return data;
}

export const FEATURED_ITEMS_QUERY = `#graphql
  query FeaturedProducts(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int = 12
  ) @inContext(country: $country, language: $language) {
    featuredProducts: products(first: $pageBy) {
      nodes {
        ...ProductCard
      }
    }
  }

  ${PRODUCT_CARD_FRAGMENT}
`;
