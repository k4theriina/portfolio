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
    <div className="bg-kat-black w-1/4 rounded-3xl xl:w-1/3 h-fit flex flex-col items-center p-4 hover:scale-110 hover:shadow-lg hover:shadow-kat-purple transition-transform duration-300">
      <img
        className="rounded-xl w-3/4 aspect-square mt-2 object-cover"
        src={cover}
        alt={title}
      />
      <p className={`${specialElite.className} text-center mt-2 text-sm brightness-60`}>
        #{index + 1}
      </p>
      <h1 className="!text-base text-center">{title}</h1>
      <p className={`${specialElite.className} text-center text-sm brightness-60`}>
        {artist}
      </p>
    </div>
  );
}