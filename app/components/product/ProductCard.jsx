import clsx from 'clsx';
import {Link} from '@remix-run/react';
import {twMerge} from 'tailwind-merge';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';

const ProductCard = ({
  label,
  product,
  loading,
  onClick,
  quickAdd,
  className,
  trackingParams,
}) => {
  let cardLabel;
  if (!product?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(product?.variants)[0];

  if (!firstVariant) return null;
  const {image, price, compareAtPrice} = firstVariant;
  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price, compareAtPrice)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }

  const productAnalytics = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  };

  return (
    <div className="flex flex-col gap-2">
      <Link
        onClick={onClick}
        prefetch="intent"
        to={
          trackingParams
            ? `/products/${product.handle}${trackingParams}`
            : `/products/${product.handle}`
        }
      >
        <div className={clsx('grid gap-4', className)}>
          <div className="card-image aspect-[4/5] bg-primary/5">
            {image && (
              <Image
                className="object-cover w-full fadeIn"
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                aspectRatio="4/5"
                data={image}
                alt={image.altText || `Picture of ${product.title}`}
                loading={loading}
              />
            )}
            {cardLabel && (
              <label
                className={twMerge(
                  clsx(
                    'absolute top-0 right-0 m-4 text-right text-notice capitalize py-1 px-2 rounded-lg backdrop-blur-[8px] bg-gray-200',
                    cardLabel === 'Sale' && 'text-red-600 bg-red-100',
                  ),
                )}
              >
                {cardLabel}
              </label>
            )}
          </div>
          <div className="grid pl-3">
            <h3 className="w-full overflow-hidden whitespace-nowrap text-ellipsis font-medium">
              {product.title}
            </h3>
            <div className="flex gap-4">
              <div className="flex gap-4 text-[#808080] font-medium">
                <Money data={price} />
                {isDiscounted(price, compareAtPrice) && (
                  <CompareAtPrice
                    className={'opacity-50'}
                    data={compareAtPrice}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
      {/* {quickAdd && firstVariant.availableForSale && (
        <AddToCartButton
          lines={[
            {
              quantity: 1,
              merchandiseId: firstVariant.id,
            },
          ]}
          variant="secondary"
          className="mt-2"
          analytics={{
            products: [productAnalytics],
            totalValue: parseFloat(productAnalytics.price),
          }}
        >
          <span className="flex items-center justify-center gap-2">
            Add to Cart
          </span>
        </AddToCartButton>
      )}
      {quickAdd && !firstVariant.availableForSale && (
        <button variant="secondary" className="mt-2" disabled>
          <span  className="flex items-center justify-center gap-2">
            Sold out
          </span>
        </button>
      )} */}
    </div>
  );
};

export default ProductCard;

function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
