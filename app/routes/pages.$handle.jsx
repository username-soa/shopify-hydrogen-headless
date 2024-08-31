import invariant from 'tiny-invariant';
import {json} from '@shopify/remix-oxygen';
import {getSeoMeta} from '@shopify/hydrogen';
import {useLoaderData} from '@remix-run/react';

export async function loader({request, params, context}) {
  invariant(params.handle, 'Missing page handle');

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
      language: context.storefront.i18n.language,
    },
  });

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  const seo = seoPayload.page({page, url: request.url});

  return json({page, seo});
}

export const meta = ({matches}) => {
  return getSeoMeta(...matches.map((match) => match.data.seo));
};

export default function Page() {
  const {page} = useLoaderData();

  return (
    <div className="page">
      <header>
        <h1>{page.title}</h1>
      </header>
      <main dangerouslySetInnerHTML={{__html: page.body}} />
    </div>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
