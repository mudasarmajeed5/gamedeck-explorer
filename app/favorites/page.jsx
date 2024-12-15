"use client";
import React, { useState, useEffect } from 'react'
import "./favoritesStyles.css";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
const Favorites = () => {
  const { data: session } = useSession();
  const [favoritesData, setFavoritesData] = useState([]);
  const updateLocalstorage = (updatedFavoritesArray) => {
    localStorage.setItem("favoriteGames",JSON.stringify(updatedFavoritesArray))
  }
  
  const handleRemoveItem = (item) => {
    const updatedFavoritesArray = favoritesData.filter((game)=>game.id !== item.id);
    setFavoritesData(updatedFavoritesArray);
    toast.success("Game Removed from List");
    // update local storage of games. 
    updateLocalstorage(updatedFavoritesArray);
  }
  useEffect(() => {
    const data = localStorage.getItem("favoriteGames");
    if (data) {
      setFavoritesData(JSON.parse(data));
    } else {
      setFavoritesData([]);
    }
  }, []);
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
    if (session && favoritesData) {
      sendToDatabase();
    }
  }, [favoritesData])
  // write your 
  // https://ncjw5pj3-3000.euw.devtunnels.ms/favorites   || open this link to view your page.
  // write code here.
  return (
    <section className='favorites'>
      <div className="orange">
        <h1>Favorites</h1>
      </div>
      <div className='searchtag flex justify-between items-center'>
        <form action="" method='get'>
          <input type="text" className='bg-transparent w-full border px-3 py-1  text-white rounded-md m-3' id='search' name='search' placeholder='Search your favorites here' />
        </form>
        <div className='sort'>
        <form action="">
          <label htmlFor="sort">Sort by:</label>
          <select className='bg-transparent text-white border px-4 py-1' name="sort" id="sort">
            <option className='text-black' value="Alphabetical">Alphabetical</option>
            <option className='text-black' value="ReleaseDate">Release Date</option>
            <option className='text-black' value="MostRated">Most Rated</option>
          </select>
        </form>
      </div>
      </div>
      
      <div className="renderFavorites w-[100vw] text-white space-y-4 md:w-[85vw]">
        {favoritesData.length == 0 && <div className='text-2xl min-h-[50vh] gap-5 flex justify-center items-center'>No Games in Favorites, Browse store <Link className='bg-white px-2 py-1 text-black rounded-sm' href={"/store"}>Store</Link></div>}
        {favoritesData && favoritesData.map((item, idx) => (

          <div key={idx} className='flex p-3 shadow-md border border-red-500 shadow-red-950 bg-gray-900 rounded-md bg-opacity-65 m-2 mx-auto md:w-4/5 justify-between'>
            <div className='flex flex-col  gap-2'>
              <span className='font-semibold text-xl text-white'>{item.Name}</span>
              <div className='flex flex-col items-start justify-start gap-4'>
                <Link className='bg-white text-sm text-black px-2 py-1 rounded-md' href={item.Link}>Open Game In Library</Link>
                <button onClick={()=>handleRemoveItem(item)} className='bg-red-600 text-sm text-white px-2 py-1 rounded-md'>Remove from Favorites</button>
              </div>
            </div>
            <div><img src={item.image} className='w-[200px] object-cover object-center h-[130px]' alt="" /></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Favorites