import clsx from 'clsx';
import {
  Image,
  Money,
  CartForm,
  OptimisticInput,
  useOptimisticData,
} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {IconRemove} from '../icons/IconRemove';

const CartLineItem = ({line, handleClose}) => {
  const optimisticData = useOptimisticData(line?.id);
  if (!line?.id) return null;

  const {id, quantity, merchandise} = line;

  if (typeof quantity === 'undefined' || !merchandise?.product) return null;
  return (
    <li
      key={id}
      className="grid grid-cols-[90px_auto] gap-4"
      style={{
        // Hide the line item if the optimistic data action is remove
        // Do not remove the form from the DOM
        display: optimisticData?.action === 'remove' ? 'none' : 'grid',
      }}
    >
      {merchandise.image && (
        <Image
          aspectRatio="3/4"
          data={merchandise.image}
          className="object-cover object-center w-24 h-24 border rounded md:w-28 md:h-28"
          alt={merchandise.title}
        />
      )}

      <div className="flex gap-1 text-sm flex-col justify-center">
        <div className="flex gap-3 items-center justify-between">
          <h3
            className={clsx(
              'transition-opacity',
              line.isOptimistic && 'opacity-70',
            )}
          >
            {merchandise?.product?.handle ? (
              <Link
                onClick={handleClose}
                to={`/products/${merchandise.product.handle}`}
              >
                {merchandise?.product?.title || ''}
              </Link>
            ) : (
              <p>{merchandise?.product?.title || ''}</p>
            )}
          </h3>
          <ItemRemoveButton lineId={id} disabled={!!line.isOptimistic} />
        </div>

        <p
          className={clsx(
            'text-[#898989] transition-opacity',
            line.isOptimistic && 'opacity-70',
          )}
        >
          {merchandise?.title}
        </p>

        <div className="flex items-center justify-between gap-2">
          <CartLineQuantityAdjust line={line} disabled={!!line.isOptimistic} />
          <p className="text-[#898989] font-semibold pr-1">
            <CartLinePrice line={line} as="span" />
          </p>
        </div>
      </div>
    </li>
  );
};

export default CartLineItem;

function CartLineQuantityAdjust({line, disabled}) {
  const optimisticId = line?.id;
  const optimisticData = useOptimisticData(optimisticId);

  if (!line || typeof line?.quantity === 'undefined') return null;

  const optimisticQuantity = optimisticData?.quantity || line.quantity;

  const {id: lineId} = line;
  const prevQuantity = Number(Math.max(0, optimisticQuantity - 1).toFixed(0));
  const nextQuantity = Number((optimisticQuantity + 1).toFixed(0));

  return (
    <>
      <label htmlFor={`quantity-${lineId}`} className="sr-only">
        Quantity, {optimisticQuantity}
      </label>
      <div className="flex items-center border rounded-full">
        <UpdateCartButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            value={prevQuantity}
            name="decrease-quantity"
            aria-label="Decrease quantity"
            disabled={optimisticQuantity <= 1 || disabled}
            className="w-9 h-9 transition text-primary/50 hover:text-primary disabled:text-primary/10 disabled:cursor-not-allowed"
          >
            <span>&#8722;</span>
            <OptimisticInput
              id={optimisticId}
              data={{quantity: prevQuantity}}
            />
          </button>
        </UpdateCartButton>

        <div className="px-2 text-center" data-test="item-quantity">
          {optimisticQuantity}
        </div>

        <UpdateCartButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            disabled={disabled}
            value={nextQuantity}
            name="increase-quantity"
            aria-label="Increase quantity"
            className="w-9 h-9 transition text-primary/50 hover:text-primary disabled:text-primary/10 disabled:cursor-not-allowed"
          >
            <span>&#43;</span>
            <OptimisticInput
              id={optimisticId}
              data={{quantity: nextQuantity}}
            />
          </button>
        </UpdateCartButton>
      </div>
    </>
  );
}

function ItemRemoveButton({lineId, disabled}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{
        lineIds: [lineId],
      }}
    >
      <button
        type="submit"
        disabled={disabled}
        className="flex items-center justify-center w-9 h-9 border rounded-lg disabled:cursor-not-allowed"
      >
        <span className="sr-only">Remove</span>
        <IconRemove
          aria-hidden="true"
          className="transition-transform hover:scale-110"
        />
      </button>
      <OptimisticInput id={lineId} data={{action: 'remove'}} />
    </CartForm>
  );
}

function CartLinePrice({line, priceType = 'regular', ...passthroughProps}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />;
}

function UpdateCartButton({children, lines}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{
        lines,
      }}
    >
      {children}
    </CartForm>
  );
}
