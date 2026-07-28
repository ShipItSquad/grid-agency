export interface Service {
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
}

declare const hexColorBrand: unique symbol;
export type HexColor = string & { readonly [hexColorBrand]: true };

function hexColor(value: string): HexColor {
  if (!/^#[\da-f]{6}$/i.test(value)) {
    throw new Error(`Invalid hex color: ${value}`);
  }
  return value as HexColor;
}

export interface Project {
  title: string;
  category: string;
  year: string;
  shape: "orbit" | "grid" | "wave" | "type";
  // Artwork input for ProjectVisual, not a reusable UI surface token.
  artColor: HexColor;
}

export interface Post {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
}

export const services: Service[] = [
  {
    deliverables: [
      "Strategy",
      "Visual identity",
      "Guidelines",
      "Launch direction",
    ],
    number: "01",
    summary:
      "Distinct identities built to stay coherent while brands grow and change.",
    title: "Identity systems",
  },
  {
    deliverables: [
      "UX direction",
      "Interface design",
      "Prototyping",
      "Design systems",
    ],
    number: "02",
    summary:
      "Useful, expressive websites and products with a clear point of view.",
    title: "Digital experiences",
  },
  {
    deliverables: ["Creative concept", "Art direction", "Motion", "Toolkits"],
    number: "03",
    summary:
      "Flexible creative platforms that can live across channels, formats, and moments.",
    title: "Campaign worlds",
  },
];

export const projects: Project[] = [
  {
    artColor: hexColor("#0070f3"),
    category: "Identity / Place",
    shape: "orbit",
    title: "Common Ground",
    year: "2026",
  },
  {
    artColor: hexColor("#fafafa"),
    category: "Campaign / Culture",
    shape: "wave",
    title: "After Hours",
    year: "2026",
  },
  {
    artColor: hexColor("#eaeaea"),
    category: "Digital / Editorial",
    shape: "grid",
    title: "Field Notes",
    year: "2025",
  },
  {
    artColor: hexColor("#f2f2f2"),
    category: "Type / Experiment",
    shape: "type",
    title: "Mono No. 4",
    year: "2025",
  },
  {
    artColor: hexColor("#d4d4d4"),
    category: "Strategy / Identity",
    shape: "grid",
    title: "Open Assembly",
    year: "2025",
  },
  {
    artColor: hexColor("#666666"),
    category: "Digital / Commerce",
    shape: "orbit",
    title: "New Rituals",
    year: "2024",
  },
];

export const posts: Post[] = [
  {
    date: "June 18, 2026",
    excerpt:
      "Why the strongest design languages behave less like rulebooks and more like instruments.",
    readTime: "6 min",
    tag: "Process",
    title: "Good systems leave room for accidents",
  },
  {
    date: "May 02, 2026",
    excerpt:
      "Notes on pacing, pause, and making digital work feel less like a sequence of boxes.",
    readTime: "4 min",
    tag: "Digital",
    title: "A website should have a tempo",
  },
  {
    date: "March 27, 2026",
    excerpt:
      "What our discarded directions teach us, and why we keep a public playground.",
    readTime: "5 min",
    tag: "Studio",
    title: "The case for showing unfinished work",
  },
];
