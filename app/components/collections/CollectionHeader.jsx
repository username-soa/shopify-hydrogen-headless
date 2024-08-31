import {Image} from '@shopify/hydrogen';
import {motion, useSpring, useScroll, useTransform} from 'framer-motion';

const fadeUp = {
  show: {
    opacity: 1,
    transition: {
      type: 'spring',
      ease: [0, 1.5, 1, 1.5],
      stiffness: 300,
      damping: 30,
      delayChildren: 0.1,
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const childAnimations = {
  hidden: {
    y: '15px',
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0, 1.5, 1, 1.5],
      type: 'spring',
      duration: 1.25,
    },
  },
};

const CollectionHeader = ({title, image, description}) => {
  const {scrollY} = useScroll();
  const scale = useTransform(scrollY, [0, 50], [1.01, 1.08]);
  const springScale = useSpring(scale);
  return (
    <motion.div
      animate="show"
      initial="hidden"
      variants={fadeUp}
      className="flex flex-col md:gap-16 gap-6"
    >
      <div className="sm:aspect-[16/9] aspect-[16/12] relative overflow-hidden flex rounded-lg bg-primary/5">
        <motion.div
          style={{
            scale: springScale,
          }}
          className="w-full h-full"
        >
          {image && (
            <Image
              data={image}
              sizes="100vw"
              aspectRatio="16/12"
              alt={image?.altText || title}
              className="hover:scale-105 transition-transform object-cover"
            />
          )}
        </motion.div>
        <div className="absolute top-0 z-20 w-full h-full flex flex-col justify-end items-start text-white pointer-events-none md:p-10 p-5 bg-gradient-linear">
          <motion.h1
            variants={childAnimations}
            className="inline-block font-bold lg:text-6xl md:text-[calc(-4rem+12.5vw)] text-3xl max-w-prose-narrow"
          >
            {title}.
          </motion.h1>
        </div>
      </div>
      <div className="text-center mb-4 font-light md:text-lg text-base">
        <motion.p variants={childAnimations}>{description}</motion.p>
      </div>
    </motion.div>
  );
};

export default CollectionHeader;
