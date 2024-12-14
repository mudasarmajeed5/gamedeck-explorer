"use client";
import React, { useState, useEffect } from 'react'
import "./favoritesStyles.css";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
const Favorites = () => {
  const { data: session } = useSession();
  const [favoritesData, setFavoritesData] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem("favoriteGames");
    let parsedData = JSON.parse(data);
    setFavoritesData(parsedData);
    const sendToDatabase = async () => {
      try {
        if (!session || !session.user || !session.user.email) {
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
  }, [session])
  // write your 
  // https://ncjw5pj3-3000.euw.devtunnels.ms/favorites   || open this link to view your page.
  // write code here.
  return (
    <section className='favorites'>
      <div className="orange">
        <h1>Favorites</h1>
      </div>
      <div className='searchtag'>
        <form action="" method='get'>
          <input type="text" id='search' name='search' placeholder='Search your favorites here' />
        </form>
      </div>
      <div className='sort'>
        <form action="">
          <label htmlFor="sort">Sort by:</label>
          <select name="sort" id="sort">
            <option value="Alphabetical">Alphabetical</option>
            <option value="ReleaseDate">Release Date</option>
            <option value="MostRated">Most Rated</option>
          </select>
        </form>
      </div>
      <div className='boxes'>

      </div>
      <div className="renderFavorites w-[100vw] md:w-[85vw]">
        {favoritesData.map((item, idx) => (

          /* Style this div using classes. */
          // yeh jo mny zyada sei classes dei hn remove krden! write your own code here. give it a class name and write css! also use display:flex; property, to create this card.
          <div key={idx} className='flex bg-gray-900 m-2 md:w-3/5 justify-between'>
            <div className='flex flex-col  gap-2'>
              <span className='font-semibold text-white'>{item.Name}</span>
              <span className='bg-white text-black px-2 py-1 rounded-md'><Link href={item.Link}>Open In Library</Link></span>
            </div>
            <div><img src={item.image} className='w-[200px] object-cover object-center h-[130px]' alt="" /></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Favorites