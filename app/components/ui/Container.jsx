import clsx from 'clsx';
import {twMerge} from 'tailwind-merge';

const Container = ({as: Component = 'div', children, className}) => {
  return (
    <Component
      className={twMerge(
        clsx(
          '2xl:container xl:w-[90%] w-[calc(100%-2rem)] mx-auto',
          //   '2xl:container w-full mx-auto sm:py-6 py-4 px-4 sm:px-6 md:px-20 lg:px-32',
          className,
        ),
      )}
    >
      {children}
    </Component>
  );
};

export default Container;
