import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import ArrowSvg from '../icons/ArrowSvg';

const CollectionCard = ({collection, index}) => {
  return (
    <Link prefetch="intent" to={`/collections/${collection.handle}`}>
      <div className="overflow-hidden relative rounded-xl bg-primary/5 aspect-[16/12]">
        <div className="overflow-hidden rounded-xl transition-all">
          <Image
            aspectRatio="16/12"
            data={collection.image}
            loading={index < 3 ? 'eager' : undefined}
            className="hover:scale-105 transition-transform object-cover"
            alt={collection?.image?.altText || collection.title}
            sizes="(max-width: 768px) 90vw, (min-width: 768px) 40vw"
          />
        </div>
        <div className="absolute top-0 z-20 flex items-end p-6 pb-[1.3rem] text-white pointer-events-none w-full h-full bg-gradient-linear">
          <div className="flex flex-1 flex-col leading-normal">
            <span className="text-base uppercase font-extralight">
              Collection
            </span>
            <div className="font-medium capitalize">{collection.title}</div>
          </div>
          <ArrowSvg />
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
