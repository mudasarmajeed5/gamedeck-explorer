import React from 'react'

const GameCard = ({ gameData }) => {
  return (
    <>
      <div className="flex hover:cursor-pointer w-[280px] h-[220px] flex-col bg-white hover:bg-opacity-25 transition-opacity duration-200 bg-opacity-10 p-2 rounded-md chudao">
        <div className="flex-1">
          <img
            src={gameData.background_image}
            className="object-cover object-center w-full h-full"
            alt=""
          />
        </div>
        <div>{gameData.name}</div>
        <div className="flex text-sm text-gray-400 justify-between">
          <div>Release {gameData.released}</div>
          <div className='bg-white text-xs bg-opacity-70 rounded-md text-black p-1'>{gameData.rating}/5</div>
        </div>
      </div>
    </>
  );
};

export default GameCard