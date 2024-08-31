import invariant from 'tiny-invariant';
import {PAGINATION_SIZE} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';
import {defer} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {SEARCH_QUERY} from '~/lib/shopify/queries/search';
import SearchResult from '~/components/search/SearchResult';
import NoSearchResults from '~/components/search/NoSearchResults';
import {FEATURED_ITEMS_QUERY} from '~/lib/shopify/queries/product';
import {getPaginationVariables, getSeoMeta, Analytics} from '@shopify/hydrogen';

// fetching products recommendations
async function getNoResultRecommendations(storefront, variables = {}) {
  const data = await storefront.query(FEATURED_ITEMS_QUERY, {
    variables: {
      pageBy: 12,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
      ...variables,
    },
  });

  invariant(data, 'No featured items data returned from Shopify API');

  return data;
}

export async function loader({request, context}) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const variables = getPaginationVariables(request, {pageBy: 8});
  const searchTerm = String(searchParams.get('q') || '');

  const {errors, ...data} = await context.storefront.query(SEARCH_QUERY, {
    variables: {
      query: searchTerm,
      ...variables,
    },
  });

  if (!data) {
    throw new Error('No search data returned from Shopify API');
  }

  const totalResults = Object.values(data).reduce((total, value) => {
    return total + value.nodes.length;
  }, 0);
  const shouldGetRecommendations = !searchTerm || totalResults === 0;

  const searchResults = {
    results: data,
    totalResults,
  };

  const seo = seoPayload.collection({
    url: request.url,
    collection: {
      id: 'search',
      title: 'Search',
      handle: 'search',
      descriptionHtml: 'Search results',
      description: 'Search results',
      seo: {
        title: 'Search',
        description: `Showing ${totalResults} search results for "${searchTerm}"`,
      },
      metafields: [],
      products: data.products,
      updatedAt: new Date().toISOString(),
    },
  });

  return defer({
    seo,
    searchTerm,
    searchResults,
    noResultRecommendations: shouldGetRecommendations
      ? getNoResultRecommendations(context.storefront, {
          pageBy: PAGINATION_SIZE,
        })
      : Promise.resolve(null),
  });
}

export const meta = ({matches}) => {
  return getSeoMeta(...matches.map((match) => match.data.seo));
};

export default function SearchPage() {
  const {searchTerm, searchResults, noResultRecommendations} = useLoaderData();
  const resultsText =
    searchResults?.totalResults.length > 1 ? 'results' : 'result';

  return (
    <>
      <div className="2xl:container w-full mx-auto sm:py-6 py-4 px-4 sm:px-6 md:px-20 lg:px-32">
        <div className="gap-4 flex items-end flex-wrap justify-between mb-6">
          <h1 className="lg:text-6xl md:text-[calc(-4rem+12.5vw)] text-3xl leading-normal">
            Search
          </h1>
          <div className="pb-[.3rem]">
            {!searchTerm ? (
              <div className="opacity-80">Enter a search term & try again.</div>
            ) : !searchResults?.totalResults ? (
              <div className="opacity-80">
                No results, try a different search.
              </div>
            ) : (
              <p>
                <span className="opacity-80">
                  {`Showing ${searchResults.totalResults} ${resultsText} for `}
                </span>
                <span className="font-bold">&quot;{searchTerm}&quot;</span>
              </p>
            )}
          </div>
        </div>
        {!searchTerm || !searchResults.totalResults ? (
          <NoSearchResults recommendations={noResultRecommendations} />
        ) : (
          <SearchResult data={searchResults} searchTerm={searchTerm} />
        )}
      </div>
      <Analytics.SearchView data={{searchTerm, searchResults}} />
    </>
  );
}
