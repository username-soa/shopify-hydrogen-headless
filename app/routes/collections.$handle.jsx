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
import ProductCard from '~/components/product/ProductCard';
import Filters from '~/components/collections/filter/Filters';
import PaginationButton from '~/components/ui/PaginationButton';
import {COLLECTION_QUERY} from '~/lib/shopify/queries/collection';
import CollectionHeader from '~/components/collections/CollectionHeader';
import {FILTER_URL_PREFIX} from '~/components/collections/filter/Filters';

export async function loader({request, params, context}) {
  const {handle} = params;
  const {storefront} = context;
  const locale = storefront.i18n;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  invariant(handle, 'Missing collectionHandle param');

  const searchParams = new URL(request.url).searchParams;
  const {sortKey, reverse} = getSortValuesFromParam(searchParams.get('sort'));

  const filters = [...searchParams.entries()].reduce(
    (filters, [key, value]) => {
      if (key.startsWith(FILTER_URL_PREFIX)) {
        const filterKey = key.substring(FILTER_URL_PREFIX.length);
        filters.push({
          [filterKey]: JSON.parse(value),
        });
      }
      return filters;
    },
    [],
  );

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
  const allFilterValues = collection.products.filters.flatMap(
    (filter) => filter.values,
  );

  const appliedFilters = filters
    .map((filter) => {
      const foundValue = allFilterValues.find((value) => {
        const valueInput = JSON.parse(value.input);
        // special case for price, the user can enter something freeform (still a number, though)
        // that may not make sense for the locale/currency.
        // Basically just check if the price filter is applied at all.
        if (valueInput.price && filter.price) {
          return true;
        }
        return (
          // This comparison should be okay as long as we're not manipulating the input we
          // get from the API before using it as a URL param.
          JSON.stringify(valueInput) === JSON.stringify(filter)
        );
      });
      if (!foundValue) {
        // eslint-disable-next-line no-console
        console.error('Could not find filter value for filter', filter);
        return null;
      }

      if (foundValue.id === 'filter.v.price') {
        // Special case for price, we want to show the min and max values as the label.
        const input = JSON.parse(foundValue.input);
        const min = parseAsCurrency(input.price?.min ?? 0, locale);
        const max = input.price?.max
          ? parseAsCurrency(input.price.max, locale)
          : '';
        const label = min && max ? `${min} - ${max}` : 'Price';

        return {
          filter,
          label,
        };
      }
      return {
        filter,
        label: foundValue.label,
      };
    })
    .filter((filter) => filter !== null);

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
        {collection.products.nodes.length === 0 && (
          <div className="text-center">
            No products found, try changing the filters.
          </div>
        )}
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
