"use client";
import ImageSlider from "./components/ImageSlider";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import GameCard from "./components/GameCard";
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
      <div className="md:w-[85vw] w-full min-h-screen">
        <div className="flex bg-white bg-opacity-10 justify-between md:justify-center items-center p-1 gap-2">
          <div className="text-white text-center w-full font-bold p-2">GameDeck -- Your Favorite Store</div>
          <div className="hidden md:flex w-[20%] gap-4 justify-end items-end text-xl text-white">
          <div className="signIn text-sm border-b-2 bg-gray-600 bg-opacity-35 hover:bg-opacity-55 px-4 py-1 cursor-pointer transition-all flex gap-2 items-center">
            {session ? (
              <>
                <img
                  src={session.user.image}
                  width={30}
                  className="rounded-full"
                  alt="User Profile"
                />
                <Link
                  className="flex flex-col justify-center items-center gap-1"
                  href={`/editprofile/${session.user.email.split("@")[0]}`}
                >
                  Edit Profile
                </Link>
              </>
            ) : (
              <>
                <FaRegUserCircle />
                <Link
                  className="flex flex-col justify-center items-center gap-1"
                  href="/signup"
                >
                  Sign up
                </Link>
              </>
            )}
            </div>
          </div>
        </div>
        <div className="bg-opacity-70">
          <div className="slider w-screen h-[30vh] md:h-[70vh] md:w-[60vw] py-2 mx-auto">
            <ImageSlider slides={fetchedData} />
          </div>
        </div>
        <div className="my-16"></div>
        <section>
          <h2 className="text-white text-2xl mx-4">Trending Games</h2>
          <div className="justify-start mx-auto w-4/5 space-x-4 space-y-4 items-center flex flex-wrap text-white">
            {homeData.map((item, idx) => (
              <GameCard key={idx} gameData={item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
