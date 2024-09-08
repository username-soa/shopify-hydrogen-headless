import Container from '../ui/Container';
import {NavLink} from '@remix-run/react';
import LogoIcon from '../icons/LogoIcon';
import VisaIcon from '../icons/VisaIcon';
import PayPalIcon from '../icons/PayPalIcon';
import ApplePayIcon from '../icons/ApplePayIcon';
import AMExpressIcon from '../icons/AMExpressIcon';
import GooglePayIcon from '../icons/GooglePayIcon';
import MastercardIcon from '../icons/MastercardIcon';

const Footer = ({data}) => {
  const {shop, footerMenu} = data;
  // console.log(footerMenu);
  return (
    <Container
      as="footer"
      className="text-sm text-[#565656] flex flex-col md:gap-6 gap-4 md:py-6 py-4"
    >
      <div className="border-b border-l border-gray-200 grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[400px_1fr] gap-8 md:p-6 p-4">
        <div className="flex flex-col gap-3">
          <NavLink
            prefetch="intent"
            to="/"
            className="font-bold transition-opacity hover:opacity-80"
          >
            <h2 className="md:text-3xl text-xl text-black">{shop.name}</h2>
          </NavLink>
          <p className="text-sm leading-relaxed">{shop.description}</p>
        </div>
        <div className="flex w-full flex-wrap justify-between gap-5 md:w-[unset] md:flex-[0_1_623px]">
          <div className="min-w-[110px]">
            <div className="text-xs">Products</div>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-black">
              {footerMenu?.items.map((link, index) => {
                return (
                  <li key={`footer-link-${index}`}>
                    <NavLink
                      prefetch="intent"
                      to={link.to}
                      className="transition-opacity hover:opacity-80"
                    >
                      {link.title}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="min-w-[110px]">
            <div className="text-xs">Company</div>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-black">
              {footerMenu?.items.map((link, index) => {
                return (
                  <li key={`footer-link-${index}`}>
                    <NavLink
                      to={link.to}
                      prefetch="intent"
                      className="transition-opacity hover:opacity-80"
                    >
                      {link.title}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="min-w-[110px]">
            <div className="text-xs">Social</div>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-black">
              <li>
                <a
                  href="https://www.x.com"
                  target={'_blank'}
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  target={'_blank'}
                  href="https://www.instagram.com"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  target={'_blank'}
                  href="https://www.facebook.com"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="md:p-6 p-4 border-l border-r border-gray-200 flex gap-4 md:flex-row flex-col-reverse items-center justify-between">
        <p>
          ©{new Date().getFullYear()} {shop.name}. all rights reserved
        </p>
        <ul className="flex grayscale sm:gap-3 gap-2 items-center justify-center">
          <li>
            <AMExpressIcon />
          </li>
          <li>
            <ApplePayIcon />
          </li>
          <li>
            <GooglePayIcon />
          </li>
          <li>
            <MastercardIcon />
          </li>
          <li>
            <PayPalIcon />
          </li>
          <li>
            <VisaIcon />
          </li>
        </ul>
      </div>
    </Container>
  );
};
export default Footer;
