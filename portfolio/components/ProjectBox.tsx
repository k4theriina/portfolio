"use client";


import { Koulen, Special_Elite } from "next/font/google";

const koulen = Koulen({
  subsets: ['latin'],
  weight: '400',
});
const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
});

export default function ProjectBox() {
    return (
        <div className="bg-kat-black p-4 aspect-[3/4] w-64 rounded-3xl mb-20">
            hi
        </div>
    );
}