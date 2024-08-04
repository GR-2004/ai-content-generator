"use client";
import { UserButton } from "@clerk/nextjs";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function Header() {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="p-5 shadow-sm border-b-2 bg-white flex justify-between items-center">
      <div
        className="flex gap-2 items-center
       p-2 border rounded-md max-w-lg bg-white"
      >
        <Search className="hidden sm:block" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none hidden sm:block"
        />
        <Menu onClick={toggleMenu} className="sm:hidden cursor-pointer" />
      </div>
      <div className="flex gap-5 items-center">
        <h2 className="hidden sm:block bg-primary p-1 rounded-full text-sm text-white px-2">
          🔥 Where Imagination Meets Innovation
        </h2>
        <UserButton />
      </div>
      <nav
        className={`${
          menu ? "block" : "hidden"
        } fixed top-16 left-0 w-full bg-white shadow-md p-5 sm:hidden transition-transform transform ${
          menu ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <hr className="bg-primary " />
        <ul className="space-y-4">
          <li>
            <Link
              href="/"
              className="block text-center text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 py-2"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/history"
              className="block text-center text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 py-2"
            >
              History
            </Link>
          </li>
          <li>
            <Link
              href="/billing"
              className="block text-center text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 py-2"
            >
              Billing
            </Link>
          </li>
          <li>
            <Link
              href="/setting"
              className="block text-center text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 py-2"
            >
              Setting
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
