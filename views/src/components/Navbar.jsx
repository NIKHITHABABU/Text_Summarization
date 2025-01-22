import React, { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { Link, NavLink } from "react-router-dom";
import config from "../../../config/config.js";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <nav className="border-gray-200 dark:bg-gray-900" id="default-navbar">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-circular font-semibold whitespace-nowrap dark:text-white uppercase">
          <Link to="/" draggable="false" className="text-white dark:text-white">
            {config.name}
          </Link>
        </span>
        {/* <div className="md:hidden">
          <Hamburger size={20} toggled={isOpen} toggle={setOpen} color="#FFFFFF" />
        </div> */}
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink to="/" draggable="false" className="block py-2 px-3 font-one text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" draggable="false" className="block py-2 px-3 font-one text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                About Us  
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/pricing" draggable="false" className="block py-2 px-3 font-one text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" draggable="false" className="block py-2 px-3 font-one text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" draggable="false" className="block py-2 px-3 font-one text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Contact Us
              </NavLink>
            </li> */}
            <li>
                {/* Login Util here if needed */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
