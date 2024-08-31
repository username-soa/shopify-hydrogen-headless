import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import ProductForm from './ProductForm';
import ProductPrice from './ProductPrice';

const ProductMain = ({selectedVariant, product, variants, storeDomain}) => {
  const {title, vendor, availableForSale, descriptionHtml} = product;

  return (
    <div className="md:p-12 py-8 px-4 md:max-w-[560px] flex gap-4 flex-col">
      <div className="grid gap-3 border-b border-gray-200 pb-3 ">
        {/* Sold out */}
        {!availableForSale && (
          <div className="w-fit text-[#898989] text-xs font-bold uppercase text-darkGray py-1 px-2 rounded-lg backdrop-blur-[8px] bg-gray-200">
            Sold out
          </div>
        )}

        {/* Sale */}
        {availableForSale && selectedVariant?.compareAtPrice && (
          <div className="w-fit py-1 px-2 rounded-lg text-xs font-semibold uppercase text-red text-red-600 bg-red-100">
            Sale
          </div>
        )}

        <h1 className="font-bold uppercase lg:text-5xl md:text-[calc(-4rem+12.5vw)] text-3xl md:leading-tight lg:leading-tight">
          {title}
        </h1>
        {vendor && (
          <span className="inline-flex font-semibold opacity-70 text-[#898989]">
            {vendor}
          </span>
        )}
        <ProductPrice selectedVariant={selectedVariant} />
      </div>
      <div className="grid gap-3">
        <h5 className="text-[#898989] opacity-60 font-medium">Description</h5>
        <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
      </div>
      <Suspense
        fallback={
          <ProductForm
            variants={[]}
            product={product}
            storeDomain={storeDomain}
            selectedVariant={selectedVariant}
          />
        }
      >
        <Await
          errorElement="There was a problem loading product variants"
          resolve={variants}
        >
          {(data) => (
            <ProductForm
              product={product}
              storeDomain={storeDomain}
              selectedVariant={selectedVariant}
              variants={data.product?.variants.nodes || []}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default ProductMain;
