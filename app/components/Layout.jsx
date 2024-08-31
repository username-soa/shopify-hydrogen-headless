import Notice from './global/Notice';
import Footer from './global/Footer';
import Header from './global/Header';
import StickySvg from './global/StickySvg';
import {useLocation} from '@remix-run/react';
import ScrollIndicator from './global/ScrollIndicator';

const regex = /^\/news\/.+/;

export function Layout({children = null, layout, isLoggedIn}) {
  const path = useLocation();

  return (
    <>
      {/* this notice will be removed automatically when the set date is reached */}
      <Notice message="Free shipping on orders above 150$" date="2026-09-22" />
      {/* only show the scroll indicato when the user is on the page '/news/....' */}
      {regex.test(path.pathname) && <ScrollIndicator />}
      <Header data={layout} isLoggedIn={isLoggedIn} />
      <div className="relative z-[10] bg-white">
        <main className="min-h-screen">{children}</main>
        <Footer data={layout} />
      </div>
      <StickySvg />
    </>
  );
}
