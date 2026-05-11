interface Project {
  id: string
  title: string
  description: string
  long_description: string,
  href: string
  source: string
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
    source: "https://github.com/alexanderscheibler/travel",
    imgSrc: "/images/projects/travel-desktop-chrome.png",
    imgAlt: "Screenshot of the Best Destinations website",
    tech: "HTML + Pure CSS + JavaScript",
  },
  {
    id: "gnb_news",
    title: "GNB News Digest",
    description: " A simple service providing user subscription through e-mail and daily delivery from the news published by the Government of New Brunswick.",
    long_description: "A simple service providing:.\n" +
      "- User subscription through e-mail.\n" +
      "- Daily e-mail delivery from the news published by the Government of New Brunswick.\n" +
      "\n" +
      "Tech:\n" +
      "- Scrapping with Python (requests + BeautifulSoup).\n" +
      "- API with Cloudflare Workers (TypeScript).\n" +
      "- PostgreSQL Database with Neon.\n" +
      "- E-mail service with Resend.\n" +
      "- Antibot: Cloudflare Turnstile.",
    href: "https://gnb-news-digest.appcheckwizard.workers.dev/",
    source: "https://github.com/alexanderscheibler/gnb-news-digest",
    imgSrc: "/images/projects/GNBNewsDigest.png",
    imgAlt: "Screenshot of the NB News Digest site",
    tech: "Python + Cloudflare Workers + Resend",
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
    source: "https://github.com/alexanderscheibler/code_samples/tree/main/Python/cheapest_options",
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
    source: "https://github.com/alexanderscheibler/code_samples/tree/main/Python/query_api_stock_prices",
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
    source: "https://github.com/alexanderscheibler/code_samples/tree/main/Python/reformat_dates",
    imgSrc: "/images/projects/reformat_dates.png",
    imgAlt: "Screenshot of the Reformat Dates running",
    tech: "Python + pytest",
  },
];