import {
  Analytics,
  Pagination,
  getSeoMeta,
  flattenConnection,
  getPaginationVariables,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import Grid from '~/components/ui/Grid';
import {json} from '@shopify/remix-oxygen';
import {seoPayload} from '~/lib/seo.server';
import {useLoaderData} from '@remix-run/react';
import Sort from '~/components/collections/Sort';
import Container from '~/components/ui/Container';
import {getImageLoadingPriority} from '~/lib/const';
import Filters from '~/components/collections/Filters';
import ProductCard from '~/components/product/ProductCard';
import PaginationButton from '~/components/ui/PaginationButton';
import {COLLECTION_QUERY} from '~/lib/shopify/queries/collection';
import CollectionHeader from '~/components/collections/CollectionHeader';

export async function loader({request, params, context}) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  invariant(handle, 'Missing collectionHandle param');

  const searchParams = new URL(request.url).searchParams;
  const knownFilters = ['productVendor', 'productType'];
  const available = 'available';
  const variantOption = 'variantOption';
  const {sortKey, reverse} = getSortValuesFromParam(searchParams.get('sort'));
  const filters = [];
  const appliedFilters = [];

  for (const [key, value] of searchParams.entries()) {
    if (available === key) {
      filters.push({available: value === 'true'});
      appliedFilters.push({
        label: value === 'true' ? 'In stock' : 'Out of stock',
        urlParam: {
          key: available,
          value,
        },
      });
    } else if (knownFilters.includes(key)) {
      filters.push({[key]: value});
      appliedFilters.push({label: value, urlParam: {key, value}});
    } else if (key.includes(variantOption)) {
      const [name, val] = value.split(':');
      filters.push({variantOption: {name, value: val}});
      appliedFilters.push({label: val, urlParam: {key, value}});
    }
  }

  // Builds min and max price filter since we can't stack them separately into
  // the filters array. See price filters limitations:
  // https://shopify.dev/custom-storefronts/products-collections/filter-products#limitations
  if (searchParams.has('minPrice') || searchParams.has('maxPrice')) {
    const price = {};
    if (searchParams.has('minPrice')) {
      price.min = Number(searchParams.get('minPrice')) || 0;
      appliedFilters.push({
        label: `Min: $${price.min}`,
        urlParam: {key: 'minPrice', value: searchParams.get('minPrice')},
      });
    }
    if (searchParams.has('maxPrice')) {
      price.max = Number(searchParams.get('maxPrice')) || 0;
      appliedFilters.push({
        label: `Max: $${price.max}`,
        urlParam: {key: 'maxPrice', value: searchParams.get('maxPrice')},
      });
    }
    filters.push({
      price,
    });
  }

  const {collection, collections} = await storefront.query(COLLECTION_QUERY, {
    variables: {
      ...paginationVariables,
      handle,
      filters,
      sortKey,
      reverse,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }
  const seo = seoPayload.collection({collection, url: request.url});

  return json({
    seo,
    collection,
    appliedFilters,
    collections: flattenConnection(collections),
  });
}

export const meta = ({matches}) => {
  return getSeoMeta(...matches.map((match) => match.data.seo));
};

export default function Collection() {
  const {collection, collections, appliedFilters} = useLoaderData();

  return (
    <>
      <Container className="sm:py-6 py-4 grid gap-4">
        <header className="py-6 grid md:gap-14 gap-10 text-center">
          <CollectionHeader
            title={collection.title}
            image={collection.image}
            description={collection.description}
          />
        </header>
        <div className="flex items-center justify-between">
          <Filters
            collections={collections}
            appliedFilters={appliedFilters}
            filters={collection.products.filters}
          />
          <Sort />
        </div>
        <Pagination connection={collection.products}>
          {({
            nodes,
            state,
            NextLink,
            isLoading,
            nextPageUrl,
            hasNextPage,
            PreviousLink,
            previousPageUrl,
            hasPreviousPage,
          }) => (
            <>
              {hasPreviousPage && (
                <PaginationButton
                  state={state}
                  preventScrollReset
                  to={previousPageUrl}
                  isLoading={isLoading}
                >
                  Load more
                </PaginationButton>
              )}
              <Grid columns={3}>
                {nodes.map((product, index) => {
                  return (
                    <ProductCard
                      product={product}
                      key={`product-card-${index}`}
                      loading={getImageLoadingPriority(index)}
                    />
                  );
                })}
              </Grid>
              <br />
              {hasNextPage && (
                <PaginationButton
                  state={state}
                  to={nextPageUrl}
                  preventScrollReset
                  isLoading={isLoading}
                >
                  Load more
                </PaginationButton>
              )}
            </>
          )}
        </Pagination>
      </Container>
      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </>
  );
}

function getSortValuesFromParam(sortParam) {
  switch (sortParam) {
    case 'price-high-low':
      return {
        sortKey: 'PRICE',
        reverse: true,
      };
    case 'price-low-high':
      return {
        sortKey: 'PRICE',
        reverse: false,
      };
    case 'best-selling':
      return {
        sortKey: 'BEST_SELLING',
        reverse: false,
      };
    case 'newest':
      return {
        sortKey: 'CREATED',
        reverse: true,
      };
    case 'featured':
      return {
        sortKey: 'MANUAL',
        reverse: false,
      };
    default:
      return {
        sortKey: 'RELEVANCE',
        reverse: false,
      };
  }
}
