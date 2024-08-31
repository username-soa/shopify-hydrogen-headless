import SEO_FRAGMENT from './seo';

const COLLECTION_FRAGMENT = `#graphql
    fragment CollectionItem on Collection {
        id
        title
        handle
        description
        descriptionHtml
        seo {
        ...seo
        }
        image {
          url
          altText
          width
          height
        }
        updatedAt
    }
  ${SEO_FRAGMENT}
`;

export default COLLECTION_FRAGMENT;
