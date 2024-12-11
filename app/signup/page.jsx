"use client";
import { useSession, signIn, signOut } from "next-auth/react"

const Signup = () => {
    const { data: session } = useSession();
    if (session) {
      return (
        <div className="text-white">
          Signed in as {session.user.email} <br />
          <button className="text-white border rounded-md px-5 py-2 hover:bg-white hover:bg-opacity-40" onClick={() => signOut()}>Sign out</button>
        </div>
      )
    }
    return (
        // haziq will design this page, with options like login with google, facebook, github, and manually entering a password and email to register. also Add icons and keep the text-white in the body. 
      <>
        Not signed in <br />
        <button className="text-white border rounded-md px-5 py-2 hover:bg-white hover:bg-opacity-40" onClick={() => signIn("github")}>Sign in</button>
      </>
    )  
}

export default Signup