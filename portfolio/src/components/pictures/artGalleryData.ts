/**
 * Edit this list for the “my art” gallery.
 * - `src`: image used in the masonry grid (use a smaller file when possible for speed).
 * - `fullSrc`: optional; shown in the lightbox at full width. Defaults to `src`.
 *   If it has different dimensions than `src`, update `width` / `height` to match `fullSrc` for correct lightbox aspect.
 * - `width` / `height`: real pixel size of `src` (keeps layout stable and helps `next/image`).
 * - `date`: Shown in the lightbox (any string, e.g. "March 2025" or "2025-03-12").
 * - `description`: Plain text; any `https://` links become clickable and open in a new tab.
 * - `unoptimized`: set true for animated WebP/GIF (Next cannot optimize those). For optimized delivery,
 *   use a static WebP/JPEG/AVIF, or use MP4/WebM in a `<video>` if you need motion.
 */
export type ArtPiece = {
  id: string;
  src: string;
  fullSrc?: string;
  title: string;
  date: string;
  description: string;
  width: number;
  height: number;
  /** Animated formats: Next image optimizer skips these; set true to silence the warning. */
  unoptimized?: boolean;
};

export const MY_ART: ArtPiece[] = [
  {
    id: "1",
    src: "/assets/art1.webp",
    title: "So what?",
    date: "November 2024",
    description:
      "I made this piece because there's really nothing 'ugly' about growing old. If anything, it's a beautiful show of perseverance and the continuity of life. Wrinkles and smile lines are simply proof of a life lived.",
    width: 800,
    height: 1000,
  },
  {
    id: "2",
    src: "/assets/art2.webp",
    title: "Unknown Woman",
    date: "May 2025",
    description:
      "I was bored one day and decided to sketch a random girl and choose whatever colors came to mind. I think it turned out pretty well!",
    width: 1200,
    height: 800,
    unoptimized: true,
  },
  {
    id: "3",
    src: "/assets/art3.webp",
    title: "Zombie Girl",
    date: "November 2025",
    description:
      "I love drawing myself as cool characters, and here I imagined I was in a zombie apocalypse universe.",
    width: 1920,
    height: 1080,
  },
  {
    id: "4",
    src: "/assets/art4.webp",
    title: "Hunterxhunter..?",
    date: "November 2025",
    description:
      "My friends wanted me to draw them as inspired by a scene from HunterxHunter. Shoutout AJ and Lewin!",
    width: 512,
    height: 512,
  },
  {
    id: "5",
    src: "/assets/art5.webp",
    title: "Soon Album Cover",
    date: "March 2026",
    description:
      "Remember how I said I liked to make music? Well I thought about making a future album with this cover. And yes, you found the 'hidden' bandcamp link! here it is: https://daykat.bandcamp.com/album/tomorrow",
    width: 900,
    height: 1200,
  },
  {
    id: "6",
    src: "/assets/art6.webp",
    title: "KHVIII Print",
    date: "September 2025",
    description:
      "If you look at my Experience page, you'll see that I was the Design Director for KnightHacks! Here is one of many designs I have done for them-- this ended up going on tote bags and on the website! (check it out: https://2025.knighthacks.org/)",
    width: 800,
    height: 800,
  },
  {
    id: "7",
    src: "/assets/art7.webp",
    title: "One Piece Poster",
    date: "September 2025",
    description:
      "My boyfriend and I love to watch One Piece together, so I drew this poster for him to commemorate our anniversary! It's currently hung up in his room :D",
    width: 800,
    height: 600,
  },
  {
    id: "8",
    src: "/assets/art8.webp",
    title: "KHVIII Backdrop",
    date: "September 2025",
    description:
      "Another design I worked on for KnightHacks! This served as a backdrop for photo ops within the hackathon. The base of this drawing was made by one of my designers, Elena, and I did color touchups and fixed design changes!",
    width: 800,
    height: 600,
  },
  {
    id: "9",
    src: "/assets/art9.webp",
    title: "KHVIII Debut Poster",
    date: "July 2025",
    description:
      "The poster that debuted the announcement of KnightHacks VIII-- one of the best hackathons UCF has ever hosted! Check out the post here: https://www.instagram.com/p/DMqEytJssHq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    width: 800,
    height: 600,
  },
  {
    id: "10",
    src: "/assets/art10.webp",
    title: "Dayaon Sibs!",
    date: "August 2025",
    description:
      "This is maybe one of my all time favorite pieces. I absolutely love my siblings and I think the style of this drawing resembles how our dynamic in real life is.",
    width: 800,
    height: 600,
  },
  {
    id: "11",
    src: "/assets/art11.webp",
    title: "Self Portrait",
    date: "March 2025",
    description:
      "Just a simple cool little self portrait that I used for different profile pictures!",
    width: 800,
    height: 600,
  },
  {
    id: "12",
    src: "/assets/art12.webp",
    title: "Leftover Paint",
    date: "March 2026",
    description:
      "Made this when I was painting my BMO project (see Lock-In Buddy in Projects!) and I had leftover paint. I decided to not let it go to waste and painted this really quickly in my sketchbook!",
    width: 800,
    height: 600,
  },
  {
    id: "13",
    src: "/assets/art13.webp",
    title: "Random Sketches",
    date: "April 2026",
    description:
      "As the title says... just random sketches.",
    width: 800,
    height: 600,
  },
  {
    id: "14",
    src: "/assets/art14.webp",
    title: "My cool friends",
    date: "February 2026",
    description:
      "HAHA I love the drawing on the left because it's a reference from a picture of my friend that absolutely cracks me up everytime. On the right is my other friend Rafa who loves to play drums!",
    width: 800,
    height: 600,
  },
  {
    id: "15",
    src: "/assets/art15.webp",
    title: "Class Drawings",
    date: "October 2025",
    description:
      "I made this while I was sitting in my Matrix class trying not to fall asleep. It worked!",
    width: 800,
    height: 600,
  },
  {
    id: "16",
    src: "/assets/art16.webp",
    title: "Random Sketches Pt2",
    date: "April 2026",
    description:
      "You guessed it. Another page of random sketches :p",
    width: 800,
    height: 600,
  },
  {
    id: "17",
    src: "/assets/art17.webp",
    title: "Superman",
    date: "July 2025",
    description:
      "He'd stand with Palestine.",
    width: 800,
    height: 600,
  },
  {
    id: "18",
    src: "/assets/art18.webp",
    title: "Class Drawings Pt2",
    date: "October 2025",
    description:
      "This is another drawing I made during Matrix! You can tell it was a fun class.",
    width: 800,
    height: 600,
  },
  {
    id: "19",
    src: "/assets/art19.webp",
    title: "AAHHHHH",
    date: "April 2026",
    description:
      "AHHHHHHHHHHHHHHHHH!!!!!",
    width: 800,
    height: 600,
  },
];
