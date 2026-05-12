/**
 * Edit this list to change what appears in “Things I like to do!”
 * Add as many entries as you want; the carousel handles more than 6 (desktop) or 3 (phone).
 */
export type ThingILikeToDo = {
  /** Path under `public/`, e.g. `/assets/photo.webp` */
  imageSrc: string;
  /** Short line shown next to the picture */
  label: string;
};

export const THINGS_I_LIKE_TO_DO: ThingILikeToDo[] = [
  { imageSrc: "/assets/guitarCat.png", label: "Playing music & unwinding" },
  { imageSrc: "/assets/UltimateKatPhoto.webp", label: "Hanging out with friends" },
  { imageSrc: "/assets/ThreeJSLogo.png", label: "Creative coding & 3D" },
  { imageSrc: "/assets/TLlogo.png", label: "Design & side projects" },
  { imageSrc: "/assets/BNYLogo.png", label: "Learning at internships" },
  { imageSrc: "/assets/ISTLogo.png", label: "Campus clubs & events" },
  { imageSrc: "/assets/ArbLogo.png", label: "Exploring new tools" },
  { imageSrc: "/assets/BgCat.png", label: "Quiet time with good books" },
];
