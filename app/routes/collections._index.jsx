import {
  Pagination,
  getSeoMeta,
  getPaginationVariables,
} from '@shopify/hydrogen';
import Grid from '~/components/ui/Grid';
import {json} from '@shopify/remix-oxygen';
import {seoPayload} from '~/lib/seo.server';
import {Link, useLoaderData} from '@remix-run/react';
import PaginationButton from '~/components/ui/PaginationButton';
import {COLLECTIONS_QUERY} from '~/lib/shopify/queries/collection';
import CollectionCard from '~/components/collections/CollectionCard';
import {Spinner} from '~/components/ui/Spinner';
import Container from '~/components/ui/Container';

export async function loader({context: {storefront}, request}) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const {collections} = await storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
    country: storefront.i18n.country,
    language: storefront.i18n.language,
  });

  const seo = seoPayload.listCollections({
    collections,
    url: request.url,
  });

  return json({collections, seo});
}

export const meta = ({matches}) => {
  return getSeoMeta(...matches.map((match) => match.data.seo));
};

export default function Collections() {
  const {collections} = useLoaderData();

  return (
    <Container className="sm:py-6 py-4 grid gap-4">
      <header className="py-5 md:py-10 lg:py-16 grid md:gap-14 gap-10 text-center">
        <h1 className="inline-block font-bold lg:text-6xl md:text-[calc(-4rem+12.5vw)] text-3xl max-w-prose-narrow">
          Collections
        </h1>
      </header>
      <Pagination connection={collections}>
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
          <div className="grid gap-6">
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
            <Grid columns={2}>
              {nodes.map((collection, index) => {
                return (
                  <CollectionCard
                    index={index}
                    key={collection.id}
                    collection={collection}
                  />
                );
              })}
            </Grid>
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
          </div>
        )}
      </Pagination>
    </Container>
  );
}
