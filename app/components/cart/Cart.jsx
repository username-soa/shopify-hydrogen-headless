import clsx from 'clsx';
import {useRef} from 'react';
import {Money, flattenConnection} from '@shopify/hydrogen';
import {
  variants,
  childAnimation,
  checkoutAnimation,
  backgroundAnimation,
} from './animation-variants';
import {motion} from 'framer-motion';
import {Link} from '@remix-run/react';
import useEscape from '~/hooks/useEscape';
import CartLineItem from './CartLineItem';
import CloseIcon from '../icons/CloseIcon';
import useClickOutside from '~/hooks/useClickOutside';
import RecommendedProducts from './RecommendedProducts';
import {useOptimisticCart} from '@shopify/hydrogen';

const Cart = ({cart, handleClose}) => {
  useEscape(handleClose);
  const cartRef = useRef(null);
  useClickOutside(cartRef, handleClose);
  const optimisticCart = useOptimisticCart(cart);

  return (
    <motion.div
      exit="exit"
      animate="open"
      initial="closed"
      variants={backgroundAnimation}
      className="fixed inset-0 bg-blurry backdrop-blur-md z-[9999] flex justify-end"
    >
      <motion.aside
        exit="exit"
        ref={cartRef}
        animate="show"
        initial="hidden"
        variants={variants}
        className="h-full bg-white flex flex-col w-full max-w-[450px] md:min-w-[450px] border-l border-gray-200"
      >
        <CartHeader close={handleClose} />
        <CardContent
          handleClose={handleClose}
          lines={optimisticCart?.lines}
          costs={optimisticCart?.cost}
          url={optimisticCart?.checkoutUrl}
        />
      </motion.aside>
    </motion.div>
  );
};

export default Cart;

const CartHeader = ({close}) => {
  return (
    <header className="flex items-center justify-between pt-8 pb-4 px-4">
      <h2 className="font-semibold text-lg">Cart</h2>
      <button type="button" title="close cart" onClick={close}>
        <CloseIcon className="hover:scale-110 transition-transform" />
      </button>
    </header>
  );
};
const CardContent = ({lines, costs, url, handleClose}) => {
  const currentLines = lines ? flattenConnection(lines) : [];
  return (
    <>
      {currentLines?.length > 0 ? (
        <>
          <div className="px-4 py-4 pt-3 gap-8 flex flex-col flex-1 overflow-y-auto">
            <ul className="grid gap-4 md:gap-10">
              {currentLines.map((line) => (
                <CartLineItem
                  key={line.id}
                  line={line}
                  handleClose={handleClose}
                />
              ))}
            </ul>
          </div>
          <CartSubTotal
            checkoutUrl={url}
            total={costs?.totalAmount}
            tax={costs?.totalTaxAmount}
            subtotal={costs?.subtotalAmount}
          />
        </>
      ) : (
        <EmptyCart handleClose={handleClose} />
      )}
    </>
  );
};

const EmptyCart = ({handleClose, padding = true}) => {
  return (
    <motion.div
      variants={childAnimation}
      className={clsx(
        'py-4 pt-3 flex-1 flex flex-col gap-8 overflow-y-auto',
        padding && 'px-4',
      )}
    >
      <div className="flex flex-col gap-4">
        <p>
          Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
          started!
        </p>
        <Link
          to="/"
          prefetch="intent"
          onClick={handleClose}
          className="rounded-md py-2 px-5 bg-primary text-white mx-auto transition-opacity hover:opacity-80"
        >
          Continue Shopping
        </Link>
      </div>
      <RecommendedProducts onClose={handleClose} />
    </motion.div>
  );
};

function CartSubTotal({
  checkoutUrl,
  subtotal,
  total,
  tax,
  blur = true,
  padding = true,
}) {
  return (
    <motion.div
      variants={checkoutAnimation}
      className={clsx(
        'py-4 gap-3 flex relative flex-col',
        padding && 'px-4',
        blur && 'before:before-gradient',
      )}
    >
      <div className="flex pb-3 justify-between border-b border-gray-200">
        <p className="text-[#898989] text-sm capitalize">Taxes:</p>
        <div className="text-sm capitalize">
          {tax?.amount ? <Money data={tax} /> : '-'}
        </div>
      </div>
      <div className="flex pb-3 justify-between border-b border-gray-200">
        <p className="text-[#898989] text-sm capitalize">Subtotal:</p>
        <div className="text-sm capitalize">
          {subtotal?.amount ? <Money data={subtotal} /> : '-'}
        </div>
      </div>
      <div className="flex pb-3 justify-between border-b border-gray-200">
        <p className="text-[#898989] text-sm capitalize">Total:</p>
        <div className="text-sm capitalize">
          {total?.amount ? <Money data={total} /> : '-'}
        </div>
      </div>
      <p className="text-[#898989] text-xs my-3">
        (*) Shipping calculated at checkout
      </p>
      <a
        target={'_blank'}
        href={checkoutUrl}
        className="cursor-pointer font-medium text-center py-3 px-6 rounded-full w-full bg-primary text-contrast text-white transition-opacity hover:opacity-80"
      >
        Checkout
      </a>
    </motion.div>
  );
}

export const CartPageComponent = ({cart}) => {
  const currentLines = cart?.lines ? flattenConnection(cart?.lines) : [];
  return (
    <>
      {currentLines?.length > 0 ? (
        <div className="grid lg:grid-cols-[2fr_1fr] md:grid-cols-[1.25fr_1fr] grid-cols-1 lg:gap-16 md-gap-12 gap-8">
          <div className="py-4 pt-3 gap-8 flex flex-col flex-1 overflow-y-auto">
            <ul className="grid gap-4 md:gap-10">
              {currentLines.map((line) => (
                <CartLineItem
                  line={line}
                  key={line.id}
                  handleClose={() => {
                    return null;
                  }}
                />
              ))}
            </ul>
          </div>
          <div className="sticky md:top-[120px] bottom-0 md:h-[calc(100vh-120px)]">
            <CartSubTotal
              blur={false}
              checkoutUrl={cart?.checkoutUrl}
              total={cart?.cost?.totalAmount}
              tax={cart?.cost?.totalTaxAmount}
              subtotal={cart?.cost?.subtotalAmount}
            />
          </div>
        </div>
      ) : (
        <EmptyCart
          padding={false}
          handleClose={() => {
            return null;
          }}
        />
      )}
    </>
  );
};
