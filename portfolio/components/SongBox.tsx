import { Koulen, Special_Elite } from "next/font/google";

type Props = {
  index: number;
  title: string;
  artist: string;
  cover: string;
};

const koulen = Koulen({
  subsets: ['latin'],
  weight: '400',
});
const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
});

export default function Songbox({ index, title, artist, cover }: Props) {
  return (
    <div className="bg-kat-black w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56 rounded-2xl h-fit flex flex-col items-center p-3 hover:scale-110 hover:shadow-lg hover:shadow-kat-purple transition-transform duration-300">
      <img
        className="rounded-xl w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 aspect-square mt-2 object-cover"
        src={cover}
        alt={title}
      />
      <p className={`${specialElite.className} text-center mt-2 text-xs sm:text-sm brightness-60`}>
        #{index + 1}
      </p>
      <h1 className="!text-sm sm:!text-base text-center truncate">{title}</h1>
      <p className={`${specialElite.className} text-center text-xs sm:text-sm brightness-60 truncate`}>
        {artist}
      </p>
    </div>
  );
}
