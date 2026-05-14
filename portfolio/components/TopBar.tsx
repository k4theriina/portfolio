"use client";

import { Jersey_10 } from "next/font/google";
import PageButton from "./PageButton";
import TopBarMusic from "./TopBarMusic";
import { usePathname, useRouter } from "next/navigation";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const jersey10 = Jersey_10({
  subsets: ['latin'],
  weight: '400',
});

export default function TopBar() {
    const pathname = usePathname();
    const router = useRouter();

    const openNewTab = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div className={`${jersey10.className} w-full flex flex-wrap items-center gap-3 bg-kat-black p-4 text-3xl md:flex-nowrap md:items-center`}>
            <div className="flex min-w-0 shrink items-center gap-3 md:gap-5">
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
                {/* Match globals.css: .directory is hidden at max-width 1081px */}
                <div className="hidden min-h-[3.25rem] min-w-0 max-w-[min(70vw,22rem)] shrink sm:max-w-xl min-[1082px]:block">
                    <TopBarMusic variant="toolbar" />
                </div>
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

            <div className="menu ml-auto shrink-0 md:hidden pr-4">
                <Popover key={pathname} className="relative">
                    <PopoverButton className="cursor-pointer hover:text-kat-purple">
                        <span>☰</span>
                    </PopoverButton>

                    <PopoverPanel
                        transition
                        className="fixed inset-0 z-50 flex max-h-[100dvh] flex-col bg-kat-black text-white"
                    >
                        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 bg-kat-black px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
                            <div className="group min-w-0 shrink hover:text-kat-purple">
                                <button
                                    type="button"
                                    onClick={() => router.push("/")}
                                    className="relative flex min-h-16 cursor-pointer items-center pl-14"
                                >
                                    <img
                                        className="pointer-events-none absolute left-0 top-1/2 h-16 w-16 -translate-y-1/2 group-hover:hidden"
                                        src="/assets/catHead.png"
                                        alt=""
                                    />
                                    <img
                                        className="pointer-events-none absolute left-0 top-1/2 hidden h-16 w-16 -translate-y-1/2 group-hover:block"
                                        src="/assets/catHeadHover.png"
                                        alt=""
                                    />
                                    <span className="truncate text-left text-2xl leading-tight">
                                        Katherina Dayaon
                                    </span>
                                </button>
                            </div>
                            <PopoverButton
                                type="button"
                                className="shrink-0 cursor-pointer px-2 py-1 text-4xl font-bold leading-none text-white hover:text-kat-purple"
                                aria-label="Close menu"
                            >
                                ✕
                            </PopoverButton>
                        </div>
                        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
                            <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 text-center">
                                <PageButton label="Home" />
                                <PageButton label="About" />
                                <PageButton label="Experience" />
                                <PageButton label="Projects" />
                                <div className="w-full border-t border-white/15 pt-6">
                                    <TopBarMusic variant="menu" />
                                </div>
                                <div className="mt-2 flex items-center justify-center space-x-5 align-middle text-lg">
                                    <button
                                        type="button"
                                        onClick={() => openNewTab("/assets/KatherinaDayaon_Resume.pdf")}
                                    >
                                        <img
                                            className="cursor-pointer hover:brightness-200"
                                            src="/assets/resume.svg"
                                            alt=""
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => openNewTab("https://www.linkedin.com/in/katherina-dayaon/")}
                                    >
                                        <img
                                            className="cursor-pointer hover:brightness-200"
                                            src="/assets/linkedIn.svg"
                                            alt=""
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => openNewTab("https://github.com/k4theriina")}
                                    >
                                        <img
                                            className="cursor-pointer hover:brightness-200"
                                            src="/assets/github.svg"
                                            alt=""
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </PopoverPanel>
                </Popover>
            </div>
        </div>

    );
}
