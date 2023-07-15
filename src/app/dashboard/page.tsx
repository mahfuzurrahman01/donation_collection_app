"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import { IUserInfo } from "@/Types/type";
import { useRouter } from "next/navigation";
import FormData from "form-data";
const page = () => {
  const router = useRouter();
  const modalRef = useRef<HTMLDialogElement>(null);
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState<IUserInfo>({} as IUserInfo);
  // this function will fetch the login user data from backend
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response: any = await axios.get("http://localhost:5000/checkRole", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.ok) {
        setUserDetails(response.data.userInfo);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid]);
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
          console.log("API response ↓");
          console.log(response);
        })
        .catch((err) => {
          console.log("API error ↓");
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };
  // form submission handle
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const image = event.target.image.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    uploadImageToImgbb(formData);
  };

  return (
    <div>
      <button className="btn" onClick={() => modalRef.current?.showModal()}>
        Create Donation
      </button>
      <dialog id="my_modal_3" className="modal bg-black" ref={modalRef}>
        <form
          onSubmit={handleSubmit}
          method="dialog"
          className="modal-box bg-black shadow-2xl shadow-green-900 scale-125 duration-300 rounded-lg"
        >
          <div className="p-2">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-gray-600 bg-opacity-20">
              ✕
            </button>
            <div>
              <label htmlFor="donationName" className="text-sm">
                Donation Name (Title)
              </label>
              <input
                id="donationName"
                type="text"
                placeholder="Enter donation name here"
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
                <option value="Shelter">Education</option>
              </select>
              <label htmlFor="donationImage" className="text-sm">
                Donation Banner (Image)
              </label>
              <input
                name="image"
                id="donationImage"
                type="file"
                className="w-full px-3 py-1 rounded-md focus:ring focus:ri focus:ri bg-gray-900 bg-opacity-70 mb-3 mt-1"
              />
              <div className="col-span-full">
                <label htmlFor="donationDescription" className="text-sm">
                  Donation Banner (Image)
                </label>
                <textarea
                  id="donationDescription"
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
    </div>
  );
};

export default page;
