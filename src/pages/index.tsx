import { Image } from "@/components";

export default function Home() {
  return (
    <>
      <header className="col-start-2 row-start-2 flex flex-col items-center justify-center">
        <h1 className="font-sans text-6xl uppercase leading-none font-normal">
          Sylwester91
        </h1>
        <p className="font-serif text-sm leading-none">
          Shots by Sebastian Vuye
        </p>
      </header>

      <main className="col-start-2 row-start-3">
        <Image publicId="placeholder_tpimwl" />
        <Image publicId="placeholder2_dinmx7" />
      </main>
    </>
  );
}
