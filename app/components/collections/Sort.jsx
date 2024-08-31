import clsx from 'clsx';
import {useState, useRef} from 'react';
import {useSearchParams, useLocation, Link} from '@remix-run/react';
import useClickOutside from '~/hooks/useClickOutside';

const items = [
  {label: 'Featured', key: 'featured'},
  {
    label: 'Price: Low - High',
    key: 'price-low-high',
  },
  {
    label: 'Price: High - Low',
    key: 'price-high-low',
  },
  {
    label: 'Best Selling',
    key: 'best-selling',
  },
  {
    label: 'Newest',
    key: 'newest',
  },
];

const Sort = ({list = items, title = 'Sort By'}) => {
  const ref = useRef(null);
  const [params] = useSearchParams();
  const [open, setOpen] = useState({status: '', value: list[0].label});
  const term = list.find((obj) => {
    return obj.key === params.get('sort');
  });
  useClickOutside(ref, () =>
    setOpen((prevState) => {
      return {
        ...prevState,
        status: false,
      };
    }),
  );
  return (
    <div
      ref={ref}
      className="z-[9999] flex relative items-center justify-between"
    >
      <button
        type="button"
        title="open sort"
        onClick={() =>
          setOpen((prevState) => {
            return {
              ...prevState,
              status: !prevState.status,
            };
          })
        }
        className="min-w-40 flex items-center justify-between"
      >
        <span className="gap-1 flex py-4 px-3">
          <span className="font-bold">{title}:&nbsp;</span>
          <span>{(term || list[0]).label}</span>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="transparent"
          stroke="currentColor"
          className={clsx(
            'w-5 h-5 transition-transform',
            open.status && 'rotate-180',
          )}
        >
          <title>Caret</title>
          <path d="M14 8L10 12L6 8" strokeWidth="1.25"></path>
        </svg>
      </button>
      {open.status ? (
        <ul className="absolute top-full left-0 right-0 p-1 rounded-[calc(.25rem+7px)] bg-white gap-1 flex flex-col list-none shadow">
          {list.map((item, index) => (
            <SortItem
              item={item}
              handleClose={() =>
                setOpen((prevState) => {
                  return {
                    ...prevState,
                    status: false,
                  };
                })
              }
              key={`filter-item-${index}`}
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Sort;

const SortItem = ({item, handleClose}) => {
  const location = useLocation();
  const [params] = useSearchParams();
  const active = params.get('sort') === item.key;
  const DynamicTag = active ? 'p' : Link;
  return (
    <li
      onClick={handleClose}
      className="gap-[10px] flex items-center text-sm font-normal rounded-[7px] bg-transparent transition-all select-none hover:opacity-80"
    >
      <DynamicTag
        prefetch={!active ? false : undefined}
        to={getSortLink(item.key, params, location)}
        className={clsx('w-full py-[5px] px-[7px]', active && 'font-bold')}
      >
        {item.label}
      </DynamicTag>
    </li>
  );
};

function getSortLink(sort, params, location) {
  params.set('sort', sort);
  return `${location.pathname}?${params.toString()}`;
}
