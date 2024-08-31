import SEO_FRAGMENT from './seo';

// used for search results
export const SMALL_PAGE_FRAGMENT = `#graphql
    fragment SmallPage on Page {
        __typename
        id
        title
        handle
        trackingParameters
    }
`;

export const PAGE_FRAGMENT = `#graphql
    fragment SearchPage on Page {
        __typename
        id
        body
        title
        handle
        createdAt
        updatedAt
        bodySummary
        seo {
            ...seo
        }
        trackingParameters
    }
    ${SEO_FRAGMENT}
`;
