import {Link} from '@remix-run/react';
import {FeaturedSection} from './global/FeaturedSection';

export function NotFound({type = 'page'}) {
  const heading = `Sorry, the page you are looking for does not exist.`;
  const description = `We couldn’t find the Page you’re looking for. Try checking the URL or heading back to the home page.`;

  return (
    <div className="2xl:container w-full mx-auto sm:py-6 py-4 px-4 sm:px-6 md:px-20 lg:px-32 grid gap-8">
      <header className="grid w-full gap-8 justify-items-star">
        <h1 className="inline-block font-bold">{heading}</h1>
        <p>{description}</p>
        <Link
          className="rounded-md py-2 px-5 bg-primary text-white mx-auto transition-opacity hover:opacity-80"
          to={'/'}
        >
          Take me to the home page
        </Link>
      </header>
      <FeaturedSection />
    </div>
  );
}
