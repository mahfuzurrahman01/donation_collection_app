/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import blog1 from "../../../public/blog1.jpg";
import blog2 from "../../../public/blog2.jpg";
import blog3 from "../../../public/blog3.jpg";
import blog4 from "../../../public/blog4.jpg";
import blog5 from "../../../public/blog5.jpg";
import blog6 from "../../../public/blog6.jpg";
import blog7 from "../../../public/blog7.jpg";
const page = () => {
  return (
    <div>
      <h1 className="heading md:text-6xl text-4xl text-center my-5 font-extrabold uppercase bg-gradient-to-t from-gray-300 bg-green-700">
        Blog
      </h1>
      <section className="bg-black text-gray-100">
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <a
            rel="noopener noreferrer"
            href="#"
            className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-900"
          >
            <Image src={blog7} alt="poverty" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-500"/>
            <div className="p-6 space-y-2 lg:col-span-5">
              <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                We've recently visited in Rural area
              </h3>
              <span className="text-xs text-gray-400">February 19, 2021</span>
              <p>
              A rural area is an open swath of land that has few homes or other buildings, and not very many people. A rural areas population density is very low. Many people live in a city, or urban area. Their homes and businesses are located very close to one another.
              </p>
            </div>
          </a>
          <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <a
              rel="noopener noreferrer"
              href="#"
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-900"
            >
              <Image src={blog1} alt="poverty"    className="object-cover w-full rounded h-44 bg-gray-500"/>
              <div className="p-6 space-y-2">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  The homeless people
                </h3>
                <span className="text-xs text-gray-400">January 21, 2021</span>
                <p>
                An individual or family who lacks a fixed, regular, and adequate nighttime residence, such as those living in emergency shelters, transitional housing, or places not meant for habitation, or.
                </p>
              </div>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-900"
            >
               <Image src={blog2} alt="poverty"    className="object-cover w-full rounded h-44 bg-gray-500"/>
              <div className="p-6 space-y-2">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                There are several dustbin area
                </h3>
                <span className="text-xs text-gray-400">January 22, 2021</span>
                <p>
                Cities around the world are facing great challenges due to increasing urbanization, and one of the major challenges is the rising amount of generated waste and littering due to high demand for food products and other essentials. 
                </p>
              </div>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-900"
            >
              <Image src={blog3} alt="poverty"    className="object-cover w-full rounded h-44 bg-gray-500"/>
              <div className="p-6 space-y-2">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  Lack or mineral water
                </h3>
                <span className="text-xs text-gray-400">January 23, 2021</span>
                <p>
                By the time it was March last year, most of the rivers in Jharkhand had dried up. The once green Jharkhand, filled with dozens of rivers and tributaries and natural springs is slowly drying up. It is an industrial state, rich in minerals and forest produce.
                </p>
              </div>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-900 hidden sm:block"
            >
                <Image src={blog4} alt="poverty"    className="object-cover w-full rounded h-44 bg-gray-500"/>
              <div className="p-6 space-y-2">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  Poverty increasing day by day
                </h3>
                <span className="text-xs text-gray-400">January 24, 2021</span>
                <p>
                Eradicating poverty is not a task of charity, it’s an act of justice and the key to unlocking an enormous human potential. Still, nearly half of the world’s population lives in poverty, and lack of food and clean water is killing thousands every single day of the year.
                </p>
              </div>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-900 hidden sm:block"
            >
                <Image src={blog5} alt="poverty"    className="object-cover w-full rounded h-44 bg-gray-500"/>
              <div className="p-6 space-y-2">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  Poor uneducated children wants to learn
                </h3>
                <span className="text-xs text-gray-400">January 25, 2021</span>
                <p>
                Hunger is inextricably linked to a nexus of issues including: economic equality, health, education, social justice, the rights of women and girls and climate change. As an organization committed to growth through learning, we pay close attention to these issues.
                </p>
              </div>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-900 hidden sm:block"
            >
             <Image src={blog6} alt="poverty"    className="object-cover w-full rounded h-44 bg-gray-500"/>
              <div className="p-6 space-y-2">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  Homeless orphans
                </h3>
                <span className="text-xs text-gray-400">January 26, 2021</span>
                <p>
                Orphan means a person who don’t have father, mother or person to take care of them. The life of an orphan is very touching and pitiful. Orphans are not able to experience the love and care of their family. They don’t know the meaning of love,
                </p>
              </div>
            </a>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-md hover:underline bg-gray-900 text-gray-400"
            >
              Load more posts...
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
