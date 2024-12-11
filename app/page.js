"use client";
import ImageSlider from "./components/ImageSlider";
import { useState, useEffect } from "react";
import { FaHeart, FaUser } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import GameCard from "./components/GameCard";
export default function Home() {
  const [fetchedData, setfetchedData] = useState([]);
  const [homeData, setHomeData] = useState([]);
  useEffect(() => {
    const getSliderData = async () => {
      const apiKey = "7630e5ccdda1425fae5bbdcf199a727c";
      let response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&limit=20`)
      if (!response.ok) {
        throw new Error("Failed to fetch Data!");
      }
      const receivedData = await response.json();
      setHomeData(receivedData.results.slice(7,20));
      setfetchedData(receivedData.results.slice(0, 5));
    }
    getSliderData();
  }, [])
  return (
    <>
      <div className="md:w-[85vw] w-full min-h-screen">
        <div className="flex justify-between md:justify-center items-center p-1 gap-2">
          <div className="w-full px-3 md:w-[60%] flex gap-4 py-1 items-center">
            <input placeholder="Search your Game here!" name="searchGame" className="text-white rounded-xl w-full px-2 py-1 bg-transparent border-white border-opacity-10 focus:outline-none border" type="text" />
            <button className="text-xl text-white"><GoSearch /></button>
          </div>
          <div className="hidden md:flex w-[20%] gap-4 justify-center items-center text-xl text-white">
            <FaUser />
            <FaHeart />
          </div>
        </div>
        <div className="bg-opacity-70">
          <div className="slider w-screen h-[30vh] md:h-[70vh] md:w-[60vw] py-2 mx-auto">
            <ImageSlider slides={fetchedData} />
          </div>
        </div>
        <div className="my-5"></div>
        <section>
          <h2 className="text-white text-2xl mx-4">Trending Games</h2>
          <div className="justify-start mx-auto w-4/5 space-x-4 space-y-4 items-center flex flex-wrap text-white">
            {homeData.map((item,idx)=>(
                <GameCard key={idx} gameData={item}/>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
