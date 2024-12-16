import { NextResponse } from "next/server";
import connectDB from "@/app/Database/mongodb";
import User from "@/app/Models/User";
export async function POST(request) {
    await connectDB();
    const email = request.headers.get('email');
    const favoritesData = await request.json();
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
export async function GET(request){
    const email = request.headers.get('email');
    await connectDB();
    try {
        let data = await User.findOne({email:email});
        return NextResponse.json({
            status:200,
            data:data.favorites,
            message:"Data fetched successfully!",
        })
    } catch (error) {
        console.log('Error fetching data',error);
    }
    return NextResponse.json({
        status:400,
        message:"Error fetching data!",
    })
}