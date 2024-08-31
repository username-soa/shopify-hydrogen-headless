import clsx from 'clsx';
import {Link} from '@remix-run/react';
import Article from '../blog/Article';
import {twMerge} from 'tailwind-merge';
import {useEffect, useState} from 'react';
import {Pagination} from '@shopify/hydrogen';
import ProductCard from '../product/ProductCard';
import {applyTrackingParams} from '~/lib/search';
import PaginationButton from '../ui/PaginationButton';

const SearchResult = ({data, searchTerm}) => {
  if (!data) {
    return null;
  }
  const results = data.results;
  const keys = Object.keys(results);
  const [highlighted, setHighlighted] = useState(null);
  useEffect(() => {
    for (var key in results) {
      if (results[key].nodes.length) {
        setHighlighted(key);
        break;
      }
    }
  }, [results]);

  return (
    <div className="grid gap-8">
      <div className="flex gap-4 items-center">
        {Object.keys(results).map((key, index) => {
          if (results[key].nodes.length) {
            return (
              <button
                type="button"
                key={`result-key-${index}`}
                onClick={() => setHighlighted(key)}
                className={twMerge(
                  clsx(
                    'py-1 flex items-center justify-center opacity-60 capitalize',
                    key === highlighted &&
                      'opacity-100 border-b-2 border-black',
                  ),
                )}
              >
                {key}
              </button>
            );
          }
        })}
      </div>
      <div className="gap-4 grid">
        {results &&
          keys.map((type) => {
            const resourceResults = results[type];
            if (type === highlighted) {
              if (resourceResults.nodes[0]?.__typename === 'Page') {
                return results[highlighted]?.nodes.map((item, index) => {
                  return (
                    <div
                      key={`page-result-${index}`}
                      className="font-bold transition-opacity hover:opacity-70"
                    >
                      <Link to={`/pages/${item.handle}`}>{item.title}</Link>
                    </div>
                  );
                });
              }
              if (resourceResults.nodes[0]?.__typename === 'Article') {
                return results[highlighted]?.nodes.map((item, index) => {
                  return (
                    <Article article={item} key={`article-result-${index}`} />
                  );
                });
              }
              if (resourceResults.nodes[0]?.__typename === 'Product') {
                return (
                  <Pagination connection={resourceResults}>
                    {(
                      {
                        nodes,
                        state,
                        NextLink,
                        isLoading,
                        nextPageUrl,
                        hasNextPage,
                        PreviousLink,
                        previousPageUrl,
                        hasPreviousPage,
                      },
                      index,
                    ) => {
                      const ItemsMarkup = nodes.map((product, index2) => {
                        const trackingParams = applyTrackingParams(
                          product,
                          `q=${encodeURIComponent(searchTerm)}`,
                        );

                        return (
                          <ProductCard
                            product={product}
                            key={`product-item-result-${index2}`}
                            trackingParams={trackingParams}
                          />
                        );
                      });
                      return (
                        <div
                          className="grid gap-6"
                          key={`product-result-${index}`}
                        >
                          <div className="flex items-center justify-center ">
                            {hasPreviousPage && (
                              <PaginationButton
                                state={state}
                                preventScrollReset
                                to={previousPageUrl}
                                isLoading={isLoading}
                              >
                                Load more
                              </PaginationButton>
                            )}
                          </div>
                          <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                            {ItemsMarkup}
                            <br />
                          </div>
                          <div className="flex items-center justify-center ">
                            {hasNextPage && (
                              <PaginationButton
                                state={state}
                                to={nextPageUrl}
                                preventScrollReset
                                isLoading={isLoading}
                              >
                                Load more
                              </PaginationButton>
                            )}
                          </div>
                        </div>
                      );
                    }}
                  </Pagination>
                );
              }
            } else return null;
          })}
      </div>
    </div>
  );
};

export default SearchResult;
