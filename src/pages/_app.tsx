import "@/styles/globals.css";
import { Cinzel, Josefin_Sans } from "next/font/google";
import type { AppProps } from "next/app";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${josefinSans.variable} ${cinzel.variable} grid gap-y-12 grid-cols-[20%_60%_20%]`}
    >
      <Component {...pageProps} />;
    </div>
  );
}
