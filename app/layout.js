import Navigation from "./components/Navigation";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'sonner';
import SessionWrapper from "./components/SessionWrapper";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "GameDeck Explorer",
  description: "A platform where users can search their favorite games, add them to wishlist and purchase them.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} md:flex-row flex-col flex-wrap-reverse md:flex-nowrap bg-black flex antialiased`}
      >
        <SessionWrapper>
          <Navigation />
          <Toaster/>
          <div className="md:w-[85vw] w-full">
            {children}
          </div>
          <div className="my-10"></div>
        </SessionWrapper>
      </body>
    </html>
  );
}
