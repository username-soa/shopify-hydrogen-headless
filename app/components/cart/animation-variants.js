const variants = {
  show: {
    x: 0,
    transition: {
      type: 'spring',
      ease: [0, 1.5, 1, 1.5],
      stiffness: 300,
      damping: 30,
      delay: 0.15,
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
  hidden: {
    x: '100%',
  },
  exit: {
    opacity: 0,
  },
};
const checkoutAnimation = {
  hidden: {y: '15px', opacity: 0},
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      ease: [0, 1.5, 1, 1.5],
      delay: 0.4,
    },
  },
};
const childAnimation = {
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
  exit: {opacity: 0},
};
const backgroundAnimation = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
  },
  exit: {opacity: 0, transition: {delay: 0.1, type: 'Inertia'}},
};

export {variants, childAnimation, checkoutAnimation, backgroundAnimation};
