import {
  Pagination,
  getSeoMeta,
  getPaginationVariables,
} from '@shopify/hydrogen';
import {motion} from 'framer-motion';
import invariant from 'tiny-invariant';
import Grid from '~/components/ui/Grid';
import {json} from '@shopify/remix-oxygen';
import {seoPayload} from '~/lib/seo.server';
import {useLoaderData} from '@remix-run/react';
import {getImageLoadingPriority} from '~/lib/const';
import ProductCard from '~/components/product/ProductCard';
import PaginationButton from '~/components/ui/PaginationButton';
import {ALL_PRODUCTS_QUERY} from '~/lib/shopify/queries/product';

const PAGE_BY = 8;

const fadeUp = {
  show: {
    opacity: 1,
    transition: {
      type: 'spring',
      ease: [0, 1.5, 1, 1.5],
      stiffness: 300,
      damping: 30,
      delayChildren: 0.1,
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const childAnimations = {
  hidden: {
    y: '15px',
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0, 1.5, 1, 1.5],
      type: 'spring',
      duration: 1.25,
    },
  },
};

export async function loader({request, context: {storefront}}) {
  const variables = getPaginationVariables(request, {pageBy: PAGE_BY});

  const data = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables: {
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');

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
      products: data.products,
      updatedAt: '',
    },
  });

  return json({
    products: data.products,
    seo,
  });
}

export const meta = ({matches}) => {
  return getSeoMeta(...matches.map((match) => match.data.seo));
};

const AllProducts = () => {
  const {products} = useLoaderData();
  return (
    <div className="2xl:container w-full mx-auto sm:py-6 py-4 px-4 sm:px-6 md:px-20 lg:px-32 grid gap-4">
      <motion.header
        animate="show"
        initial="hidden"
        variants={fadeUp}
        className="py-6 grid md:gap-14 gap-10 text-center"
      >
        <motion.h1
          variants={childAnimations}
          className="inline-block font-bold lg:text-6xl md:text-[calc(-4rem+12.5vw)] text-3xl max-w-prose-narrow"
        >
          All products.
        </motion.h1>
        <motion.p variants={childAnimations}>
          Supper Coffee product list
        </motion.p>
      </motion.header>
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
    </div>
  );
};

export default AllProducts;
