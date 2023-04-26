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
    <div className={`${josefinSans.variable} ${cinzel.variable}`}>
      <Component {...pageProps} />;
    </div>
  );
}
