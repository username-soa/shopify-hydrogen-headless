import {
  PRODUCT_FRAGMENT,
  PRODUCT_CARD_FRAGMENT,
  PRODUCT_VARIANTS_FRAGMENT,
} from '../fragments/product';

export const RECOMMENDED_PRODUCTS_QUERY = `#graphql
    query productRecommendations(
        $country: CountryCode
        $language: LanguageCode
        $productId: ID!
    ) @inContext(country: $country, language: $language) {
        productRecommendations(productId: $productId) {
            ...ProductCard
        }
    }
    ${PRODUCT_CARD_FRAGMENT}
`;

export const VARIANTS_QUERY = `#graphql
    query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    ) @inContext(country: $country, language: $language) {
        product(handle: $handle) {
            ...ProductVariants
        }
    }
    ${PRODUCT_VARIANTS_FRAGMENT}
`;

export const PRODUCT_QUERY = `#graphql
    query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
    ) @inContext(country: $country, language: $language) {
        product(handle: $handle) {
            ...Product
        }
        shop {
            name
            primaryDomain {
              url
            }
        }
    }
    ${PRODUCT_FRAGMENT}
`;

export const FEATURED_ITEMS_QUERY = `#graphql
  query FeaturedItems(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int = 12
  ) @inContext(country: $country, language: $language) {
    products(first: $pageBy) {
      nodes {
        ...ProductCard
      }
    }
  }

  ${PRODUCT_CARD_FRAGMENT}
`;

export const CATALOG_QUERY = `#graphql
query Catalog(
  $country: CountryCode
  $language: LanguageCode
  $first: Int
  $last: Int
  $startCursor: String
  $endCursor: String
) @inContext(country: $country, language: $language) {
  products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
    nodes {
      ...ProductCard
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
  }
}
${PRODUCT_CARD_FRAGMENT}
`;

export const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;
