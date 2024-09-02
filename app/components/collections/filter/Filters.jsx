import FilterItem from './FilterItem';
import {useRef, useState} from 'react';
import {AppliedFilterItem} from './FilterItem';
import Portal from '~/components/global/Portal';
import CloseIcon from '~/components/icons/CloseIcon';
import useClickOutside from '~/hooks/useClickOutside';
import {motion, AnimatePresence} from 'framer-motion';
import FilterIcon from '~/components/icons/FilterIcon';
import {useNavigate, useLocation} from '@remix-run/react';
import {variants, childAnimation} from './animation-variants';

export const FILTER_URL_PREFIX = 'filter.';

const Filters = ({appliedFilters, filters}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        title="open filters"
        onClick={() => setOpen(true)}
        className="rounded-full py-2 px-4 border border-gray-200 flex items-center justify-center gap-1 hover:opacity-60 transition-opacity"
      >
        <FilterIcon />
        <span className="xs:inline-flex hidden">Filters</span>
      </button>
      <Portal>
        <AnimatePresence mode="wait">
          {open && (
            <FilterPopup
              filters={filters}
              appliedFilters={appliedFilters}
              handleClose={() => setOpen(false)}
            />
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default Filters;

const FilterPopup = ({filters, appliedFilters, handleClose}) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  useClickOutside(ref, handleClose);
  return (
    <motion.div
      exit="exit"
      animate="show"
      initial="hidden"
      variants={variants}
      className="fixed inset-0 backdrop-blur-[16px] bg-[hsla(0_0%_100%_0.8)] flex overflow-auto items-end z-[9999]"
    >
      <div
        ref={ref}
        className="flex-1 gap-4 bg-white gap flex flex-col py-8 md:px-16 px-4 md:min-h-[350px] min-h-[90vh] h-auto border-t border-gray-200"
      >
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-base">Filters</h1>
          <button
            type="button"
            title="close filters"
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center bg-transparent transition-transform hover:scale-105"
          >
            <CloseIcon />
          </button>
        </div>
        {appliedFilters.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {appliedFilters.map((filter, index) => {
              return (
                <AppliedFilterItem
                  filter={filter}
                  key={`applied-filter-label-${index}`}
                />
              );
            })}
          </div>
        )}
        <motion.div
          variants={childAnimation}
          className="flex-1 flex md:gap-8 gap-2 md:flex-row flex-col overflow-y-auto"
        >
          {filters?.map((item, index) => {
            return (
              <FilterItem
                filter={item}
                key={`filter-label-${index}`}
                appliedFilters={appliedFilters}
              />
            );
          })}
        </motion.div>
        <motion.div
          variants={childAnimation}
          className="gap-4 flex items-center justify-center"
        >
          <button
            type="button"
            onClick={handleClose}
            title={'Apply Filters'}
            className="text-sm py-[7px] px-4 rounded-lg border border-gray-200 bg-transparent text-notice font-medium"
          >
            Apply Filters
          </button>
          <button
            type="button"
            title={'Clear All'}
            onClick={() => {
              navigate(location.pathname);
              handleClose();
            }}
            className="text-sm py-[7px] px-4 rounded-lg border border-gray-200 bg-transparent text-notice font-medium"
          >
            Clear All
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
