import Image from "next/image";
import banner from "../../public/banner.jpg";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Stats from "@/components/Shared/Stats/Stats";
import Card from "@/components/Shared/Card/Card";
export default function Home() {
  
  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="flex  flex-col justify-center gap-4 items-center text-center mt-16 w-[85%]">
          <h1
            
            className="heading md:text-9xl text-5xl font-extrabold uppercase bg-gradient-to-t from-gray-300 bg-green-700"
          >
            Save the Humanity
          </h1>

          <p className="md:text-2xl text-md font-light">
            Sadaqah is one of the many ways of giving charity to those who are
            displaced, lack food and water, orphans, or people living without a
            home.
          </p>
          <button className="bg-gray-300 rounded-md text-green-700 px-7 hover:bg-green-700 hover:text-gray-300 duration-300 hover:font-semibold py-2 uppercase mt-5">
            Donate
          </button>
          <div className="flex justify-center items-center gap-4 mt-5">
            <FaFacebook className="text-4xl border rounded-full p-2 text-green-700 hover:shadow-green-700 duration-300 hover:shadow-xl" />
            <FaInstagram className="text-4xl border rounded-full p-2 text-green-700 hover:shadow-green-700 duration-300 hover:shadow-xl" />
            <FaLinkedinIn className="text-4xl border rounded-full p-2 text-green-700 hover:shadow-green-700 duration-300 hover:shadow-xl" />
            <FaTwitter className="text-4xl border rounded-full p-2 text-green-700 hover:shadow-green-700 duration-300 hover:shadow-xl" />
          </div>
        </div>
      </div>
      <div>
        {/* <Stats /> */}
        <Card />
      </div>
    </div>
  );
}
