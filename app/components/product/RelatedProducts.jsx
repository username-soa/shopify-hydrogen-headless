import Grid from '../ui/Grid';
import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import ProductCard from './ProductCard';
import Container from '../ui/Container';
import ListSkeletons from '../ui/ListSkeletons';

const RelatedProducts = ({recommended}) => {
  return (
    <Container className="sm:py-6 py-4">
      <h1 className="font-bold uppercase lg:text-5xl md:text-[calc(-4rem+12.5vw)] text-3xl md:leading-tight lg:leading-tight mb-10">
        Related Products
      </h1>
      <Suspense fallback={<ListSkeletons count={6} />}>
        <Await
          resolve={recommended}
          errorElement="There was a problem loading related products"
        >
          {(products) => (
            <Grid columns={3}>
              {products.productRecommendations.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Grid>
          )}
        </Await>
      </Suspense>
    </Container>
  );
};

export default RelatedProducts;
