interface Project {
  id: string
  title: string
  href: string
  imgSrc: string
  imgAlt: string
  tech: string
}

export const projects: Project[] = [
  {
    id: "travel",
    title: "Best Destinations",
    href: "https://alexanderscheibler.github.io/travel/",
    imgSrc: "/images/projects/travel-desktop-chrome.png",
    imgAlt: "Screenshot of the Best Destinations website",
    tech: "HTML + Pure CSS + JavaScript",
  },
];