import ProductOptions from './ProductOptions';
import AddToCartButton from './AddToCartButton';
import {VariantSelector, ShopPayButton, useAnalytics} from '@shopify/hydrogen';

const ProductForm = ({product, selectedVariant, variants, storeDomain}) => {
  const {publish, shop, cart, prevCart} = useAnalytics();
  return (
    <div className="grid gap-6">
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>
      <div className="grid gap-4 mt-6">
        <AddToCartButton
          disabled={!selectedVariant || !selectedVariant.availableForSale}
          onClick={() => {
            window.location.href = window.location.href + '#cart-aside';
            // this one for cart aside popOut
            publish('cart_viewed', {
              cart,
              prevCart,
              shop,
              url: window.location.href || '',
            });
          }}
          lines={
            selectedVariant
              ? [
                  {
                    merchandiseId: selectedVariant.id,
                    quantity: 1,
                    // new for optimistic cart
                    selectedVariant,
                  },
                ]
              : []
          }
        >
          {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
        </AddToCartButton>
        {selectedVariant.availableForSale && (
          <ShopPayButton
            width="100%"
            storeDomain={storeDomain}
            variantIds={[selectedVariant?.id]}
          />
        )}
      </div>
    </div>
  );
};

export default ProductForm;
