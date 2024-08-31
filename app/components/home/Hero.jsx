import {useEffect} from 'react';
import {Image} from '@shopify/hydrogen';
import AsteriskIcon from '../icons/AsteriskIcon';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from 'framer-motion';

const variants = {
  hidden: {y: '15px', opacity: 0},
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      ease: [0, 1.5, 1, 1.5],
    },
  },
};
const variants_delay = {
  hidden: {y: '10px', opacity: 0},
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      ease: [0, 1.5, 1, 1.5],
      delay: 0.35,
    },
  },
};

const Hero = ({data}) => {
  const {scrollYProgress} = useScroll();
  const divX = useMotionValue(0);
  const divY = useMotionValue(0);
  const rotate = useTransform(scrollYProgress, [0, 0.4], [0, 360]);
  const springRotate = useSpring(rotate, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  useEffect(() => {
    const updateMousePosition = (e) => {
      divX.set((((e.clientX - 100) / window.innerWidth) * 100) / 5);
      divY.set((((e.clientY - 100) / window.innerHeight) * 100) / 5);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className="my-4 py-4 h-[calc(100vh-112px-2rem)] overflow-hidden 2xl:container xl:w-[90%] md-w-[90%] w-[calc(100%-1rem)] mx-auto text-center flex flex-col gap-6">
      <h1 className="break-word md:inline-block font-medium text-dynamic_xl text-wrap md:text-balance leading-[120%] italic">
        SUPPERCOFFEE
      </h1>
      <div className="flex-1 flex items-center">
        <div className="flex-1 flex lg:flex-row flex-col gap-6 items-center justify-around">
          <motion.h2
            animate="show"
            initial="hidden"
            variants={variants}
            className="pt-3 mb-auto max-w-[12ch] xl:text-[3.5rem] text-[2.65rem]  leading-none font-medium lg:text-right text-center"
          >
            Impul<span className="italic font-normal">si</span>one o seu dia,
          </motion.h2>
          <motion.div
            style={{
              translateX: divX,
              translateY: divY,
            }}
            className="md:h-[14rem] md:w-[25rem] w-[95%] aspect-[16/9] max-w-[29rem] relative rounded-2xl overflow-hidden bg-primary/5"
          >
            {/* video if possible, if not an image will do */}
            <Image
              sizes="90vw"
              loading="eager"
              alt="hero image"
              className="object-cover object-center w-full h-full fadeIn cover"
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf"
            />
          </motion.div>
          <motion.h2
            animate="show"
            initial="hidden"
            variants={variants_delay}
            className="pt-3 mb-auto max-w-[13ch] xl:text-[3.5rem] text-[2.65rem]  leading-none font-medium lg:text-left text-center"
          >
            uma xícara <span className="italic font-normal">de</span> cada vez!
          </motion.h2>
        </div>
      </div>
      <div className="flex gap-4 flex-col items-center justify-center">
        <motion.div style={{rotate: springRotate}}>
          <AsteriskIcon />
        </motion.div>
        <p className="text-center font-medium">{data?.description}</p>
      </div>
    </div>
  );
};

export default Hero;
