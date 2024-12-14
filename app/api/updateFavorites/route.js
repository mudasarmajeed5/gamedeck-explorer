import { NextResponse } from "next/server";
import connectDB from "@/app/Database/mongodb";
import User from "@/app/Models/User";
export async function POST(request) {
    const email = request.headers.get('email');

    // Parse the body of the request
    const favoritesData = await request.json();
    console.log(favoritesData);
    try {
        const data = await User.findOneAndUpdate(
            { email },
            { favorites: favoritesData },
        )
        if (!data) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: data }, { status: 200 });
    } catch (error) {
        console.log("Error sending data to database", error);
    }

    return NextResponse.json({ status: 200, message: "Request sent successfully!" });
}
