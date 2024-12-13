"use client";
import React from 'react';
import Link from 'next/link';
const GameCard = ({ gameData }) => {

  return (
    <>
      <div className="flex hover:cursor-pointer md:w-[280px] md:h-[230px] flex-col bg-white bg-opacity-20 hover:bg-opacity-35 transition-transform transform hover:scale-105 duration-300 p-2 rounded-md marginFix">

        <Link href={`/store/${gameData.id}`}><div className="flex-1">
          <img
            src={gameData.background_image}
            className="object-cover object-center w-full h-full"
            alt=""
          />
        </div>
        </Link>
        <div className='text-sm hover:underline underline-offset-4'>{gameData.name}</div>
        <div className="flex text-sm text-gray-400 justify-between">
          <div>Release {gameData.released}</div>
          <div className='bg-white text-xs bg-opacity-70 rounded-md text-black p-1'>{gameData.rating}/5</div>
        </div>
      </div>
    </>
  );
};

export default GameCard