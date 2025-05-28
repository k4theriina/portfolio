import { Koulen, Special_Elite } from "next/font/google";

const koulen = Koulen({
  subsets: ['latin'],
  weight: '400',
});
const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
});

export default function Songbox() {
    const numPlays = 532;
    const Title = "Girl";
    return (
        <div className="bg-kat-black w-1/4 h-1/4 sm:h-1/3 md:h-75 lg:h-1/4 rounded-3xl xl:w-1/3 xl:h-55">
            <div className="aspect-square bg-white rounded-xl mt-5 mx-4 md:h-45 md:place-self-center lg:h-24 lg:place-self-center xl:h-30 xl:place-self-center"></div>
            <p className={`${specialElite.className} text-center mt-2 !text-sm brightness-60`}>#1</p>
            <h1 className="!text-base text-center">{Title}</h1>
            <p className={`${specialElite.className} text-center !text-sm brightness-60`}>{numPlays} plays</p>
        </div>
    );
}