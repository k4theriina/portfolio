type ProjectData = {
    title: string;
    gif: string;
    description: string;
    caption: string;
    technologies: string[];
    link: string;
}

export const projects:ProjectData[] = [
    {
        title: "LockIn-Buddy",
        gif: "/assets/lock-in-buddy.webm",
        description: "A productivity-focused robot buddy paired with a desktop app designed to help users stay locked in!",
        caption: "(KH Project Checkpoint Winner)",
        technologies: ["React", "ThreeJS", "Figma", "Javascript"],
        link: "https://devpost.com/software/lock-in-buddy",
    },
    {
        title: "SMARTLook",
        gif: "/assets/SmartLOOK.webm",
        description: "A web-based digital twin utilizing Three.js and AI assistance to better maintain SMART factories.",
        caption: "(Made for IST Quickstart 2025)",
        technologies: ["React", "ThreeJS", "Figma", "Javascript"],
        link: "https://github.com/k4theriina/SMARTLook",
    },
    {
        title: "Potara",
        gif: "/assets/potara.webm",
        description: "Draw to your heart's content with our art assistant tool that also provides live feedback, courtesy of our AI-powered art mentor, Shelly. ",
        caption: "(Made for Shellhacks 2025)",
        technologies: ["React", "Tailwind", "Figma", "Javascript"],
        link: "https://devpost.com/software/potara",
    },
    {
        title: "ShapeShift",
        gif: "/assets/shapeShift.webm",
        description: "A Dev tool web app that converts 2D assets into production-ready 3D models and Three.js code.",
        caption: "(Made for Bitcamp 2025)",
        technologies: ["React", "Tailwind", "Figma", "Typescript"],
        link: "https://www.we-shapeshift.tech/",
    },
    {
        title: "AiSight",
        gif: "/assets/aiSight.webm",
        description: "A React Native app using Python for gesture and object recognition to aid the visually impaired.",
        caption: "(Made for KnightHacks Project Launch 2025)",
        technologies: ["React", "Typescript", "Figma", "Python"],
        link: "https://devpost.com/software/aisight-3m6enr",
    },
    {
        title: "Rock, Paper, AI Sensors",
        gif: "/assets/rockpaperaiscissors.webm",
        description: "A Python TKinter game teaching K-12 students AI basics through an engaging Rock, Paper, Scissors experience with a user-friendly interface.",
        caption: "(Made for UCF Stem Day 2024)",
        technologies: ["Python"],
        link: "https://github.com/morallyearlgrey/StemDay2024",
    },
    {
        title: "Bloom Buddy",
        gif: "/assets/bloombuddy.webm",
        description: "An automated plant health app made to help remind users to water their plants.",
        caption: "(Made for KnightHacks VII 2024)",
        technologies: ["Flutter"],
        link: "https://devpost.com/software/bloom-buddy-ibe5n6",
    },

]
