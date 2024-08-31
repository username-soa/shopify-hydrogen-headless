import invariant from 'tiny-invariant';
import {json} from '@shopify/remix-oxygen';
import {seoPayload} from '~/lib/seo.server';
import {getSeoMeta} from '@shopify/hydrogen';
import {NavLink, useLoaderData} from '@remix-run/react';
import ScrollIndicator from '~/components/global/ScrollIndicator';
import {POLICY_CONTENT_QUERY} from '~/lib/shopify/queries/policy';

export async function loader({request, params, context}) {
  invariant(params.handle, 'Missing policy handle');

  const policyName = params.handle.replace(/-([a-z])/g, (_, m1) =>
    m1.toUpperCase(),
  );

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n?.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');
  const policy = data.shop?.[policyName];

  if (!policy) {
    throw new Response('Could not find the policy', {status: 404});
  }

  const seo = seoPayload.policy({policy, url: request.url});

  return json({policy, seo});
}

export const meta = ({matches}) => {
  return getSeoMeta(...matches.map((match) => match.data.seo));
};

const links = [
  {
    title: 'Privacy Policy',
    to: '/policies/privacy-policy',
  },
  {
    title: 'Terms Of Service',
    to: '/policies/terms-of-service',
  },
  {
    title: 'Refund Policy',
    to: '/policies/refund-policy',
  },
  {
    title: 'Shipping Policy',
    to: '/policies/shipping-policy',
  },
];

export default function Policy() {
  const {policy} = useLoaderData();

  return (
    <>
      <ScrollIndicator />
      <div className="2xl:container w-full mx-auto sm:py-6 py-4 px-4 sm:px-6 md:px-20 lg:px-32 md:gap-10 flex flex-col-reverse md:grid md:grid-cols-9">
        <div className="md:py-20 py-6  text-[#222] md:sticky md:top-10 md:h-screen col-span-3">
          <h4 className="mb-6">Policies</h4>
          <ul className="grid md:grid-cols-1 xs:grid-cols-2 :grid-cols-1 md:gap-2 gap-4">
            {links.map((link, index) => {
              return (
                <li key={`policy-link-${index}`}>
                  <NavLink
                    to={link.to}
                    prefetch="intent"
                    className={({isActive}) =>
                      isActive
                        ? 'flex items-center gap-2'
                        : 'opacity-70 hover:opacity-100 transition-all flex items-center gap-2'
                    }
                  >
                    {({isActive}) => {
                      return isActive ? (
                        <>
                          <span className="w-4 h-4 inline-flex text-black">
                            <ArrowSVG />
                          </span>
                          <span>{link.title}</span>
                        </>
                      ) : (
                        <span>{link.title}</span>
                      );
                    }}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="py-6 col-span-6">
          <h1 className="lg:text-6xl md:text-[calc(-4rem+12.5vw)] text-3xl leading-normal  pb-6 mb-6 md:pb-10 md:mb-10 border-b border-gray-200">
            {policy.title}
          </h1>
          <div
            className="prose"
            dangerouslySetInnerHTML={{__html: policy.body}}
          />
        </div>
      </div>
    </>
  );
}

const ArrowSVG = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.73242 3.00586H4.85742V9.56242H4.10742C3.90032 9.56242 3.73242 9.39452 3.73242 9.18742V3.00586Z"
        fill="currentColor"
      ></path>
      <path
        d="M14.1914 10.6875L14.1914 9.5625L4.85751 9.5625L4.85751 10.3125C4.85751 10.5196 5.0254 10.6875 5.23251 10.6875L14.1914 10.6875Z"
        fill="currentColor"
      ></path>
      <mask
        id="mask0_459_6095"
        maskUnits="userSpaceOnUse"
        x="9"
        y="5"
        width="6"
        height="10"
        style={{maskType: 'alpha'}}
      >
        <rect
          x="9.72461"
          y="5.91504"
          width="5.26172"
          height="8.41943"
          fill="currentColor"
        ></rect>
      </mask>
      <g mask="url(#mask0_459_6095)">
        <path
          d="M14.5352 10.1436L11.1602 13.5186"
          stroke="currentColor"
          strokeWidth="1.125"
          strokeLinecap="square"
          strokeLinejoin="bevel"
        ></path>
        <path
          d="M11.1602 6.76855L14.5352 10.1436"
          stroke="currentColor"
          strokeWidth="1.125"
          strokeLinecap="square"
          strokeLinejoin="bevel"
        ></path>
      </g>
    </svg>
  );
};
