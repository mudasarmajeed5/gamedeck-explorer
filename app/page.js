"use client";
import ImageSlider from "./components/ImageSlider";
import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import GameCard from "./components/GameCard";
import { TbBlur } from "react-icons/tb";
import MultiImageSlider from "./components/MultiImageSlider";
import GameComponent from "./components/HomeGameComp";
import { CiBrightnessUp } from "react-icons/ci";
export default function Home() {
  const { data: session } = useSession();
  const [blur, setBlur] = useState(0);
  const [backgroundOpacity, setbackgroundOpacity] = useState(0);
  const [fetchedData, setfetchedData] = useState([]);
  const [fetchedData2, setfetchedData2] = useState([]);
  const [homeData, setHomeData] = useState([]);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    const getSliderData = async () => {
      const apiKey = "5773afd254c846a699ffc9ec3cb8cedd";
      let response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
      if (!response.ok) {
        throw new Error("Failed to fetch Data!");
      }
      const receivedData = await response.json();
      setHomeData(receivedData.results.slice(4, 17));
      setfetchedData(receivedData.results.slice(9, 14));
      setfetchedData2(receivedData.results.slice(14, 22));
    }
    getSliderData();
  }, [])
  return (
    <>
      <div className="min-h-screen">
        <div className="mb-4"></div>
        <div className="w-11/12 md:w-10/12 mx-auto flex top-2 z-[10] rounded-xl px-2 bg-white bg-opacity-10 text-white border border-white border-opacity-10 justify-between md:justify-center items-center p-1 gap-2">
          <div className="text-sm md:text-xl rounded-full w-full font-semibold">Game Deck: Your Personal Space</div>
          <div className="flex min-w-fit gap-4 justify-end items-end text-xl">
            <div className="signIn text-sm border border-white rounded-xl px-2 py-1 cursor-pointer transition-all flex gap-2 items-center">
              {session ? (
                <>
                  <div>
                    <Link
                      className="flex text-white justify-center items-center gap-1"
                      href={`/editprofile/${session.user.email.split("@")[0]}`}
                    >
                      <img
                        src={session.user.image}
                        width={30}
                        className="rounded-full"
                        alt="User Profile"
                      />
                      <span className="hidden md:inline">{session.user.name}</span>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <FaRegUserCircle />
                  <Link
                    className="flex flex-col justify-center items-center text-white  gap-1"
                    href="/login"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>


        <div className="mt-4"></div>
        <div className="bg-opacity-70">
          <div className="slider w-[90vw] h-[30vh] md:h-[70vh] md:w-[60vw] py-2 mx-auto">
            <div className="text-white flex items-center flex-col md:flex-row hidden mb-5 gap-2 justify-center">
              <div className="flex justify-center items-center gap-2">
                <TbBlur className="text-white"/>
                <span>Background Blur </span><input onChange={(e) => setBlur(e.target.value)} min={0} defaultValue={blur} max={10} type="range" />
              </div>
              <div className="flex justify-center items-center gap-2">
                <CiBrightnessUp/>
                <span>OverLay Brightness </span><input onChange={(e) => setbackgroundOpacity(e.target.value)} min={0} defaultValue={blur} max={10} type="range" />
              </div>
            </div>
            <ImageSlider slides={fetchedData} blur={blur} backgroundOpacity={backgroundOpacity} />
          </div>
        </div>
        <div className="md:my-8 my-2"></div>
        <section className="text-gray-400 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap">
            <div className="flex w-full mb-10 flex-wrap">
              <h1 className="text-3xl mx-4 font-medium title-font text-white lg:w-1/3 lg:mb-0 mb-4">
                Trending
              </h1>
            </div>
            <div className="flex flex-wrap md:-m-2 -m-1">
              <div className="flex flex-wrap w-1/2">
                {[
                  { index: 0, size: "w-1/2" },
                  { index: 2, size: "w-1/2" },
                  { index: 3, size: "w-full" },
                ].map(({ index, size }) => (
                  <div key={index} className={`md:p-2 p-1 ${size} relative group`}>
                    <a href={`https://gamedeck-explorer.vercel.app/store/${homeData[index]?.id}`}>
                      <img
                        alt="gallery"
                        className="w-full object-cover h-full object-center block"
                        src={homeData[index]?.background_image}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-white text-lg font-bold">{homeData[index]?.name}</span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap w-1/2">
                {[
                  { index: 4, size: "w-full" },
                  { index: 8, size: "w-1/2" },
                  { index: 10, size: "w-1/2" },
                ].map(({ index, size }) => (
                  <div key={index} className={`md:p-2 p-1 ${size} relative group`}>
                    <a href={`https://gamedeck-explorer.vercel.app/store/${homeData[index]?.id}`}>
                      <img
                        alt="gallery"
                        className="w-full object-cover h-full object-center block"
                        src={homeData[index]?.background_image}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg font-bold">{homeData[index]?.name}</span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
        {homeData.length > 0 && <GameComponent gameData={homeData[0]} />}
        {homeData.length > 0 && <GameComponent gameData={homeData[4]} reverseLayout={true} />}
        <div className="my-5"></div>
        <h1 className="text-3xl mx-4 font-medium title-font text-white lg:w-1/3 lg:mb-0 mb-4">
          Hot deals
        </h1>
        <MultiImageSlider slides={fetchedData} />
        <hr />
        <div className="mx-4 text-2xl p-5 text-white">More Games</div>
        <section className="flex justify-center items-center text-white py-4">
          <div className="grid grid-cols-1 w-[100vw] place-items-center md:w-4/5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {fetchedData2.map((item, idx) => (
              <GameCard key={idx} gameData={item} />
            ))}
          </div>
        </section>
        <FaArrowUp onClick={scrollToTop} className='text-3xl cursor-pointer text-white m-4 fixed bottom-0 right-0 hover:scale-105' />
      </div >

    </>
  );
}
