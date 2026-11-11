export const AUTOPLAY_MS = 5000;

export interface Slide {
  id: number;
  image: string;
  tag: string;
  headline: string; // wrap accent word in *asterisks*
  subtext: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    image: "/slides/slide-1.webp",
    tag: "Zero Data Leaks",
    headline: "Your data stays *yours*",
    subtext:
      "Build workflows of any size or complexity. Client data stays locked in your vault and never reaches any model.",
  },
  {
    id: 2,
    image: "/slides/slide-2.webp",
    tag: "White Label",
    headline: "Build it. Brand it. *Sell* it.",
    subtext:
      "Tap Create an App and your automation becomes a branded, professional dashboard you can sell under your own company name.",
  },
  {
    id: 3,
    image: "/slides/slide-3.webp",
    tag: "Talk to Build",
    headline: "Just say it. It *builds*.",
    subtext:
      "Talk to a Jarvis-style AI agent by voice or text. It suggests ideas, interrupts with better ways, and guides you live.",
  },
  {
    id: 4,
    image: "/slides/slide-4.webp",
    tag: "Unlimited Workflows",
    headline: "No limits on *scale*",
    subtext: "Create unlimited workflows at a fraction of the cost.",
  },
  {
    id: 5,
    image: "/slides/slide-5.webp",
    tag: "Auto Handling",
    headline: "It breaks. It *heals*.",
    subtext:
      "Get an instant alert on your phone. Tap Auto Handle and our agents fix the workflow, or tell you exactly which external issue needs your attention.",
  },
];

