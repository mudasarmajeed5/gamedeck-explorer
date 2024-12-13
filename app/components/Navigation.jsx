"use client";
import { FaHome, FaUser } from "react-icons/fa";
import Link from "next/link";
import { MdLibraryAddCheck } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
const Navigation = () => {
    const {data:session} = useSession();
    return (
        <>
            <nav className="hidden md:flex border-transparent border border-r-white min-w-fit justify-between sticky top-0 h-screen flex-col bg-black bg-opacity-60 p-4 pr-6 text-white">
                <div>
                    <div className="logo font-bold text-2xl py-4 border-b-2">
                        Game Deck
                    </div>
                    <div className="border-b-2">
                        <ul className="flex text-lg md:flex-col space-y-3 px-4 py-2">
                            <Link href={"/"}>
                                <li className="flex gap-2 items-center hover:bg-gray-300 hover:bg-opacity-25 px-2 py-1 rounded-md cursor-pointer transition-all">
                                    <FaHome /><span>Home</span>
                                </li>
                            </Link>
                            <Link href={"/library"}>
                                <li className="flex gap-2 items-center hover:bg-gray-300 hover:bg-opacity-25 px-2 py-1 rounded-md cursor-pointer transition-all">
                                    <MdLibraryAddCheck /><span>Library</span>
                                </li>
                            </Link>
                            <Link href={"/favorites"}>
                                <li className="flex gap-2 items-center hover:bg-gray-300 hover:bg-opacity-25 px-2 py-1 rounded-md cursor-pointer transition-all">
                                    <FaHeart /><span>Favorites</span>
                                </li>
                            </Link>
                            <Link href={"/store"}><li className="flex gap-2 items-center hover:bg-gray-300 hover:bg-opacity-25 px-2 py-1 rounded-md cursor-pointer transition-all">
                                <FaStore /><span>Store</span>
                            </li>
                            </Link>
                            <Link href={"/wallet"}><li className="flex gap-2 items-center hover:bg-gray-300 hover:bg-opacity-25 px-2 py-1 rounded-md cursor-pointer transition-all">
                                <FaWallet /><span>Wallet</span>
                            </li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div className="signIn text-md border-b-2 bg-gray-600 bg-opacity-35 hover:bg-opacity-55 px-2 py-1 cursor-pointer transition-all flex gap-2 items-center">
                     {session? <img src={session.user.image} width={30} className="rounded-full" alt="" />: <FaRegUserCircle />} {session? <Link href={`/${session.user.email.split("@")[0]}/updateprofile`}>{session.user.name.split(" ")[0]}</Link>:<Link href={"/signup"}>Sign In</Link>}
                </div>
            </nav>
            <div className="flex md:hidden fixed p-2 w-screen bottom-0 text-xl bg-white bg-opacity-60 text-black list-none justify-between items-center">
                <Link className="flex flex-col justify-center items-center gap-1" href="/">
                    <FaHome />
                    <span className="text-xs">Home</span>
                </Link>
                <Link className="flex flex-col justify-center items-center gap-1" href="/favorites">
                    <FaHeart />
                    <span className="text-xs">Favorites</span>
                </Link>
                <Link className="flex flex-col justify-center items-center gap-1" href="/store">
                    <FaStore />
                    <span className="text-xs">Store</span>
                </Link>
                <Link className="flex flex-col justify-center items-center gap-1" href="/wallet">
                    <FaWallet />
                    <span className="text-xs">Wallet</span>
                </Link>
                <Link className="flex flex-col justify-center items-center gap-1" href="/account">
                    <FaUser />
                    <span className="text-xs">Account</span>
                </Link>
            </div>

        </>

    )
}

export default Navigation