export const IMAGE_FRAGMENT = `#graphql
  fragment image on Image {
    url
    altText
    width
    height
  }
`;

export const MEDIA_FRAGMENT = `#graphql
fragment Media on Media {
  __typename
  mediaContentType
  alt
  previewImage {
    url
  }
  ... on MediaImage {
    id
    image {
      id
      url
      width
      height
    }
  }
  ... on Video {
    id
    sources {
      mimeType
      url
    }
  }
  ... on Model3d {
    id
    sources {
      mimeType
      url
    }
  }
  ... on ExternalVideo {
    id
    embedUrl
    host
  }
}
`;
