import invariant from 'tiny-invariant';
import {json} from '@shopify/remix-oxygen';
import {flattenConnection} from '@shopify/hydrogen';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/shopify/fragments/product';

export async function loader({request, context: {storefront}}) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  console.log('inside api.products');
  const query = searchParams.get('query') ?? '';
  const sortKey = searchParams.get('sortKey') ?? 'BEST_SELLING';

  let reverse = false;
  try {
    const _reverse = searchParams.get('reverse');
    if (_reverse === 'true') {
      reverse = true;
    }
  } catch (_) {
    // noop
  }

  let count = 4;
  try {
    const _count = searchParams.get('count');
    if (typeof _count === 'string') {
      count = parseInt(_count);
    }
  } catch (_) {
    // noop
  }

  const {products} = await storefront.query(API_ALL_PRODUCTS_QUERY, {
    variables: {
      count,
      query,
      reverse,
      sortKey,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    cache: storefront.CacheLong(),
  });

  invariant(products, 'No data returned from top products query');

  return json({
    products: flattenConnection(products),
  });
}

const API_ALL_PRODUCTS_QUERY = `#graphql
  query ApiAllProducts(
    $query: String
    $count: Int
    $reverse: Boolean
    $country: CountryCode
    $language: LanguageCode
    $sortKey: ProductSortKeys
  ) @inContext(country: $country, language: $language) {
    products(first: $count, sortKey: $sortKey, reverse: $reverse, query: $query) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

// no-op

export default function ProductsApiRoute() {
  return null;
}
