"use client";
import ImageSlider from "./components/ImageSlider";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import GameCard from "./components/GameCard";
import MultiImageSlider from "./components/MultiImageSlider";
export default function Home() {
  const { data: session } = useSession();
  const [fetchedData, setfetchedData] = useState([]);
  const [homeData, setHomeData] = useState([]);
  useEffect(() => {
    const getSliderData = async () => {
      const apiKey = "5773afd254c846a699ffc9ec3cb8cedd";
      let response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
      if (!response.ok) {
        throw new Error("Failed to fetch Data!");
      }
      const receivedData = await response.json();
      setHomeData(receivedData.results.slice(7, 22));
      setfetchedData(receivedData.results.slice(0, 5));
    }
    getSliderData();
  }, [])
  return (
    <>
      <div className="min-h-screen">
        <div className="mb-4"></div>
        <div className="w-10/12 mx-auto flex top-2 z-[10] border rounded-xl px-2 bg-gradient-to-r from-white via-blue-500 justify-between md:justify-center items-center p-1 gap-2">
          <div className="text-black text-xl rounded-full w-full font-semibold">Game Deck</div>
          <div className="hidden md:flex min-w-fit gap-4 justify-end items-end text-xl text-black">
            <div className="signIn text-sm bg-gray-200 bg-opacity-15 rounded-xl px-2 py-1 cursor-pointer transition-all flex gap-2 items-center">
              {session ? (
                <>
                  <img
                    src={session.user.image}
                    width={30}
                    className="rounded-full"
                    alt="User Profile"
                  />
                  <Link
                    className="flex flex-col text-white justify-center items-center gap-1"
                    href={`/editprofile/${session.user.email.split("@")[0]}`}
                  >
                    {session.user.name}
                  </Link>
                </>
              ) : (
                <>
                  <FaRegUserCircle />
                  <Link
                    className="flex flex-col justify-center items-center text-white gap-1"
                    href="/signup"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4"></div>
        <div className="bg-opacity-70">
          <div className="slider w-[90vw] h-[30vh] md:h-[70vh] md:w-[60vw] py-2 mx-auto">
            <ImageSlider slides={fetchedData} />
          </div>
        </div>
        <div className="my-16"></div>
        <h2 className="text-white text-2xl mx-4">Trending Games</h2>
        <MultiImageSlider slides={homeData}/>
        <section className="flex justify-center items-center text-white py-4">
          <div className="grid grid-cols-1 w-[100vw] place-items-center md:w-4/5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {homeData.map((item, idx) => (
              <GameCard key={idx} gameData={item} />
            ))}
          </div>
        </section>

      </div>

    </>
  );
}
