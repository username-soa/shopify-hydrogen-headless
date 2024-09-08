import clsx from 'clsx';
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from '@remix-run/react';
import {useDebounce} from 'react-use';
import {twMerge} from 'tailwind-merge';
import {useState, useMemo} from 'react';
import {FILTER_URL_PREFIX} from './Filters';
import CloseIcon from '~/components/icons/CloseIcon';
import ColorSwatch from '~/components/product/ColorSwatch';

const PRICE_RANGE_FILTER_DEBOUNCE = 500;

const FilterItem = ({filter, appliedFilters}) => {
  const location = useLocation();
  const [params] = useSearchParams();

  return (
    <div className="md:flex-1 text-xs md:max-w-[150px]">
      <div className="text-sm text-[#767676] pb-4 capitalize">
        {filter.label}
      </div>
      <ul
        className={twMerge(
          clsx(
            'gap-1 flex flex-col justify-start',
            (filter.presentation === 'SWATCH' ||
              filter.presentation === 'IMAGE') &&
              'flex-row gap-y-2 flex-wrap',
          ),
        )}
      >
        {filter.presentation === 'SWATCH' || filter.presentation === 'IMAGE'
          ? filter.values?.map((item, index) => {
              const isActive =
                appliedFilters.find(
                  (f) => f.label.toLowerCase() === item.label.toLowerCase(),
                ) !== undefined;
              return (
                <ColorSwatch
                  replace={false}
                  value={item.label}
                  isActive={isActive}
                  color={item.swatch.color}
                  image={item.swatch.image}
                  key={`color-swatch-${index}`}
                  to={getFilterLink(item.input, params, location)}
                />
              );
            })
          : filter.values?.map((item, index) => {
              return (
                <li key={`filter-value-${index}`} className="pb-4 pl-[.6rem]">
                  {filterMarkup(filter, item, params, location, appliedFilters)}
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export default FilterItem;

export const AppliedFilterItem = ({filter}) => {
  const location = useLocation();
  const [params] = useSearchParams();
  return (
    <Link
      to={getAppliedFilterLink(filter, params, location)}
      className="flex gap-2 items-center px-2 py-1 border border-gray-200 rounded-full gap text-xs capitalize"
      key={`${filter.label}-${JSON.stringify(filter.filter)}`}
    >
      <span className="flex-grow">{filter.label}</span>
      <CloseIcon className="w-3 h-3" />
    </Link>
  );
};

function getAppliedFilterLink(filter, params, location) {
  const paramsClone = new URLSearchParams(params);
  Object.entries(filter.filter).forEach(([key, value]) => {
    const fullKey = FILTER_URL_PREFIX + key;
    paramsClone.delete(fullKey, JSON.stringify(value));
  });
  return `${location.pathname}?${paramsClone.toString()}`;
}
function filterInputToParams(rawInput, params) {
  const input = typeof rawInput === 'string' ? JSON.parse(rawInput) : rawInput;

  Object.entries(input).forEach(([key, value]) => {
    if (params.has(`${FILTER_URL_PREFIX}${key}`, JSON.stringify(value))) {
      return;
    }
    if (key === 'price') {
      // For price, we want to overwrite
      params.set(`${FILTER_URL_PREFIX}${key}`, JSON.stringify(value));
    } else {
      params.append(`${FILTER_URL_PREFIX}${key}`, JSON.stringify(value));
    }
  });

  return params;
}
function getFilterLink(rawInput, params, location) {
  const paramsClone = new URLSearchParams(params);
  const newParams = filterInputToParams(rawInput, paramsClone);
  return `${location.pathname}?${newParams.toString()}`;
}
function filterMarkup(filter, option, params, location, appliedFilters) {
  switch (filter.type) {
    case 'PRICE_RANGE':
      const priceFilter = params.get(`${FILTER_URL_PREFIX}price`);
      const price = priceFilter ? JSON.parse(priceFilter) : undefined;
      const min = isNaN(Number(price?.min)) ? undefined : Number(price?.min);
      const max = isNaN(Number(price?.max)) ? undefined : Number(price?.max);

      return <PriceRangeFilter min={min} max={max} />;

    default:
      const to = getFilterLink(option.input, params, location);
      return (
        <Link
          to={to}
          prefetch="intent"
          className={twMerge(
            clsx(
              'filter-link focus:underline hover:underline',
              appliedFilters.find(
                (f) => f.label.toLowerCase() === option.label.toLowerCase(),
              ) !== undefined && 'active-link',
            ),
          )}
        >
          {option.label}
        </Link>
      );
  }
}
function PriceRangeFilter({max, min}) {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  useDebounce(
    () => {
      if (minPrice === undefined && maxPrice === undefined) {
        params.delete(`${FILTER_URL_PREFIX}price`);
        navigate(`${location.pathname}?${params.toString()}`);
        return;
      }

      const price = {
        ...(minPrice === undefined ? {} : {min: minPrice}),
        ...(maxPrice === undefined ? {} : {max: maxPrice}),
      };
      const newParams = filterInputToParams({price}, params);
      navigate(`${location.pathname}?${newParams.toString()}`);
    },
    PRICE_RANGE_FILTER_DEBOUNCE,
    [minPrice, maxPrice],
  );

  const onChangeMax = (event) => {
    const value = event.target.value;
    const newMaxPrice = Number.isNaN(parseFloat(value))
      ? undefined
      : parseFloat(value);
    setMaxPrice(newMaxPrice);
  };

  const onChangeMin = (event) => {
    const value = event.target.value;
    const newMinPrice = Number.isNaN(parseFloat(value))
      ? undefined
      : parseFloat(value);
    setMinPrice(newMinPrice);
  };

  return (
    <div className="flex">
      <label className="flex-[2] flex items-center justify-between capitalize">
        <input
          name="minPrice"
          type="number"
          value={minPrice ?? ''}
          placeholder={'$'}
          onChange={onChangeMin}
          className="w-full py-[4px] px-[5px] text-sm rounded-md border border-gray-200"
        />
      </label>
      <span className="flex-1 flex items-center justify-center"> - </span>
      <label className="flex-[2] flex items-center justify-between capitalize">
        <input
          name="maxPrice"
          type="number"
          value={maxPrice ?? ''}
          placeholder={'$'}
          onChange={onChangeMax}
          className="w-full py-[4px] px-[5px] text-sm rounded-md border border-gray-200"
        />
      </label>
    </div>
  );
}
