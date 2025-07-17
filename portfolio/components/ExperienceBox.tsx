import React from "react";
import { Koulen, Special_Elite } from "next/font/google";
import { useInView } from "./useInView";

const koulen = Koulen({
  subsets: ["latin"],
  weight: "400",
});
const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
});

type ExperienceBoxProps = {
  title: string;
  date: string;
  organization: string;
  image: string;
  description: string;
};

const ExperienceBox: React.FC<ExperienceBoxProps> = ({
  title,
  date,
  organization,
  image,
  description,
}) => {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-1000 ease-out delay-100
        ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        hover:scale-110 hover:shadow-lg hover:shadow-kat-purple
        bg-linear-to-t from-[#25223E] to-kat-black from-10% to-90%
        text-white rounded-xl p-8 w-3/4 max-w-md md:max-w-225 mx-auto
        border-l-4 border-kat-purple flex flex-col text-left
      `}
    >
      <div className="flex flex-row items-start">
        {image && (
          <img
            src={image}
            alt={`${organization} logo`}
            className="w-16 h-16 lg:w-25 lg:h-25 object-contain mb-4 sm:mb-0 sm:mr-4"
          />
        )}
        <div className={`${specialElite.className} flex flex-col ml-2`}>
          <p className="text-sm md:text-lg italic">{date}</p>
          <h2
            className={`${koulen.className} text-xl lg:text-4xl font-bold text-kat-purple`}
          >
            {title}
          </h2>
          <p className="text-sm md:text-lg">{organization}</p>
        </div>
      </div>

      <div>
        <p
          className={`${specialElite.className} text-sm mt-5 lg:max-w-5/6 lg:text-lg`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default ExperienceBox;
