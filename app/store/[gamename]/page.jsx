"use client";
import React, { useState, useEffect } from "react";
import { waveform } from "ldrs";
import GameSlider from "./component/GameSlider";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
const GameName = () => {
  const [favoritesData, setFavoritesData] = useState([]);
  const [currentGameData, setCurrentGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screenShotsData, setscreenShotsData] = useState(null);
  const colors = [
    'bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500',
    'bg-purple-500', 'bg-pink-500', 'bg-teal-500', 'bg-orange-500', 'bg-lime-500'
  ];
  const [addRemoveState, setaddRemoveState] = useState("Add");
  const handleAddtoFavorites = () => {
    const data = {
      id:currentGameData.id,
      Name: currentGameData.name,
      Link: `https://gamedeck-explorer.vercel.app/store/${currentGameData.id}`,
      image: currentGameData.background_image,
    };

    setFavoritesData((prevGameData) => {
      let updatedGamesData;
      let message;
      const isFavorite = prevGameData.some((game) => game.Name === data.Name);
      if (isFavorite) {
        updatedGamesData = prevGameData.filter((game) => game.Name !== data.Name);
        message = "Removed from Favorites";
        setaddRemoveState("Add");
      } else {
        updatedGamesData = [...prevGameData, data];
        message = "Added to Favorites";
        setaddRemoveState("Remove");
      }
      localStorage.setItem("favoriteGames", JSON.stringify(updatedGamesData));
      toast.success(message);
      return updatedGamesData;
    });

  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  useEffect(() => {
    // This will run whenever `currentGameData` is updated
    if (currentGameData && currentGameData.name) {
      const storedFavorites = localStorage.getItem("favoriteGames");
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      const isFavorite = favorites.some((game) => game.Name === currentGameData.name);
      setaddRemoveState(isFavorite ? "Remove" : "Add");
    }
  }, [currentGameData]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      waveform.register();
    }
    const path = window.location.pathname;
    const gameId = path.split("/")[2];

    const fetchById = async () => {
      try {
        const response = await fetch(`/api/games?gameId=${gameId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch game data");
        }
        const result = await response.json();
        setCurrentGameData(result.data);
        let screenshots = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=c542e67aec3a4340908f9de9e86038af`)
        let screenshots_data = await screenshots.json();
        setscreenShotsData(screenshots_data.results.slice(1, 7));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    
    let fetchedData = localStorage.getItem("favoriteGames");
    if (fetchedData) {
      let parsedData = JSON.parse(fetchedData);
      setFavoritesData(parsedData);
    }
    else {
      console.log("Failed to parse favorites from localStorage:");
      setFavoritesData([]);
    }
    fetchById();
  }, []);
  if (loading) {
    return (
      <div className="flex w-[100vw] md:w-[85vw] min-h-screen justify-center items-center">
        <l-waveform
          size="35"
          stroke="3.5"
          speed="1"
          color="white"
        ></l-waveform>
      </div>
    );
  }

  return (
    <section className="min-h-screen w-[100vw] md:w-[85vw] text-white">
      <div className="my-10"><GameSlider sliderData={screenShotsData} /></div>
      <div className="p-5 flex flex-col gap-4">
        <div className="text-2xl flex justify-between font-semibold"><span>{currentGameData.name}</span><span onClick={() => handleAddtoFavorites()} className="flex items-center gap-2 text-[11px] px-2 py-1 bg-blue-600 cursor-pointer"><FaHeart /><span>{addRemoveState} to Favorites</span></span></div>
        <div className="flex justify-between flex-col md:flex-row">
          <div className="w-4/5 mx-auto">Description: {currentGameData.description_raw}</div>
          <div className="flex flex-col justify-center items-end w-[230px] my-5 gap-4">
            {currentGameData && currentGameData.metacritic_platforms.map((item, idx) => (
              <Link key={idx} target="_blank" href={item.url}><span className="px-2 py-1 text-md w-full bg-white text-black" ><span className="font-semibold">{item.platform.name}</span> Score: {item.metascore}</span></Link>
            ))}
            <span className="px-2 py-1 text-md bg-white bg-opacity-70 text-black">Released: {currentGameData.released}</span>
          </div>
        </div>
        <div>
        </div>
        <div>
          {/* Genres */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Genres:</h3>
            <div className="flex flex-wrap">
              {currentGameData.genres.map((genre, idx) => (
                <span key={idx} className="m-2 p-2 bg-white text-black border border-gray-300 rounded-md">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap md:w-3/4">
              {currentGameData.tags.slice(0, 10).map((tag, idx) => (
                <span
                  key={idx}
                  className={`m-2 p-2 text-white rounded-md hover:bg-opacity-100 cursor-pointer bg-opacity-70 ${getRandomColor()}`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>


        {currentGameData && currentGameData.platforms.map((item, idx) => (
          <div key={idx}>
            <p className={`text-xl ${getRandomColor()} text-black inline-block px-2 py-1 hover:bg-opacity-100 cursor-pointer bg-opacity-70 font-semibold`}>{item.platform.name}</p>
            <p>Released At: {item.released_at}</p>
            {item.requirements.minimum && <p><strong>Minimum Requirements:</strong> {item.requirements.minimum}</p>}
            {item.requirements.recommended && <p><strong>Recommended Requirements:</strong> {item.requirements.recommended}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameName;
