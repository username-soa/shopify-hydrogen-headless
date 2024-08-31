import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import ArrowSvg from '../icons/ArrowSvg';

const FeaturedCollections = ({data}) => {
  return (
    <div className="flex flex-col md:gap-14 gap-6">
      <h1 className="inline-block font-bold lg:text-6xl md:text-[calc(-4rem+12.5vw)] text-3xl max-w-prose-narrow text-center">
        Featured Collections
      </h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {data.nodes.map((collection, index) => {
          return (
            <CollectionItem
              collection={collection}
              key={`collection-item-${index}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedCollections;

const CollectionItem = ({collection}) => {
  return (
    <Link prefetch="intent" to={`/collections/${collection.handle}`}>
      <div className="group relative rounded-[1.5rem] overflow-hidden bg-primary/5 aspect-[1/1] border border-gray-200">
        <Image
          aspectRatio="1/1"
          data={collection.image}
          sizes="(min-width: 1024) 50vw, 90vw"
          alt={collection?.image?.altText || `Picture of ${collection.title}`}
          className="object-cover w-full fadeIn transition-transform group-hover:scale-110 delay-75"
        />
        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between pl-3 rounded-xl m-3 backdrop-blur-lg backdrop-saturate-150 bg-blurry">
          <h3 className="w-full overflow-hidden whitespace-nowrap text-ellipsis font-medium">
            {collection.title}
          </h3>
          <ArrowSvg
            fill={'black'}
            className="group-hover:rotate-0 delay-75 rotate-45"
          />
        </div>
      </div>
    </Link>
  );
};
