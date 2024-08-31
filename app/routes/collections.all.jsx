import {
  Pagination,
  getSeoMeta,
  getPaginationVariables,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import Grid from '~/components/ui/Grid';
import {json} from '@shopify/remix-oxygen';
import {seoPayload} from '~/lib/seo.server';
import {useLoaderData} from '@remix-run/react';
import ProductCard from '~/components/product/ProductCard';
import {CATALOG_QUERY} from '~/lib/shopify/queries/product';
import PaginationButton from '~/components/ui/PaginationButton';
import Container from '~/components/ui/Container';

export async function loader({request, context}) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  const {products} = await storefront.query(CATALOG_QUERY, {
    variables: {
      ...paginationVariables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });
  invariant(products, 'No data returned from Shopify API');
  const seo = seoPayload.collection({
    url: request.url,
    collection: {
      id: 'all-products',
      title: 'All Products',
      handle: 'products',
      descriptionHtml: 'All the store products',
      description: 'All the store products',
      seo: {
        title: 'All Products',
        description: 'All the store products',
      },
      metafields: [],
      products: products,
      updatedAt: '',
    },
  });

  return json({
    products: products,
    seo,
  });
}

export const meta = ({matches}) => {
  return getSeoMeta(...matches.map((match) => match.data.seo));
};

export default function Collection() {
  const {products} = useLoaderData();

  return (
    <Container className="sm:py-6 py-4 grid gap-8">
      <h1 className="font-bold uppercase lg:text-5xl md:text-[calc(-4rem+12.5vw)] text-3xl md:leading-tight lg:leading-tight">
        All Products
      </h1>
      <Pagination connection={products}>
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
            <Grid columns={4}>
              {nodes?.map((product, index) => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    loading={index < 8 ? 'eager' : undefined}
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
          </>
        )}
      </Pagination>
    </Container>
  );
}
