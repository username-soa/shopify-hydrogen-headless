import Grid from '../ui/Grid';
import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import ProductCard from '../product/ProductCard';

const NoSearchResults = ({recommendations}) => {
  return (
    <div className="gap-4 grid">
      <h2>Trending products</h2>
      <Grid columns={4}>
        <Suspense>
          <Await
            errorElement="There was a problem loading related products"
            resolve={recommendations}
          >
            {(result) => {
              if (!result) return null;
              {
                return result?.products?.nodes?.map((item, index) => {
                  return (
                    <ProductCard
                      product={item}
                      key={`recommended-product-${index}`}
                    />
                  );
                });
              }
            }}
          </Await>
        </Suspense>
      </Grid>
    </div>
  );
};

export default NoSearchResults;
