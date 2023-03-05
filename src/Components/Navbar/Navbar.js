import React, { useContext, useRef, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import { darkProvider } from "../../Context/DarkContext";
import { userProvider } from "../../Context/UserContext";
import logo from "../../Assets/logo.png";
// import { userProvider } from "../Context/UserContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { logOut, user } = useContext(userProvider);
  const { isDark, setIsDark } = useContext(darkProvider);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch(() => {});
  };

  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));
  useOnClickOutside();

  const handleClick = () => {
    setOpen(!open);
  };

  const menus = (
    <>
      <li>
        <Link
          className={`font-semibold bg-transparent px-3 py-2 hover:text-rose-400`}
          to="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className={`font-semibold bg-transparent px-3 py-2 hover:text-rose-400`}
          to="/blog"
        >
          Blog
        </Link>
      </li>
      {user && (
        <li>
          <Link
            className={`font-semibold bg-transparent px-3 py-2 hover:text-rose-400`}
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}
      <div className="font-semibold px-3 py-2 flex items-center justify-between gap-3">
        <p>Dark</p>
        <input
          onChange={() => setIsDark(!isDark)}
          type="checkbox"
          className="toggle"
          checked={isDark}
        />
      </div>
      {!user ? (
        <li>
          <Link
            style={{ borderRadius: "0px" }}
            className={`border font-semibold ${
              isDark
                ? "bg-transparent border-gray-800 hover:text-white"
                : "bg-rose-400 hover:bg-white hover:border-rose-400 hover:text-rose-400 text-white"
            } px-3 py-2`}
            to="/signin"
          >
            Sign In
          </Link>
        </li>
      ) : (
        <button
          onClick={handleLogOut}
          className={`border font-semibold text-white px-3 py-2 hover:text-rose-400 bg-rose-400 hover:border-rose-400 hover:bg-white`}
        >
          Sign Out
        </button>
      )}
    </>
  );
  return (
    <div className="navbar px-0 relative ">
      <div className="flex-1">
        <Link to="/">
          <img src={logo} className="w-24" alt="" />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 hidden md:flex items-center gap-4">
          {menus}
        </ul>

        <div
          ref={ref}
          onClick={() => handleClick()}
          className="dropdown dropdown-end"
        >
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar md:hidden"
          >
            {user ? (
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} alt="" />
              </div>
            ) : (
              <span className="text-xl">
                <FaAlignJustify></FaAlignJustify>
              </span>
            )}
          </label>
          {open && (
            <ul
              tabIndex={0}
              className={`absolute top-16 right-0 menu menu-compact border  dropdown-content  bg-black border-gray-800  w-52 flex-col justify-center gap-2 px-2 py-3 md:hidden`}
            >
              {menus}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
