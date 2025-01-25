import connectDB from "@/app/Database/mongodb";
import User from "@/app/Models/User";
import { NextResponse } from "next/server";
export async function POST(request){
    await connectDB()
    try {
        const body = await request.json();
        const { profilePic, email, name } = body;
        const updateProfile = await User.findOneAndUpdate(
            {email},
            {profilePic,name},
            { new: true },
            
        )
        console.log(updateProfile);
        return NextResponse.json({message:"Profile Picture received",status:200,
            data:{
                updatedImgUrl:profilePic,
                updatedName:name,
            }
        })
    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({message:"Profile Picture received",status:200})
}
export async function GET(request){
    await connectDB();
    try {
        const email = request.headers.get('email');
        if(!email){
            return NextResponse.json({message:"Email is not Provided."});
        }
        const getProfile = await User.findOne({email});
        if(!getProfile){
            return NextResponse.json({message:"Profile not found!",status:404});
        }
        return NextResponse.json({data:getProfile,message:"Profile Found",status:200});
    } catch (error) {
        console.error(error);
    }
}
export async function DELETE(request){
    await connectDB();
    try {
        const email = request.headers.get('email');
        const user = await User.findOneAndDelete({email});
        if(!user){
            return NextResponse.json({message:'User not found',status:404});
        }
    } catch (error) {
        console.error(error)
    }
    return NextResponse.json({message:"Profile Deleted",status:200})
}