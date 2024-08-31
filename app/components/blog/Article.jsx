import {Link} from '@remix-run/react';

const Article = ({article}) => {
  const publishedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <div className="rounded-xl bg-[#f1f1f1] p-2 w-fit">
      <Link to={`/news/${article.handle}`}>
        <h3 className="font-semibold text-[#222]  hover:opacity-80 transition-opacity">
          {article.title}
        </h3>
        <time
          dateTime={publishedAt}
          className="ml-1 text-[#808080] sm:text-sm text-xs"
        >
          {publishedAt}
        </time>
      </Link>
    </div>
  );
};

export default Article;
