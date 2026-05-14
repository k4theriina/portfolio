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
        <div
            className={`${jersey10.className} flex w-full flex-nowrap items-center justify-between gap-2 bg-kat-black px-3 py-2 text-3xl sm:gap-3 sm:px-4 sm:py-3 md:items-center`}
        >
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:flex-none md:gap-5 xl:gap-6">
                <div className="group min-w-0 shrink hover:text-kat-purple">
                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="flex max-w-full min-w-0 cursor-pointer items-center gap-2 sm:gap-3 xl:gap-4"
                    >
                        <span className="relative h-11 w-11 shrink-0 sm:h-14 sm:w-14 min-[1082px]:h-16 min-[1082px]:w-16 xl:h-20 xl:w-20 2xl:h-[5.25rem] 2xl:w-[5.25rem]">
                            <img
                                className="pointer-events-none absolute inset-0 h-full w-full object-contain group-hover:hidden"
                                src="/assets/catHead.png"
                                alt="cat icon"
                            />
                            <img
                                className="pointer-events-none absolute inset-0 hidden h-full w-full object-contain group-hover:block"
                                src="/assets/catHeadHover.png"
                                alt="cat icon happy"
                            />
                        </span>
                        <span className="min-w-0 truncate text-base leading-tight sm:text-2xl min-[1082px]:text-3xl xl:text-4xl 2xl:text-5xl">
                            Katherina Dayaon
                        </span>
                    </button>
                </div>
                {/* Inline nav + music only from 1082px up (matches globals .menu / old .directory breakpoint) */}
                <div className="hidden min-h-[3.25rem] min-w-0 max-w-[min(70vw,22rem)] shrink sm:max-w-xl min-[1082px]:block">
                    <TopBarMusic variant="toolbar" />
                </div>
            </div>

            <div className="directory hidden shrink-0 items-center space-x-10 min-[1082px]:flex">
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

            <div className="menu shrink-0 md:hidden">
                <Popover key={pathname} className="relative">
                    <PopoverButton className="cursor-pointer p-1 leading-none hover:text-kat-purple">
                        <span>☰</span>
                    </PopoverButton>

                    <PopoverPanel
                        transition
                        className="fixed inset-0 z-50 flex max-h-[100dvh] flex-col bg-kat-black text-white"
                    >
                        <div className="relative flex w-full shrink-0 items-center gap-2 border-b border-white/10 bg-kat-black px-4 pb-3 pr-14 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pr-16">
                            <div className="group shrink-0">
                                <button
                                    type="button"
                                    onClick={() => router.push("/")}
                                    className="relative block h-14 w-14 shrink-0 cursor-pointer p-0 sm:h-16 sm:w-16"
                                    aria-label="Home"
                                >
                                    <img
                                        className="pointer-events-none absolute inset-0 h-full w-full object-contain group-hover:hidden"
                                        src="/assets/catHead.png"
                                        alt=""
                                    />
                                    <img
                                        className="pointer-events-none absolute inset-0 hidden h-full w-full object-contain group-hover:block"
                                        src="/assets/catHeadHover.png"
                                        alt=""
                                    />
                                </button>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-center px-2">
                                <button
                                    type="button"
                                    onClick={() => router.push("/")}
                                    className="max-w-full cursor-pointer text-center hover:text-kat-purple"
                                >
                                    <span className="block truncate text-2xl leading-tight">
                                        Katherina Dayaon
                                    </span>
                                </button>
                            </div>
                            <PopoverButton
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 shrink-0 cursor-pointer px-2 py-1 text-4xl font-bold leading-none text-white hover:text-kat-purple sm:right-4"
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
