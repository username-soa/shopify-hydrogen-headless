import clsx from 'clsx';
import {Link} from '@remix-run/react';
import {twMerge} from 'tailwind-merge';

const ProductOptions = ({option}) => {
  return (
    <div className="grid gap-3" key={option.name}>
      <h5 className="text-[#898989] opacity-60 font-medium">{option.name}</h5>
      <div className="flex gap-2 gap-y-4 flex-wrap">
        {option.values.map(({value, isAvailable, isActive, to}, index) => {
          return (
            <div
              className={clsx(!isAvailable && 'cursor-not-allowed')}
              key={`option-value-${index}`}
            >
              <Link
                to={to}
                replace
                prefetch="intent"
                preventScrollReset
                key={option.name + value}
                className={twMerge(
                  clsx(
                    'py-1 px-3 border-gray-200 border rounded-2xl text-[#757575]',
                    isActive && 'border-black text-black',
                    !isAvailable &&
                      'bg-primary/5 text-[#757575] pointer-events-none',
                  ),
                )}
              >
                {value}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductOptions;
