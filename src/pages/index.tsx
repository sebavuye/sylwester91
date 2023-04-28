import { Image } from '@/components';
import type { SortedResourcesData } from '@/types';

import type { InferGetServerSidePropsType } from 'next';

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <header className='col-start-2 row-start-2 flex flex-col items-center justify-center'>
        <h1 className='font-sans text-6xl uppercase leading-none font-normal'>Sylwester91</h1>
        <p className='font-serif text-sm leading-none'>Shots by Sebastian Vuye</p>
      </header>

      <main className='col-start-2 row-start-3'>
        {data.resources.map(image => {
          if (Array.isArray(image)) {
            return (
              <div key={image[0].asset_id} className='flex'>
                {image.map(subImage => (
                  <Image key={subImage.asset_id} alt={subImage.context?.custom?.alt ?? ''} publicId={subImage.public_id} />
                ))}
              </div>
            );
          }
          return <Image key={image.asset_id} alt={image.context?.custom?.alt ?? ''} publicId={image.public_id} />;
        })}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.BASE_API_URL}/.netlify/functions/cloudinary`);
  const data: SortedResourcesData = await response.json();

  if (!data) {
    return {
      notFound: true
    };
  }

  return {
    props: { data }
  };
}
