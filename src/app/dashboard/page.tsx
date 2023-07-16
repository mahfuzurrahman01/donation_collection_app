/* eslint-disable react/no-unescaped-entities */
"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import { IDonation, IUserDonation, IUserInfo } from "@/Types/type";
import { useRouter } from "next/navigation";
import FormData from "form-data";
import { getToken } from "@/utils/getToken";
import successToast from "@/utils/Toast/success";
import { getAllDonation } from "@/shared/shared";
import Image from "next/image";
import { FaDonate } from "react-icons/fa";
import { HashLoader } from "react-spinners";
import errorToast from "@/utils/Toast/error";
const page = () => {
  // all state
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageLink, setImageLink] = useState<string>("");
  const [getImage, setGetImage] = useState<boolean>(false);
  // this state for showing error messages
  const [nameError, setNameError] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [loggedInUserDetails, setLoggedInUserDetails] = useState<IUserInfo>(
    {} as IUserInfo
  );
  // const [category,setCategory] = useState<string>("");
  const router = useRouter();
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalRef2 = useRef<HTMLDialogElement>(null);
  const { user } = useContext(AuthContext);
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

  // image bb image uploading
  const uploadImageToImgbb = async (imageData: any) => {
    try {
      await axios
        .post(
          `https://api.imgbb.com/1/upload?key=b7964c93cb9bc3fa084c0b396faa46da`,
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response?.data?.success) {
            const imageLink = response?.data?.data?.url;
            setImageLink(imageLink);
            setGetImage(true);
          }
        })
        .catch((err) => {
          console.log("API error ↓");
          setImageLink("");
          setImageError("One valid image is required");
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };
  // Set the request headers
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  // form submission handle
  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    // =====================getting image link start ==========

    // ================== getting image link done ==============
    if (name === "" || undefined || null) {
      setNameError("A valid name/title is required");
      return;
    }
    if (category === "" || undefined || null) {
      setCategoryError("A category is required");
      return;
    }

    if (imageLink === "" || undefined || null) {
      setImageError("An Image is required");
      return;
    }

    if (description === "" || undefined || null) {
      setDescriptionError("A details description is required");
      return;
    }

    const body: IDonation = {
      name,
      category,
      imageLink,
      description,
      fundCollected: 0,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/create/donation",
        body,
        { headers }
      );
      if (response?.data?.ok) {
        successToast("Donation created successfully");
        setIsLoading(true);
        event.target.reset();
        modalRef.current?.close();
      } else {
        errorToast(`${response?.data?.message}`);
        event.target.reset();
        modalRef.current?.close();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // this is an universal onchange handler it will set the value to that correct input
  const universalOnChangeFunc = (event: HTMLInputElement | any) => {
    event.preventDefault();
    const field = event.target.name;
    const value = event.target.value;
    if (field === "donationName") {
      setNameError("");
      setName(value);
    } else if (field === "donationCategory") {
      setCategoryError("");
      setCategory(value);
    } else if (field === "donationImage") {
      setImageError("");
      const image = event.target.files[0];
      if (image.size > 1000000) {
        setImageError("Please select an image not more than 1MB");
        return;
      }
      const formData = new FormData();
      formData.append("image", image);
      uploadImageToImgbb(formData);
    } else if (field === "donationDescription") {
      setDescriptionError("");
      setDescription(value);
    }
  };
  // all donation fetching

  // useEffect(() => {
  //   if (loggedInUserDetails?.role === "admin") {

  //   }
  // });

  const [isLoading, setIsLoading] = useState(true);
  const [donations, setDonations] = useState<IDonation[]>([]);
  const [sortingName, setSortingName] = useState<string>("all");
  useEffect(() => {
    const fetchDonations = async (sortingName: string) => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `http://localhost:5000/all-donation?sortingName=${sortingName}`,
          {
            headers,
          }
        );
        if (response?.data?.ok) {
          setDonations(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations(sortingName);
  }, [isLoading, sortingName]);

  const [selectedId, setSelectedId] = useState<string>("");
  const updateHandler = (donation: IDonation) => {
    setName(donation.name);
    setCategory(donation.category);
    setDescription(donation.description);
    setImageLink(donation.imageLink);
    setSelectedId(donation._id);
    modalRef2.current?.showModal();
  };

  const closeUpdateForm = () => {
    setName("");
    setCategory("");
    setDescription("");
    setImageLink("");
    setSelectedId("");
    modalRef2.current?.close();
  };

  const updateFormSubmission = async (event: any) => {
    event.preventDefault();
    const body = { name, category, imageLink, description };
    try {
      const response = await axios.patch(
        `http://localhost:5000/donation/update/${selectedId}`,
        body,
        { headers }
      );
      if (response?.data?.ok) {
        successToast("Donation update successfully");
        setIsLoading(true);
        event.target.reset();
        modalRef2.current?.close();
      } else {
        errorToast(`${response?.data?.message}`);
        event.target.reset();
        modalRef2.current?.close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDonationHandle = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/donation/delete/${id}`,
        { headers }
      );
      if (response?.data?.ok) {
        successToast("Donation deleted successfully");
        setIsLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [userDonations, setUserDonations] = useState<IUserDonation[]>([]);
  useEffect(() => {
    const getUserDonation = async () => {
      const token = localStorage.getItem("token");
      const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      try {
        const response = await axios.get("http://localhost:5000/userDonation", {
          headers: header,
        });
        if (response?.data?.ok) {
          setUserDonations(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserDonation();
  }, []);

  return (
    <div className="lg:my-5 my-2">
      {loggedInUserDetails?.role === "admin" ? (
        <div>
          <div className="flex justify-between items-center ">
            <div className="flex justify-start gap-1 items-center flex-wrap">
              <button
                className="btn bg-green-700 ml-5 rounded-md"
                onClick={() => modalRef.current?.showModal()}
              >
                Create new donation
              </button>
              <button
                className="btn bg-green-700 ml-5 rounded-md"
                onClick={() => router.push("/dashboard/report")}
              >
                Report page
              </button>
            </div>
            <button className="lg:block hidden uppercase px-2 py-1 bg-gray-200 text-green-700 font-semibold ml-5 rounded-md text-xs">
              Protected admin panel
            </button>
          </div>
          <div className="px-5 py-1 flex justify-start items-start mt-4 flex-col">
            <p>Sort by</p>
            <select
              className="px-2 py-1 rounded-md"
              onChange={(e: any) => setSortingName(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Education">Education</option>
              <option value="Food">Food & nutrition</option>
              <option value="Shelter">Shelter</option>
            </select>
          </div>
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
                    onChange={universalOnChangeFunc}
                  />
                  {nameError !== "" && (
                    <small className="text-red-700 block">{nameError}</small>
                  )}
                  <label htmlFor="donationImage" className="text-sm">
                    Donation Banner (Image)
                  </label>
                  <input
                    name="donationImage"
                    id="donationImage"
                    type="file"
                    className="w-full px-3 py-1 rounded-md focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
                    onChange={universalOnChangeFunc}
                  />
                  {imageError !== "" && (
                    <small className="text-red-700 block">{imageError}</small>
                  )}
                  <label htmlFor="donationCategory" className="text-sm">
                    Donation category
                  </label>
                  <select
                    className="w-full px-3 py-1 rounded-md focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
                    name="donationCategory"
                    id="donationCategory"
                    onChange={universalOnChangeFunc}
                  >
                    <option defaultChecked value="">
                      Select category
                    </option>
                    <option value="Education">Education</option>
                    <option value="Food">Food & Nutrition</option>
                    <option value="Shelter">Shelter</option>
                  </select>
                  {categoryError !== "" && (
                    <small className="text-red-700 block">
                      {categoryError}
                    </small>
                  )}

                  <div className="col-span-full">
                    <label htmlFor="donationDescription" className="text-sm">
                      Donation description
                    </label>
                    <textarea
                      id="donationDescription"
                      name="donationDescription"
                      placeholder="Enter description of this donation"
                      className="w-full px-3 py-1 rounded-md focus:border-green-700 focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
                      onChange={universalOnChangeFunc}
                    ></textarea>
                    {descriptionError !== "" && (
                      <small className="text-red-700 block">
                        {descriptionError}
                      </small>
                    )}
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
          {/* ************* for update this form will work *************  */}
          <dialog id="my_modal_4" className="modal bg-black" ref={modalRef2}>
            <p className="text-green-700 absolute top-28">
              Please update as per your need!!!
            </p>
            <form
              onSubmit={updateFormSubmission}
              method="dialog"
              className="modal-box bg-black shadow-2xl shadow-green-900 scale-125 duration-300 rounded-lg"
            >
              <div className="p-2">
                <p
                  onClick={closeUpdateForm}
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
                    value={name}
                    onChange={universalOnChangeFunc}
                  />
                  {nameError !== "" && (
                    <small className="text-red-700 block">{nameError}</small>
                  )}
                  <label htmlFor="donationImage" className="text-sm">
                    Donation Banner (Image)
                  </label>
                  <input
                    name="donationImage"
                    id="donationImage"
                    type="file"
                    className="w-full px-3 py-1 rounded-md focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
                    onChange={universalOnChangeFunc}
                  />
                  {imageError !== "" && (
                    <small className="text-red-700 block">{imageError}</small>
                  )}
                  <label htmlFor="donationCategory" className="text-sm">
                    Donation category
                  </label>
                  <select
                    className="w-full px-3 py-1 rounded-md focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
                    name="donationCategory"
                    id="donationCategory"
                    onChange={universalOnChangeFunc}
                    value={category}
                  >
                    <option value="">Select category</option>
                    <option value="Education">Education</option>
                    <option value="Food">Food & Nutrition</option>
                    <option value="Shelter">Shelter</option>
                  </select>
                  {categoryError !== "" && (
                    <small className="text-red-700 block">
                      {categoryError}
                    </small>
                  )}

                  <div className="col-span-full">
                    <label htmlFor="donationDescription" className="text-sm">
                      Donation description
                    </label>
                    <textarea
                      id="donationDescription"
                      name="donationDescription"
                      placeholder="Enter description of this donation"
                      className="w-full px-3 py-1 rounded-md focus:border-green-700 focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
                      onChange={universalOnChangeFunc}
                      value={description}
                    ></textarea>
                    {descriptionError !== "" && (
                      <small className="text-red-700 block">
                        {descriptionError}
                      </small>
                    )}
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
          {/* **************** showing all the donations in as card  ****************  */}
          <section>
            {isLoading ? (
              <div className="w-full h-24 flex justify-center items-center">
                <HashLoader color="#039855" />
              </div>
            ) : (
              <div>
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
                            onClick={() => updateHandler(donation)}
                            className="px-4 py-1 rounded bg-gray-200 hover:bg-green-700 duration-300 text-green-700 hover:text-gray-300 text-sm"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => deleteDonationHandle(donation._id)}
                            className="px-4 py-1 rounded bg-gray-200 hover:bg-green-700 duration-300 text-red-700 hover:text-gray-300 text-sm"
                          >
                            Delete
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
          </section>
        </div>
      ) : (
        <div>
          <div className="border-gray-200 bg-gray-800 bg-opacity-70 rounded-lg p-4 shadow-sm shadow-green-600">
            <p className="text-xl font-light text-gray-200 mb-2">
              Welcome to SADAKAH's Dashboard,{" "}
              <span className="text-green-700 font-semibold">
                {loggedInUserDetails.name}
              </span>{" "}
              !
            </p>
            <p className="mt-1 italic">
              Your kindness knows no bounds, and we are grateful for your
              generous heart. With every login, you inspire us with your
              dedication to making a positive impact in the world. Together, we
              are transforming lives and creating a better tomorrow. Thank you
              for being a beacon of hope and compassion. Your support empowers
              us to reach those in need and uplift communities around the globe.
              Your generosity truly makes a difference
            </p>
            <p className="text-sm mt-5 font-light text-gray-200">
              With heartfelt gratitude,
              <span className="text-green-700 font-semibold">
                The SADAKAH Team
              </span>{" "}
              !
            </p>
          </div>

          <div>
            <p className="text-green-700 font-semibold text-lg my-5 text-center">
              You've total donated for {userDonations.length}{" "}
              {userDonations.length === 1 ? "time" : "times"}
            </p>
            <div className="flex lg:w-3/4 w-[98%] justify-between mx-auto items-center border-b border-gray-200 mt-1 mb-2">
              <p className="text-lg w-3/4 font-semibold border-l border-gray-200 px-2 py-1">
                Donation name
              </p>
              <p className="text-lg w-1/4 font-semibold border-l border-gray-200 px-2 py-1">
                Donated amount
              </p>
            </div>
            {userDonations?.length > 0 &&
              userDonations.map((donation: IUserDonation, index: number) => (
                <div
                  key={index}
                  className="mx-auto lg:w-3/4 w-[98%] flex justify-between items-center border border-green-700 p-2"
                >
                  <p className="w-3/4 px-2 py-1 flex items-center gap-2">
                    <span>
                      <FaDonate />{" "}
                    </span>
                    {donation.donationName}
                  </p>
                  <p className="w-1/4 flex justify-start items-center px-2 py-1 border-l border-gray-200">
                    $ {donation.donatedAmount}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
