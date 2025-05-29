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

export default function Experience() {
    return (
        <div className="min-h-screen h-full">
            <div className={`${koulen.className} bg-[url('/assets/bgimageExp.jpg')] bg-local h-650 min-w-100`}>
                <TopBar></TopBar>
                <div className="h-615">
                    <img className="absolute z-0 top-20 " src="/assets/paperBubble.png">
                    </img>
                    <h1 className="absolute z-40 left-2/7 top-1/4 text-kat-purple">Experience</h1>
                    <p className={`${specialElite.className} text-xs absolute z-40 ml-20 top-60 mr-20 text-kat-black text-center`}>As a first year, I’m actively seeking opportunities to explore and learn more within the field of Computer Science. Below is a brief overview of experience I’ve had so far in both CS and leadership.
</p>
                </div>
                <BottomBar></BottomBar>
            </div>
        </div>
    );
}