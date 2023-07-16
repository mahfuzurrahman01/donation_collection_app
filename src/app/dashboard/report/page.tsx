"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { IUserDonation } from "@/Types/type";
import errorToast from "@/utils/Toast/error";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaDonate } from "react-icons/fa";
const page = () => {
    const router = useRouter()
  const [allReport, setAllReport] = useState<IUserDonation[]>([]);
  const [sortingName, setSortingName] = useState<string>("all");
  useEffect(() => {
    const getReport = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `http://localhost:5000/reports?sortingName=${sortingName}`,
          {
            headers,
          }
        );
        if (response?.data?.ok) {
          setAllReport(response.data.data);
        } else {
            errorToast(`${response?.data?.message}`)
            router.push('/')
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    getReport();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortingName]);
  return (
    <div>
      <div className="px-5 py-3">
        <p>Sort by</p>
        <select className="px-2 py-1 rounded-md" onChange={(e: any) => setSortingName(e.target.value)}>
          <option value="all">All</option>
          <option value="Education">Education</option>
          <option value="Food">Food & nutrition</option>
          <option value="Shelter">Shelter</option>
        </select>
      </div>
      <div className="w-full flex justify-center items-center gap-5 flex-wrap">
        {allReport?.map((report: IUserDonation, index: number) => (
          <div key={index} className="lg:w-[45%] w-full">
            <div className="w-full rounded-md p-8 sm:flex sm:space-x-6 bg-gray-900 bg-opacity-40 text-gray-100 flex justify-between items-baseline">
              <div className="flex flex-col mb-2">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {report?.donorName}
                  </h2>
                </div>
                <div>
                  <div className="space-y-1">
                    <span className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        aria-label="Email address"
                        className="w-4 h-4"
                      >
                        <path
                          fill="currentColor"
                          d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                        ></path>
                      </svg>
                      <span className="text-gray-400">
                        {report?.donorEmail}
                      </span>
                    </span>
                    <small className="text-xs border-green-700 border inline-block px-3 py-1 rounded-md text-gray-200">
                      {report?.donationCategory}
                    </small>
                    <p>Donation for : {report?.donationName}</p>
                  </div>
                  
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-end items-center gap-2">
                      <FaDonate className="text-2xl text-gray-300" />
                      <p className="text-xl font-semibold">
                        {report?.donatedAmount}
                      </p>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Donated
                    </p>
                  </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
