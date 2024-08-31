import React from 'react';
import Grid from '../ui/Grid';
import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

function pluralToSingularSearchType(type) {
  const plural = {
    articles: 'ARTICLE',
    collections: 'COLLECTION',
    pages: 'PAGE',
    products: 'PRODUCT',
    queries: 'QUERY',
  };

  if (typeof type === 'string') {
    return plural[type];
  }

  return type.map((t) => plural[t]).join(',');
}

const PredictiveSearchResultItem = ({
  type,
  items,
  searchTerm,
  goToSearchResult,
}) => {
  const isSuggestions = type === 'queries';
  const categoryUrl = `/search?q=${searchTerm}&type=${pluralToSingularSearchType(
    type,
  )}`;
  console.log(type, items);
  return (
    <div className="gap-3 flex-grow-0 flex flex-col" key={type}>
      <Link prefetch="intent" to={categoryUrl} onClick={goToSearchResult}>
        <h5 className="text-[#898989] uppercase font-medium">
          {isSuggestions ? 'Suggestions' : type}
        </h5>
      </Link>
      {type === 'products' ? (
        <Grid columns={3}>
          {items.map((item, index) => {
            return (
              <ResultItem
                goToSearchResult={goToSearchResult}
                item={item}
                key={index}
                type={type}
              />
            );
          })}
        </Grid>
      ) : (
        <ul>
          {items.map((item, index) => {
            return (
              <ResultItem
                goToSearchResult={goToSearchResult}
                item={item}
                key={index}
                type={type}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PredictiveSearchResultItem;

const ResultItem = ({goToSearchResult, item, type}) => {
  if (type === 'products') {
    return (
      <Link onClick={goToSearchResult} to={item.url}>
        {item.image?.url && (
          <div className="card-image aspect-[4/5] bg-primary/5 rounded-md overflow-hidden">
            <Image
              className="object-cover w-full fadeIn"
              alt={item?.image?.altText ?? ''}
              src={item?.image?.url}
              aspectRatio="4/5"
            />
          </div>
        )}
        <div className="pt-2 pl-2 font-medium text-sm">
          {item.styledTitle ? (
            <div
              dangerouslySetInnerHTML={{
                __html: item.styledTitle,
              }}
            />
          ) : (
            <span>{item.title}</span>
          )}
          {item?.price && (
            <small className="text-[#898989]">
              <Money data={item.price} />
            </small>
          )}
        </div>
      </Link>
    );
  }
  return (
    <li>
      <Link onClick={goToSearchResult} to={item.url}>
        <div className="transition-opacity hover:opacity-80">
          {item.styledTitle ? (
            <div
              dangerouslySetInnerHTML={{
                __html: item.styledTitle,
              }}
            />
          ) : (
            <span>{item.title}</span>
          )}
        </div>
      </Link>
    </li>
  );
};
