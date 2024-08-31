import clsx from 'clsx';
import {twMerge} from 'tailwind-merge';

const Grid = ({children, classNames, columns = 4}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex-1 grid gap-y-9 gap-x-6',
          columns === 2 && 'md:grid-cols-2 grid-cols-1',
          columns === 3 && 'lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1',
          columns === 4 &&
            'xl:grid-cols-4 lg:grid-cols-3 xs:grid-cols-2 grid-cols-1',
          columns === 5 &&
            'xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1',
          classNames,
        ),
      )}
    >
      {children}
    </div>
  );
};

export default Grid;
