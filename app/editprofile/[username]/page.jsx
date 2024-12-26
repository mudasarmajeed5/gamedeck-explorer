"use client";
import { useSession } from "next-auth/react";
import "./editprofile.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { waveform } from "ldrs";
import { motion } from "motion/react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
if (typeof window !== "undefined") {
  waveform.register();
}
const UpdateProfile = () => {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [isdisabled, setisDisabled] = useState(false);
  const { data: session, status } = useSession();
  const [Imgurl, setImgurl] = useState(`${session?.user?.image}`);
  const [name, setName] = useState("");

  const updateProfilePic = async() => {
    setisDisabled(true);
    if(!session){
      alert("Make sure you are logged into the App!");
      return;
    }
    try {
      const response = await fetch('/api/editProfile',
        {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            profilePic: Imgurl,
            email: session?.user?.email,
            name: name,
          }),
        },
      );
      if(response.ok){
        toast.success("Profile updated!")
        setisDisabled(false);
      }

      else{
        console.error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/');
    }
    if(status == 'authenticated'){
      setImgurl(session.user.image);
      setName(session.user.name);
    }
    const getUserData = async(email) => {
      try {
        let response = await fetch("/api/editProfile",
          {
            method:'GET',
            headers:{
              'Content-Type':'application/json',
              'email':email,
            },
          }
        );
        if(response.ok){
          const data = await response.json();
          setName(data.data.name);
          setImgurl(data.data.profilePic);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if(session && session.user.email){
      getUserData(session.user.email);
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
        <div className="bg-black bg-opacity-70 w-full h-full absolute top-0 left-0 z-[-9]"></div>
        <div className="container md:h-screen relative mt-[10vh] w-[100vw] md:w-[85vw] md:mt-0 flex-col flex gap-8 justify-start md:justify-center items-center">
          <div className="border p-6 rounded-xl">
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
                className="border object-cover object-center border-white rounded-full pointer-events-none w-[150px] h-[150px]" // Disable interaction with the image
                src={Imgurl || null}
                alt={session?.user?.name || "User"}
              />
            </div>
          </motion.div>
          <div className="left">
            <div className="flex flex-col gap-2">
            <label htmlFor="name">Change your name: </label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="bg-transparent rounded-md border-2 focus:outline-none border-transparent border-b-white" />
            </div>
            <div>Email: {session?.user?.email}</div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="text-md">Update Profile Picture</div>
              <input className="bg-transparent border-b-2 focus:outline-none px-2 py-1" placeholder="Enter New Profile Link" type="text" onChange={(e)=>setImgurl(e.target.value)} value={Imgurl} />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="text-md">Username</div>
              <input disabled className="bg-transparent border-b-2 focus:outline-none text-gray-300 px-2 py-1" placeholder="Enter a username" type="text" value={session?.user?.email.split('@')[0]} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button disabled={isdisabled} onClick={updateProfilePic} className="px-2 py-1 rounded-md bg-blue-700 disabled:bg-blue-900">Update Profile</button>
              <button  onClick={()=>signOut()} className="px-2 py-1 rounded-md bg-blue-700">Logout</button>
              <button className="px-2 py-1 rounded-md bg-red-600 text-white">Delete Favorites</button>
              <button className="px-2 py-1 rounded-md bg-red-700">Delete Account</button>
            </div>
            <div>
            </div>
          </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default UpdateProfile