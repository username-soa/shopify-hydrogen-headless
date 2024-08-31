import {
  Pagination,
  getSeoMeta,
  flattenConnection,
  getPaginationVariables,
} from '@shopify/hydrogen';
import {json} from '@shopify/remix-oxygen';
import {seoPayload} from '~/lib/seo.server';
import {useLoaderData} from '@remix-run/react';
import Article from '~/components/blog/Article';
import {BLOG_BY_HANDLE_QUERY} from '~/lib/shopify/queries/blog';
import PaginationButton from '~/components/ui/PaginationButton';

const BLOG_HANDLE = 'journal';

export async function loader({request, context: {storefront}}) {
  const {language, country} = storefront.i18n;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });
  const {blog} = await storefront.query(BLOG_BY_HANDLE_QUERY, {
    variables: {
      blogHandle: BLOG_HANDLE,
      ...paginationVariables,
      language,
    },
  });
  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  const articles = flattenConnection(blog.articles).map((article) => {
    const {publishedAt} = article;
    return {
      ...article,
      publishedAt: new Intl.DateTimeFormat(`${language}-${country}`, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(publishedAt)),
    };
  });
  blog.articles.nodes = articles;
  const seo = seoPayload.blog({blog, url: request.url});

  return json({articles: blog.articles, seo});
}

export const meta = ({matches}) => {
  return getSeoMeta(...matches.map((match) => match.data.seo));
};

export default function Blog() {
  const {articles} = useLoaderData();

  return (
    <div className="2xl:container w-full mx-auto sm:py-6 py-4 px-4 sm:px-6 md:px-20 lg:px-32 grid gap-4">
      <header className="border-b border-gray-200 py-6 grid md:gap-14 gap-10 text-center">
        <h1 className="inline-block font-bold lg:text-6xl md:text-[calc(-4rem+12.5vw)] text-3xl max-w-prose-narrow">
          LATEST NEWS & PRESS
        </h1>
        <div className="flex justify-between items-center gap-4 text-sm font-semibold">
          <div>Recent Posts</div>
          <div className="md:flex hidden">(©{new Date().getFullYear()})</div>
          <div>Scroll Down</div>
        </div>
      </header>
      <div className="grid gap-5 sm:w-[560px] w-[100%] py-6 mx-auto">
        <Pagination connection={articles}>
          {({
            nodes,
            state,
            NextLink,
            isLoading,
            nextPageUrl,
            hasNextPage,
            PreviousLink,
            previousPageUrl,
            hasPreviousPage,
          }) => {
            return (
              <>
                {hasPreviousPage && (
                  <PaginationButton
                    state={state}
                    preventScrollReset
                    to={previousPageUrl}
                    isLoading={isLoading}
                  >
                    Load more
                  </PaginationButton>
                )}
                {nodes.map((article, index) => {
                  return <Article article={article} key={`article-${index}`} />;
                })}
                {hasNextPage && (
                  <PaginationButton
                    state={state}
                    to={nextPageUrl}
                    preventScrollReset
                    isLoading={isLoading}
                  >
                    Load more
                  </PaginationButton>
                )}
              </>
            );
          }}
        </Pagination>
      </div>
    </div>
  );
}
