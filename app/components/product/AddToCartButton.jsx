import clsx from 'clsx';
import {twMerge} from 'tailwind-merge';
import {CartForm} from '@shopify/hydrogen';

const AddToCartButton = ({children, disabled, lines, onClick, ...props}) => {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => (
        <button
          type="submit"
          onClick={onClick}
          disabled={disabled ?? fetcher.state !== 'idle'}
          className={twMerge(
            clsx(
              'font-medium text-center py-[9px] px-6 rounded-full w-full bg-primary text-contrast text-white',
            ),
          )}
          {...props}
        >
          {children}
        </button>
      )}
    </CartForm>
  );
};

export default AddToCartButton;
