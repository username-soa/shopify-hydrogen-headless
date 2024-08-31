import PredictiveSearchResultItem from './PredictiveSearchResultItem';

const PredictiveSearchResults = ({results, searchTerm, goToSearchResult}) => {
  if (!results.totalResults || results.totalResults === 0) {
    return <NoPredictiveSearchResults searchTerm={searchTerm} />;
  }
  const products = results.results.filter((item) => item.type === 'products');
  const others = results.results.filter((item) => item.type !== 'products');
  return (
    <div className="grid lg:grid-cols-[1fr_2fr] grid-cols-1 md:gap-12 gap-4 overflow-y-auto pr-1">
      {others?.length ? (
        <div className="flex flex-col gap-4 py-1">
          {results.results
            .filter((item) => item.type !== 'products')
            .map(({type, items}) => (
              <PredictiveSearchResultItem
                key={type}
                type={type}
                items={items}
                searchTerm={searchTerm}
                goToSearchResult={goToSearchResult}
              />
            ))}
        </div>
      ) : null}
      {products?.length ? (
        <div className="py-1">
          {results.results
            .filter((item) => item.type === 'products')
            .map(({type, items}) => (
              <PredictiveSearchResultItem
                key={type}
                type={type}
                items={items}
                searchTerm={searchTerm}
                goToSearchResult={goToSearchResult}
              />
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default PredictiveSearchResults;

const NoPredictiveSearchResults = ({searchTerm}) => {
  if (!searchTerm) {
    return null;
  }
  return (
    <p className="p-4 mx-auto text-center">
      No results found for
      <q className="break-all font-medium text-[#666]">{searchTerm}</q>. Try a
      something else!
    </p>
  );
};
