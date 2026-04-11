export type Talk = {
  id: string;
  year: number;
  title: string;
  description: string;
  event: string;
  date?: string;
  slidesUrl: string;
  imgSrc: string;
  imgAlt: string;
  videoUrl?: string;
  tags: string[];
};

export const talks: Talk[] = [
  {
    id: "2026-atlseccon",
    year: 2026,
    title: "Fortune Tiger: A Tale of Subdomain Takeover",
    description: "A cleanup script gone wrong deleted a critical S3 redirection bucket, allowing an attacker to claim the globally unique bucket name and hijack a corporate subdomain - serving illegal Fortune Tiger iGaming content to all visitors for 90 minutes before mitigations were in place.",
    event: "AtlSecCon 2026",
    date: "April 2026",
    tags: ["aws", "s3", "subdomain-takeover", "dangling-CNAME"],
    slidesUrl: "/talks/2026/atlseccon",
    imgSrc: "/talks/atlseccon2026/slides/thumb-fortune-tiger.webp",
    imgAlt: "AtlSecCon 2026 – Fortune Tiger talk thumbnail"
  },
];

export function getTalksByYear(year = new Date().getFullYear()): Talk[] {
  return talks.filter((t) => t.year === year);
}