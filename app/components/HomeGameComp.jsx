"use client";

const GameComponent = ({ gameData, reverseLayout }) => {
    const flexDirection = reverseLayout ? 'row-reverse' : 'row';
    return (
        <>
            <hr />
            <section className="text-gray-400 bg-red-700 bg-opacity-35 body-font">
                <div
                    className="container mx-auto px-5 py-24 md:flex game-container"
                    style={{ flexDirection: flexDirection }}
                >
                    <div className="lg:max-w-lg lg:w-full mx-auto md:w-1/2 w-11/12 md:mb-0 mb-10">
                        <img
                            className="object-cover rounded-tr-3xl rounded-bl-3xl object-center shadow-lg shadow-yellow-500 scale-95"
                            alt={gameData.name}
                            src={gameData.background_image}
                        />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                            {gameData.name}
                        </h1>
                        <p className="mb-8 leading-relaxed">{gameData.description_raw || gameData.description}</p>
                        <h3 className="text-lg text-white font-medium">Now Available on Platforms:</h3>
                        {gameData.platforms && gameData.platforms.length > 0 ? (
                            <ul className="list-disc pl-6 text-white">
                                {gameData.platforms.map((platformObj, index) => (
                                    <li key={index}>{platformObj.platform.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-white">No platform information available.</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default GameComponent;
