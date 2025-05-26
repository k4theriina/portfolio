import { Jersey_10 } from "next/font/google";
import PageButton from "./PageButton";

const jersey10 = Jersey_10({
  subsets: ['latin'],
  weight: '400',
});


export default function TopBar() {
    return (
        <div className={`${jersey10.className} w-full flex bg-kat-black p-4 max-h-20 justify-between items-center flex-row text-3xl`}>
            <div className="group hover:text-kat-purple">
                <button className="flex space-x-4 items-center relative cursor-pointer">
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
                <span className="pl-20">Katherina Dayaon</span> 
                </button>
            </div>

            <div className="hidden md:flex space-x-3 md:space-x-15">
                <PageButton label="Home" />
                <PageButton label="About" />
                <PageButton label="Experience" />
                <PageButton label="Projects" />
            </div>

            <div className="md:hidden pr-4">
                <button className="cursor-pointer">☰</button>
            </div>
        </div>

    );
}
