import clsx from 'clsx';
import {Link} from '@remix-run/react';
import {twMerge} from 'tailwind-merge';

const ColorSwatch = ({
  to,
  image,
  value,
  color,
  isActive,
  replace = true,
  isAvailable = true,
}) => {
  console.log('ColorSwatch isActive : ', isActive);
  return (
    <div
      className={clsx(!isAvailable && 'cursor-not-allowed', 'group relative')}
    >
      <Link
        to={to}
        replace={replace}
        prefetch="intent"
        preventScrollReset
        className={twMerge(
          clsx(
            'w-6 h-6 flex relative items-center justify-center transition-colors border border-transparent rounded-full',
            isActive && 'border-[#000]',
            !isAvailable && 'opacity-70 pointer-events-none',
          ),
        )}
      >
        {image ? (
          <img
            src={image.previewImage.url}
            alt={image.previewImage.altText || value}
            className="w-[calc(100%_-_4px)] h-[calc(100%_-_4px)] object-cover rounded-full"
          />
        ) : (
          <div
            className={clsx(
              'top-[50%] left-[50%] absolute rounded-full w-[calc(100%_-_4px)] h-[calc(100%_-_4px)] translate-x-[-50%] translate-y-[-50%]',
              !isAvailable && 'opacity-70 pointer-events-none',
            )}
            style={{
              background: color,
            }}
          ></div>
        )}
      </Link>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none capitalize">
        {value}
        {/* Triangle */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );
};

export default ColorSwatch;
