import {motion} from 'framer-motion';
import {NavLink} from '@remix-run/react';
import CloseIcon from '../icons/CloseIcon';

const variants = {
  show: {
    y: 0,
    transition: {
      damping: 40,
      type: 'spring',
      stiffness: 300,
      delayChildren: 0.3,
      staggerChildren: 0.2,
      ease: [0, 1.5, 1, 1.5],
    },
  },
  hidden: {
    y: '-100%',
  },
  exit: {
    opacity: 0,
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

const SideMenu = ({links, name, handleClose}) => {
  return (
    <motion.aside
      exit="exit"
      animate="show"
      initial="hidden"
      variants={variants}
      className="fixed inset-0 overflow-hidden flex flex-col bg-black text-white z-[9999] p-4 sm:p-6 md:p-8"
    >
      <header className="flex lg:gap-4 gap-3 justify-start items-center">
        <button
          type="button"
          title="open menu"
          className="flex w-5 h-5"
          onClick={handleClose}
        >
          <CloseIcon className="w-full h-full hover:scale-110 transition-transform" />
        </button>
        <NavLink
          end
          to="/"
          prefetch="intent"
          className="text-xl flex items-center font-bold"
        >
          {name}
        </NavLink>
      </header>
      <nav className="mt-auto">
        <ul className="flex flex-col gap-y-1">
          {links?.items.map((link, index) => {
            return (
              <motion.li variants={childAnimation} key={`header-link-${index}`}>
                <NavLink
                  to={link.to}
                  prefetch="intent"
                  onClick={handleClose}
                  className="opacity-25 text-[3.25rem] uppercase font-normal leading-[1.05] transition-opacity hover:opacity-100"
                >
                  {link.title}
                </NavLink>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default SideMenu;
