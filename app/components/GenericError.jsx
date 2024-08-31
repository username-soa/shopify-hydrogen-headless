import {Link} from '@remix-run/react';
import {FeaturedSection} from './global/FeaturedSection';

export function GenericError({error}) {
  const heading = `Something’s wrong here.`;
  let description = `We found an error while loading this page.`;

  // TODO hide error in prod?
  if (error) {
    description += `\n${error.message}`;
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return (
    <div className="2xl:container w-full mx-auto sm:py-6 py-4 px-4 sm:px-6 md:px-20 lg:px-32 grid gap-8">
      <header className="grid w-full gap-8 justify-items-star">
        <h1 className="inline-block font-bold">{heading}</h1>
        <p>{description}</p>
        {error?.stack && (
          <pre
            style={{
              padding: '2rem',
              background: 'hsla(10, 50%, 50%, 0.1)',
              color: 'red',
              overflow: 'auto',
              maxWidth: '100%',
            }}
            dangerouslySetInnerHTML={{
              __html: addLinksToStackTrace(error.stack),
            }}
          />
        )}
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

function addLinksToStackTrace(stackTrace) {
  return stackTrace?.replace(
    /^\s*at\s?.*?[(\s]((\/|\w\:).+)\)\n/gim,
    (all, m1) =>
      all.replace(
        m1,
        `<a href="vscode://file${m1}" class="hover:underline">${m1}</a>`,
      ),
  );
}
