"use client";

import TopBar from "../../../components/TopBar";
import BottomBar from "../../../components/BottomBar";

import { Koulen, Special_Elite } from "next/font/google";

const koulen = Koulen({
  subsets: ['latin'],
  weight: '400',
});
const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
});

export default function Projects() {
    return (
        <div className="min-h-screen overflow-hidden w-full">
            <div className={`${koulen.className} bg-[url('/assets/bgimageExp.jpg')] bg-fixed bg-center w-full`}>
                <TopBar />
                <div className="relative flex flex-col items-center text-center px-6 pt-10 pb-32">
                    hi
                </div>
                <BottomBar />
            </div>
        </div>
    );
}