"use client";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import "./editprofile.css";
const UpdateProfile = () => {
  const {data:session} = useSession();
  const path = usePathname();
  //get the username from the URL
  let username = path.split("/")[2];

  return (
    <>
      <div className='text-white min-h-screen'>UpdateProfile for username: {username}</div>
    </>
  )
}

export default UpdateProfile