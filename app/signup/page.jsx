"use client";
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
    // design the login page here!!! || Will be designed by Haziq!
    <div>
      Not signed in <br />
      <button className="text-white border rounded-md px-5 py-2 hover:bg-white hover:bg-opacity-40" onClick={() => signIn("github")}>Sign in with github</button>
      <button className="text-white login border rounded-md px-5 py-2 hover:bg-white hover:bg-opacity-40" onClick={() => signIn("google")}>Sign in with google</button>
    </div>
  )
}

export default Signup