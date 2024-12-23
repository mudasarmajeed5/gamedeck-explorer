"use client";
import "./style.css"
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react"
import { waveform } from 'ldrs';
if (typeof window !== "undefined") {
  // Ensure this runs only in the browser
  waveform.register();
}
const Signup = () => {
  const { data: session, status } = useSession();
  if (status == "loading") {
    return (
      <div className="flex w-screen md:w-[85vw] min-h-screen justify-center items-center">
        <l-waveform
          size="35"
          stroke="3.5"
          speed="1"
          color="white"
        ></l-waveform>
      </div>
    );
  }
  if (session) {
    return (
      <div className="text-white flex flex-col gap-5 justify-center items-center min-h-[70vh]">
        <div>
          Signed in as {session.user.email}
        </div>
        <img className="border rounded-full" src={session.user.image} width={150} alt="" />
        <button className="text-white border rounded-md px-5 py-2 hover:bg-white hover:bg-opacity-40" onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    // design the login page here!!! || Will not be designed by Haziq!
    <div className="Login">
      <div className="signupbox">
        <h1 className="Heading">Signup</h1>
        <form >
          <div className="form">
            <label htmlFor="Username">Username: </label>
            <input type="text" placeholder=" Create a username" />
          </div>
          <div className="form">
            <label htmlFor="Password">Password: </label>
            <input type="text" placeholder=" Create a password" />
          </div>
          <div className="form">
            <label htmlFor="Confirm">Confirm Password: </label>
            <input type="text" placeholder=" Confirm your password" />
          </div>
          <div className="form">
            <label htmlFor="Gmail">Email: </label>
            <input type="email" placeholder=" Enter your email" />
          </div>
        </form>
        <div className="orline">
          <div className="Border"></div>
          <h2 className="or">or</h2>
          <div className="Border"></div>
        </div>
        <div className="button">
          <button onClick={()=>signIn("github")} className="button1">
            <FaGithub className="text-2xl" />
            <span>
              Login via Github
            </span>
          </button>
          <button onClick={()=>signIn("google")} className="button2">
            <FaGoogle className="text-2xl" />
            <span>
              Login via Google
            </span>
          </button>
        </div>
        <div className="orline2">
          <div className="Border2"></div>
          <h3>or</h3>
          <div className="Border2"></div>
        </div>
        <h4 className="text-gray-500">Already Have an Account <Link className="text-white" href={"/login"}>Login!</Link> </h4>
      </div>
    </div>
  )
}

export default Signup