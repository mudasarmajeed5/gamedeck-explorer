"use client";
import React, { useState, useEffect } from 'react'
import "./favoritesStyles.css";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { FaSpinner } from 'react-icons/fa';
const Favorites = () => {
  const [searchTerm, setsearchTerm] = useState("")
  const [backgroundColor, setbackgroundColor] = useState("#fff");
  const { data: session } = useSession();
  const [fetchingFromDatabase, setFetchingFromDatabase] = useState(false);
  const [favoritesData, setFavoritesData] = useState([]);
  const [searchedData, setsearchedData] = useState([]);
  const updateLocalstorage = (updatedFavoritesArray) => {
    console.log(updatedFavoritesArray);
    localStorage.setItem("favoriteGames", JSON.stringify(updatedFavoritesArray))
  };
  const handleSearch = (e) => {
    let searchTerm = e.target.value.toLowerCase();
    setsearchTerm(searchTerm);
    if (searchTerm === "") {
      setsearchedData(favoritesData);
    }
    const newSearchedArray = favoritesData.filter((game) => game.Name.toLowerCase().includes(searchTerm));
    setsearchedData(newSearchedArray);
  }

  const handleRemoveItem = (item) => {
    const updatedFavoritesArray = favoritesData.filter((game) => game.id !== item.id);
    setFavoritesData(updatedFavoritesArray);
    setsearchedData(updatedFavoritesArray);
    toast.success("Game Removed from List");
    updateLocalstorage(updatedFavoritesArray);
  }
  useEffect(() => {
    const data = localStorage.getItem("favoriteGames");
    if (data) {
      setFavoritesData(JSON.parse(data));
      setsearchedData(JSON.parse(data));
    } else {
      localStorage.setItem("favoriteGames", JSON.stringify([]));
      setFavoritesData([]);
    }
  }, []);
  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    return randomColor;
  };
  useEffect(() => {
    setbackgroundColor(generateRandomColor());
    const interval = setInterval(() => {
      setbackgroundColor(generateRandomColor());
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const fetchFromDatabase = async (email) => {
    if (!session) {
      alert("Not signed In");
      return;
    };
    try {
      setFetchingFromDatabase(true);
      let response = await fetch("/api/updateFavorites", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'email': email,
        }
      })
      const { data } = await response.json();
      setFavoritesData(data);
      setsearchedData(data);
      updateLocalstorage(data);
      setFetchingFromDatabase(false);
    } catch (error) {
      console.log('Error fetching Data: ', error);
    }
  }
  // send to database
  useEffect(() => {
    const sendToDatabase = async () => {
      try {
        if (!session || !session.user || !session.user.email) {
          toast("Sign In to sync your games!")
          console.log('User session or email not found');
          return;
        }

        let response = await fetch("/api/updateFavorites", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'email': session.user.email,
          },
          body: JSON.stringify(favoritesData)
        })
        if (!response.ok) {
          console.log('Error sending request');
        }
      } catch (error) {
        console.log('Error sending request: ', error);
      }
    }
    if (session) {
      sendToDatabase();
    }
  }, [favoritesData])
  return (
    <section className='favorites bg-custom min-h-screen'>
      <div className='setbackgroundColor' style={{ backgroundColor }}></div>
      <div className="orange">
        <h1>Favorites</h1>
      </div>
      <div className='searchtag flex flex-wrap gap-2 items-center justify-between px-4 md:px-10 md:justify-between'>
        <form className='w-4/6' action="" method='get'>
          <input onChange={(e) => handleSearch(e)} value={searchTerm} type="text" className='bg-transparent md:w-full border px-2 py-1 text-white rounded-md' id='search' name='search' placeholder='Search your favorites here' />
        </form>

        <label className='text-white ' htmlFor="sort">Sort</label>
        <div className='sort w-2/6'>
          <select className='px-2 py-1 rounded-md md:ml-2 bg-transparent text-white border' name="sort" id="sort">
            <option className='text-black ' value="Alphabetical">Alphabetical</option>
            <option className='text-black' value="ReleaseDate">Release Date</option>
            <option className='text-black' value="MostRated">Most Rated</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => fetchFromDatabase(session?.user?.email)} className='px-2 py-1 bg-gray-300 hover:bg-transparent rounded-md hover:border-white border-transparent border hover:text-white transition-colors duration-300'>Refresh</button>
          <span className={`text-xl animate-spin text-white ${fetchingFromDatabase ? 'inline' : 'hidden'}`}><FaSpinner /></span>
        </div>
      </div>
      <div className="my-10"></div>
      <div className="renderFavorites w-[100vw] text-white space-y-4 md:w-[85vw]">
        {favoritesData?.length == 0 && <div className='text-lg md:text-2xl min-h-[50vh] gap-5 flex flex-col justify-center items-center'>No Games in Favorites, Browse store <Link className='bg-white text-sm rounded-md px-2 py-1 text-black border hover:text-white hover:border-white hover:bg-transparent' href={"/store"}>Open Store</Link></div>}
        {searchedData && searchedData.map((item, idx) => (

          <div key={idx} className='flex p-3 shadow-xl border border-red-500 shadow-red-950 bg-gray-900 rounded-md bg-opacity-35 m-2 mx-auto w-11/12 md:w-4/5 justify-between'>
            <div className='flex flex-col justify-between gap-2'>
              <span className='font-semibold text-sm md:text-xl text-white'>{item.Name}</span>
              <div className='flex flex-col items-start gap-2'>
                <Link className='text-xs md:text-md bg-white text-black px-2 py-1 rounded-md hover:bg-transparent border border-transparent hover:border-white hover:text-white transition-colors duration-300' href={item.Link}>Open Game In Store</Link>
                <button onClick={() => handleRemoveItem(item)} className='text-xs md:text-md bg-red-600 text-white px-2 py-1 rounded-md hover:bg-transparent border border-transparent hover:border-red-600 transition-colors duration-300'>Remove from Favorites</button>
              </div>
            </div>
            <div><img src={item.image} className='w-[160px] rounded-md md:w-[200px] object-cover object-center h-[100px] md:h-[130px]' alt="" /></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Favorites