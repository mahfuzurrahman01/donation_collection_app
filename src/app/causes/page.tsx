/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { IDonation, IUserInfo } from "@/Types/type";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import bg from "../../../public/blog1.jpg";
import { FaDonate } from "react-icons/fa";
import successToast from "@/utils/Toast/success";
import errorToast from "@/utils/Toast/error";

const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [donations, setDonations] = useState<IDonation[]>([]);
  const modalRef = useRef<HTMLDialogElement>(null);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState<IUserInfo>(
    {} as IUserInfo
  );
  // this function will fetch the login user data from backend
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/checkRole", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.ok) {
          setLoggedInUserDetails(response.data.userInfo);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  });
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get("http://localhost:5000/all-donation", {
          headers,
        });
        if (response?.data?.ok) {
          setDonations(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, [isLoading]);
  const [selectedDonation, setSelectedDonation] = useState<IDonation>(
    {} as IDonation
  );
  const [donateAmount, setDonateAmount] = useState<number | string>(0);
  const [amountError, setAmountError] = useState<string>("");
  const changeHandle = (e: any) => {
    setAmountError("");
    e.preventDefault();
    const value = e.target.value;
    const amount = parseFloat(value)
    setDonateAmount(amount);
  };
  const closeDonateForm = () => {
    modalRef.current?.close();
    setSelectedDonation({} as IDonation);
  };
  const donateHandle = (donation: IDonation) => {
    setSelectedDonation(donation);
    modalRef.current?.showModal();
  };

  // Set the request headers
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const handleSubmit = async () => {
    console.log(donateAmount);
    if (
      donateAmount === null ||
      donateAmount === undefined ||
      donateAmount === 0 ||
      donateAmount === ""
    ) {
      setAmountError("Please select amount");
      return;
    }
    const body = {
      donorName: loggedInUserDetails?.name,
      donorEmail: loggedInUserDetails?.email,
      donationName: selectedDonation?.name,
      donationId: selectedDonation?._id,
      donatedAmount: donateAmount,
    };
    try {
      const response = await axios.post("http://localhost:5000/donate", body, {
        headers,
      });
      if (response?.data?.ok) {
        setDonateAmount(0);
        setIsLoading(true);
        successToast("Thanks a lot for your donation");
        modalRef.current?.close();
      } else {
        errorToast(`${response?.data?.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <dialog id="my_modal_3" className="modal bg-black" ref={modalRef}>
        <form
          onSubmit={handleSubmit}
          method="dialog"
          className="modal-box bg-black shadow-2xl shadow-green-900 scale-125 duration-300 rounded-lg"
        >
          <div className="p-2">
            <p
              onClick={closeDonateForm}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-gray-600 bg-opacity-20"
            >
              ✕
            </p>
            <div>
              <label htmlFor="donorName" className="text-sm">
                Your name (Default selected)
              </label>
              <input
                id="donorName"
                name="donorName"
                type="text"
                className="w-full px-3 py-1 rounded-md focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
                value={loggedInUserDetails?.name}
                readOnly
              />
              <label htmlFor="donorName" className="text-sm">
                Your Email (Default selected)
              </label>
              <input
                id="donorEmail"
                name="donorEmail"
                type="text"
                className="w-full px-3 py-1 rounded-md focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
                value={loggedInUserDetails?.email}
                readOnly
              />
              <label htmlFor="donorName" className="text-sm">
                Donated for (Default selected)
              </label>
              <input
                id="donorEmail"
                name="donorEmail"
                type="text"
                className="w-full px-3 py-1 rounded-md focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
                value={selectedDonation?.name}
                readOnly
              />
              <label htmlFor="donorName" className="text-sm">
                How much you want to donate?
              </label>
              <div className="flex flex-wrap gap-3 mt-2 mb-3 items-center justify-start">
                <p
                  className="bg-gray-200 px-2 py-1 rounded text-green-700 hover:bg-green-700 hover:text-gray-300 hover:font-semibold duration-300"
                  onClick={() => {
                    setDonateAmount(100);
                    setAmountError("");
                  }}
                >
                  $100
                </p>
                <p
                  className="bg-gray-200 px-2 py-1 rounded text-green-700 hover:bg-green-700 hover:text-gray-300 hover:font-semibold duration-300"
                  onClick={() => {
                    setDonateAmount(500);
                    setAmountError("");
                  }}
                >
                  $500
                </p>
                <p
                  className="bg-gray-200 px-2 py-1 rounded text-green-700 hover:bg-green-700 hover:text-gray-300 hover:font-semibold duration-300"
                  onClick={() => {
                    setDonateAmount(1000);
                    setAmountError("");
                  }}
                >
                  $1000
                </p>
                <p
                  className="bg-gray-200 px-2 py-1 rounded text-green-700 hover:bg-green-700 hover:text-gray-300 hover:font-semibold duration-300"
                  onClick={() => {
                    setDonateAmount(2000);
                    setAmountError("");
                  }}
                >
                  $2000
                </p>
              </div>
              <input
                id="amount"
                name="amount"
                type="number"
                placeholder="Input amount"
                className="w-full px-3 py-1 rounded-md focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
                onChange={changeHandle}
                value={donateAmount}
              />
              <small className="text-red-700 block">{amountError}</small>
              <div>
                <p
                  onClick={handleSubmit}
                  className="btn w-full rounded-md hover:bg-green-800 duration-300 bg-green-700 text-gray-300 px-2 py-2"
                >
                  Submit
                </p>
              </div>
            </div>
          </div>
        </form>
      </dialog>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <div className="flex justify-center items-center flex-wrap gap-5">
          {donations.map((donation: IDonation, index: number) => (
            <div
              key={index}
              className="p-5 bg-black text-gray-300 flex gap-4 justify-center items-center "
            >
              <div className="flex flex-col gap-2 bg-gray-800 bg-opacity-30 p-5 rounded lg:w-3/4 w-full">
                <p className="text-xl font-bold text-green-700">
                  {donation?.name}
                </p>
                <p className="font-light w-24 text-center text-sm rounded border border-green-700">
                  {donation?.category}
                </p>
                <small>description: {donation?.description}</small>
                <div className="flex justify-between px-4 mt-2">
                  <div className="flex justify-start items-center gap-3 mt-5">
                    <button
                      className="font-semibold px-4 py-1 rounded bg-gray-200 hover:bg-green-700 duration-300 text-green-700 hover:text-gray-300 text-sm"
                      onClick={() => donateHandle(donation)}
                    >
                      Donate now
                    </button>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-end items-center gap-2">
                      <FaDonate className="text-2xl text-gray-300" />
                      <p className="text-3xl font-semibold">
                        {donation?.fundCollected}
                      </p>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Collected amount
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[25%] h-52 relative lg:block hidden">
                <Image
                  src={donation.imageLink}
                  alt="banner image"
                  fill={true}
                  className="rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
