/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
"use client";
import axios from "axios";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FormEvent, useContext, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import { getToken } from "@/utils/getToken";
import successToast from "@/utils/Toast/success";
import errorToast from "@/utils/Toast/error";
import Cookies from "js-cookie";
const page = () => {
  const { setLoading, loading, createUser } = useContext(AuthContext);
  const router = useRouter();
  // this state are storing the users data for validation check
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  // for showing error we use this state
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  // this function is for show and hide password toggler
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // this is password regex checker
  function checkPasswordStrength(password: string): boolean {
    const length = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
    const hasNumber = /\d/.test(password);

    return (
      hasUppercase && hasLowercase && hasSpecialChar && hasNumber && length
    );
  }
  // this function will work for all field and first it will check the name of the field and set the value according to that
  const universalOnChangeFunc = (event: HTMLInputElement | any) => {
    event.preventDefault();
    const field = event.target.name;
    const value = event.target.value;
    if (field === "name") {
      setNameError("");
      setUserName(value);
    } else if (field === "email") {
      setEmailError("");
      const newValue = value.toLowerCase();
      setUserEmail(newValue);
    } else if (field === "password") {
      setPasswordError("");
      setUserPassword(value);
    }
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement> | any) => {
    event.preventDefault();
    // setUserName(event.target.name.value);
    // setUserEmail(event.target.email.value);
    // setUserPassword(event.target.password.value);
    const validEmail = userEmail.split("@");
    if (userName === "" || undefined || null) {
      setNameError("A valid name is required");
      return;
    }
    if (userEmail === "" || undefined || null) {
      setEmailError("A valid email is required");
      return;
    }
    if (validEmail.length !== 2) {
      setEmailError("A valid email is required");
      return;
    }
    if (userPassword === "" || undefined || null) {
      setPasswordError("A valid password is required");
      return;
    }
    const validPassword = checkPasswordStrength(userPassword);
    if (!validPassword) {
      setPasswordError(
        "Password should 8 digits and contain uppercase,lowercase,number,characters"
      );
      return;
    }

    const body = {
      name: userName,
      email: userEmail,
      password: userPassword,
      role: "donor",
    };

    try {
      const response: any = await axios.post(
        "http://localhost:5000/register",
        body
      );
      if (response.data.ok) {
        successToast("Register successfully");
        // this function is setting the token
        getToken(body.email);
        Cookies.set("isLoggedIn", "true");
        // creating user in firebase too
        createUser(userEmail, userPassword)
          .then((result: any) => {
            const user = result.user;

            // we are saving data on our database and we are taking token
          })
          .catch((err: any) => console.log(err));
        setLoading(true);
        event.target.reset();
        setUserPassword("");
        setNameError("");
        setEmailError("");
        setPasswordError("");
        router.push("/");
      } else {
        errorToast(`${response.data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:my-10 my-5 mx-auto">
      <div className="lg:w-[400px] lg:max-w-[400px] w-[350px] max-w-[350px] p-8 space-y-3 rounded-xl bg-gray-900 bg-opacity-30 text-gray-300">
        <h1 className="text-2xl font-bold text-center text-green-700">
          Register
        </h1>
        <form
          className="space-y-6 ng-untouched ng-pristine ng-valid"
          onSubmit={handleSubmit}
        >
          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="block text-gray-400">
              Your name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              onChange={universalOnChangeFunc}
              className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
            />
            {nameError !== "" && (
              <small className="mt-1 text-red-700 inline-block">
                {nameError}
              </small>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block text-gray-400">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              onChange={universalOnChangeFunc}
              className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
            />
            {emailError !== "" && (
              <small className="mt-1 text-red-700">{emailError}</small>
            )}
          </div>
          <div className="space-y-1 text-sm relative">
            <label htmlFor="password" className="block text-gray-400">
              Password
            </label>
            <input
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              value={userPassword}
              placeholder="Enter password"
              onChange={universalOnChangeFunc}
              className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
            />
            <div
              className="toggle-password inline-block text-lg absolute top-8 right-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
            {passwordError !== "" && (
              <small className="mt-1 text-red-700">{passwordError}</small>
            )}
          </div>
          <button
            type="submit"
            className="block w-full p-3 text-center rounded-sm text-gray-300  bg-green-700"
          >
            Submit
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
          <p className="px-3 text-sm text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button aria-label="Log in with Google" className="p-3 rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
          <button aria-label="Log in with Twitter" className="p-3 rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
            </svg>
          </button>
          <button aria-label="Log in with GitHub" className="p-3 rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
            </svg>
          </button>
        </div>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p className="text-xs text-center sm:px-6 text-gray-400">
          Already have an account?
          <Link href="/auth/login" className="underline text-gray-100">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
