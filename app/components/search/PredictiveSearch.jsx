import {motion, AnimatePresence} from 'framer-motion';
import {variants, childAnimation} from './animation-variants';
import useEscape from '~/hooks/useEscape';
import CloseIcon from '../icons/CloseIcon';
import {useRef, useEffect} from 'react';
import {Link, Form, useParams, useFetcher} from '@remix-run/react';
import {Image, Money, Pagination} from '@shopify/hydrogen';
import {applyTrackingParams} from '~/lib/search';
import {Spinner} from '../ui/Spinner';
import PredictiveSearchResults from './PredictiveSearchResults';

export const NO_PREDICTIVE_SEARCH_RESULTS = [
  {type: 'queries', items: []},
  {type: 'products', items: []},
  {type: 'collections', items: []},
  {type: 'pages', items: []},
  {type: 'articles', items: []},
];

const PredictiveSearch = ({store_name, handleClose}) => {
  useEscape(handleClose);
  const params = useParams();
  const fetcher = useFetcher({
    key: 'search',
  });
  const inputRef = useRef(null);
  const searchTerm = useRef(null);
  if (fetcher?.state === 'loading') {
    searchTerm.current = fetcher.formData?.get('q') || '';
  }
  const searchResults = fetcher?.data?.searchResults || {
    results: NO_PREDICTIVE_SEARCH_RESULTS,
    totalResults: 0,
  };
  function fetchResults(event) {
    const searchAction = '/api/predictive-search';
    const newSearchTerm = event.target.value || '';
    const localizedAction = params.locale
      ? `/${params.locale}${searchAction}`
      : searchAction;

    fetcher.submit(
      {q: newSearchTerm, limit: '6'},
      {method: 'GET', action: localizedAction},
    );
  }

  function goToSearchResult(event) {
    if (!searchInputRef.current) return;
    searchInputRef.current.blur();
    searchInputRef.current.value = '';
    // close the aside
    window.location.href = event.currentTarget.href;
  }

  // ensure the passed input has a type of search, because SearchResults
  // will select the element based on the input
  useEffect(() => {
    inputRef?.current?.setAttribute('type', 'search');
  }, []);
  return (
    <motion.div
      exit="exit"
      animate="show"
      initial="hidden"
      variants={variants}
      className="fixed inset-0 w-full h-full z-[9999] bg-white grid grid-rows-[auto_auto_1fr]"
    >
      <motion.div
        variants={childAnimation}
        className="flex mx-auto relative items-center xs:justify-center justify-between h-[calc(44.73px+5vw)] max-w-[1440px] md:min-w-[70%] min-w-[90%]"
      >
        <h1 className="lg:text-4xl md:text-[calc(-4rem+12.5vw)] text-xl leading-normal">
          {store_name}
        </h1>
        <div className="absolute top-0 bottom-0 right-0 flex items-center">
          <button
            type="button"
            title="close search"
            onClick={handleClose}
            className="w-6 h-6 flex p-2 items-center justify-center bg-transparent"
          >
            <CloseIcon className="hover:scale-110 transition-transform" />
          </button>
        </div>
      </motion.div>
      <motion.div
        variants={childAnimation}
        className="sticky top-0 flex items-center flex-col justify-center h-[calc(44.73px+5.54vw)] max-w-[1440px] md:min-w-[70%] min-w-[90%] mx-auto"
      >
        <div className="absolute top-0 left-0 w-full pointer-events-none h-[calc(44.73px+5vw)] bg-gradient-linear-2" />
        <div className="z-10 flex max-w-[350px] w-full">
          <fetcher.Form
            className="flex-1 flex"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              if (!inputRef?.current || inputRef.current.value === '') {
                return;
              }
              inputRef.current.blur();
            }}
          >
            <input
              name="q"
              autoFocus
              type="search"
              autoComplete="off"
              className="flex-1 z-10 1 h-9 border-0 border-b-2 border-gray-200 focus:border-gray-400 focus:ring-0 md:px-1"
              placeholder="Search Products, Collections, etc..."
              onChange={fetchResults}
              onFocus={fetchResults}
            />
          </fetcher.Form>
        </div>
      </motion.div>
      <div className="flex flex-1 mx-auto max-w-[1440px] w-[90%] md:w-[70%] overflow-y-auto">
        {searchTerm.current ? (
          <div className="flex-1 lg:gap-6 gap-4 w-[70%] overflow-y-auto mx-auto flex rounded-lg bg-white flex-col">
            <div className="bottom-0 z-[999] flex  md:py-4 py-2 sticky bg-white justify-end border-b border-gray-200">
              <Link
                onClick={goToSearchResult}
                to={`/search?q=${searchTerm.current}`}
                className="text-sm inline-block truncate"
              >
                View all results for <q>{searchTerm.current}</q>
              </Link>
            </div>
            {fetcher.state === 'loading' ? (
              <Spinner />
            ) : (
              <PredictiveSearchResults
                results={searchResults}
                searchTerm={searchTerm.current}
                goToSearchResult={goToSearchResult}
              />
            )}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default PredictiveSearch;
