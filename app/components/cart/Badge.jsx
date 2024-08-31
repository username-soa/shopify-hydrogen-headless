import {useMemo} from 'react';
import {Link} from '@remix-run/react';
import {useIsHydrated} from '~/hooks/useIsHydrated';

const Badge = ({openCart, count}) => {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <svg
          role="presentation"
          strokeWidth="1.2"
          focusable="false"
          width="22"
          height="22"
          viewBox="0 0 22 22"
        >
          <path
            d="M14.666 7.333a3.666 3.666 0 1 1-7.333 0M3.33 6.785l-.642 7.7c-.137 1.654-.206 2.48.073 3.119a2.75 2.75 0 0 0 1.21 1.314c.612.332 1.442.332 3.102.332h7.853c1.66 0 2.49 0 3.103-.332a2.75 2.75 0 0 0 1.21-1.314c.279-.638.21-1.465.072-3.12l-.642-7.7c-.118-1.423-.178-2.134-.493-2.673A2.75 2.75 0 0 0 16.99 3.02c-.563-.269-1.277-.269-2.705-.269h-6.57c-1.428 0-2.142 0-2.705.27A2.75 2.75 0 0 0 3.823 4.11c-.315.539-.374 1.25-.493 2.674Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <div
          className={`text-white bg-primary absolute bottom-1 right-1 text-[0.5rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
};

export default Badge;
