import Grid from '../ui/Grid';
import {useEffect} from 'react';
import {useFetcher} from '@remix-run/react';
import ProductCard from '../product/ProductCard';

export function FeaturedSection() {
  const {load, data} = useFetcher();
  const path = '/featured-products';

  useEffect(() => {
    load(path);
  }, [load, path]);

  if (!data) return null;

  const {featuredProducts} = data;

  return (
    <div className="grid gap-4">
      <h2 className="font-semibold">Shop Best Sellers</h2>
      <Grid column={4}>
        {featuredProducts?.nodes.map((product, index) => (
          <ProductCard product={product} key={`featured-product-${index}`} />
        ))}
      </Grid>
    </div>
  );
}
