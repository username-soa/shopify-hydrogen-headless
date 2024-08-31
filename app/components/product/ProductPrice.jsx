import {Money} from '@shopify/hydrogen';

const ProductPrice = ({selectedVariant}) => {
  return (
    <div className="font-semibold">
      {selectedVariant?.compareAtPrice ? (
        <div className="flex gap-4">
          {selectedVariant ? <Money data={selectedVariant.price} /> : null}
          <span className="strike text-[#757575]">
            <Money data={selectedVariant.compareAtPrice} />
          </span>
        </div>
      ) : (
        selectedVariant?.price && <Money data={selectedVariant?.price} />
      )}
    </div>
  );
};

export default ProductPrice;
