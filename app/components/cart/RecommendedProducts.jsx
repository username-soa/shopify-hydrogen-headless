import {Skeleton} from '../ui/Skeleton';
import {useFetcher} from '@remix-run/react';
import {useEffect, useId, useMemo} from 'react';
import ProductCard from '../product/ProductCard';

const RecommendedProducts = ({
  count = 4,
  layout = 'drawer',
  onClose,
  query,
  reverse,
  sortKey = 'BEST_SELLING',
}) => {
  const id = useId();
  const {load, data} = useFetcher();
  const queryString = useMemo(
    () =>
      Object.entries({count, sortKey, query, reverse})
        .map(([key, val]) => (val ? `${key}=${val}` : null))
        .filter(Boolean)
        .join('&'),
    [count, sortKey, query, reverse],
  );
  //   since we don't have localization
  //   const productsApiPath = usePrefixPathWithLocale(
  //     `/api/products?${queryString}`,
  //   );

  useEffect(() => {
    load(`/api/products?${queryString}`);
  }, [load, queryString]);

  if (!data?.products) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {[...new Array(count)].map((_, i) => (
          <div key={`${id + i}`} className="grid gap-2">
            <Skeleton className="aspect-[3/4]" />
            <Skeleton className="w-32 h-4" />
          </div>
        ))}
      </div>
    );
  }

  if (data?.products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="grid gap-4">
      <h2 className="font-semibold">Shop Best Sellers</h2>
      <div className="grid grid-cols-2 gap-3">
        {data?.products.map((product, index) => (
          <ProductCard
            product={product}
            onClick={onClose}
            key={`featured-product-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
