"use client";
import { usePathname } from "next/navigation";
const UpdateProfile = () => {
  const path = usePathname(); 
  //get the username from the URL
  let username = path.split("/")[2];

  return (
    <div className='text-white min-h-screen'>UpdateProfile for username: {username}</div>
  )
}

export default UpdateProfile