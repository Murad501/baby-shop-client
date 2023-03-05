import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { darkProvider } from "../../Context/DarkContext";
import { userProvider } from "../../Context/UserContext";

const Footer = () => {
  const { isDark } = useContext(darkProvider);
  const { user } = useContext(userProvider);
  return (
    <footer className={`footer p-10 border-t ${isDark && "border-gray-800"}`}>
      <div>
        <img className="w-40" src={logo} alt="website logo" />
      </div>
      <div>
        <span className="footer-title">Categories</span>
        <Link>Gear</Link>
        <Link>Sustains</Link>
        <Link>Clothings</Link>
        <Link>Toys</Link>
      </div>
      <div>
        <span className="footer-title">Menus</span>
        <Link>Home</Link>
        <Link>Blog</Link>
        {user && <Link></Link>}
        <Link>Sign Out</Link>
      </div>
      <div>
        <span className="footer-title">Newsletter</span>
        <div className="md:flex gap-5 md:gap-0 h-12 w-11/12">
          <input
            type="text"
            placeholder="example@email.com"
            className="input input-bordered w-full rounded-l-sm rounded-r-none mb-1 md:mb-0 focus:outline-none bg-transparent"
          />
          <button className="bg-rose-400 h-full text-white font-semibold px-4 rounded-r-sm">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
