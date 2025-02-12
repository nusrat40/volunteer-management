import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { Tooltip } from "react-tooltip";
import { AuthContext } from "../provider/AuthProvider";

import sun from '../assets/contrast.png';
import moon from '../assets/moon.png';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const [theme, setTheme] = useState(
      localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );
  
    // update state on toggle
    const handleToggle = (e) => {
      if (e.target.checked) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };
  
    // set theme state in localstorage on mount & also update localstorage on state change
    useEffect(() => {
      localStorage.setItem("theme", theme);
      const localTheme = localStorage.getItem("theme");
      // add custom data-theme attribute to html tag required to update theme using DaisyUI
      document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);

  const links = (
    <>
       <li>
            <Link className="font-bold" to='/'>Home</Link>
          </li>
          <li>
            <Link className="font-bold" to='/all-volunteer'>All Volunteer</Link>
          </li>
          <li>
            <Link className="font-bold" to='/aboutUs'>About Us</Link>
          </li>
         {
          user && user.email && (
            <>
             <li>
                <Link className="font-bold" to='/add-volunteer'>Add Volunteer</Link>
              </li>
              <li>
                <Link className="font-bold" to='/myPost'>My Post</Link>
              </li>
              <li>
                <Link className="font-bold" to='/myVolunteerReq'>My Volunteer Requests</Link>
              </li>
            </>
          )
         }

    </>
  );

  return (
    <div className="navbar fixed top-0 z-50 bg-base-100 mb-5 py-3 container mx-auto px-12">
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
            {!user || !user.email ? (
              <>
                <li>
                  <button className="btn btn-neutral m-1">
                    <Link to="/login">Log in</Link>
                  </button>
                </li>
                <li>
                  <button className="btn btn-neutral m-1">
                    <Link to="/register">Register</Link>
                  </button>
                </li>
              </>
            ) : null}
          </ul>
        </div>

       <a className="btn btn-ghost font-bold text-3xl italic text-[#27ae8a]">
  Voluntee
</a>

      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-4">

        {/* Toggle button here */}
        <button className="btn btn-square btn-ghost">
          <label className="swap swap-rotate w-12 h-12">
            <input
              type="checkbox"
              onChange={handleToggle}
              // show toggle image based on localstorage theme
              checked={theme === "light" ? false : true}
            />
            {/* light theme sun image */}
            <img src={sun} alt="light" className="w-8 h-8 swap-on" />
            {/* dark theme moon image */}
            <img src={moon} alt="dark" className="w-8 h-8 swap-off" />
          </label>
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
          <div className="space-x-4 hidden lg:flex">
            <button className="btn btn-neutral ">
              <Link to="/login">Log in</Link>
            </button>
            <button className="btn btn-neutral">
              <Link to="/register">Register</Link>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;
