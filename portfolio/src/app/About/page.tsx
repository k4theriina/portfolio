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

export default function About() {
    return (
        <div className="min-h-screen overflow-hidden">
            <div className={`${koulen.className} bg-[url('/assets/bgimageAbout.jpg')] bg-cover bg-top h-screen min-h-screen relative`}>
                <TopBar></TopBar>
                <div className="flex-start">
                    <img className="h-150 w-auto absolute bottom-0 left-20" src="assets/meTransparent.png"></img>
                </div>
                <div className="flex-end">
                    <h1 className={`${specialElite.className}`}>Hi there, I'm</h1>
                </div>
            </div>
            <div>
                <BottomBar />
            </div>
        </div>
    );
}