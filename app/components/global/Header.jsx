import Portal from './Portal';
import Cart from '../cart/Cart';
import Badge from '../cart/Badge';
import SideMenu from './SideMenu';
import {useRootLoaderData} from '~/root';
import MenuIcon from '../icons/MenuIcon';
import {CartForm} from '@shopify/hydrogen';
import SearchIcon from '../icons/SearchIcon';
import {AnimatePresence} from 'framer-motion';
import {NavLink, Await} from '@remix-run/react';
import {CartLoading} from '../cart/CartLoading';
import {useState, useEffect, Suspense} from 'react';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import useBodyLockScroll from '~/hooks/useBodyLockScroll';
import PredictiveSearch from '../search/PredictiveSearch';

const Header = ({data, isLoggedIn}) => {
  const {shop, headerMenu} = data;
  const rootData = useRootLoaderData();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);
  const openCart = () => setIsCartOpen(true);
  useBodyLockScroll(isCartOpen);
  useBodyLockScroll(isMenuOpen);
  useBodyLockScroll(isSearchOpen);

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <header className="sticky top-0 left-0 right-0 z-[999] py-2 2xl:container xl:w-[90%] md-w-[90%] w-[calc(100%-1rem)] mx-auto h-16">
      <nav className="h-full md:px-5 px-3 grid grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr] gap-4 md:text-xl bg-blurry backdrop-blur-lg backdrop-saturate-150 rounded-2xl border border-border-color">
        <ul className="gap-4 lg:flex hidden">
          {headerMenu?.items.map((link, index) => {
            return (
              <li key={`header-link-${index}`} className="flex items-center">
                <NavLink
                  to={link.to}
                  prefetch="intent"
                  className="lg:text-base text-sm font-medium text-[#11171a] hover:opacity-80 transition-opacity"
                >
                  {link.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="flex lg:gap-4 gap-3 justify-start items-center z-[99999]">
          <button
            type="button"
            title="open menu"
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden flex w-5 h-5"
          >
            <MenuIcon className="w-full h-full" />
          </button>
          <NavLink
            prefetch="intent"
            to="/"
            end
            className="md:text-xl text-base flex items-center font-bold"
          >
            {shop.name}
          </NavLink>
        </div>
        <div className="flex lg:gap-4 gap-3 justify-end items-center">
          <button
            type="button"
            title="open search"
            className="w-5 h-5"
            onClick={() => setIsSearchOpen(true)}
          >
            <SearchIcon />
          </button>
          <Suspense fallback={<Badge count={0} openCart={openCart} />}>
            <Await resolve={rootData?.cart}>
              {(cart) => (
                <Badge openCart={openCart} count={cart?.totalQuantity || 0} />
              )}
            </Await>
          </Suspense>
        </div>
      </nav>
      <AnimatePresence mode="wait">
        <Portal>
          {isCartOpen && (
            <Suspense fallback={<CartLoading />}>
              <Await resolve={rootData?.cart}>
                {(cart) => (
                  <Cart
                    cart={cart}
                    show={isCartOpen}
                    handleClose={() => setIsCartOpen(false)}
                  />
                )}
              </Await>
            </Suspense>
          )}
        </Portal>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <Portal>
          {isSearchOpen && (
            <PredictiveSearch
              store_name={shop?.name}
              handleClose={() => setIsSearchOpen(false)}
            />
          )}
        </Portal>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <Portal>
          {isMenuOpen && (
            <SideMenu
              name={shop.name}
              links={headerMenu}
              handleClose={() => setIsMenuOpen(false)}
            />
          )}
        </Portal>
      </AnimatePresence>
    </header>
  );
};
export default Header;
