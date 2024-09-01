/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type MoneyFragment = Pick<
  StorefrontAPI.MoneyV2,
  'currencyCode' | 'amount'
>;

export type CartLineFragment = Pick<
  StorefrontAPI.CartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
};

export type CartApiQueryFragment = Pick<
  StorefrontAPI.Cart,
  'updatedAt' | 'id' | 'checkoutUrl' | 'totalQuantity' | 'note'
> & {
  buyerIdentity: Pick<
    StorefrontAPI.CartBuyerIdentity,
    'countryCode' | 'email' | 'phone'
  > & {
    customer?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Customer,
        'id' | 'email' | 'firstName' | 'lastName' | 'displayName'
      >
    >;
  };
  lines: {
    nodes: Array<
      Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
        attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
        cost: {
          totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
          amountPerQuantity: Pick<
            StorefrontAPI.MoneyV2,
            'currencyCode' | 'amount'
          >;
          compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
          >;
        };
        merchandise: Pick<
          StorefrontAPI.ProductVariant,
          'id' | 'availableForSale' | 'requiresShipping' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          product: Pick<
            StorefrontAPI.Product,
            'handle' | 'title' | 'id' | 'vendor'
          >;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
        };
      }
    >;
  };
  cost: {
    subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalDutyAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    totalTaxAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  discountCodes: Array<
    Pick<StorefrontAPI.CartDiscountCode, 'code' | 'applicable'>
  >;
};

export type AuthorFragment = Pick<
  StorefrontAPI.ArticleAuthor,
  'bio' | 'name' | 'email' | 'firstName' | 'lastName'
>;

export type SmallArticleFragment = {__typename: 'Article'} & Pick<
  StorefrontAPI.Article,
  'id' | 'title' | 'handle' | 'publishedAt' | 'trackingParameters'
>;

export type ArticleCardFragment = Pick<
  StorefrontAPI.Article,
  'contentHtml' | 'handle' | 'id' | 'publishedAt' | 'title'
> & {
  author?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.ArticleAuthor,
      'bio' | 'name' | 'email' | 'firstName' | 'lastName'
    >
  >;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  blog: Pick<StorefrontAPI.Blog, 'handle'>;
};

export type ArticleItemFragment = Pick<
  StorefrontAPI.Article,
  | 'id'
  | 'tags'
  | 'title'
  | 'handle'
  | 'content'
  | 'excerpt'
  | 'excerptHtml'
  | 'publishedAt'
  | 'contentHtml'
  | 'trackingParameters'
> & {
  author?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.ArticleAuthor,
      'bio' | 'name' | 'email' | 'firstName' | 'lastName'
    >
  >;
  seo?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Seo, 'title' | 'description'>>;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
  >;
  blog: Pick<StorefrontAPI.Blog, 'id' | 'title' | 'handle'>;
};

export type CollectionItemFragment = Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle' | 'description' | 'descriptionHtml' | 'updatedAt'
> & {
  seo: Pick<StorefrontAPI.Seo, 'title' | 'description'>;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
  >;
};

export type ImageFragment = Pick<
  StorefrontAPI.Image,
  'url' | 'altText' | 'width' | 'height'
>;

type Media_ExternalVideo_Fragment = {__typename: 'ExternalVideo'} & Pick<
  StorefrontAPI.ExternalVideo,
  'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
> & {previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>};

type Media_MediaImage_Fragment = {__typename: 'MediaImage'} & Pick<
  StorefrontAPI.MediaImage,
  'id' | 'mediaContentType' | 'alt'
> & {
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
    >;
    previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
  };

type Media_Model3d_Fragment = {__typename: 'Model3d'} & Pick<
  StorefrontAPI.Model3d,
  'id' | 'mediaContentType' | 'alt'
> & {
    sources: Array<Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>>;
    previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
  };

type Media_Video_Fragment = {__typename: 'Video'} & Pick<
  StorefrontAPI.Video,
  'id' | 'mediaContentType' | 'alt'
> & {
    sources: Array<Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>>;
    previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
  };

export type MediaFragment =
  | Media_ExternalVideo_Fragment
  | Media_MediaImage_Fragment
  | Media_Model3d_Fragment
  | Media_Video_Fragment;

export type MenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ChildMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ParentMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    >
  >;
};

export type MenuFragment = Pick<StorefrontAPI.Menu, 'id'> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    > & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        >
      >;
    }
  >;
};

export type SmallPageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'id' | 'title' | 'handle' | 'trackingParameters'
>;

export type SearchPageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  | 'id'
  | 'body'
  | 'title'
  | 'handle'
  | 'createdAt'
  | 'updatedAt'
  | 'bodySummary'
  | 'trackingParameters'
> & {
    seo?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Seo, 'title' | 'description'>>;
  };

export type PolicyFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'body' | 'handle' | 'id' | 'title' | 'url'
>;

export type ProductVariantFragment = Pick<
  StorefrontAPI.ProductVariant,
  'availableForSale' | 'id' | 'sku' | 'title'
> & {
  compareAtPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  image?: StorefrontAPI.Maybe<
    {__typename: 'Image'} & Pick<
      StorefrontAPI.Image,
      'id' | 'url' | 'altText' | 'width' | 'height'
    >
  >;
  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
  unitPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
};

export type ProductVariantsFragment = {
  variants: {
    nodes: Array<
      Pick<
        StorefrontAPI.ProductVariant,
        'availableForSale' | 'id' | 'sku' | 'title'
      > & {
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
        >;
        image?: StorefrontAPI.Maybe<
          {__typename: 'Image'} & Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
        unitPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
        >;
      }
    >;
  };
};

export type ProductCardFragment = {__typename: 'Product'} & Pick<
  StorefrontAPI.Product,
  | 'id'
  | 'title'
  | 'handle'
  | 'updatedAt'
  | 'publishedAt'
  | 'availableForSale'
  | 'trackingParameters'
> & {
    featuredImage?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
    variants: {
      nodes: Array<
        Pick<
          StorefrontAPI.ProductVariant,
          'availableForSale' | 'id' | 'sku' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          image?: StorefrontAPI.Maybe<
            {__typename: 'Image'} & Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
        }
      >;
    };
  };

export type ProductFragment = Pick<
  StorefrontAPI.Product,
  | 'id'
  | 'tags'
  | 'title'
  | 'vendor'
  | 'handle'
  | 'updatedAt'
  | 'publishedAt'
  | 'description'
  | 'descriptionHtml'
  | 'availableForSale'
> & {
  options: Array<
    Pick<StorefrontAPI.ProductOption, 'id' | 'name' | 'values'> & {
      optionValues: Array<
        Pick<StorefrontAPI.ProductOptionValue, 'id' | 'name'> & {
          swatch?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductOptionValueSwatch, 'color'> & {
              image?: StorefrontAPI.Maybe<
                | (Pick<
                    StorefrontAPI.ExternalVideo,
                    'id' | 'alt' | 'mediaContentType'
                  > & {
                    previewImage?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'id' | 'url' | 'width' | 'height' | 'altText'
                      >
                    >;
                  })
                | (Pick<
                    StorefrontAPI.MediaImage,
                    'id' | 'alt' | 'mediaContentType'
                  > & {
                    previewImage?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'id' | 'url' | 'width' | 'height' | 'altText'
                      >
                    >;
                  })
                | (Pick<
                    StorefrontAPI.Model3d,
                    'id' | 'alt' | 'mediaContentType'
                  > & {
                    previewImage?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'id' | 'url' | 'width' | 'height' | 'altText'
                      >
                    >;
                  })
                | (Pick<
                    StorefrontAPI.Video,
                    'id' | 'alt' | 'mediaContentType'
                  > & {
                    previewImage?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'id' | 'url' | 'width' | 'height' | 'altText'
                      >
                    >;
                  })
              >;
            }
          >;
        }
      >;
    }
  >;
  selectedVariant?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.ProductVariant,
      'availableForSale' | 'id' | 'sku' | 'title'
    > & {
      compareAtPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      image?: StorefrontAPI.Maybe<
        {__typename: 'Image'} & Pick<
          StorefrontAPI.Image,
          'id' | 'url' | 'altText' | 'width' | 'height'
        >
      >;
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
      selectedOptions: Array<
        Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
      >;
      unitPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
    }
  >;
  variants: {
    nodes: Array<
      Pick<
        StorefrontAPI.ProductVariant,
        'availableForSale' | 'id' | 'sku' | 'title'
      > & {
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
        >;
        image?: StorefrontAPI.Maybe<
          {__typename: 'Image'} & Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
        unitPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
        >;
      }
    >;
  };
  media: {
    nodes: Array<
      | ({__typename: 'ExternalVideo'} & Pick<
          StorefrontAPI.ExternalVideo,
          'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
        > & {
            previewImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url'>
            >;
          })
      | ({__typename: 'MediaImage'} & Pick<
          StorefrontAPI.MediaImage,
          'id' | 'mediaContentType' | 'alt'
        > & {
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
            >;
            previewImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url'>
            >;
          })
      | ({__typename: 'Model3d'} & Pick<
          StorefrontAPI.Model3d,
          'id' | 'mediaContentType' | 'alt'
        > & {
            sources: Array<
              Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
            >;
            previewImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url'>
            >;
          })
      | ({__typename: 'Video'} & Pick<
          StorefrontAPI.Video,
          'id' | 'mediaContentType' | 'alt'
        > & {
            sources: Array<Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>>;
            previewImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url'>
            >;
          })
    >;
  };
  seo: Pick<StorefrontAPI.Seo, 'title' | 'description'>;
};

export type SeoFragment = Pick<StorefrontAPI.Seo, 'title' | 'description'>;

export type ShopFragment = Pick<
  StorefrontAPI.Shop,
  'id' | 'name' | 'description'
> & {
  primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
  brand?: StorefrontAPI.Maybe<{
    logo?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
    }>;
  }>;
};

export type BlogsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type BlogsQuery = {
  blogs: {
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
    nodes: Array<
      Pick<StorefrontAPI.Blog, 'title' | 'handle'> & {
        seo?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Seo, 'title' | 'description'>
        >;
      }
    >;
  };
};

export type BlogQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type BlogQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'title'> & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'title' | 'description'>
      >;
      articles: {
        nodes: Array<
          Pick<
            StorefrontAPI.Article,
            'contentHtml' | 'handle' | 'id' | 'publishedAt' | 'title'
          > & {
            author?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.ArticleAuthor,
                'bio' | 'name' | 'email' | 'firstName' | 'lastName'
              >
            >;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
            blog: Pick<StorefrontAPI.Blog, 'handle'>;
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
        >;
      };
    }
  >;
};

export type ArticleQueryVariables = StorefrontAPI.Exact<{
  articleHandle: StorefrontAPI.Scalars['String']['input'];
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type ArticleQuery = {
  blog?: StorefrontAPI.Maybe<{
    articleByHandle?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Article,
        | 'id'
        | 'tags'
        | 'title'
        | 'handle'
        | 'content'
        | 'excerpt'
        | 'excerptHtml'
        | 'publishedAt'
        | 'contentHtml'
        | 'trackingParameters'
      > & {
        author?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.ArticleAuthor,
            'bio' | 'name' | 'email' | 'firstName' | 'lastName'
          >
        >;
        seo?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Seo, 'title' | 'description'>
        >;
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        blog: Pick<StorefrontAPI.Blog, 'id' | 'title' | 'handle'>;
      }
    >;
  }>;
};

export type CollectionQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  filters?: StorefrontAPI.InputMaybe<
    Array<StorefrontAPI.ProductFilter> | StorefrontAPI.ProductFilter
  >;
  sortKey: StorefrontAPI.ProductCollectionSortKeys;
  reverse?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Boolean']['input']>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CollectionQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Collection,
      | 'id'
      | 'title'
      | 'handle'
      | 'description'
      | 'descriptionHtml'
      | 'updatedAt'
    > & {
      products: {
        filters: Array<
          Pick<StorefrontAPI.Filter, 'id' | 'label' | 'type'> & {
            values: Array<
              Pick<
                StorefrontAPI.FilterValue,
                'id' | 'label' | 'count' | 'input'
              >
            >;
          }
        >;
        nodes: Array<
          {__typename: 'Product'} & Pick<
            StorefrontAPI.Product,
            | 'id'
            | 'title'
            | 'handle'
            | 'updatedAt'
            | 'publishedAt'
            | 'availableForSale'
            | 'trackingParameters'
          > & {
              featuredImage?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              variants: {
                nodes: Array<
                  Pick<
                    StorefrontAPI.ProductVariant,
                    'availableForSale' | 'id' | 'sku' | 'title'
                  > & {
                    compareAtPrice?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                    >;
                    image?: StorefrontAPI.Maybe<
                      {__typename: 'Image'} & Pick<
                        StorefrontAPI.Image,
                        'id' | 'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                    price: Pick<
                      StorefrontAPI.MoneyV2,
                      'amount' | 'currencyCode'
                    >;
                    product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                    selectedOptions: Array<
                      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                    >;
                    unitPrice?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                    >;
                  }
                >;
              };
            }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'endCursor' | 'startCursor' | 'hasNextPage' | 'hasPreviousPage'
        >;
      };
      seo: Pick<StorefrontAPI.Seo, 'title' | 'description'>;
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
      >;
    }
  >;
  collections: {
    edges: Array<{node: Pick<StorefrontAPI.Collection, 'title' | 'handle'>}>;
  };
};

export type StoreCollectionsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type StoreCollectionsQuery = {
  collections: {
    nodes: Array<
      Pick<
        StorefrontAPI.Collection,
        | 'id'
        | 'title'
        | 'handle'
        | 'description'
        | 'descriptionHtml'
        | 'updatedAt'
      > & {
        seo: Pick<StorefrontAPI.Seo, 'title' | 'description'>;
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type LayoutQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  headerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  footerMenuHandle: StorefrontAPI.Scalars['String']['input'];
}>;

export type LayoutQuery = {
  shop: Pick<StorefrontAPI.Shop, 'id' | 'name' | 'description'> & {
    primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
    brand?: StorefrontAPI.Maybe<{
      logo?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
      }>;
    }>;
  };
  headerMenu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
  footerMenu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type PolicyQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  privacyPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  refundPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  shippingPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  termsOfService: StorefrontAPI.Scalars['Boolean']['input'];
}>;

export type PolicyQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
  };
};

export type ProductRecommendationsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  productId: StorefrontAPI.Scalars['ID']['input'];
}>;

export type ProductRecommendationsQuery = {
  productRecommendations?: StorefrontAPI.Maybe<
    Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'updatedAt'
        | 'publishedAt'
        | 'availableForSale'
        | 'trackingParameters'
      > & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          variants: {
            nodes: Array<
              Pick<
                StorefrontAPI.ProductVariant,
                'availableForSale' | 'id' | 'sku' | 'title'
              > & {
                compareAtPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
                image?: StorefrontAPI.Maybe<
                  {__typename: 'Image'} & Pick<
                    StorefrontAPI.Image,
                    'id' | 'url' | 'altText' | 'width' | 'height'
                  >
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                unitPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
              }
            >;
          };
        }
    >
  >;
};

export type ProductVariantsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type ProductVariantsQuery = {
  product?: StorefrontAPI.Maybe<{
    variants: {
      nodes: Array<
        Pick<
          StorefrontAPI.ProductVariant,
          'availableForSale' | 'id' | 'sku' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          image?: StorefrontAPI.Maybe<
            {__typename: 'Image'} & Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
        }
      >;
    };
  }>;
};

export type ProductQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  selectedOptions:
    | Array<StorefrontAPI.SelectedOptionInput>
    | StorefrontAPI.SelectedOptionInput;
}>;

export type ProductQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Product,
      | 'id'
      | 'tags'
      | 'title'
      | 'vendor'
      | 'handle'
      | 'updatedAt'
      | 'publishedAt'
      | 'description'
      | 'descriptionHtml'
      | 'availableForSale'
    > & {
      options: Array<
        Pick<StorefrontAPI.ProductOption, 'id' | 'name' | 'values'> & {
          optionValues: Array<
            Pick<StorefrontAPI.ProductOptionValue, 'id' | 'name'> & {
              swatch?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.ProductOptionValueSwatch, 'color'> & {
                  image?: StorefrontAPI.Maybe<
                    | (Pick<
                        StorefrontAPI.ExternalVideo,
                        'id' | 'alt' | 'mediaContentType'
                      > & {
                        previewImage?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'id' | 'url' | 'width' | 'height' | 'altText'
                          >
                        >;
                      })
                    | (Pick<
                        StorefrontAPI.MediaImage,
                        'id' | 'alt' | 'mediaContentType'
                      > & {
                        previewImage?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'id' | 'url' | 'width' | 'height' | 'altText'
                          >
                        >;
                      })
                    | (Pick<
                        StorefrontAPI.Model3d,
                        'id' | 'alt' | 'mediaContentType'
                      > & {
                        previewImage?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'id' | 'url' | 'width' | 'height' | 'altText'
                          >
                        >;
                      })
                    | (Pick<
                        StorefrontAPI.Video,
                        'id' | 'alt' | 'mediaContentType'
                      > & {
                        previewImage?: StorefrontAPI.Maybe<
                          Pick<
                            StorefrontAPI.Image,
                            'id' | 'url' | 'width' | 'height' | 'altText'
                          >
                        >;
                      })
                  >;
                }
              >;
            }
          >;
        }
      >;
      selectedVariant?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.ProductVariant,
          'availableForSale' | 'id' | 'sku' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          image?: StorefrontAPI.Maybe<
            {__typename: 'Image'} & Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
        }
      >;
      variants: {
        nodes: Array<
          Pick<
            StorefrontAPI.ProductVariant,
            'availableForSale' | 'id' | 'sku' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
            >;
            image?: StorefrontAPI.Maybe<
              {__typename: 'Image'} & Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
            unitPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
            >;
          }
        >;
      };
      media: {
        nodes: Array<
          | ({__typename: 'ExternalVideo'} & Pick<
              StorefrontAPI.ExternalVideo,
              'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
            > & {
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url'>
                >;
              })
          | ({__typename: 'MediaImage'} & Pick<
              StorefrontAPI.MediaImage,
              'id' | 'mediaContentType' | 'alt'
            > & {
                image?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
                >;
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url'>
                >;
              })
          | ({__typename: 'Model3d'} & Pick<
              StorefrontAPI.Model3d,
              'id' | 'mediaContentType' | 'alt'
            > & {
                sources: Array<
                  Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
                >;
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url'>
                >;
              })
          | ({__typename: 'Video'} & Pick<
              StorefrontAPI.Video,
              'id' | 'mediaContentType' | 'alt'
            > & {
                sources: Array<
                  Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>
                >;
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url'>
                >;
              })
        >;
      };
      seo: Pick<StorefrontAPI.Seo, 'title' | 'description'>;
    }
  >;
  shop: Pick<StorefrontAPI.Shop, 'name'> & {
    primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
  };
};

export type FeaturedItemsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  pageBy?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
}>;

export type FeaturedItemsQuery = {
  products: {
    nodes: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'updatedAt'
        | 'publishedAt'
        | 'availableForSale'
        | 'trackingParameters'
      > & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          variants: {
            nodes: Array<
              Pick<
                StorefrontAPI.ProductVariant,
                'availableForSale' | 'id' | 'sku' | 'title'
              > & {
                compareAtPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
                image?: StorefrontAPI.Maybe<
                  {__typename: 'Image'} & Pick<
                    StorefrontAPI.Image,
                    'id' | 'url' | 'altText' | 'width' | 'height'
                  >
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                unitPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
              }
            >;
          };
        }
    >;
  };
};

export type CatalogQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CatalogQuery = {
  products: {
    nodes: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'updatedAt'
        | 'publishedAt'
        | 'availableForSale'
        | 'trackingParameters'
      > & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          variants: {
            nodes: Array<
              Pick<
                StorefrontAPI.ProductVariant,
                'availableForSale' | 'id' | 'sku' | 'title'
              > & {
                compareAtPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
                image?: StorefrontAPI.Maybe<
                  {__typename: 'Image'} & Pick<
                    StorefrontAPI.Image,
                    'id' | 'url' | 'altText' | 'width' | 'height'
                  >
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                unitPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
              }
            >;
          };
        }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type AllProductsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type AllProductsQuery = {
  products: {
    nodes: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'updatedAt'
        | 'publishedAt'
        | 'availableForSale'
        | 'trackingParameters'
      > & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          variants: {
            nodes: Array<
              Pick<
                StorefrontAPI.ProductVariant,
                'availableForSale' | 'id' | 'sku' | 'title'
              > & {
                compareAtPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
                image?: StorefrontAPI.Maybe<
                  {__typename: 'Image'} & Pick<
                    StorefrontAPI.Image,
                    'id' | 'url' | 'altText' | 'width' | 'height'
                  >
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                unitPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
              }
            >;
          };
        }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type SearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  query: StorefrontAPI.Scalars['String']['input'];
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type SearchQuery = {
  products: Pick<StorefrontAPI.SearchResultItemConnection, 'totalCount'> & {
    nodes: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'updatedAt'
        | 'publishedAt'
        | 'availableForSale'
        | 'trackingParameters'
      > & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          variants: {
            nodes: Array<
              Pick<
                StorefrontAPI.ProductVariant,
                'availableForSale' | 'id' | 'sku' | 'title'
              > & {
                compareAtPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
                image?: StorefrontAPI.Maybe<
                  {__typename: 'Image'} & Pick<
                    StorefrontAPI.Image,
                    'id' | 'url' | 'altText' | 'width' | 'height'
                  >
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                unitPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
              }
            >;
          };
        }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
  };
  pages: Pick<StorefrontAPI.SearchResultItemConnection, 'totalCount'> & {
    nodes: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'id' | 'title' | 'handle' | 'trackingParameters'
      >
    >;
  };
  articles: Pick<StorefrontAPI.SearchResultItemConnection, 'totalCount'> & {
    nodes: Array<
      {__typename: 'Article'} & Pick<
        StorefrontAPI.Article,
        'id' | 'title' | 'handle' | 'publishedAt' | 'trackingParameters'
      >
    >;
  };
};

export type StoreRobotsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type StoreRobotsQuery = {shop: Pick<StorefrontAPI.Shop, 'id'>};

export type SitemapQueryVariables = StorefrontAPI.Exact<{
  urlLimits?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type SitemapQuery = {
  products: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        'updatedAt' | 'handle' | 'onlineStoreUrl' | 'title'
      > & {
        featuredImage?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText'>
        >;
      }
    >;
  };
  collections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, 'updatedAt' | 'handle' | 'onlineStoreUrl'>
    >;
  };
  pages: {
    nodes: Array<
      Pick<StorefrontAPI.Page, 'updatedAt' | 'handle' | 'onlineStoreUrl'>
    >;
  };
};

export type HomepageFeaturedCollectionsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HomepageFeaturedCollectionsQuery = {
  collections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, 'id' | 'title' | 'handle'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'altText' | 'width' | 'height' | 'url'>
        >;
      }
    >;
  };
  shop: Pick<StorefrontAPI.Shop, 'name' | 'description'>;
};

export type HomepageFeaturedProductsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HomepageFeaturedProductsQuery = {
  products: {
    nodes: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'updatedAt'
        | 'publishedAt'
        | 'availableForSale'
        | 'trackingParameters'
      > & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          variants: {
            nodes: Array<
              Pick<
                StorefrontAPI.ProductVariant,
                'availableForSale' | 'id' | 'sku' | 'title'
              > & {
                compareAtPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
                image?: StorefrontAPI.Maybe<
                  {__typename: 'Image'} & Pick<
                    StorefrontAPI.Image,
                    'id' | 'url' | 'altText' | 'width' | 'height'
                  >
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                unitPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
              }
            >;
          };
        }
    >;
  };
};

export type PredictiveArticleFragment = {__typename: 'Article'} & Pick<
  StorefrontAPI.Article,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictiveCollectionFragment = {__typename: 'Collection'} & Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictivePageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'id' | 'title' | 'handle' | 'trackingParameters'
>;

export type PredictiveQueryFragment = {
  __typename: 'SearchQuerySuggestion';
} & Pick<
  StorefrontAPI.SearchQuerySuggestion,
  'text' | 'styledText' | 'trackingParameters'
>;

export type PredictiveSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  limit: StorefrontAPI.Scalars['Int']['input'];
  limitScope: StorefrontAPI.PredictiveSearchLimitScope;
  searchTerm: StorefrontAPI.Scalars['String']['input'];
  types?: StorefrontAPI.InputMaybe<
    | Array<StorefrontAPI.PredictiveSearchType>
    | StorefrontAPI.PredictiveSearchType
  >;
}>;

export type PredictiveSearchQuery = {
  predictiveSearch?: StorefrontAPI.Maybe<{
    articles: Array<
      {__typename: 'Article'} & Pick<
        StorefrontAPI.Article,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    collections: Array<
      {__typename: 'Collection'} & Pick<
        StorefrontAPI.Collection,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    pages: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'id' | 'title' | 'handle' | 'trackingParameters'
      >
    >;
    products: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'updatedAt'
        | 'publishedAt'
        | 'availableForSale'
        | 'trackingParameters'
      > & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          variants: {
            nodes: Array<
              Pick<
                StorefrontAPI.ProductVariant,
                'availableForSale' | 'id' | 'sku' | 'title'
              > & {
                compareAtPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
                image?: StorefrontAPI.Maybe<
                  {__typename: 'Image'} & Pick<
                    StorefrontAPI.Image,
                    'id' | 'url' | 'altText' | 'width' | 'height'
                  >
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                unitPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
              }
            >;
          };
        }
    >;
    queries: Array<
      {__typename: 'SearchQuerySuggestion'} & Pick<
        StorefrontAPI.SearchQuerySuggestion,
        'text' | 'styledText' | 'trackingParameters'
      >
    >;
  }>;
};

export type ApiAllProductsQueryVariables = StorefrontAPI.Exact<{
  query?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['String']['input']>;
  count?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  reverse?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Boolean']['input']>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  sortKey?: StorefrontAPI.InputMaybe<StorefrontAPI.ProductSortKeys>;
}>;

export type ApiAllProductsQuery = {
  products: {
    nodes: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'updatedAt'
        | 'publishedAt'
        | 'availableForSale'
        | 'trackingParameters'
      > & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          variants: {
            nodes: Array<
              Pick<
                StorefrontAPI.ProductVariant,
                'availableForSale' | 'id' | 'sku' | 'title'
              > & {
                compareAtPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
                image?: StorefrontAPI.Maybe<
                  {__typename: 'Image'} & Pick<
                    StorefrontAPI.Image,
                    'id' | 'url' | 'altText' | 'width' | 'height'
                  >
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                unitPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
              }
            >;
          };
        }
    >;
  };
};

export type FeaturedProductsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  pageBy?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
}>;

export type FeaturedProductsQuery = {
  featuredProducts: {
    nodes: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        | 'id'
        | 'title'
        | 'handle'
        | 'updatedAt'
        | 'publishedAt'
        | 'availableForSale'
        | 'trackingParameters'
      > & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          variants: {
            nodes: Array<
              Pick<
                StorefrontAPI.ProductVariant,
                'availableForSale' | 'id' | 'sku' | 'title'
              > & {
                compareAtPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
                image?: StorefrontAPI.Maybe<
                  {__typename: 'Image'} & Pick<
                    StorefrontAPI.Image,
                    'id' | 'url' | 'altText' | 'width' | 'height'
                  >
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
                unitPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                >;
              }
            >;
          };
        }
    >;
  };
};

export type PageQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type PageQuery = {
  page?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Page, 'id' | 'title' | 'body'> & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'description' | 'title'>
      >;
    }
  >;
};

interface GeneratedQueryTypes {
  '#graphql\n    query Blogs(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $startCursor: String\n    ) @inContext(country: $country, language: $language) {\n        blogs(\n            first: $first,\n            last: $last,\n            before: $startCursor,\n            after: $endCursor\n        ) {\n            pageInfo {\n                hasNextPage\n                hasPreviousPage\n                startCursor\n                endCursor\n            }\n            nodes {\n                title\n                handle\n                seo {\n                    title\n                    description\n                }\n            }\n        }\n    }\n': {
    return: BlogsQuery;
    variables: BlogsQueryVariables;
  };
  '#graphql\n    query Blog(\n        $language: LanguageCode\n        $blogHandle: String!\n        $first: Int\n        $last: Int\n        $startCursor: String\n        $endCursor: String\n    ) @inContext(language: $language) {\n            blog(handle: $blogHandle) {\n            title\n            seo {\n                title\n                description\n            }\n            articles(\n                first: $first,\n                last: $last,\n                before: $startCursor,\n                after: $endCursor\n            ) {\n                nodes {\n                    ...ArticleCard\n                }\n                pageInfo {\n                    hasPreviousPage\n                    hasNextPage\n                    hasNextPage\n                    endCursor\n                    startCursor\n                }\n            }\n        }\n    }\n  #graphql\n    fragment ArticleCard on Article {\n        author: authorV2 {\n            ...author\n        }\n        contentHtml\n        handle\n        id\n        image {\n            id\n            altText\n            url\n            width\n            height\n        }\n        publishedAt\n        title\n        blog {\n            handle\n        }\n    }\n    #graphql\n    fragment author on ArticleAuthor {\n        bio\n        name\n        email\n        firstName\n        lastName\n    }\n\n\n': {
    return: BlogQuery;
    variables: BlogQueryVariables;
  };
  '#graphql\n    query Article(\n    $articleHandle: String!\n    $blogHandle: String!\n    $country: CountryCode\n    $language: LanguageCode\n    ) @inContext(language: $language, country: $country) {\n        blog(handle: $blogHandle) {\n            articleByHandle(handle: $articleHandle) {\n                ...ArticleItem    \n            }\n        }\n    }\n    #graphql\n    fragment ArticleItem on Article {\n        author: authorV2 {\n            ...author\n        }\n        seo {\n            ...seo\n        }\n        image {\n            ...image\n        }\n        id\n        tags\n        blog {\n            id\n            title\n            handle\n        }\n        title\n        handle\n        content\n        excerpt\n        excerptHtml\n        publishedAt\n        contentHtml\n        trackingParameters\n    }\n    #graphql\n  fragment seo on SEO {\n    title\n    description\n  }\n\n    #graphql\n  fragment image on Image {\n    url\n    altText\n    width\n    height\n  }\n\n    #graphql\n    fragment author on ArticleAuthor {\n        bio\n        name\n        email\n        firstName\n        lastName\n    }\n\n\n': {
    return: ArticleQuery;
    variables: ArticleQueryVariables;
  };
  '#graphql\n  #graphql\n    fragment ProductCard on Product {\n        __typename\n        id\n        title\n        handle\n        updatedAt\n        publishedAt\n        availableForSale\n        trackingParameters\n        featuredImage {\n            ...image\n        }\n        variants(first: 1) {\n            nodes {\n              ...ProductVariant\n            }\n        }\n    }\n    #graphql\n  fragment image on Image {\n    url\n    altText\n    width\n    height\n  }\n\n    #graphql\nfragment ProductVariant on ProductVariant {\n  availableForSale\n  compareAtPrice {\n    amount\n    currencyCode\n  }\n  id\n  image {\n    __typename\n    id\n    url\n    altText\n    width\n    height\n  }\n  price {\n    amount\n    currencyCode\n  }\n  product {\n    title\n    handle\n  }\n  selectedOptions {\n    name\n    value\n  }\n  sku\n  title\n  unitPrice {\n    amount\n    currencyCode\n  }\n}\n\n\n  #graphql\n    fragment CollectionItem on Collection {\n        id\n        title\n        handle\n        description\n        descriptionHtml\n        seo {\n        ...seo\n        }\n        image {\n          url\n          altText\n          width\n          height\n        }\n        updatedAt\n    }\n  #graphql\n  fragment seo on SEO {\n    title\n    description\n  }\n\n\n  query Collection(\n    $handle: String!\n    $country: CountryCode\n    $language: LanguageCode\n    $filters: [ProductFilter!]\n    $sortKey: ProductCollectionSortKeys!\n    $reverse: Boolean\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collection(handle: $handle) {\n        ...CollectionItem\n        products(\n            first: $first,\n            last: $last,\n            before: $startCursor,\n            after: $endCursor\n            filters: $filters,\n            sortKey: $sortKey,\n            reverse: $reverse\n        ) {\n            filters {\n                id\n                label\n                type\n                values {\n                  id\n                  label\n                  count\n                  input\n                }\n            }\n            nodes {\n                ...ProductCard\n            }\n            pageInfo {\n                endCursor\n                startCursor\n                hasNextPage\n                hasPreviousPage\n            }\n        }\n    }\n    collections(first: 100) {\n        edges {\n          node {\n            title\n            handle\n          }\n        }\n    }\n  }\n': {
    return: CollectionQuery;
    variables: CollectionQueryVariables;
  };
  '#graphql\n  query StoreCollections(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collections(\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor\n    ) {\n      nodes {\n        ...CollectionItem\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n  #graphql\n    fragment CollectionItem on Collection {\n        id\n        title\n        handle\n        description\n        descriptionHtml\n        seo {\n        ...seo\n        }\n        image {\n          url\n          altText\n          width\n          height\n        }\n        updatedAt\n    }\n  #graphql\n  fragment seo on SEO {\n    title\n    description\n  }\n\n\n': {
    return: StoreCollectionsQuery;
    variables: StoreCollectionsQueryVariables;
  };
  '#graphql\n    query layout(\n    $language: LanguageCode\n    $headerMenuHandle: String!\n    $footerMenuHandle: String!\n    ) @inContext(language: $language) {\n        shop {\n            ...Shop\n        }\n        headerMenu: menu(handle: $headerMenuHandle) {\n            ...Menu\n        }\n        footerMenu: menu(handle: $footerMenuHandle) {\n            ...Menu\n        }\n    }\n    #graphql\n    fragment Shop on Shop {\n        id\n        name\n        description\n        primaryDomain {\n        url\n        }\n        brand {\n        logo {\n            image {\n            url\n            }\n        }\n        }\n    }\n\n    #graphql\n    fragment MenuItem on MenuItem {\n        id\n        resourceId\n        tags\n        title\n        type\n        url\n    }\n    fragment ChildMenuItem on MenuItem {\n        ...MenuItem\n    }\n    fragment ParentMenuItem on MenuItem {\n        ...MenuItem\n        items {\n        ...ChildMenuItem\n        }\n    }\n    fragment Menu on Menu {\n        id\n        items {\n        ...ParentMenuItem\n        }\n    }\n\n': {
    return: LayoutQuery;
    variables: LayoutQueryVariables;
  };
  '#graphql\n    query Policy(\n        $country: CountryCode\n        $language: LanguageCode\n        $privacyPolicy: Boolean!\n        $refundPolicy: Boolean!\n        $shippingPolicy: Boolean!\n        $termsOfService: Boolean!\n    ) @inContext(language: $language, country: $country) {\n        shop {\n            privacyPolicy @include(if: $privacyPolicy) {\n                ...Policy\n            }\n            shippingPolicy @include(if: $shippingPolicy) {\n                ...Policy\n            }\n            termsOfService @include(if: $termsOfService) {\n                ...Policy\n            }\n            refundPolicy @include(if: $refundPolicy) {\n                ...Policy\n            }\n        }\n    }\n    #graphql\n    fragment Policy on ShopPolicy {\n        body\n        handle\n        id\n        title\n        url\n    }\n\n': {
    return: PolicyQuery;
    variables: PolicyQueryVariables;
  };
  '#graphql\n    query productRecommendations(\n        $country: CountryCode\n        $language: LanguageCode\n        $productId: ID!\n    ) @inContext(country: $country, language: $language) {\n        productRecommendations(productId: $productId) {\n            ...ProductCard\n        }\n    }\n    #graphql\n    fragment ProductCard on Product {\n        __typename\n        id\n        title\n        handle\n        updatedAt\n        publishedAt\n        availableForSale\n        trackingParameters\n        featuredImage {\n            ...image\n        }\n        variants(first: 1) {\n            nodes {\n              ...ProductVariant\n            }\n        }\n    }\n    #graphql\n  fragment image on Image {\n    url\n    altText\n    width\n    height\n  }\n\n    #graphql\nfragment ProductVariant on ProductVariant {\n  availableForSale\n  compareAtPrice {\n    amount\n    currencyCode\n  }\n  id\n  image {\n    __typename\n    id\n    url\n    altText\n    width\n    height\n  }\n  price {\n    amount\n    currencyCode\n  }\n  product {\n    title\n    handle\n  }\n  selectedOptions {\n    name\n    value\n  }\n  sku\n  title\n  unitPrice {\n    amount\n    currencyCode\n  }\n}\n\n\n': {
    return: ProductRecommendationsQuery;
    variables: ProductRecommendationsQueryVariables;
  };
  '#graphql\n    query ProductVariants(\n    $country: CountryCode\n    $language: LanguageCode\n    $handle: String!\n    ) @inContext(country: $country, language: $language) {\n        product(handle: $handle) {\n            ...ProductVariants\n        }\n    }\n    #graphql\nfragment ProductVariants on Product {\n  variants(first: 250) {\n    nodes {\n      ...ProductVariant\n    }\n  }\n}\n#graphql\nfragment ProductVariant on ProductVariant {\n  availableForSale\n  compareAtPrice {\n    amount\n    currencyCode\n  }\n  id\n  image {\n    __typename\n    id\n    url\n    altText\n    width\n    height\n  }\n  price {\n    amount\n    currencyCode\n  }\n  product {\n    title\n    handle\n  }\n  selectedOptions {\n    name\n    value\n  }\n  sku\n  title\n  unitPrice {\n    amount\n    currencyCode\n  }\n}\n\n\n': {
    return: ProductVariantsQuery;
    variables: ProductVariantsQueryVariables;
  };
  '#graphql\n    query Product(\n    $country: CountryCode\n    $handle: String!\n    $language: LanguageCode\n    $selectedOptions: [SelectedOptionInput!]!\n    ) @inContext(country: $country, language: $language) {\n        product(handle: $handle) {\n            ...Product\n        }\n        shop {\n            name\n            primaryDomain {\n              url\n            }\n        }\n    }\n    #graphql\nfragment Product on Product {\n  id\n  tags\n  title\n  vendor\n  handle\n  updatedAt\n  publishedAt\n  description\n  descriptionHtml\n  availableForSale\n  options {\n    id\n    name\n    values\n    optionValues {\n      id\n      name\n      swatch {\n        color\n        image {\n          id\n          alt\n          mediaContentType\n          previewImage {\n            id\n            url\n            width\n            height\n            altText\n          }\n        }\n      }\n    }\n  }\n  selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {\n    ...ProductVariant\n  }\n  variants(first: 1) {\n    nodes {\n      ...ProductVariant\n    }\n  }\n  media(first: 7) {\n    nodes {\n      ...Media\n    }\n  }\n  seo {\n      title\n      description\n  }\n}\n#graphql\nfragment Media on Media {\n  __typename\n  mediaContentType\n  alt\n  previewImage {\n    url\n  }\n  ... on MediaImage {\n    id\n    image {\n      id\n      url\n      width\n      height\n    }\n  }\n  ... on Video {\n    id\n    sources {\n      mimeType\n      url\n    }\n  }\n  ... on Model3d {\n    id\n    sources {\n      mimeType\n      url\n    }\n  }\n  ... on ExternalVideo {\n    id\n    embedUrl\n    host\n  }\n}\n\n#graphql\nfragment ProductVariant on ProductVariant {\n  availableForSale\n  compareAtPrice {\n    amount\n    currencyCode\n  }\n  id\n  image {\n    __typename\n    id\n    url\n    altText\n    width\n    height\n  }\n  price {\n    amount\n    currencyCode\n  }\n  product {\n    title\n    handle\n  }\n  selectedOptions {\n    name\n    value\n  }\n  sku\n  title\n  unitPrice {\n    amount\n    currencyCode\n  }\n}\n\n\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
  '#graphql\n  query FeaturedItems(\n    $country: CountryCode\n    $language: LanguageCode\n    $pageBy: Int = 12\n  ) @inContext(country: $country, language: $language) {\n    products(first: $pageBy) {\n      nodes {\n        ...ProductCard\n      }\n    }\n  }\n\n  #graphql\n    fragment ProductCard on Product {\n        __typename\n        id\n        title\n        handle\n        updatedAt\n        publishedAt\n        availableForSale\n        trackingParameters\n        featuredImage {\n            ...image\n        }\n        variants(first: 1) {\n            nodes {\n              ...ProductVariant\n            }\n        }\n    }\n    #graphql\n  fragment image on Image {\n    url\n    altText\n    width\n    height\n  }\n\n    #graphql\nfragment ProductVariant on ProductVariant {\n  availableForSale\n  compareAtPrice {\n    amount\n    currencyCode\n  }\n  id\n  image {\n    __typename\n    id\n    url\n    altText\n    width\n    height\n  }\n  price {\n    amount\n    currencyCode\n  }\n  product {\n    title\n    handle\n  }\n  selectedOptions {\n    name\n    value\n  }\n  sku\n  title\n  unitPrice {\n    amount\n    currencyCode\n  }\n}\n\n\n': {
    return: FeaturedItemsQuery;
    variables: FeaturedItemsQueryVariables;
  };
  '#graphql\nquery Catalog(\n  $country: CountryCode\n  $language: LanguageCode\n  $first: Int\n  $last: Int\n  $startCursor: String\n  $endCursor: String\n) @inContext(country: $country, language: $language) {\n  products(first: $first, last: $last, before: $startCursor, after: $endCursor) {\n    nodes {\n      ...ProductCard\n    }\n    pageInfo {\n      hasPreviousPage\n      hasNextPage\n      startCursor\n      endCursor\n    }\n  }\n}\n#graphql\n    fragment ProductCard on Product {\n        __typename\n        id\n        title\n        handle\n        updatedAt\n        publishedAt\n        availableForSale\n        trackingParameters\n        featuredImage {\n            ...image\n        }\n        variants(first: 1) {\n            nodes {\n              ...ProductVariant\n            }\n        }\n    }\n    #graphql\n  fragment image on Image {\n    url\n    altText\n    width\n    height\n  }\n\n    #graphql\nfragment ProductVariant on ProductVariant {\n  availableForSale\n  compareAtPrice {\n    amount\n    currencyCode\n  }\n  id\n  image {\n    __typename\n    id\n    url\n    altText\n    width\n    height\n  }\n  price {\n    amount\n    currencyCode\n  }\n  product {\n    title\n    handle\n  }\n  selectedOptions {\n    name\n    value\n  }\n  sku\n  title\n  unitPrice {\n    amount\n    currencyCode\n  }\n}\n\n\n': {
    return: CatalogQuery;
    variables: CatalogQueryVariables;
  };
  '#graphql\n  query AllProducts(\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {\n      nodes {\n        ...ProductCard\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n  #graphql\n    fragment ProductCard on Product {\n        __typename\n        id\n        title\n        handle\n        updatedAt\n        publishedAt\n        availableForSale\n        trackingParameters\n        featuredImage {\n            ...image\n        }\n        variants(first: 1) {\n            nodes {\n              ...ProductVariant\n            }\n        }\n    }\n    #graphql\n  fragment image on Image {\n    url\n    altText\n    width\n    height\n  }\n\n    #graphql\nfragment ProductVariant on ProductVariant {\n  availableForSale\n  compareAtPrice {\n    amount\n    currencyCode\n  }\n  id\n  image {\n    __typename\n    id\n    url\n    altText\n    width\n    height\n  }\n  price {\n    amount\n    currencyCode\n  }\n  product {\n    title\n    handle\n  }\n  selectedOptions {\n    name\n    value\n  }\n  sku\n  title\n  unitPrice {\n    amount\n    currencyCode\n  }\n}\n\n\n': {
    return: AllProductsQuery;
    variables: AllProductsQueryVariables;
  };
  '#graphql\n    query search(\n        $country: CountryCode\n        $endCursor: String\n        $first: Int\n        $language: LanguageCode\n        $last: Int\n        $query: String!\n        $startCursor: String\n    ) @inContext(country: $country, language: $language) {\n        products: search(\n        query: $query,\n        unavailableProducts: HIDE,\n        types: [PRODUCT],\n        first: $first,\n        sortKey: RELEVANCE,\n        last: $last,\n        before: $startCursor,\n        after: $endCursor\n        ) {\n            totalCount\n            nodes {\n                ...on Product {\n                    ...ProductCard\n            }\n        }\n        pageInfo {\n            hasNextPage\n            hasPreviousPage\n            startCursor\n            endCursor\n        }\n        }\n        pages: search(\n        query: $query,\n        types: [PAGE],\n        first: 10\n        ) {\n            totalCount\n            nodes {\n                ...on Page {\n                    ...SmallPage\n            }\n        }\n        }\n        articles: search(\n        query: $query,\n        types: [ARTICLE],\n        first: 10\n        ) {\n            totalCount\n            nodes {\n                ...on Article {\n                    ...SmallArticle\n            }\n        }\n        }\n    }\n  #graphql\n    fragment SmallPage on Page {\n        __typename\n        id\n        title\n        handle\n        trackingParameters\n    }\n\n  #graphql\n    fragment ProductCard on Product {\n        __typename\n        id\n        title\n        handle\n        updatedAt\n        publishedAt\n        availableForSale\n        trackingParameters\n        featuredImage {\n            ...image\n        }\n        variants(first: 1) {\n            nodes {\n              ...ProductVariant\n            }\n        }\n    }\n    #graphql\n  fragment image on Image {\n    url\n    altText\n    width\n    height\n  }\n\n    #graphql\nfragment ProductVariant on ProductVariant {\n  availableForSale\n  compareAtPrice {\n    amount\n    currencyCode\n  }\n  id\n  image {\n    __typename\n    id\n    url\n    altText\n    width\n    height\n  }\n  price {\n    amount\n    currencyCode\n  }\n  product {\n    title\n    handle\n  }\n  selectedOptions {\n    name\n    value\n  }\n  sku\n  title\n  unitPrice {\n    amount\n    currencyCode\n  }\n}\n\n\n  #graphql\n    fragment SmallArticle on Article {\n        __typename\n        id\n        title\n        handle\n        publishedAt\n        trackingParameters\n    }\n\n': {
    return: SearchQuery;
    variables: SearchQueryVariables;
  };
  '#graphql\n  query StoreRobots($country: CountryCode, $language: LanguageCode)\n   @inContext(country: $country, language: $language) {\n    shop {\n      id\n    }\n  }\n': {
    return: StoreRobotsQuery;
    variables: StoreRobotsQueryVariables;
  };
  '#graphql\n  query Sitemap($urlLimits: Int, $language: LanguageCode)\n  @inContext(language: $language) {\n    products(\n      first: $urlLimits\n      query: "published_status:\'online_store:visible\'"\n    ) {\n      nodes {\n        updatedAt\n        handle\n        onlineStoreUrl\n        title\n        featuredImage {\n          url\n          altText\n        }\n      }\n    }\n    collections(\n      first: $urlLimits\n      query: "published_status:\'online_store:visible\'"\n    ) {\n      nodes {\n        updatedAt\n        handle\n        onlineStoreUrl\n      }\n    }\n    pages(first: $urlLimits, query: "published_status:\'published\'") {\n      nodes {\n        updatedAt\n        handle\n        onlineStoreUrl\n      }\n    }\n  }\n': {
    return: SitemapQuery;
    variables: SitemapQueryVariables;
  };
  '#graphql\n  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)\n  @inContext(country: $country, language: $language) {\n    collections(\n      first: 2,\n      sortKey: UPDATED_AT\n    ) {\n      nodes {\n        id\n        title\n        handle\n        image {\n          altText\n          width\n          height\n          url\n        }\n      }\n    }\n    shop {\n      name\n      description\n    }\n  }\n': {
    return: HomepageFeaturedCollectionsQuery;
    variables: HomepageFeaturedCollectionsQueryVariables;
  };
  '#graphql\n  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)\n  @inContext(country: $country, language: $language) {\n    products(first: 3) {\n      nodes {\n        ...ProductCard\n      }\n    }\n  }\n  #graphql\n    fragment ProductCard on Product {\n        __typename\n        id\n        title\n        handle\n        updatedAt\n        publishedAt\n        availableForSale\n        trackingParameters\n        featuredImage {\n            ...image\n        }\n        variants(first: 1) {\n            nodes {\n              ...ProductVariant\n            }\n        }\n    }\n    #graphql\n  fragment image on Image {\n    url\n    altText\n    width\n    height\n  }\n\n    #graphql\nfragment ProductVariant on ProductVariant {\n  availableForSale\n  compareAtPrice {\n    amount\n    currencyCode\n  }\n  id\n  image {\n    __typename\n    id\n    url\n    altText\n    width\n    height\n  }\n  price {\n    amount\n    currencyCode\n  }\n  product {\n    title\n    handle\n  }\n  selectedOptions {\n    name\n    value\n  }\n  sku\n  title\n  unitPrice {\n    amount\n    currencyCode\n  }\n}\n\n\n': {
    return: HomepageFeaturedProductsQuery;
    variables: HomepageFeaturedProductsQueryVariables;
  };
  '#graphql\n  fragment PredictiveArticle on Article {\n    __typename\n    id\n    title\n    handle\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n  fragment PredictiveCollection on Collection {\n    __typename\n    id\n    title\n    handle\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n  fragment PredictivePage on Page {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n  }\n  fragment PredictiveQuery on SearchQuerySuggestion {\n    __typename\n    text\n    styledText\n    trackingParameters\n  }\n  query predictiveSearch(\n    $country: CountryCode\n    $language: LanguageCode\n    $limit: Int!\n    $limitScope: PredictiveSearchLimitScope!\n    $searchTerm: String!\n    $types: [PredictiveSearchType!]\n  ) @inContext(country: $country, language: $language) {\n    predictiveSearch(\n      limit: $limit,\n      limitScope: $limitScope,\n      query: $searchTerm,\n      types: $types,\n    ) {\n      articles {\n        ...PredictiveArticle\n      }\n      collections {\n        ...PredictiveCollection\n      }\n      pages {\n        ...PredictivePage\n      }\n      products {\n        ...ProductCard\n      }\n      queries {\n        ...PredictiveQuery\n      }\n    }\n  }\n  #graphql\n    fragment ProductCard on Product {\n        __typename\n        id\n        title\n        handle\n        updatedAt\n        publishedAt\n        availableForSale\n        trackingParameters\n        featuredImage {\n            ...image\n        }\n        variants(first: 1) {\n            nodes {\n              ...ProductVariant\n            }\n        }\n    }\n    #graphql\n  fragment image on Image {\n    url\n    altText\n    width\n    height\n  }\n\n    #graphql\nfragment ProductVariant on ProductVariant {\n  availableForSale\n  compareAtPrice {\n    amount\n    currencyCode\n  }\n  id\n  image {\n    __typename\n    id\n    url\n    altText\n    width\n    height\n  }\n  price {\n    amount\n    currencyCode\n  }\n  product {\n    title\n    handle\n  }\n  selectedOptions {\n    name\n    value\n  }\n  sku\n  title\n  unitPrice {\n    amount\n    currencyCode\n  }\n}\n\n\n': {
    return: PredictiveSearchQuery;
    variables: PredictiveSearchQueryVariables;
  };
  '#graphql\n  query ApiAllProducts(\n    $query: String\n    $count: Int\n    $reverse: Boolean\n    $country: CountryCode\n    $language: LanguageCode\n    $sortKey: ProductSortKeys\n  ) @inContext(country: $country, language: $language) {\n    products(first: $count, sortKey: $sortKey, reverse: $reverse, query: $query) {\n      nodes {\n        ...ProductCard\n      }\n    }\n  }\n  #graphql\n    fragment ProductCard on Product {\n        __typename\n        id\n        title\n        handle\n        updatedAt\n        publishedAt\n        availableForSale\n        trackingParameters\n        featuredImage {\n            ...image\n        }\n        variants(first: 1) {\n            nodes {\n              ...ProductVariant\n            }\n        }\n    }\n    #graphql\n  fragment image on Image {\n    url\n    altText\n    width\n    height\n  }\n\n    #graphql\nfragment ProductVariant on ProductVariant {\n  availableForSale\n  compareAtPrice {\n    amount\n    currencyCode\n  }\n  id\n  image {\n    __typename\n    id\n    url\n    altText\n    width\n    height\n  }\n  price {\n    amount\n    currencyCode\n  }\n  product {\n    title\n    handle\n  }\n  selectedOptions {\n    name\n    value\n  }\n  sku\n  title\n  unitPrice {\n    amount\n    currencyCode\n  }\n}\n\n\n': {
    return: ApiAllProductsQuery;
    variables: ApiAllProductsQueryVariables;
  };
  '#graphql\n  query FeaturedProducts(\n    $country: CountryCode\n    $language: LanguageCode\n    $pageBy: Int = 12\n  ) @inContext(country: $country, language: $language) {\n    featuredProducts: products(first: $pageBy) {\n      nodes {\n        ...ProductCard\n      }\n    }\n  }\n\n  #graphql\n    fragment ProductCard on Product {\n        __typename\n        id\n        title\n        handle\n        updatedAt\n        publishedAt\n        availableForSale\n        trackingParameters\n        featuredImage {\n            ...image\n        }\n        variants(first: 1) {\n            nodes {\n              ...ProductVariant\n            }\n        }\n    }\n    #graphql\n  fragment image on Image {\n    url\n    altText\n    width\n    height\n  }\n\n    #graphql\nfragment ProductVariant on ProductVariant {\n  availableForSale\n  compareAtPrice {\n    amount\n    currencyCode\n  }\n  id\n  image {\n    __typename\n    id\n    url\n    altText\n    width\n    height\n  }\n  price {\n    amount\n    currencyCode\n  }\n  product {\n    title\n    handle\n  }\n  selectedOptions {\n    name\n    value\n  }\n  sku\n  title\n  unitPrice {\n    amount\n    currencyCode\n  }\n}\n\n\n': {
    return: FeaturedProductsQuery;
    variables: FeaturedProductsQueryVariables;
  };
  '#graphql\n  query Page(\n    $language: LanguageCode,\n    $country: CountryCode,\n    $handle: String!\n  )\n  @inContext(language: $language, country: $country) {\n    page(handle: $handle) {\n      id\n      title\n      body\n      seo {\n        description\n        title\n      }\n    }\n  }\n': {
    return: PageQuery;
    variables: PageQueryVariables;
  };
}

interface GeneratedMutationTypes {}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
