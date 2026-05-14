"use client";

import { Jersey_10 } from "next/font/google";
import PageButton from "./PageButton";
import TopBarMusic from "./TopBarMusic";
import { useRouter } from "next/navigation";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

const jersey10 = Jersey_10({
  subsets: ['latin'],
  weight: '400',
});

export default function TopBar() {

    const router = useRouter();

    const openNewTab = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div className={`${jersey10.className} w-full flex flex-wrap items-center gap-3 bg-kat-black p-4 text-3xl md:flex-nowrap md:items-center`}>
            <div className="group shrink-0 hover:text-kat-purple">
                <button onClick={() => router.push("/")} className="flex space-x-4 items-center relative cursor-pointer">
                <img
                    className="group-hover:hidden w-16 h-16 absolute"
                    src="/assets/catHead.png"
                    alt="cat icon"
                />
                <img
                    className="hidden group-hover:block w-16 h-16 absolute"
                    src="/assets/catHeadHover.png"
                    alt="cat icon happy"
                />
                <span className="pl-15 min-w-66">Katherina Dayaon</span> 
                </button>
            </div>

            <div className="hidden min-h-[3.25rem] min-w-0 flex-1 justify-center px-2 md:flex lg:max-w-2xl xl:max-w-3xl">
                <TopBarMusic />
            </div>

            <div className="directory ml-auto hidden shrink-0 items-center space-x-10 md:flex">
                <div className="space-x-3 md:space-x-15">
                    <PageButton label="Home" />
                    <PageButton label="About" />
                    <PageButton label="Experience" />
                    <PageButton label="Projects" />
                </div>
                <div className = "flex justify-center space-x-5 items-center align-middle text-lg md:text-3xl">
                    <button onClick={() => openNewTab('/assets/KatherinaDayaon_Resume.pdf')}>
                        <img className="hover:brightness-200 cursor-pointer" src="/assets/resume.svg"></img>
                    </button>
                    <button onClick={() => openNewTab('https://www.linkedin.com/in/katherina-dayaon/')}>
                        <img className="hover:brightness-200 cursor-pointer"src="/assets/linkedIn.svg"></img>
                    </button>
                    <button onClick={() => openNewTab('https://github.com/k4theriina')}>
                        <img className="hover:brightness-200 cursor-pointer" src="/assets/github.svg"></img>
                    </button>
                    
                </div>
            </div>

            <div className="menu md:hidden pr-4">
                <Popover className="relative">
                    <PopoverButton className="cursor-pointer hover:text-kat-purple">
                        <span>☰</span>
                    </PopoverButton>

                    <PopoverPanel className="w-screen h-screen bg-kat-black">
                        <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-kat-black text-white flex flex-col items-center justify-center space-y-6">
                            <div className="group hover:text-kat-purple absolute top-4 left-4">
                                <button onClick={() => router.push("/")} className="flex space-x-4 items-center relative cursor-pointer">
                                <img
                                    className="group-hover:hidden w-16 h-16 absolute"
                                    src="/assets/catHead.png"
                                    alt="cat icon"
                                />
                                <img
                                    className="hidden group-hover:block w-16 h-16 absolute"
                                    src="/assets/catHeadHover.png"
                                    alt="cat icon happy"
                                />
                                <span className="pl-10 min-w-66">Katherina Dayaon</span> 
                                </button>
                            </div>
                            <div className="absolute top-4 right-8">
                                <PopoverButton className="cursor-pointer z-51 text-4xl font-bold text-white hover:text-kat-purple">
                                    ✕
                                </PopoverButton>
                            </div>
                            <PageButton label="Home" />
                            <PageButton label="About" />
                            <PageButton label="Experience" />
                            <PageButton label="Projects" />
                            <div className = "mt-6 flex justify-center space-x-5 items-center align-middle text-lg md:text-3xl">
                                <button onClick={() => openNewTab('/assets/KatherinaDayaon_Resume.pdf')}>
                                    <img className="hover:brightness-200 cursor-pointer" src="/assets/resume.svg"></img>
                                </button>
                                <button onClick={() => openNewTab('https://www.linkedin.com/in/katherina-dayaon/')}>
                                    <img className="hover:brightness-200 cursor-pointer"src="/assets/linkedIn.svg"></img>
                                </button>
                                <button onClick={() => openNewTab('https://github.com/k4theriina')}>
                                    <img className="hover:brightness-200 cursor-pointer" src="/assets/github.svg"></img>
                                </button>
                                
                            </div>
                        </div>
                    </PopoverPanel>

                </Popover>
            </div>
        </div>

    );
}
