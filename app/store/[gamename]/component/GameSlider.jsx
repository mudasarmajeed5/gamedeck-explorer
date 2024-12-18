"use client";
import React from 'react'
import Tilt from "react-parallax-tilt"
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { waveform } from 'ldrs';
if (typeof window !== "undefined") {
    // Ensure this runs only in the browser
    waveform.register();
}
const GameSlider = ({ sliderData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (sliderData.length === 0) return;
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => clearInterval(intervalId);
    }, [sliderData]);
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? sliderData.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === sliderData.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };
    const sliderStyles = {
        position: 'relative',
    };

    const rightArrowStyles = {
        position: 'absolute',
        top: '40%',
        transform: 'translate(0,-50%)',
        right: '25px',
        fontSize: '25px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer',
    };

    const leftArrowStyles = {
        position: 'absolute',
        top: '40%',
        transform: 'translate(0,-50%)',
        left: '25px',
        fontSize: '25px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer',
    };

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    backgroundColor: 'rgb(0,0,0,0.4)',
                    height: '100vh',
                    width: '100vw',
                    backdropFilter: 'blur(3px)',
                    zIndex: -5,
                }}
            ></div>
            <div style={sliderStyles}>
                <div style={leftArrowStyles} onClick={goToPrevious}>
                    <FaArrowLeft />
                </div>
                <div
                    style={{ backgroundImage: `url(${sliderData[currentIndex]?.image})` }}
                    className={`slider-container m-auto`}
                ></div>

                <div style={rightArrowStyles} onClick={goToNext}>
                    <FaArrowRight />
                </div>
                <div className="flex flex-wrap gap-2 my-4 items-center justify-center">
                    {sliderData.map((item, slideIndex) => (
                        <div key={slideIndex}>
                            <div
                                className={`my-0 mx-[3px] cursor-pointer text-xl ${slideIndex === currentIndex
                                    ? "border-2 border-white"
                                    : "text-gray-400"
                                    }`}
                                onClick={() => goToSlide(slideIndex)}
                            >
                                <img src={item.image} width={100} height={35} alt="" />
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default GameSlider