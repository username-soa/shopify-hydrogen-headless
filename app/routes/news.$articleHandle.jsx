import invariant from 'tiny-invariant';
import {json} from '@shopify/remix-oxygen';
import {seoPayload} from '~/lib/seo.server';
import {useLoaderData} from '@remix-run/react';
import {Image, getSeoMeta} from '@shopify/hydrogen';
import {ARTICLE_QUERY} from '~/lib/shopify/queries/blog';

const BLOG_HANDLE = 'journal';

export async function loader({request, params, context}) {
  const {articleHandle} = params;
  const {language, country} = context.storefront.i18n;
  invariant(articleHandle, 'Missing journal handle');

  const {blog} = await context.storefront.query(ARTICLE_QUERY, {
    variables: {blogHandle: BLOG_HANDLE, articleHandle, language},
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  const article = blog.articleByHandle;

  const formattedDate = new Intl.DateTimeFormat(`${language}-${country}`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article?.publishedAt));

  const seo = seoPayload.article({article, url: request.url});

  return json({article, formattedDate, seo});
}

export const meta = ({matches}) => {
  return getSeoMeta(...matches.map((match) => match.data.seo));
};

export default function Article() {
  const {article, formattedDate} = useLoaderData();
  const {title, image, contentHtml, author} = article;

  return (
    <>
      <section className="bg-primary/5 rounded-2xl my-2 overflow-hidden relative md:w-[90%] w-[calc(100%-1rem)] mx-auto h-[calc(100vh_-_80px)]">
        {image && (
          <Image
            data={image}
            sizes="90vw"
            loading="eager"
            className="hover:scale-105 transition-transform object-cover w-full h-full"
          />
        )}
        <div className="flex flex-col gap-6 absolute inset-0 items-center justify-end px-4 pb-16">
          <h1 className="inline-block font-bold md:text-4xl text-3xl max-w-prose-narrow text-center text-white mix-blend-difference">
            {title}
          </h1>
          <span className="rounded-full backdrop-blur-lg bg-blurry py-2 px-4 text-sm text-gray-700">
            {formattedDate} &middot; {author?.name}
          </span>
        </div>
      </section>
      <div
        className="prose md:py-12 py-8 mx-auto px-4"
        dangerouslySetInnerHTML={{__html: contentHtml}}
      />
    </>
  );
}
