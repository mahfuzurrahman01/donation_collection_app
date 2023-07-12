import Image from "next/image";
import story from "../../../public/story.jpg";
/* eslint-disable react/no-unescaped-entities */
const page = () => {
  return (
    <div className="lg:my-12 my-5">
      <h1 className="heading md:text-6xl text-4xl lg:text-left text-center my-5 font-extrabold uppercase bg-gradient-to-t from-gray-300 bg-green-700">
        Our story
      </h1>
      <div className="flex lg:flex-row flex-col-reverse justify-center items-center gap-5">
        <div className="lg:p-4 p-2 lg:w-[60%] w-full">
          <p>
            <span className="text-xl uppercase text-green-700">Sadakah</span>{" "}
            runs all operations and programs based on donations. We need your
            help! Your donations go directly towards helping our members by
            maintaining our open source software and infrastructure where an
            immersive learning environment helps members grow their skills while
            contributing to code repositories. We also provide free learning
            licenses, develop hiring pipelines, and provide professional
            training and development for mentors and volunteers. Your donations
            also helps our community reduce the risk facing our transitioning
            military, military spouses and military veterans by growing social
            connectedness, building camaraderie and teaching tangible technical
            and personal skills that combat chronic unemployment, homelessness,
            and suicide. You're providing members with the opportunity to learn
            software development, enter the tech industry, and Deploy The
            Future! As the largest community of military veterans, service
            members, and military families, we are over 8000 strong and have
            both the technical and military transitioning experience and helped
            thousands of members enter into the tech occupation and industry. 
          </p>
        </div>
        <Image
          src={story}
          alt="story telling children"
          className="lg:w-[40%] w-full lg:h-[400px] h-[300px] rounded-xl"
        />
      </div>
    </div>
  );
};

export default page;
