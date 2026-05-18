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
  { imageSrc: "/assets/drawing.webp", label: "Drawing!!! Check out some of my art below :3" },
  { imageSrc: "/assets/music.webp", label: "Making music (I've hidden my bandcamp somewhere here...)" },
  { imageSrc: "/assets/crochet.webp", label: "Crocheting! I've made sweaters and bags :D" },
  { imageSrc: "/assets/coding.webp", label: "Developing awesome websites! You're looking at one 😎" },
  { imageSrc: "/assets/people.webp", label: "Meeting & connecting with new people!" },
  { imageSrc: "/assets/eating.webp", label: "Eating good food 🤤..." },
  { imageSrc: "/assets/games.webp", label: "Playing awesome games! (Currently playing tomadachi life)" },
  { imageSrc: "/assets/exploring.webp", label: "Exploring new places!" },
  { imageSrc: "/assets/projects.webp", label: "Make cool projects (check out my projects page on the top right!)" },
];
