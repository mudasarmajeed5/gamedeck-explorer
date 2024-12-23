"use client"
import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import {motion} from "framer-motion";
import { waveform } from 'ldrs';
import { toast } from 'sonner';
import { GoSearch } from 'react-icons/go';
import { FaArrowLeft, FaArrowRight, FaArrowUp } from 'react-icons/fa';
import Tilt from "react-parallax-tilt";
if (typeof window !== "undefined") {
    waveform.register();
}
const Store = () => {
    const [enableCardTilt, setenableCardTilt] = useState(false);
    const [gamesData, setGamesData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [searchTerm, setsearchTerm] = useState("");
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25, 
            },
        },
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 20 }, 
        show: { opacity: 1, y: 0 }, 
    };
    const handleResultsChange = (e) => {
        const value = parseInt(e.target.value);
        setPageSize(value);
    }
    const toggleTiltAnimation = () => {
        setenableCardTilt((prevState) => !prevState);
        if (!enableCardTilt) {
            toast("Hover on a Card!");
        }
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }
    const fetchGames = async () => {
        const apiKey = "5773afd254c846a699ffc9ec3cb8cedd";
        let url = `https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=${pageSize}`;
        if (searchTerm.trim()) {
            url += `&search=${encodeURIComponent(searchTerm)}`;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch data!");
            }
            const receivedData = await response.json();
            setGamesData(receivedData.results);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchGames();
    }, [page, pageSize]);

    const handleSearch = () => {
        setPage(1);
        fetchGames();
    };
    useEffect(() => {
        const getSliderData = async () => {
            const apiKey = "5773afd254c846a699ffc9ec3cb8cedd"
            let url = `https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=${pageSize}`;
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch Data!");
            }
            const receivedData = await response.json();
            setGamesData(receivedData.results);
            console.log(receivedData.results.length);
        }
        getSliderData();
    }, [page, pageSize])
    if (gamesData.length === 0) {
        return (
            <div className="flex w-[100vw] md:w-[85vw] h-screen justify-center items-center">
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
        <section className='min-h-screen relative text-white'>
            <div className="w-[90%] flex mt-5 mx-auto px-3 gap-4 py-1 items-center">
                <input value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} placeholder="Explore Games, Search Here!" name="searchGame" className="text-white rounded-xl w-full px-2 py-1 bg-white bg-opacity-10 border-white border-opacity-10  focus:outline-none border" type="text" />
                <button onClick={handleSearch} className="flex gap-2 bg-white border border-transparent bg-opacity-25 hover:bg-black hover:border-white px-2 py-1 rounded-md items-center text-white"><span>Search</span><GoSearch /></button>
            </div>
            <div className='m-5'>
                <h2 className='py-2 mx-4 text-xl font-bold'>Search by Filters: </h2>
                <div className="flex md:flex-row py-1 gap-2 flex-wrap items-center justify-center md:justify-between bg-white bg-opacity-80 text-black rounded-md mx-4 my-2">
                    <div className="flex flex-wrap gap-2">
                        <span className='gameTagButtons'>Action</span>
                        <span className='gameTagButtons'>Adventure</span>
                        <span className='gameTagButtons'>Multiplayer</span>
                        <span className='gameTagButtons'>Indie</span>
                        <label className="inline-flex gap-2 items-center cursor-pointer">
                            <span className="ms-3 text-sm font-medium text-gray-900">
                                Tilt Animations:
                            </span>
                            <input
                                type="checkbox"
                                checked={enableCardTilt}
                                onChange={toggleTiltAnimation}
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

                        </label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <label htmlFor="resultsperpage">Results Per Page</label>
                        <select onChange={handleResultsChange} value={pageSize} name="ResultsPerPage" id="resultsperpage">
                            <option value="6">6 Games</option>
                            <option value="9">9 Games</option>
                            <option value="15">15 Games</option>
                            <option value="20">20 Games</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="flex justify-center md:w-[85vw] items-center text-white py-2">
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden" // Start with hidden state
                    animate="show" // Animate to show state
                >
                    {gamesData.map((item, idx) => (
                        <motion.div key={idx} variants={cardVariants}>
                            <Tilt tiltEnable={enableCardTilt}>
                                <GameCard gameData={item} />
                            </Tilt>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <div className="page mb-10 pb-10 flex gap-2 mx-4 my-3 items-center justify-around">
                <div className="currentPage">
                    Page: {page}
                </div>
                <div className='flex gap-2'>
                    <button disabled={page == 1} onClick={() => setPage(page - 1)} className='flex gap-2 items-center disabled:bg-gray-500 bg-white text-black rounded-md px-2 py-1'><FaArrowLeft /><span>Previous Page</span></button>
                    <button onClick={() => setPage(page + 1)} className={`flex gap-2 items-center bg-white text-black rounded-md px-2 py-1`}><span>Next Page</span><FaArrowRight /></button>
                </div>
            </div>
            <FaArrowUp onClick={scrollToTop} className='text-3xl cursor-pointer text-white m-4 fixed bottom-0 right-0 border rounded-full' />
        </section>
    )
}

export default Store