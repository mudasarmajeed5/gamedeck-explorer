import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
export default function NotFound() {
    return (
        <div className="bg-black text-white min-h-screen md:w-[85vw] flex flex-col gap-8 justify-center items-center text-center px-4">
            <div className="space-y-4">
                <h1 className="text-5xl font-bold text-red-600">404</h1>
                <p className="text-2xl font-semibold">Oops! Game Over</p>
                <p className="text-gray-300 max-w-md mx-auto">
                    The page you're looking for seems to have escaped the game map. 
                    Let's help you get back to the main menu.
                </p>
            </div>
            
            <Link 
                href="/" 
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white 
                           px-6 py-3 rounded-lg transition-colors duration-300 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
                <FaHome className="w-5 h-5" />
                Return to Home
            </Link>
            
            <div className="absolute bottom-4 text-gray-500 text-sm">
                © {new Date().getFullYear()} GameDeck - Your Game Information Hub
            </div>
        </div>
    )
}