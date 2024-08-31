import {FULL_ARTICLE_FRAGMENT, ARTICLE_FRAGMENT} from '../fragments/article';

export const BLOGS_QUERY = `#graphql
    query Blogs(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
    ) @inContext(country: $country, language: $language) {
        blogs(
            first: $first,
            last: $last,
            before: $startCursor,
            after: $endCursor
        ) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            nodes {
                title
                handle
                seo {
                    title
                    description
                }
            }
        }
    }
`;

export const BLOG_BY_HANDLE_QUERY = `#graphql
    query Blog(
        $language: LanguageCode
        $blogHandle: String!
        $first: Int
        $last: Int
        $startCursor: String
        $endCursor: String
    ) @inContext(language: $language) {
            blog(handle: $blogHandle) {
            title
            seo {
                title
                description
            }
            articles(
                first: $first,
                last: $last,
                before: $startCursor,
                after: $endCursor
            ) {
                nodes {
                    ...ArticleCard
                }
                pageInfo {
                    hasPreviousPage
                    hasNextPage
                    hasNextPage
                    endCursor
                    startCursor
                }
            }
        }
    }
  ${ARTICLE_FRAGMENT}
`;

export const ARTICLE_QUERY = `#graphql
    query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
    ) @inContext(language: $language, country: $country) {
        blog(handle: $blogHandle) {
            articleByHandle(handle: $articleHandle) {
                ...ArticleItem    
            }
        }
    }
    ${FULL_ARTICLE_FRAGMENT}
`;
