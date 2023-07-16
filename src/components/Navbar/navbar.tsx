/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import successToast from "@/utils/Toast/success";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { cookies } from "next/dist/client/components/headers";

const navbar = () => {
  const router = useRouter();
  const { user, logOut } = useContext(AuthContext);
  let isLoggedIn;
  if (user?.uid) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
  const [menuToggle, setMenuToggle] = useState(false);
  const logOutHandle = () => {
    logOut();
    setMenuToggle(false);
    successToast("Successfully Logout");
    localStorage.clear();
    Cookies.remove("isLoggedIn");
    router.push("/");
  };

  return (
    <div className="bg-black flex justify-between md:items-center items-start lg:py-3 py-2  relative">
      {/* logo div  */}
      <Link href="/">
        <div className="flex items-center">
          <Image src={logo} alt="logo" width={70} height={70} />
          <p className="text-4xl font-semibold md:block hidden">
            Sa<span className="text-green-700">Dakah</span>
          </p>
        </div>
      </Link>
      {/* navbar tab div for desktop */}
      <div className="lg:flex hidden items-center gap-5">
        <Link
          className="hover:text-green-700 duration-300 hover:font-semibold"
          href="/"
        >
          Home
        </Link>
        {isLoggedIn && (
          <Link
            className="hover:text-green-700 duration-300 hover:font-semibold"
            href="/causes"
          >
            causes
          </Link>
        )}
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

        {isLoggedIn && (
          <Link
            href="/dashboard"
            className="hover:text-green-700 duration-300 hover:font-semibold"
          >
            {/* <AiOutlineUser className="text-xl" /> */}
            Dashboard
          </Link>
        )}
        {isLoggedIn ? (
          <button
            onClick={logOutHandle}
            className="px-4 py-1 rounded-md bg-green-700 text-gray-100 hover:bg-green-800 duration-300"
          >
            Logout
          </button>
        ) : (
          <button className="px-4 py-1 rounded-md bg-green-700 text-gray-100 hover:bg-green-800 duration-300">
            <Link href="/auth/login">Sign In</Link>
          </button>
        )}
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
          menuToggle ? "translate-y-[0%]" : "translate-y-[-140%]"
        } duration-500`}
      >
        <Link
          href="/"
          className="border-b p-1 text-center hover:bg-black hover:text-green-700 hover:border-none rounded-md duration-300"
          onClick={() => setMenuToggle(false)}
        >
          Home
        </Link>
        <Link
          href="/causes"
          className="border-b p-1 text-center hover:bg-black hover:text-green-700 hover:border-none rounded-md duration-300"
          onClick={() => setMenuToggle(false)}
        >
          Causes
        </Link>
        <Link
          href="/story"
          className="border-b p-1 text-center hover:bg-black hover:text-green-700 hover:border-none rounded-md duration-300"
          onClick={() => setMenuToggle(false)}
        >
          Our story
        </Link>
        <Link
          href="/blog"
          className="border-b p-1 text-center hover:bg-black hover:text-green-700 hover:border-none rounded-md duration-300"
          onClick={() => setMenuToggle(false)}
        >
          Blogs
        </Link>
        {isLoggedIn && (
          <Link
            href="/dashboard"
            className="border-b p-1 text-center hover:bg-black hover:text-green-700 hover:border-none rounded-md duration-300"
            onClick={() => setMenuToggle(false)}
          >
            Dashboard
          </Link>
        )}

        {isLoggedIn ? (
          <button
            className="border-b p-1 text-center bg-white text-gray-400 hover:bg-black hover:text-green-700 hover:border-none rounded-md duration-300"
            onClick={logOutHandle}
          >
            <p>Logout</p>
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="border-b p-1 text-center bg-white text-gray-400 hover:bg-black hover:text-green-700 hover:border-none rounded-md duration-300"
            onClick={() => setMenuToggle(false)}
          >
            <p>Sign In</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default navbar;
