import { Image } from '@/components';
import type { CloudinaryResources } from '@/types';

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
          return <Image key={image.asset_id} publicId={image.public_id} />;
        })}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:8888/.netlify/functions/cloudinary`);
  const data: CloudinaryResources = await response.json();

  if (!data) {
    return {
      notFound: true
    };
  }

  return {
    props: { data }
  };
}
