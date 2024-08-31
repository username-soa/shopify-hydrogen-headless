import FilterIcon from '../icons/FilterIcon';

const Filters = () => {
  return (
    <button
      type="button"
      title="open filters"
      onClick={() => {
        return null;
      }}
      className="rounded-full py-2 px-4 border border-gray-200 flex items-center justify-center gap-1 hover:opacity-60 transition-opacity"
    >
      <FilterIcon />
      <span className="xs:inline-flex hidden">Filters</span>
    </button>
  );
};

export default Filters;
