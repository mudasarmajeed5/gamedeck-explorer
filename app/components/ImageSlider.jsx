"use client";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Tilt from 'react-parallax-tilt';
import { waveform } from 'ldrs';
if (typeof window !== "undefined") {
    // Ensure this runs only in the browser
    waveform.register();
}
const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (slides.length === 0) return;
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(intervalId);
    }, [slides]);
    if (slides.length === 0) {
        return (
            <div className="flex min-h-screen justify-center items-center">
                <l-waveform
                    size="35"
                    stroke="3.5"
                    speed="1"
                    color="white"
                ></l-waveform>
            </div>
        );
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const slideStyles = {
        backgroundImage: `url(${slides[currentIndex]?.background_image})`,
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        borderRadius: '10px',
        backgroundSize: 'cover',
        display: 'flex',
        transition: 'all 0.5s ease-in-out',
    };

    const sliderStyles = {
        height: '100%',
        position: 'relative',
    };

    const rightArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0,-50%)',
        right: '15px',
        fontSize: '25px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer',
    };

    const leftArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0,-50%)',
        left: '15px',
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
                    backdropFilter: 'blur(0px)',
                    zIndex: -5,
                }}
            ></div>
            <div style={sliderStyles}>
                <div style={leftArrowStyles} onClick={goToPrevious}>
                    <FaArrowLeft />
                </div>
                <div style={slideStyles}></div>
                <div style={rightArrowStyles} onClick={goToNext}>
                    <FaArrowRight />
                </div>
                <div className="absolute w-full text-black bottom-0 flex items-center justify-between">
                    <div className="bg-yellow-400 font-bold text-black hover:bg-black cursor-pointer hover:text-white transition-colors duration-300 bg-opacity-85 px-2 py-1">{slides[currentIndex].name}</div>
                    <div className="flex justify-start items-end flex-col gap-2">
                    <div className="bg-black text-white px-2 py-1">Tags</div>
                    <div className="flex justify-end gap-2 flex-wrap">
                        {slides[currentIndex]?.tags.slice(5, 8).map((tag, index) => (
                            <span key={index} className="bg-white bg-opacity-60 cursor-pointer hover:bg-opacity-100 text-black text-xs px-2 py-1">
                                {tag.name}
                            </span>
                        ))}
                    </div>
                    </div>


                </div>
                <div className="flex my-4 items-center justify-center">
                    {slides.map((item, slideIndex) => (
                        <div key={slideIndex}>
                            <div
                                className={`my-0 mx-[3px] cursor-pointer text-xl ${slideIndex === currentIndex
                                    ? "border-2 border-white"
                                    : "text-gray-400"
                                    }`}
                                onClick={() => goToSlide(slideIndex)}
                            >
                                <img src={item.background_image} width={100} height={35} alt="" />
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    );
};

export default ImageSlider;
