"use client"
import React, { useState, useEffect } from 'react'
import GameCard from '../components/GameCard'
import { waveform } from 'ldrs';
import { GoSearch } from 'react-icons/go';
import { FaArrowLeft, FaArrowRight, FaArrowUp } from 'react-icons/fa';
if (typeof window !== "undefined") {
    // Ensure this runs only in the browser
    waveform.register();
}
const Store = () => {
    const [gamesData, setGamesData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [searchTerm, setsearchTerm] = useState("")
    const handleResultsChange = (e) => {
        const value = parseInt(e.target.value);
        setPageSize(value);
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
            <div className="w-[90%] flex mx-auto px-3 justify-center md:w-[80%] gap-4 py-1 items-center">
                <input value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} placeholder="Search your Game here!" name="searchGame" className="text-white rounded-xl w-full px-2 py-1 bg-white bg-opacity-10 border-white border-opacity-10  focus:outline-none border" type="text" />
                <button onClick={handleSearch} className="flex gap-2 bg-white bg-opacity-25 px-2 py-1 rounded-md items-center text-white"><span>Search</span><GoSearch /></button>
            </div>
            <div className='m-5'>
                <h1 className='text-2xl font-bold md:text-3xl mx-4'>Explore Games</h1>
                <h2 className='py-2 mx-4 text-xl font-bold'>Search by Filters: </h2>
                <div className="flex md:flex-row py-1 gap-2 flex-wrap items-center justify-center md:justify-between bg-white bg-opacity-80 text-black rounded-md mx-4 my-2">
                    <div className="flex gap-2">
                        <span className='gameTagButtons'>Action</span>
                        <span className='gameTagButtons'>Adventure</span>
                        <span className='gameTagButtons'>Multiplayer</span>
                        <span className='gameTagButtons'>Indie</span>
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
            <div className="flex justify-center md:w-[85vw] items-center text-white py-4">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {gamesData.map((item, idx) => (
                        <GameCard key={idx} gameData={item} />
                    ))}
                </div>
            </div>
            <div className="page mb-10 pb-10 flex gap-2 mx-4 my-3 items-center justify-around">
                <div className="currentPage">
                    Page: {page}
                </div>
                <div className='flex gap-2'>
                    <button disabled={page == 1} onClick={() => setPage(page - 1)} className='flex gap-2 items-center disabled:bg-gray-500 bg-white text-black px-2 py-1'><FaArrowLeft /><span>Previous Page</span></button>
                    <button onClick={() => setPage(page + 1)} className={`flex gap-2 items-center bg-white text-black px-2 py-1`}><span>Next Page</span><FaArrowRight /></button>
                </div>
            </div>
            <FaArrowUp onClick={scrollToTop} className='text-3xl cursor-pointer text-white m-4 fixed bottom-0 right-0 border rounded-full' />
        </section>
    )
}

export default Store