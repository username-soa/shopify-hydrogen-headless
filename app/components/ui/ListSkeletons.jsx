import {Skeleton} from './Skeleton';

const ListSkeletons = ({count}) => {
  return (
    <div className="grid gap-y-9 gap-x-6 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
      {[...new Array(count)].map((_, i) => (
        <div key={`skeleton-item-${i}`} className="grid gap-2 l">
          <Skeleton className="aspect-[3/4]" />
          <Skeleton className="w-32 h-4" />
        </div>
      ))}
    </div>
  );
};

export default ListSkeletons;
