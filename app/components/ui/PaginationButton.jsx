import clsx from 'clsx';
import {Spinner} from './Spinner';
import {Link} from '@remix-run/react';
import {twMerge} from 'tailwind-merge';

const PaginationButton = ({children, className, isLoading, ...props}) => {
  return (
    <Link
      {...props}
      className={twMerge(
        clsx(
          'mx-auto py-2 px-4 rounded-md text-white hover:bg-primary/90 transition-colors font-medium bg-primary',
          className,
        ),
      )}
    >
      {isLoading ? (
        <span className="flex gap-2">
          Loading
          <Spinner size="s" />
        </span>
      ) : (
        children
      )}
    </Link>
  );
};

export default PaginationButton;
