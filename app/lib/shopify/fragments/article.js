import SEO_FRAGMENT from './seo';
import {IMAGE_FRAGMENT} from './media';

export const AUTHOR_FRAGMENT = `#graphql
    fragment author on ArticleAuthor {
        bio
        name
        email
        firstName
        lastName
    }
`;

// used for search results
export const SMALL_ARTICLE_FRAGMENT = `#graphql
    fragment SmallArticle on Article {
        __typename
        id
        title
        handle
        publishedAt
        trackingParameters
    }
`;

export const ARTICLE_FRAGMENT = `#graphql
    fragment ArticleCard on Article {
        author: authorV2 {
            ...author
        }
        contentHtml
        handle
        id
        image {
            id
            altText
            url
            width
            height
        }
        publishedAt
        title
        blog {
            handle
        }
    }
    ${AUTHOR_FRAGMENT}
`;

export const FULL_ARTICLE_FRAGMENT = `#graphql
    fragment ArticleItem on Article {
        author: authorV2 {
            ...author
        }
        seo {
            ...seo
        }
        image {
            ...image
        }
        id
        tags
        blog {
            id
            title
            handle
        }
        title
        handle
        content
        excerpt
        excerptHtml
        publishedAt
        contentHtml
        trackingParameters
    }
    ${SEO_FRAGMENT}
    ${IMAGE_FRAGMENT}
    ${AUTHOR_FRAGMENT}
`;
