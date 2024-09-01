import {IMAGE_FRAGMENT, MEDIA_FRAGMENT} from './media';

export const PRODUCT_VARIANT_FRAGMENT = `#graphql
fragment ProductVariant on ProductVariant {
  availableForSale
  compareAtPrice {
    amount
    currencyCode
  }
  id
  image {
    __typename
    id
    url
    altText
    width
    height
  }
  price {
    amount
    currencyCode
  }
  product {
    title
    handle
  }
  selectedOptions {
    name
    value
  }
  sku
  title
  unitPrice {
    amount
    currencyCode
  }
}
`;

export const PRODUCT_VARIANTS_FRAGMENT = `#graphql
fragment ProductVariants on Product {
  variants(first: 250) {
    nodes {
      ...ProductVariant
    }
  }
}
${PRODUCT_VARIANT_FRAGMENT}
`;

// used for search page and for collection page, we only need to show those important fields
export const PRODUCT_CARD_FRAGMENT = `#graphql
    fragment ProductCard on Product {
        __typename
        id
        title
        handle
        updatedAt
        publishedAt
        availableForSale
        trackingParameters
        featuredImage {
            ...image
        }
        variants(first: 1) {
            nodes {
              ...ProductVariant
            }
        }
    }
    ${IMAGE_FRAGMENT}
    ${PRODUCT_VARIANT_FRAGMENT}
`;

// in case of product metafields, this is the syntax of fetching them
// productOptions: metafield(namespace: "productOption", key: "color") {
//   id
//   key
//   type
//   value
//   createdAt
//   reference
//   updatedAt
//   parentResource
// }
// end
export const PRODUCT_FRAGMENT = `#graphql
fragment Product on Product {
  id
  tags
  title
  vendor
  handle
  updatedAt
  publishedAt
  description
  descriptionHtml
  availableForSale
  options {
    id
    name
    values
    optionValues {
      id
      name
      swatch {
        color
        image {
          id
          alt
          mediaContentType
          presentation {
            id
            asJson
          }
          previewImage {
            id
            url
            width
            height
            altText
          }
        }
      }
    }
  }
  selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
    ...ProductVariant
  }
  variants(first: 1) {
    nodes {
      ...ProductVariant
    }
  }
  media(first: 7) {
    nodes {
      ...Media
    }
  }
  seo {
      title
      description
  }
}
${MEDIA_FRAGMENT}
${PRODUCT_VARIANT_FRAGMENT}
`;
