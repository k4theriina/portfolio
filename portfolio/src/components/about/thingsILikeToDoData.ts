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
  { imageSrc: "/assets/guitarCat.png", label: "Drawing!!! Check out some of my art below :3" },
  { imageSrc: "/assets/UltimateKatPhoto.webp", label: "Making music (I've hidden my bandcamp somewhere here...)" },
  { imageSrc: "/assets/ThreeJSLogo.png", label: "Crocheting! I've made sweaters and bags :D" },
  { imageSrc: "/assets/TLlogo.png", label: "Developing websites! You're looking at one B)" },
  { imageSrc: "/assets/BNYLogo.png", label: "Meeting & connecting with new people!" },
  { imageSrc: "/assets/ISTLogo.png", label: "Eating good food :droolemoji..." },
  { imageSrc: "/assets/ArbLogo.png", label: "Playing awesome games! (Currently playing tomadachi life)" },
  { imageSrc: "/assets/BgCat.png", label: "Exploring new places!" },
  { imageSrc: "/assets/BgCat.png", label: "Hanging out with my sibs" },
  { imageSrc: "/assets/BgCat.png", label: "Make cool projects (check out the projects page on the top right!)" },
];
