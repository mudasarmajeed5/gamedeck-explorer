"use client";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { waveform } from 'ldrs';
if (typeof window !== "undefined") {
    // Ensure this runs only in the browser
    waveform.register();
}
const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // UseEffect for auto-play
    useEffect(() => {
        if (slides.length === 0) return; // Prevent unnecessary effects
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(intervalId);
    }, [slides]);

    // UseEffect for background styling
    useEffect(() => {
        if (slides.length === 0) return; // Prevent unnecessary effects
        document.body.style.backgroundImage = `url(${slides[currentIndex]?.background_image})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundRepeat = '';
        };
    }, [currentIndex, slides]);

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
                    backdropFilter: 'blur(3px)',
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
                <div className="flex items-center justify-center">
                    {slides.map((_, slideIndex) => (
                        <div
                            className={`my-0 mx-[3px] cursor-pointer text-xl ${
                                slideIndex === currentIndex
                                    ? "text-white"
                                    : "text-gray-400"
                            }`}
                            onClick={() => goToSlide(slideIndex)}
                            key={slideIndex}
                        >
                            ●
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ImageSlider;
