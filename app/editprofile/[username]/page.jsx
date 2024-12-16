"use client";
import { useSession } from "next-auth/react";
import "./editprofile.css";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { waveform } from "ldrs";
if (typeof window !== "undefined") {
  waveform.register();
}
const UpdateProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [Imgurl, setImgurl] = useState("");
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/');
    }
  }, [status,router]);
  if (status === "loading") {
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
    <>
      <div className='text-white min-h-screen'>
        <div className="img w-full h-full">
          <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4bdd888b-fe5c-4358-8c46-5362c7ce3154/dehn7hz-56d75669-c27f-4d2b-8e30-91dc2c542e4c.jpg/v1/fill/w_1280,h_720,q_75,strp/cool_gaming_background_4k_by_skullbreaker000_dehn7hz-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvNGJkZDg4OGItZmU1Yy00MzU4LThjNDYtNTM2MmM3Y2UzMTU0XC9kZWhuN2h6LTU2ZDc1NjY5LWMyN2YtNGQyYi04ZTMwLTkxZGMyYzU0MmU0Yy5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.oV9fk5Nb0ps6-6_Omk6AfhkNvdqDyQRvV_hLyys1S6Q" className="absolute -z-10 w-[100vw] md:w-[85vw] h-full object-cover object-center" alt="" />
        </div>
        <div className="container bg-black bg-opacity-80 h-screen flex gap-8 justify-center items-center">
          <div className="left">
            <span className="text-2xl font-semibold font-mono">Name: {session?.user?.name}</span>
            <div className="font-mono text-lg">Email: {session?.user?.email}</div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="text-sm">Update Profile Picture</div>
              <input className="bg-transparent border px-2 py-1 rounded-md" placeholder="Enter New Profile Link" type="text" onChange={(e) => setImgurl(e.target.value)} value={Imgurl} />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="text-sm">Update Username</div>
              <input className="bg-transparent border px-2 py-1 rounded-md" placeholder="Enter a username" type="text" onChange={(e) => setImgurl(e.target.value)} value={Imgurl} />
            </div>
            <button className="px-2 py-1 rounded-md mt-2 bg-blue-700">Update Profile</button>
          </div>
          <div className="right flex items-center flex-col gap-4">
            <img className="border-2 border-white rounded-full" width={150} height={150} src={session?.user.image || ''} alt={session?.user?.name} />
            <div className="flex gap-4">
            <button className="px-2 py-1 rounded-md bg-red-700">Delete Account</button>
            <button className="px-2 py-1 text-black rounded-md bg-white">Logout</button>
            </div>
            <div><button className="px-2 py-1 rounded-md bg-red-600 text-white">Delete Favorites</button></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile