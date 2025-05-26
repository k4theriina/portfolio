import TopBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";
import { Koulen } from "next/font/google";
import { Jersey_10 } from "next/font/google";

const jersey10 = Jersey_10({
  subsets: ['latin'],
  weight: '400',
});

const koulen = Koulen({
  subsets: ['latin'],
  weight: '400',
});


export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className={`${koulen.className} bg-[url('/assets/bgimageHome.jpg')] bg-cover bg-bottom h-screen min-h-screen`}>
        <TopBar />
        <div className="flex flex-col space-y-5 items-center text-center justify-center mt-45">
          <p className="text-4xl md:text-5xl">Software Engineer</p>
          <h1 className="katherinaText pointer-events-none text-7xl md:text-[150px] relative">
              <img
                src="/assets/catears.png"
                className="catears-img absolute w-[230px] -top-10 -left-16 md:-top-20 md:-left-35 md:w-[500px] h-auto"
                alt="cat ears"
              />
              <img
                src="/assets/mewo.png"
                className="mewo-img absolute w-[230px] left-16 -top-50 md:left-210 md:w-[250px] h-auto"
                alt="mewo"
              />
              <img
                src="/assets/screamingcat.png"
                className="screamingcat-img absolute top-25 -left-0 w-[250px] h-auto"
                alt="screaming-cat"
              />
              <img
                src="/assets/sillycat.png"
                className="sillycat-img absolute top-25 right-10 w-[300px] h-auto"
                alt="silly-cat"
              />
              <img
                src="/assets/sparkle.svg"
                className="sparkle absolute top-15 -right-30 w-[150px] h-auto"
                alt="sparkle"
              />
              
            <span className="relative inline-block">
              Kat
            </span>
            herina Dayaon
          </h1>
          <button className={`hover:bg-white hover:text-kat-purple cursor-pointer ${jersey10.className} bg-kat-purple py-2 px-7 rounded-2xl text-3xl md:text-6xl`}>DISCOVERY</button>
        </div>
      </div>
      <div>
        <BottomBar />
      </div>
    </div>
  );
}
