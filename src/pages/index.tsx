import { Image } from '@/components';
import type { CloudinaryResourcesByTagResponseDTO } from '@/types';

import type { InferGetServerSidePropsType } from 'next';

export default function Home({ data }: InferGetServerSidePropsType<typeof getStaticProps>) {
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
              <div className='flex'>
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

export async function getStaticProps() {
  const response = await fetch(`http://localhost:8888/.netlify/functions/cloudinary`);
  const data = await response.json();

  if (!data) {
    return {
      notFound: true
    };
  }

  return {
    props: { data }
  };
}
