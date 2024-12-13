"use client";
import React from 'react'
import { usePathname } from 'next/navigation';
const GameName = () => {
    const path = usePathname();
    const game_name = path.split("/")[2];
    console.log(game_name);
    return (
        <div className='min-h-screen text-white'>{game_name}</div>
    )
}

export default GameName