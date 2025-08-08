import { Koulen, Special_Elite } from "next/font/google";

const koulen = Koulen({
  subsets: ['latin'],
  weight: '400',
});
const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
});


export default function BottomBar() {

    const openNewTab = (url: string) => {
        window.open(url, '_blank');
    };

     return (
    <div className="relative z-500 w-full bg-kat-black px-6 py-4 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left text */}
        <p className={`text-sm ${specialElite.className} hidden md:block`}>
          thanks for visiting !! ^_^
        </p>

        {/* Icon buttons */}
        <div className="flex space-x-6 items-center">
          <button onClick={() => openNewTab('/assets/KatherinaDayaon_Resume.pdf')}>
            <img className="hover:brightness-200 cursor-pointer w-12 h-12" src="/assets/resume.svg" alt="Resume" />
          </button>
          <button onClick={() => openNewTab('https://www.linkedin.com/in/katherina-dayaon/')}>
            <img className="hover:brightness-200 cursor-pointer w-14 h-14" src="/assets/linkedIn.svg" alt="LinkedIn" />
          </button>
          <button onClick={() => openNewTab('https://github.com/k4theriina')}>
            <img className="hover:brightness-200 cursor-pointer w-12 h-12" src="/assets/github.svg" alt="GitHub" />
          </button>
        </div>

        {/* Right text */}
        <p className={`text-sm text-center md:text-right ${specialElite.className}`}>
          © 2025 Katherina J. Dayaon
        </p>
      </div>
    </div>
  );

}