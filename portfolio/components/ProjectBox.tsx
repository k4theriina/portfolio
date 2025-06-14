"use client";

import React from "react";
import { JSX } from "react";
import { Koulen, Special_Elite } from "next/font/google";
import { FaReact } from "react-icons/fa";
import { SiFigma, SiTailwindcss } from "react-icons/si";

const techIcons: { [key: string]: JSX.Element } = {
  React: <FaReact className="text-sky-400 w-8 h-8" />,
  Figma: <SiFigma className="text-pink-500 w-8 h-8" />,
  Tailwind: <SiTailwindcss className="text-teal-400 w-8 h-8" />,
};

const koulen = Koulen({
  subsets: ['latin'],
  weight: '400',
});
const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
});

type ProjectData = {
    title: string;
    gif: string;
    description: string;
    technologies: string[];
}

export const ProjectBox: React.FC<ProjectData> = ({title, gif, description, technologies}) => {
    return (
        <div className="bg-kat-black aspect-[3/4] w-64 rounded-3xl flex flex-col items-center">
            <h1 className={`!text-2xl mb-2 mt-4`} >{title}</h1>
            {/* Gif of project */}
            <img className="aspect-square rounded-3xl h-55" src={gif} alt={title} ></img>
            <div className="bg-linear-to-t to-[#1C1A31] from-kat-black h-1/2 w-full mt-4 rounded-4xl p-4 border-x-12 border-b-10 border-kat-black">
              {/* Description of project */}  
              <p className={`${specialElite.className} text-sm`}>{description}</p>
              {/* Technologies used */}
              <div className="flex flex-row space-x-2 justify-center items-center mt-5">
                {technologies.map((tech) => (
                  <div key={tech}>
                    {techIcons[tech]}
                  </div>
                ))}
              </div>

            </div>
        </div>
    );
}

export default ProjectBox;