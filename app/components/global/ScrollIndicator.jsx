import {motion, useScroll, useSpring} from 'framer-motion';

const ScrollIndicator = () => {
  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{scaleX: scaleX}}
      className="sticky top-0 origin-[0%] bg-gradient-linear-3 h-1 rounded-xl z-[999]"
    />
  );
};

export default ScrollIndicator;
