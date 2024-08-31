import {SMALL_PAGE_FRAGMENT} from '../fragments/page';
import {PRODUCT_CARD_FRAGMENT} from '../fragments/product';
import {SMALL_ARTICLE_FRAGMENT} from '../fragments/article';

export const SEARCH_QUERY = `#graphql
    query search(
        $country: CountryCode
        $endCursor: String
        $first: Int
        $language: LanguageCode
        $last: Int
        $query: String!
        $startCursor: String
    ) @inContext(country: $country, language: $language) {
        products: search(
        query: $query,
        unavailableProducts: HIDE,
        types: [PRODUCT],
        first: $first,
        sortKey: RELEVANCE,
        last: $last,
        before: $startCursor,
        after: $endCursor
        ) {
            totalCount
            nodes {
                ...on Product {
                    ...ProductCard
            }
        }
        pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
        }
        }
        pages: search(
        query: $query,
        types: [PAGE],
        first: 10
        ) {
            totalCount
            nodes {
                ...on Page {
                    ...SmallPage
            }
        }
        }
        articles: search(
        query: $query,
        types: [ARTICLE],
        first: 10
        ) {
            totalCount
            nodes {
                ...on Article {
                    ...SmallArticle
            }
        }
        }
    }
  ${SMALL_PAGE_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
  ${SMALL_ARTICLE_FRAGMENT}
`;
