import clsx from 'clsx';
import {twMerge} from 'tailwind-merge';
import {MediaFile} from '@shopify/hydrogen';
import {getMostVisibleDiv} from '~/lib/utils';
import {useEffect, useState, useRef} from 'react';

const ProductMedia = ({data, inView}) => {
  const scrollTimeout = useRef(null);
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        var items = Array.from(
          document.querySelectorAll('.product-image-container'),
        );
        var mostVisibleDiv = getMostVisibleDiv(items);
        setVisible(mostVisibleDiv);
      }, 25);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const typeNameMap = {
    MODEL_3D: 'Model3d',
    VIDEO: 'Video',
    IMAGE: 'MediaImage',
    EXTERNAL_VIDEO: 'ExternalVideo',
  };
  const media = data?.media?.nodes;

  if (!media?.length) {
    return null;
  }

  return (
    <div
      // tabIndex={-1}
      className="md:flex md:flex-col relative md:gap-[.11rem] grid gap-0 grid-flow-col auto-cols-[100%] snap-x snap-mandatory overflow-y-hidden overflow-x-scroll md:overflow-y-auto md:overflow-x-auto customScroll"
    >
      {/* Slides */}
      {media.map((med, index) => {
        let extraProps = {};

        if (med.mediaContentType === 'MODEL_3D') {
          extraProps = {
            interactionPromptThreshold: '0',
            ar: true,
            loading: 'eager',
            disableZoom: true,
            style: {height: '100%', margin: '0 auto'},
          };
        }

        const data = {
          ...med,
          __typename: typeNameMap[med.mediaContentType] || typeNameMap['IMAGE'],
          image: {
            ...med.image,
            altText: med.alt || 'Product image',
          },
        };
        return (
          <div
            key={`product-media-${index}`}
            id={`image-indicator-${index}`}
            className={clsx(
              'flex snap-center aspect-[3/4] bg-primary/5 product-image-container',
              med.mediaContentType === 'IMAGE' && 'pointer-events-none',
            )}
          >
            <MediaFile
              className="relative flex w-full shrink-0 grow-0 select-none object-cover"
              data={data}
              draggable={false}
              key={med.id}
              tabIndex={0}
              mediaOptions={{
                image: {crop: 'center', sizes: '100vw', loading: 'eager'},
              }}
              {...extraProps}
            />
          </div>
        );
      })}
      {/* slides indicators */}
      {media?.length > 1 && (
        <div
          className={twMerge(
            clsx(
              'ml-4 px-2 py-4 bg-white/5 rounded-full backdrop-blur-md  hidden md:flex gap-[.6rem] flex-col items-center justify-center fixed top-[40%]',
              !inView && 'md:hidden',
            ),
          )}
        >
          {media.map((_, index) => {
            return (
              <ScrollLink
                key={`image-indicator-${index}`}
                href={`#image-indicator-${index}`}
              >
                <div
                  className={twMerge(
                    clsx(
                      'h-[3px] w-[15px] rounded-full bg-gray-400 transition-transform',
                      visible === index && 'bg-black scale-150',
                    ),
                  )}
                />
              </ScrollLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductMedia;

const ScrollLink = ({children, href, ...props}) => {
  const handleScroll = () => {
    const offset = 71;

    if (!(typeof window === 'undefined')) {
      const hash = href;

      const startWithHashRegex = /^#\w+/g;
      const targetElement = document?.querySelector(`${hash}`);

      if (!startWithHashRegex.test(hash) || !targetElement) {
        return;
      }

      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      const scroll = () => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      };

      requestAnimationFrame(scroll);
    }
  };
  return (
    <button
      {...props}
      type="button"
      title="scroll to image"
      onClick={handleScroll}
    >
      {children}
    </button>
  );
};
