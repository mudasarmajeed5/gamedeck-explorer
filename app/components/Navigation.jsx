"use client";
import { FaHome, FaUser } from "react-icons/fa";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { signOut, signIn, useSession } from "next-auth/react";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { usePathname } from "next/navigation";
const Navigation = () => {
    const { data: session } = useSession();
    const path = usePathname();
    const pathname = path.split("/")[1];
    console.log(pathname);
    const navLinks = [
        {
            name: "Favorites",
            icon: <FaHeart />,
            link: "/favorites"
        },
        {
            name: "Store",
            icon: <FaStore />,
            link: "/store"
        },
        {
            name: "Wallet",
            icon: <FaWallet />,
            link: "/wallet"
        }
    ]
    return (
        <>
            <nav className="hidden md:flex border-transparent border border-r-white min-w-fit justify-between sticky top-0 h-screen flex-col bg-black bg-opacity-20 p-4 pr-6 text-white">
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
                            {navLinks.map((navItem, idx) => (
                                <Link key={idx} href={`${navItem.link}`} className={`${navItem.name.toLowerCase() === pathname ? 'bg-gray-300 bg-opacity-25' : ''}`}>
                                    <li className={`flex gap-2 items-center px-2 py-1 rounded-md cursor-pointer`}>
                                        {navItem.icon}<span>{navItem.name}</span>
                                    </li>
                                </Link>
                            ))}
                            <Link
                                className={`${pathname.startsWith('editprofile') ? 'bg-gray-300 bg-opacity-25' : ''}`}
                                href={`/${session ? `editprofile/${session.user.email.split("@")[0]}` : 'signup'}`}
                            >
                                <li className={`flex gap-2 items-center px-2 py-1 rounded-md cursor-pointer`}>
                                    <FaUser /><span className="text-[1rem]">{session ? 'Edit Profile' : 'Login'}</span>
                                </li>   
                            </Link>
                        </ul>
                    </div>
                </div>
                <div
                    onClick={session ? () => signOut() : () => signIn()}
                    className="signIn text-md border-b-2 bg-gray-600 bg-opacity-35 hover:bg-opacity-55 px-2 py-1 cursor-pointer transition-all flex gap-2 items-center"
                >
                    {session ? <CiLogout /> : <FaRegUserCircle />} {/* Icon changes dynamically */}
                    <span>{session ? 'Logout' : 'Log in'}</span>
                </div>

            </nav>
            <section className="flex z-[50] md:hidden fixed w-screen bottom-0 text-md bg-white text-black list-none justify-around items-center">
                <Link className="flex flex-col justify-center items-center gap-1" href="/">
                    <FaHome />
                    <span className="text-xs">Home</span>
                </Link>
                {navLinks.map((navItem, idx) => (
                    <Link key={idx} className={`${navItem.name.toLowerCase() === pathname ? 'text-red-600' : ''} flex px-2 py-1 flex-col justify-center items-center gap-1`} href={navItem.link}>
                        {navItem.icon}
                        <span className="text-xs">{navItem.name}</span>
                    </Link>
                ))}
                <Link
                    className={`flex ${pathname.startsWith('editprofile') ? 'text-red-600' : ''}  flex-col justify-center items-center gap-1`}
                    href={`/${session ? `editprofile/${session.user.email.split("@")[0]}` : 'signup'}`}
                >
                    <FaUser />
                    <span className="text-xs">Account</span>
                </Link>
            </section>

        </>

    )
}

export default Navigation