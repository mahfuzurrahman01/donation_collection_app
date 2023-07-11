"use client";

import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
import React, { useState } from "react";
const navbar = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <div className="bg-black flex justify-between md:items-center items-start lg:py-3 py-2  relative">
      {/* logo div  */}
      <Link href="/">
        <div className="flex items-center">
          <Image src={logo} alt="logo" width={70} height={70} />
          <p className="text-4xl font-semibold md:block hidden">
            Do<span className="text-green-700">Nation</span>
          </p>
        </div>
      </Link>
      {/* navbar tab div for desktop */}
      <div className="md:flex hidden items-center gap-5">
        <Link
          className="hover:text-green-700 duration-300 hover:font-semibold"
          href="/causes"
        >
          causes
        </Link>
        <Link
          className="hover:text-green-700 duration-300 hover:font-semibold"
          href="/story"
        >
          Our story
        </Link>
        <Link
          className="hover:text-green-700 duration-300 hover:font-semibold"
          href="/blog"
        >
          Blogs
        </Link>
        <Link
          className="hover:text-green-700 duration-300 hover:font-semibold"
          href="/project"
        >
          Projects
        </Link>
        <button className="px-4 py-1 rounded-md bg-green-700 text-gray-100 hover:bg-green-800 duration-300">
          Donate
        </button>
      </div>
      {/* navbar tab div for mobile */}
      {!menuToggle ? (
        <AiOutlineMenu
          onClick={() => setMenuToggle(true)}
          className="text-4xl mr-1 font-bold mt-[5px] lg:hidden block"
        />
      ) : (
        <HiXMark
          onClick={() => setMenuToggle(false)}
          className="text-4xl mr-1 font-bold mt-[5px] lg:hidden block"
        />
      )}
      <div
        className={`bg-green-700 w-full absolute p-4 m-0 top-20 flex lg:hidden flex-col gap-4 ${
          menuToggle ? "translate-y-[0%]" : "translate-y-[-120%]"
        } duration-500 -z-30`}
      >
        <Link
          href="/causes"
          className="border-b p-1 text-center hover:bg-black hover:text-green-700 hover:border-none rounded-md duration-300"
        >
          Causes
        </Link>
        <Link
          href="/story"
          className="border-b p-1 text-center hover:bg-black hover:text-green-700 hover:border-none rounded-md duration-300"
        >
          Our story
        </Link>
        <Link
          href="blog"
          className="border-b p-1 text-center hover:bg-black hover:text-green-700 hover:border-none rounded-md duration-300"
        >
          Blogs
        </Link>
        <Link
          href="/project"
          className="border-b p-1 text-center hover:bg-black hover:text-green-700 hover:border-none rounded-md duration-300"
        >
          Projects
        </Link>
        <button className="border-b p-1 text-center bg-white text-gray-400 hover:bg-black hover:text-green-700 hover:border-none rounded-md duration-300">
          Donate
        </button>
      </div>
    </div>
  );
};

export default navbar;
