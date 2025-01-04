
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { Tooltip } from "react-tooltip";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const [theme,setTheme] = useState("light");

    const toggleTheme = ()=>{
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    };

    useEffect(()=>{
      const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    },[])

  const links = (
    <>
       <li>
            <Link className="font-bold" to='/'>Home</Link>
          </li>
          <li>
            <Link className="font-bold" to='/all-volunteer'>All Volunteer</Link>
          </li>

    </>
  );

  return (
    <div className="navbar bg-base-100 mb-5 py-3 container mx-auto px-12">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <a className="btn btn-ghost font-bold text-3xl italic text-purple-500">
          Voluntee
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-4">

        {/* theme button */}
        <button
          className="btn btn-sm btn-outline"
          onClick={toggleTheme}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌞 Light" : "🌙 Dark"}
        </button>


        {user && user?.email ? (
          <div className="flex items-center gap-2">
          {/* Dropdown Menu */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-20 rounded-full">
                <img
                  src={user?.photoURL}
                  alt="User Avatar"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to='/add-volunteer'>Add Volunteer</Link>
              </li>
              <li>
                <Link to='/myPost'>My Post</Link>
              </li>
              <li>
                <Link to='/myVolunteerReq'>My Volunteer Requests</Link>
              </li>
              
              <li>
                <button onClick={logOut}>Logout</button>
              </li>
            </ul>
          </div>
          {/* Tooltip for User Display Name */}
          <Tooltip anchorSelect=".avatar" place="top">
            <p>{user?.displayName}</p>
          </Tooltip>
        </div>
        ) : (
          <div className="space-x-4">
            <button className="btn ">
              <Link to="/login">Log in</Link>
            </button>
            <button className="btn ">
              <Link to="/register">Register</Link>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;
