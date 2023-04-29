import { MemoizedImage } from '@/components';
import type { SortedResourcesData } from '@/types';

import type { InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';

export default function Home({ data }: InferGetServerSidePropsType<typeof getStaticProps>) {
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

  const handleScrollToTopClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const toggleVisibilityByScrollHeight = () => {
      const showHeight = 1000;
      const windowScrollAmount = document.body.scrollTop || document.documentElement.scrollTop;

      if (windowScrollAmount > showHeight) {
        setIsScrollToTopVisible(true);
      } else {
        setIsScrollToTopVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibilityByScrollHeight);

    return () => window.removeEventListener('scroll', toggleVisibilityByScrollHeight);
  }, []);

  return (
    <>
      <header className='col-start-2 row-start-2 flex flex-col items-center justify-center'>
        <h1 className='font-sans text-4xl sm:text-6xl uppercase leading-none font-normal 3xl:text-7xl 4xl:text-8xl'>Sylwester91</h1>
        <p className='font-serif text-sm leading-none 3xl:text-lg 4xl:text-xl'>Shots by Sebastian Vuye</p>
      </header>

      <main className='col-start-2 row-start-3 grid gap-5 lg:gap-10'>
        {data.resources.map(image => {
          if (Array.isArray(image)) {
            return (
              <div key={image[0].asset_id} className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10'>
                {image.map(subImage => (
                  <MemoizedImage key={subImage.asset_id} alt={subImage.context?.custom?.alt ?? ''} publicId={subImage.public_id} />
                ))}
              </div>
            );
          }
          return <MemoizedImage key={image.asset_id} alt={image.context?.custom?.alt ?? ''} publicId={image.public_id} />;
        })}
        {isScrollToTopVisible ? (
          <button
            type='button'
            className='fixed -rotate-90 right-12 bottom-12 md:bottom-6 text-white border bg-zinc-700 border-zinc-700 hover:bg-zinc-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-full text-sm p-5 4xl:p-10 text-center inline-flex items-center'
            onClick={handleScrollToTopClick}>
            <svg
              aria-hidden='true'
              className='w-5 h-5 3xl:w-7 3xl:h-7 4xl:w-10 4xl:h-10'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
            {/* TODO */}
            <span className='sr-only'>Icon description</span>
          </button>
        ) : null}
      </main>

      <footer className='col-start-2 row-start-4 flex justify-center items-center'>
        <p className='font-serif text-xs 3xl:text-lg 4xl:text-xl'>&copy; Sebastian Vuye {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.BASE_API_URL}/.netlify/functions/cloudinary`);
  const data: SortedResourcesData = await response.json();

  if (!data) {
    return {
      notFound: true
    };
  }

  return {
    props: { data },
    revalidate: 60
  };
}
