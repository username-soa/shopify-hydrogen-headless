import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import ArrowSvg from '../icons/ArrowSvg';
import {Await, Link} from '@remix-run/react';

const TrendingProducts = ({data}) => {
  return (
    <div className="flex flex-col md:gap-14 gap-6">
      <h1 className="inline-block font-bold lg:text-6xl md:text-[calc(-4rem+12.5vw)] text-3xl max-w-prose-narrow text-center">
        Our Best Sellers
      </h1>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        <Suspense>
          <Await resolve={data}>
            {(response) => {
              if (
                !response ||
                !response?.products ||
                !response?.products?.nodes
              )
                return <></>;
              return response.products.nodes.map((product, index) => {
                return (
                  <ProductItem
                    product={product}
                    key={`product-item-${index}`}
                  />
                );
              });
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default TrendingProducts;

const ProductItem = ({product}) => {
  return (
    <Link prefetch="intent" to={`/products/${product.handle}`}>
      <div className="group relative rounded-[1.5rem] overflow-hidden bg-primary/5 aspect-[1/1.5] border border-gray-200">
        <Image
          aspectRatio="1/1.5"
          data={product.featuredImage}
          sizes="(min-width: 1024) 30vw, 90vw"
          className="object-cover w-full fadeIn transition-transform group-hover:scale-110 delay-75"
          alt={product?.featuredImage?.altText || `Picture of ${product.title}`}
        />
        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between pl-3 rounded-xl m-3 backdrop-blur-lg backdrop-saturate-150 bg-blurry">
          <h3 className="w-full overflow-hidden whitespace-nowrap text-ellipsis font-medium">
            {product.title}
          </h3>
          <ArrowSvg
            className="group-hover:rotate-0 delay-75 rotate-45"
            fill={'black'}
          />
        </div>
      </div>
    </Link>
  );
};
