import Image from "next/image";
import bg from "../../public/blog7.jpg";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Stats from "@/components/Shared/Stats/Stats";
import Card from "@/components/Shared/Card/Card";
import Link from "next/link";

export default function Home() {

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="flex  flex-col justify-center gap-4 items-center text-center mt-16 w-[85%]">
          <h1
            style={{
              backgroundImage: `url(${bg.src})`,
              // backgroundImage: `url(${externalImage})`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="heading md:text-9xl text-5xl font-extrabold uppercase"
          >
            Save the Humanity
          </h1>

          <p className="md:text-2xl text-md font-light">
            Sadaqah is one of the many ways of giving charity to those who are
            displaced, lack food and water, orphans, or people living without a
            home.
          </p>
          <button className="bg-gray-300 rounded-md text-green-700 px-7 hover:bg-green-700 hover:text-gray-300 duration-300 hover:font-semibold py-2 uppercase mt-5">
            <Link href="/causes">Donate now</Link>
          </button>
       
          <div className="flex justify-center items-center gap-4 mt-5">
            <FaFacebook className="text-4xl border-0 bg-gray-900 bg-opacity-50 rounded-full p-2 text-green-700 hover:shadow-green-700 duration-300 hover:shadow-xl" />
            <FaInstagram className="text-4xl border-0 bg-gray-900 bg-opacity-50 rounded-full p-2 text-green-700 hover:shadow-green-700 duration-300 hover:shadow-xl" />
            <FaLinkedinIn className="text-4xl border-0 bg-gray-900 bg-opacity-50 rounded-full p-2 text-green-700 hover:shadow-green-700 duration-300 hover:shadow-xl" />
            <FaTwitter className="text-4xl border-0 bg-gray-900 bg-opacity-50 rounded-full p-2 text-green-700 hover:shadow-green-700 duration-300 hover:shadow-xl" />
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
