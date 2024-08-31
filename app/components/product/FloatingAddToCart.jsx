import {
  Money,
  Image,
  useAnalytics,
  ShopPayButton,
  VariantSelector,
} from '@shopify/hydrogen';
import {motion} from 'framer-motion';
import Container from '../ui/Container';
import AddToCartButton from './AddToCartButton';

const variants = {
  show: {
    y: 0,
    transition: {
      damping: 30,
      type: 'spring',
      stiffness: 300,
      ease: [0, 1.5, 1, 1.5],
    },
  },
  hidden: {
    y: '100px',
  },
  exit: {
    opacity: 0,
  },
};

const FloatingAddToCart = ({storeDomain, selectedVariant}) => {
  const {publish, shop, cart, prevCart} = useAnalytics();

  if (!selectedVariant || !selectedVariant.availableForSale) return null;

  return (
    <motion.div
      exit="exit"
      animate="show"
      initial="hidden"
      variants={variants}
      className="fixed bottom-0 left-0 right-0  bg-white border-t border-gray-200 z-[999]"
    >
      <Container className="flex gap-6 justify-between py-5">
        <div className="md:grid grid-cols-[92px_auto] gap-4 hidden">
          <Image
            aspectRatio="1/1"
            data={selectedVariant?.image}
            alt={
              selectedVariant?.image.altText ||
              `Picture of ${selectedVariant?.title}`
            }
            className="object-cover object-center border rounded bg-primary/10"
          />
          <div className="flex gap-1 flex-col  justify-center">
            <h3 className="overflow-hidden whitespace-nowrap text-ellipsis font-medium w-fit">
              {selectedVariant?.product?.title}
            </h3>
            <p className="text-[#898989] transition-opacity text-sm">
              {selectedVariant?.title}
            </p>
          </div>
        </div>
        <div className="md:max-w-[300px] flex flex-col justify-between gap-2 w-full">
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
            {selectedVariant?.availableForSale ? (
              <span className="flex gap-2 justify-center">
                Add to cart <span>-</span>
                <Money data={selectedVariant?.price} />
              </span>
            ) : (
              'Sold out'
            )}
          </AddToCartButton>
          {selectedVariant.availableForSale && (
            <ShopPayButton
              width="100%"
              storeDomain={storeDomain}
              variantIds={[selectedVariant?.id]}
            />
          )}
        </div>
      </Container>
    </motion.div>
  );
};

export default FloatingAddToCart;
