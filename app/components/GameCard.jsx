"use client";
import React from 'react';
import Link from 'next/link';
const GameCard = ({ gameData }) => {

  return (
    <>
      <div className="flex hover:cursor-pointer w-[280px] md:h-[250px] flex-col bg-white bg-opacity-20 hover:bg-opacity-35 transition-transform justify-between transform hover:scale-105 duration-300 p-2 rounded-md">
        <Link href={`/store/${gameData.id}`}><div className="flex-1">
          <img
            src={gameData.background_image}
            className="object-cover rounded-md object-center w-full h-[160px]"
            alt=""
          />
        </div>
        </Link>
        <div>
          <div className='text-md mt-2 hover:underline underline-offset-4 font-semibold'>{gameData.name}</div>
          <div className="flex text-sm text-gray-400 justify-between">
            <div>Release {gameData.released}</div>
            <div className='bg-white text-xs bg-opacity-70 rounded-md text-black p-1'>{gameData.rating}/5</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard