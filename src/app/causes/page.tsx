/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { IDonation } from "@/Types/type";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import bg from "../../../public/blog1.jpg";
import { FaDonate } from "react-icons/fa";

const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [donations, setDonations] = useState<IDonation[]>([]);
  const modalRef = useRef<HTMLDialogElement>(null);
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
  const handleSubmit = (e: any) => {};
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
              onClick={() => modalRef.current?.close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-gray-600 bg-opacity-20"
            >
              ✕
            </p>
            <div>
              <label htmlFor="donationName" className="text-sm">
                Donation Name (Title)
              </label>
              <input
                id="donationName"
                name="donationName"
                type="text"
                placeholder="Enter donation name here"
                className="w-full px-3 py-1 rounded-md focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
              />

              <label htmlFor="donationImage" className="text-sm">
                Donation Banner (Image)
              </label>
              <input
                name="donationImage"
                id="donationImage"
                type="file"
                className="w-full px-3 py-1 rounded-md focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
              />

              <label htmlFor="donationCategory" className="text-sm">
                Donation category
              </label>
              <select
                className="w-full px-3 py-1 rounded-md focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
                name="donationCategory"
                id="donationCategory"
              >
                <option defaultChecked value="">
                  Select category
                </option>
                <option value="Education">Education</option>
                <option value="Food">Food & Nutrition</option>
                <option value="Shelter">Shelter</option>
              </select>

              <div className="col-span-full">
                <label htmlFor="donationDescription" className="text-sm">
                  Donation description
                </label>
                <textarea
                  id="donationDescription"
                  name="donationDescription"
                  placeholder="Enter description of this donation"
                  className="w-full px-3 py-1 rounded-md focus:border-green-700 focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
                ></textarea>

                <button
                  type="submit"
                  className="w-full rounded-md hover:bg-green-800 duration-300 bg-green-700 text-gray-300 px-2 py-2"
                >
                  Submit
                </button>
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
                  Name: {donation?.name}
                </p>
                <p className="font-light w-24 text-center text-sm rounded border border-green-700">
                  {donation?.category}
                </p>
                <small>description: {donation?.description}</small>
                <div className="flex justify-between px-4 mt-2">
                  <div className="flex justify-start items-center gap-3 mt-5">
                    <button className="font-semibold px-4 py-1 rounded bg-gray-200 hover:bg-green-700 duration-300 text-green-700 hover:text-gray-300 text-sm"
                    onClick={() => modalRef.current?.showModal()}
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
