"use client";
import { useSession } from "next-auth/react";
import "./editprofile.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { waveform } from "ldrs";
import { motion } from "motion/react";
import { signOut } from "next-auth/react";
if (typeof window !== "undefined") {
  waveform.register();
}
const UpdateProfile = () => {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const { data: session, status } = useSession();
  const [Imgurl, setImgurl] = useState("");
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/');
    }
  }, [status, router]);
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
        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4bdd888b-fe5c-4358-8c46-5362c7ce3154/dehn7hz-56d75669-c27f-4d2b-8e30-91dc2c542e4c.jpg/v1/fill/w_1280,h_720,q_75,strp/cool_gaming_background_4k_by_skullbreaker000_dehn7hz-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvNGJkZDg4OGItZmU1Yy00MzU4LThjNDYtNTM2MmM3Y2UzMTU0XC9kZWhuN2h6LTU2ZDc1NjY5LWMyN2YtNGQyYi04ZTMwLTkxZGMyYzU0MmU0Yy5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.oV9fk5Nb0ps6-6_Omk6AfhkNvdqDyQRvV_hLyys1S6Q" className="absolute top-0 left-0 w-screen h-screen -z-10 object-cover object-center" alt="" />
        <div className="bg-black bg-opacity-70 w-full h-full absolute top-0 left-0 z-[-9]"></div>
        <div className="container md:h-screen relative mt-[10vh] w-[100vw] md:w-[85vw] md:mt-0 flex-col flex gap-8 justify-start md:justify-center items-center">
          <motion.div
            drag
            dragElastic={0.5} 
            onDragStart={() => setIsDragging(true)} 
            onDragEnd={() => setIsDragging(false)}
            animate={!isDragging ? { x: 0, y: 0 } : undefined} 
            transition={{ type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="right flex items-center flex-col gap-4 cursor-pointer"
          >
            <div className="w-full h-full flex items-center justify-center pointer-events-none">
              <img
                className="border border-white rounded-full pointer-events-none" // Disable interaction with the image
                width={150}
                height={150}
                src={session?.user?.image || ''}
                alt={session?.user?.name || "User"}
              />
            </div>
          </motion.div>
          <div className="left">
            <span className="font-semibold">Name: {session?.user?.name}</span>
            <div>Email: {session?.user?.email}</div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="text-sm">Update Profile Picture</div>
              <input className="bg-transparent border-b-2 focus:outline-none px-2 py-1" placeholder="Enter New Profile Link" type="text" onChange={(e) => setImgurl(e.target.value)} value={Imgurl} />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="text-sm">Update Username</div>
              <input disabled className="bg-transparent border-b-2 focus:outline-none px-2 py-1" placeholder="Enter a username" type="text" onChange={(e) => setImgurl(e.target.value)} value={session?.user?.email.split('@')[0]} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button disabled className="px-2 py-1 rounded-md bg-blue-700 disabled:bg-blue-900">Update Profile</button>
              <button className="px-2 py-1 rounded-md bg-red-700">Delete Account</button>
              <button className="px-2 py-1 rounded-md bg-red-600 text-white">Delete Favorites</button>
              <button onClick={()=>signOut()} className="px-2 py-1 rounded-md bg-blue-700">Logout</button>
            </div>
            <div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default UpdateProfile