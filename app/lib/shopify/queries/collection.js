import {PRODUCT_CARD_FRAGMENT} from '../fragments/product';
import COLLECTION_FRAGMENT from '../fragments/collection';

export const COLLECTION_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  ${COLLECTION_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
        ...CollectionItem
        products(
            first: $first,
            last: $last,
            before: $startCursor,
            after: $endCursor
            filters: $filters,
            sortKey: $sortKey,
            reverse: $reverse
        ) {
            filters {
                id
                label
                type
                values {
                  id
                  label
                  count
                  input
                }
            }
            nodes {
                ...ProductCard
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
                hasPreviousPage
            }
        }
    }
    collections(first: 100) {
        edges {
          node {
            title
            handle
          }
        }
    }
  }
`;

export const COLLECTIONS_QUERY = `#graphql
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${COLLECTION_FRAGMENT}
`;
