import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("gameId"); 
    const apiKey = process.env.RAWG_API; 

    if (!gameId) {
        return NextResponse.json(
            { message: "gameId query parameter is required" },
            { status: 400 }
        );
    }

    try {
        // Fetch data from the RAWG API
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);
        if (!response.ok) {
            return NextResponse.json(
                { message: `Failed to fetch data from RAWG API. Status: ${response.status}` },
                { status: response.status }
            );
        }
        const data = await response.json();

        // Return the data
        return NextResponse.json(
            { data, message: "Data fetched successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error.message);
        return NextResponse.json(
            { message: "An error occurred while fetching the game data" },
            { status: 500 }
        );
    }
}
