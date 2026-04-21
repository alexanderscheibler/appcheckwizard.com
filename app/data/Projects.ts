interface Project {
  id: string
  title: string
  description: string
  long_description: string,
  href: string
  imgSrc: string
  imgAlt: string
  tech: string
}

export const projects: Project[] = [
  {
    id: "travel",
    title: "Best Destinations",
    description: "Front-end Sample, containing an usable hamburger menu, carousel and a diagonal section.",
    long_description: "HTML, pure CSS and vanilla JavaScript. No Bootstrap, no Tailwind.\n" +
      "Containing:\n" +
      "- An usable menu both on desktop and mobile (collapsable hamburger).\n" +
      "- An infinite-loop carousel with swipe support (manually triggered by design - auto-scroll is annoying).\n" +
      "- Diagonal section dividers pixel-perfect in every browser, even over the animated carousel.",
    href: "https://alexanderscheibler.github.io/travel/",
    imgSrc: "/images/projects/travel-desktop-chrome.png",
    imgAlt: "Screenshot of the Best Destinations website",
    tech: "HTML + Pure CSS + JavaScript",
  },
  {
    id: "cheapest",
    title: "Cheapest Options - Object Oriented Programming",
    description: "A Python CLI application to find out the cheapest hotel options according to the given dates.",
    long_description: "Given a list of dates, provide the cheapest option according to the client type.\n" +
      "- Objected-oriented programming.\n" +
      "- Code originally written in 2019.\n" +
      "- Test cases added in 2019.",
    href: "https://github.com/alexanderscheibler/code_samples/tree/main/Python/cheapest_options",
    imgSrc: "/images/projects/cheapest_option.png",
    imgAlt: "Screenshot of the Cheapest Options running",
    tech: "Python + unittest",
  },
  {
    id: "queryAPI",
    title: "Query API (Stock Prices) - Python",
    description: "Given a range of dates, query the price of stocks on opening and closing for a specific weekday.",
    long_description: "Given a range of dates, query the price of stocks on opening and closing for a specific weekday.\n" +
      "- Code originally written in 2019. Minimally (insecurely) adjusted to run without SSL.\n" +
      "- Test cases added in 2019.",
    href: "https://github.com/alexanderscheibler/code_samples/tree/main/Python/query_api_stock_prices",
    imgSrc: "/images/projects/query_api.png",
    imgAlt: "Screenshot of the Query API (Stock Prices) running",
    tech: "Python + unittest",
  },
  {
    id: "dates",
    title: "Reformat Dates - Python",
    description: "Challenge: given a sample array of dates, convert it to ISO format.",
    long_description: "- Code originally written in 2019.\n" +
      "- Revisited in 2024 to add a full test suite.\n" +
      "- Adding tests surfaced several edge case bugs (whitespace, invalid suffixes, \n" +
      "  non-string inputs) that were silently failing in the original code.\n" +
      "- Code refactored in 2026 to pass the tests.",
    href: "https://github.com/alexanderscheibler/code_samples/tree/main/Python/reformat_dates",
    imgSrc: "/images/projects/reformat_dates.png",
    imgAlt: "Screenshot of the Reformat Dates running",
    tech: "Python + pytest",
  },
];