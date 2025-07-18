"use client";

import React from "react";
import { JSX } from "react";
import { Koulen, Special_Elite } from "next/font/google";
import { FaReact, FaPython } from "react-icons/fa";
import { SiFigma, SiTailwindcss, SiTypescript} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { FaFlutter } from "react-icons/fa6";

const techIcons: { [key: string]: JSX.Element } = {
  React: <FaReact className="text-sky-400 w-8 h-8" />,
  Figma: <SiFigma className="text-pink-500 w-8 h-8" />,
  Tailwind: <SiTailwindcss className="text-teal-400 w-8 h-8" />,
  Typescript: <SiTypescript className="text-blue-500 w-8 h-8"/>,
  Javascript: <IoLogoJavascript className="text-yellow-500 w-8 h-8"/>,
  Python: <FaPython className="text-blue-600 w-8 h-8"/>,
  Flutter: <FaFlutter className="text-cyan-500 w-8 h-8"/>
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
    caption: string;
    technologies: string[];
    link: string;
}

export const ProjectBox: React.FC<ProjectData> = ({title, gif, description, caption, technologies, link}) => {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        >
        <div className="bg-kat-black aspect-[3/4] w-64 rounded-3xl flex flex-col items-center hover:scale-110 hover:shadow-lg hover:shadow-kat-purple transition-transform duration-300
">
            <h1 className={`!text-2xl mb-2 mt-4`} >{title}</h1>
            {/* Gif of project */}
            <video
              className="aspect-square rounded-3xl h-55 object-cover"
              src={gif}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
            />
            <div className="bg-linear-to-t to-[#1C1A31] from-kat-black h-55 w-full mt-4 rounded-4xl p-4 border-x-12 border-b-10 border-kat-black">
              {/* Description of project */}  
              <p className={`${specialElite.className} text-sm`}>{description}</p>
              <p className={`${koulen.className} text-sm mt-2 mb-2`}>{caption}</p>
              {/* Technologies used */}
              <div className="icons mt-3 flex flex-row space-x-2 justify-center items-center place-items-end">
                {technologies.map((tech) => (
                  <div key={tech}>
                    {techIcons[tech]}
                  </div>
                ))}
              </div>

            </div>
        </div>
      </a>
    );
}

export default ProjectBox;