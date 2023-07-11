/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Title from "../Title/Title";
import education from "../../../../public/education.jpg";
import hungry from "../../../../public/hungry.jpg";
import house from "../../../../public/house.jpg";
const Card = () => {
  return (
    <div className="mt-16">
      <div className="flex justify-center items-center gap-4 flex-col mb-5">
        <Title title="Our Causes" />
        <p>
          All of our causes are separated into{" "}
          <span className="text-green-700 text-lg">3 major categories.</span>
        </p>
      </div>
      <section className="p-4 lg:p-8 bg-black text-gray-100">
        <div className="container mx-auto space-y-12">
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
            <Image
              src={education}
              alt="3 children education"
              className="lg:w-[50%] h-80 bg-gray-500 aspect-video"
            />
            <div className="flex flex-col justify-center flex-1 p-6 bg-gray-900 bg-opacity-30">
              <span className="text-xs uppercase text-gray-400">
                Join, it's free
              </span>
              <h3 className="text-3xl font-bold uppercase">Education</h3>
              <p className="my-6 text-gray-400">
                You have the power to change lives and dismantle the poverty
                cycle, one child at a time. 100% of proceeds go towards creating
                better futures. As we expand our reach even more, support from
                people like you grows essential for us to provide all we can to
                impoverished students globally.
              </p>
              <button type="button" className="self-start border border-green-700 px-3 py-1 rounded-md hover:bg-white hover:text-green-700 duration-300 text-sm ">
                Donate now
              </button>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
            <Image
              src={hungry}
              alt="Hungry children"
              className="lg:w-[50%] h-80 bg-gray-500 aspect-video"
            />
            <div className="flex flex-col justify-center flex-1 p-6 bg-gray-900 bg-opacity-30">
              <span className="text-xs uppercase text-gray-400">
                Join, it's free
              </span>
              <h3 className="text-3xl font-bold uppercase">Food and nutrition</h3>
              <p className="my-6 text-gray-400">
                In the hospital in Ntamugenga, there is a pediatric ward,
                dealing, among others, with children with acute hunger disease,
                and a hunger disease center, taking care of children with
                diagnosed hunger disease. Apart from malaria, hunger is the
                biggest threat to life and health of the youngest.
              </p>
              <button type="button" className="self-start border border-green-700 px-3 py-1 rounded-md hover:bg-white hover:text-green-700 duration-300 text-sm ">
                Donate now
              </button>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
            <Image
              src={house}
              alt="home alone"
              className="lg:w-[50%] h-80 bg-gray-500 aspect-video"
            />
            <div className="flex flex-col justify-center flex-1 p-6 bg-gray-900 bg-opacity-30">
              <span className="text-xs uppercase text-gray-400">
                Join, it's free
              </span>
              <h3 className="text-3xl font-bold uppercase">Shelter</h3>
              <p className="my-6 text-gray-400">
                Every person deserves more than a mud hut with a thatched roof.
                We believe that everyone should have a safe place to sleep and a
                strong door to lock. This special place we call home gives us
                dignity and hope.
              </p>
              <button type="button" className="self-start border border-green-700 px-3 py-1 rounded-md hover:bg-white hover:text-green-700 duration-300 text-sm ">
                Donate now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
