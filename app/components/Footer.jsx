import "./Footer.css"
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
export const Footer = () => {
    
    return (
        <>
        <div className="footer">

        <div className="footer-content">
        <div className="top ">    
            <div className="footer-image">
            {/* <img src="/Dualshock 4.jpeg" alt="gaming" /> */}
            <img className="img"  src="/logo/DualShock_4.jpg" alt="DualShock 4 Controller   " />
        </div>
        <div className="footer-start flx">
            <p>Your go-to platform for gaming reviews, prices, and recommendations.</p>
            <form className="btn relative z-[2]" action="">
                <input type="email" placeholder="Your e-mail" />
                <button>Email us</button>
            </form>
        </div>
        </div>
        <div className="footer-sections text-center mx-auto">
        <img src="/logo/logo.png" className="sepia brightness-0 invert" width={100} alt="" />
        <div className="navigation">
            <h5>Navigation</h5>
            <div className="nav-items">
                
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/store">Store</Link></li>
                    <li><Link href="/favourites">Favourites</Link></li>
                    <li><Link href="/wallet">Wallet</Link></li>
                    <li><Link href="/signup">Login/Sign up</Link></li>
                    <li><Link href="/edit">Edit profile</Link></li>
                </ul>
            </div>
        </div>
        <div className="information">
            <h5>Information</h5>
            <div className="info-items">
                <ul>
                    <li><Link href="/aboutus">About us</Link></li>
                    <li><Link href="/contacts">Contact us</Link></li>
                    <li><Link href="/FAQs">FAQ</Link></li>
                    <li><Link href="/blog">Blog/Updates</Link></li>
                </ul>
            </div>
        </div>
        <div className="legal">
            <h5>Legal</h5>
            <div className="legal-items">
                <ul>
                    <li><Link href="/termsofservice">Terms of Service</Link></li>
                    <li><Link href="/privacypolicy">Privacy Policy</Link></li>
                    <li><Link href="/cookies">Cookie Policy</Link></li>
                </ul>
            </div>
        </div>
        </div>
        <div className="footer-bottom">
            <hr />
            <p className="copyright">Copyright&copy; 2024 Gamedeck-Explorer. All rights reserved.</p>

        <div className="follow-us">
            <h5>Follow us: </h5>
            <Link href="https://instagram.com"><FaInstagram /></Link>
            <Link href="https://github.com"><FaGithub /></Link>
            <Link href="https://twitter.com"><FaTwitter /></Link>
            <Link href="https://discord.com"><FaDiscord /></Link>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}