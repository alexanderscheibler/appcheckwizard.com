// All 34 slides for "A Tale of Subdomain Takeover"
// Fonts: Josefin Sans (Google Fonts), ParchmentMF (system/web font)
// Slide canvas: 1280 x 720px (16:9)
// Coordinates derived from original PPTX at 1280x720 scale

import type { CSSProperties } from 'react';

// ─── Theme ────────────────────────────────────────────────────────────────────
// Single source of truth for all colors. Use COLORS.* everywhere in slide data.
export const COLORS = {
  brown:      '#3D2314', // main text color on parchment
  brownLight: '#5C3317', // lighter brown / captions
  link:       '#0000FF', // hyperlinks
  red:        '#941100', // warning / alert red
  redBright:  '#CC0000', // bright red (Warning slide)
  gold:       '#F6F2A2', // cover title yellow
  goldShadow: '#84231E', // cover title shadow
} as const;

export const SLIDE_WIDTH  = 1280;
export const SLIDE_HEIGHT = 720;

// Inline SVG for diamond bullet points used in Paragraph
export const BULLETS_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2 C14.5 4, 20 6.5, 22 12 C20 17.5, 14.5 20, 12 22 C9.5 20, 4 17.5, 2 12 C4 6.5, 9.5 4, 12 2 Z"
        fill="#4a2c1d"/>
</svg>`;

// ─── Base Types ───────────────────────────────────────────────────────────────
export type InlineTextPart = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  color?: string;
  underline?: boolean;
  monospace?: boolean;
};

export type ParagraphData = {
  text?: string;
  indent?: number;
  italic?: boolean;
  bold?: boolean;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  monospace?: boolean;
  parts?: InlineTextPart[];
  bullet?: boolean;
};

export type ListItem = {
  label?: string;
  text?: string;
  bold?: boolean;
  color?: string;
  inline?: InlineTextPart[];
  parts?: InlineTextPart[];
};

// ─── Slide Interfaces ─────────────────────────────────────────────────────────
export interface BaseSlide {
  id: number;
  title?: string;
}

export interface CoverSlide extends BaseSlide {
  type: 'cover';
  bgImage: string;
  titleStyle: CSSProperties;
}

export interface VideoSlide extends BaseSlide {
  type: 'video';
  videoSrc: string;
  poster: string | null;
  caption: string | null;
}

export interface ChapterSlide extends BaseSlide {
  type: 'chapter';
  subtitle: string | null;
  hasOrnament: boolean;
  titleSize?: number;
  centered?: boolean;
  titleStyle?: CSSProperties;
}

export interface ContentImageSlide extends BaseSlide {
  // 'content-image-top' and 'content-image-mid' share the same renderer.
  // Keep both values so existing slide data needs no edits, but treat them identically.
  type: 'content-image-top' | 'content-image-mid';
  image: string;
  imageAlt: string;
  imageStyle: CSSProperties;
  imageCaption?: string;
  bullets?: string[];
  bulletsStyle?: CSSProperties;
}

export interface ContentBoxSlide extends BaseSlide {
  type: 'content-box';
  intro?: string;
  introStyle?: CSSProperties;
  boxContent: string[];
  boxStyle: CSSProperties;
  bodyLines?: ParagraphData[];
  bodyStyle?: CSSProperties;
}

export interface ContentTwoColSlide extends BaseSlide {
  type: 'content-two-col';
  leftContent: {
    image: string;
    imageAlt: string;
    imageStyle: CSSProperties;
    caption?: string;
    captionStyle?: CSSProperties;
  };
  rightContent: {
    style: CSSProperties;
    items: ListItem[];
  };
}

export interface ContentTextSlide extends BaseSlide {
  type: 'content-text';
  titleStyle?: CSSProperties;
  bodyStyle: CSSProperties;
  paragraphs: ParagraphData[];
  fontSize?: number;
}

export interface ImageFullSlide extends BaseSlide {
  type: 'image-full';
  image: string;
  imageAlt: string;
  attribution: string;
  attributionLink: string;
  warning: string;
  warningStyle?: CSSProperties;
}

export interface ContentSplitBoxSlide extends BaseSlide {
  type: 'content-split-box';
  leftContent: {
    style: CSSProperties;
    items: ListItem[];
  };
  rightBox: {
    style: CSSProperties;
    items: string[];
    itemStyle?: CSSProperties;
  };
}

export interface ToolkitSlide extends BaseSlide {
  type: 'toolkit';
  sections: {
    label: string;
    items: ListItem[];
  }[];
  sideNote?: {
    brace: boolean;
    lines: { parts: InlineTextPart[] }[];
  };
}

export interface ContactSlide extends BaseSlide {
  type: 'contact';
  logo: string;
  name: string;
  bullets: string[];
  links: { text: string; href: string; color?: string }[];
  card: string;
  cardAlt: string;
}

export interface ReferencesSlide extends BaseSlide {
  type: 'references';
  logo: string;
  refs: { text?: string; href?: string; parts?: InlineTextPart[] }[];
}

export type Slide =
  | CoverSlide
  | VideoSlide
  | ChapterSlide
  | ContentImageSlide
  | ContentBoxSlide
  | ContentTwoColSlide
  | ContentTextSlide
  | ImageFullSlide
  | ContentSplitBoxSlide
  | ToolkitSlide
  | ContactSlide
  | ReferencesSlide;

// ─── Slides ───────────────────────────────────────────────────────────────────
const slides: Slide[] = [

  // ─── SLIDE 1: Cover ──────────────────────────────────────────────────────────
  {
    id: 1,
    type: 'cover',
    bgImage: '/talks/atlseccon2026/slides/slide1-fortune-tiger.webp',
    title: 'A Tale of Subdomain Takeover',
    titleStyle: {
      left: 97, top: 624, width: 824,
      fontSize: 54,
      color: COLORS.gold,
      textShadow: `2px 2px 6px ${COLORS.goldShadow}, -1px -1px 4px ${COLORS.goldShadow}`,
      fontWeight: '300',
      lineHeight: 1.05,
    },
  },

  // ─── SLIDE 2: Video (company website) ────────────────────────────────────────
  {
    id: 2,
    type: 'video',
    videoSrc: '/talks/atlseccon2026/videos/VideoFortuneTiger.mov',
    poster: null,
    caption: null,
  },

  // ─── SLIDE 3: Once Upon A Time ───────────────────────────────────────────────
  {
    id: 3,
    type: 'chapter',
    title: 'Once Upon A Time…',
    subtitle: null,
    hasOrnament: true,
    titleSize: 72,
    centered: true,
  },

  // ─── SLIDE 4: Chapter 1 ──────────────────────────────────────────────────────
  {
    id: 4,
    type: 'chapter',
    title: 'Chapter 1',
    subtitle: 'How we got here',
    hasOrnament: true,
    centered: true,
  },

  // ─── SLIDE 5: The Legacy Site ─────────────────────────────────────────────────
  {
    id: 5,
    type: 'content-image-top',
    title: 'The Legacy Site',
    image: '/talks/atlseccon2026/slides/slide5-legacy-site.webp',
    imageAlt: 'Legacy Product Passport website screenshot',
    imageStyle: { top: 105, left: 240, width: 800, height: 530 },
  },

  // ─── SLIDE 6: A New Portal, A New Problem ────────────────────────────────────
  {
    id: 6,
    type: 'content-box',
    title: 'A New Portal, A New Problem',
    boxContent: [
      'Legacy site    →    www.productpassport.ca      (old domain, still in use)',
      'New portal    →    shop.appcheckwizard.com    (built on the Cloud / AWS)',
    ],
    boxStyle: { top: 169, left: 116, width: 1048, height: 159 },
    bodyLines: [
      { text: 'The Goal:', bold: true },
      { text: '     Migrate the traffic gracefully' },
      { text: 'The Solution:', bold: true },
      { text: '     S3 redirect bucket — www.productpassport.ca → shop.appcheckwizard.com' },
      { text: '\b' },
      { text: 'Simple. Clean. Works great!', align: 'center', italic: true },
    ],
    bodyStyle: { top: 230, left: 117, width: 1054 },
  },

  // ─── SLIDE 7: …until ─────────────────────────────────────────────────────────
  {
    id: 7,
    type: 'chapter',
    title: '…until the Amplify deployment buckets start hitting AWS bucket limits.',
    subtitle: null,
    hasOrnament: true,
    titleSize: 44,
    centered: true,
    titleStyle: { fontStyle: 'italic' },
  },

  // ─── SLIDE 8: The Bucket Limit Problem ───────────────────────────────────────
  {
    id: 8,
    type: 'content-image-mid',
    title: 'The Bucket Limit Problem',
    image: '/talks/atlseccon2026/slides/slide8-aws-quotas.webp',
    imageAlt: 'AWS S3 Service quotas screenshot',
    imageCaption: 'AWS S3 Service quotas: limited number of S3 buckets',
    imageStyle: { top: 105, left: 280, width: 720, height: 310 },
    bullets: [
      'Every Amplify deployment creates S3 buckets.',
      'Old deployments → stale buckets → they accumulate.',
      'Hit the limit → new deployments fail.',
    ],
    bulletsStyle: { top: 500, left: 128 },
  },

  // ─── SLIDE 9: The Script We Needed ───────────────────────────────────────────
  {
    id: 9,
    type: 'content-two-col',
    title: 'The Script We Needed',
    leftContent: {
      image: '/talks/atlseccon2026/slides/slide9-code.webp',
      imageAlt: 'Sample bucket cleanup script code',
      imageStyle: { top: 210, left: 50, width: 590, height: 330 },
      caption: 'Sample automated bucket cleanup script',
      captionStyle: { top: 450, left: 50, width: 530, fontStyle: 'italic' },
    },
    rightContent: {
      style: { top: 170, left: 674, width: 540 },
      items: [
        { label: 'Empty bucket?', bold: true },
        { text: '✅ Yes — Amplify leftovers have no objects' },
        { text: '\b' },
        { label: 'Not modified recently?', bold: true },
        { text: '✅ Yes — stale deployment artifact' },
        { text: '\b' },
        { label: 'Safe to delete?', bold: true },
        { text: '❓...never checked.', color: COLORS.red },
        { text: '\b' },
        { text: 'The script had ' },
        { inline: [{ text: 'no context', bold: true, underline: true }, { text: ' beyond what it could see in S3.' }] },
      ],
    },
  },

  // ─── SLIDE 10: Chapter 2 ─────────────────────────────────────────────────────
  {
    id: 10,
    type: 'chapter',
    title: 'Chapter 2',
    subtitle: 'The Incident',
    hasOrnament: true,
    centered: true,
  },

  // ─── SLIDE 11: The Timeline ───────────────────────────────────────────────────
  {
    id: 11,
    type: 'content-text',
    title: 'The Timeline',
    bodyStyle: { top: 179, left: 76, width: 1155 },
    paragraphs: [
      { text: '- Day 0\t\tBucket deleted by the cleanup script' },
      { text: '- Day 0\t\tDNS still resolves www.productpassport.ca → "No Such Bucket"' },
      { text: '- Unknown\t\tAttacker claims bucket name in their own AWS account' },
      {
        parts: [
          { text: '- Unknown\t\t' },
          { text: 'www.productpassport.ca', color: COLORS.link },
          { text: ' begins serving attacker content' },
        ],
      },
      { text: '\b' },
      { text: 'No automated detection.' },
      { text: '\b' },
      { text: 'No alerts fired.' },
    ],
  },

  // ─── SLIDE 12: The Timeline (cont'd.) ────────────────────────────────────────
  {
    id: 12,
    type: 'content-text',
    title: "The Timeline (cont'd.)",
    bodyStyle: { top: 179, left: 76, width: 1155 },
    paragraphs: [
      { text: '- Day 28 - T+00:00     Client reports the site looks "a bit different".' },
      { text: '- Day 28 - T+00:38     Upon investigation of the subdomain, we found out that the subdomain origin was supposed to be a S3 bucket — and that bucket was not in our bucket list. We tried to create the bucket.' },
      { text: '\b' },
      { text: 'Result: failure.', indent: 40, bold: true },
      { text: '\b' },
      { text: "Someone already owned that bucket, and it wasn't us.", indent: 40 },
      { text: '\b' },
      { text: '- Day 28 - T+01:27     Fix: create another bucket and set the Cloudfront redirect to it. Redirect properly working.' },
    ],
  },

  // ─── SLIDE 13: Tiger / Warning ───────────────────────────────────────────────
  {
    id: 13,
    type: 'image-full',
    image: '/talks/atlseccon2026/slides/slide13-tiger.jpg',
    imageAlt: 'Sumatran tiger walking at Tierpark Berlin',
    attribution: 'Picture: "Sumatran tiger walking in the Tierpark, Berlin", Captain Herbert, CC BY-SA 3.0, via Wikimedia Commons',
    attributionLink: 'https://commons.wikimedia.org/wiki/File:Sumatran_Tiger_Berlin_Tierpark.jpg',
    warning: 'Warning: Do not try this at home!',
    warningStyle: { bottom: 1, left: 215, color: COLORS.redBright, fontSize: 52, fontWeight: 'bold', textDecoration: 'underline' },
  },

  // ─── SLIDE 14: The Attack ─────────────────────────────────────────────────────
  {
    id: 14,
    type: 'content-box',
    title: 'The Attack',
    intro: "I'll demonstrate this under two subdomains I own and control.",
    introStyle: { top: 149, left: 112, width: 1114 },
    bodyLines: [
      { text: 'Expected behaviour:' },
      { text: '' },
    ],
    boxContent: [
      'Legacy site                              →    www.productpassport.ca',
      'REDIRECT TO New portal        →    shop.appcheckwizard.com',
    ],
    boxStyle: { top: 209, left: 116, width: 1048, height: 159 },
  },

  // ─── SLIDE 15: Video — Expected behaviour ─────────────────────────────────────
  {
    id: 15,
    type: 'video',
    title: 'Expected behaviour',
    videoSrc: '/talks/atlseccon2026/videos/VideoRedirect.mov',
    poster: null,
    caption: null,
  },

  // ─── SLIDE 16: Deleted bucket ────────────────────────────────────────────────
  {
    id: 16,
    type: 'content-image-mid',
    title: 'Deleted bucket',
    image: '/talks/atlseccon2026/slides/slide16-404.webp',
    imageAlt: '404 Not Found — NoSuchBucket error page',
    imageStyle: { top: 105, left: 160, width: 960, height: 530 },
  },

  // ─── SLIDE 17: Video — Actual behaviour ──────────────────────────────────────
  {
    id: 17,
    type: 'video',
    title: 'Actual behaviour',
    videoSrc: '/talks/atlseccon2026/videos/VideoAttack.mov',
    poster: null,
    caption: null,
  },

  // ─── SLIDE 18: What The Visitors Saw ─────────────────────────────────────────
  {
    id: 18,
    type: 'content-split-box',
    title: 'What The Visitors Saw',
    leftContent: {
      style: { top: 153, left: 95, width: 725 },
      items: [
        {
          parts: [
            { text: 'https://www.productpassport.ca', bold: true },
            { text: ' serving attacker content' },
          ],
        },
        { text: '\b' },
        { text: '→ Unauthorised and illegal third-party content' },
        { text: '→ Hosted under a corporate subdomain' },
        { text: '→ Visible to every visitor' },
        { text: '→ Domain reputation weaponized against filters and firewalls' },
        { text: '\b' },
        { text: "The attacker didn't breach anything. They filled a vacancy." },
      ],
    },
    rightBox: {
      style: { top: 269, left: 837, width: 369, height: 180 },
      items: [
        '• Reputational Risk',
        '• Legal Exposure',
        '• User Trust Damage',
      ],
    },
  },

  // ─── SLIDE 19: Chapter 3 ─────────────────────────────────────────────────────
  {
    id: 19,
    type: 'chapter',
    title: 'Chapter 3',
    subtitle: 'The Mechanics',
    hasOrnament: true,
    centered: true,
  },

  // ─── SLIDE 20: Subdomain Takeover ────────────────────────────────────────────
  {
    id: 20,
    type: 'content-image-mid',
    title: 'Subdomain Takeover',
    image: '/talks/atlseccon2026/slides/slide20-diagram.webp',
    imageAlt: 'Sequence diagram showing DNS, CloudFront, and AWS S3 request flow for subdomain takeover',
    imageStyle: { top: 105, left: 120, width: 1040, height: 545 },
  },

  // ─── SLIDE 21: Why S3 Is Particularly Exposed ────────────────────────────────
  {
    id: 21,
    type: 'content-text',
    title: 'Why S3 Is Particularly Exposed',
    bodyStyle: { top: 125, left: 99, width: 1048 },
    paragraphs: [
      { text: 'The S3 static website mechanic:' },
      { text: '\b' },
      { parts: [{ text: 'www.productpassport.ca' }] },
      {
        parts: [{ text: '└─ CNAME ──► www.productpassport.ca.s3-website-us-east-1.amazonaws.com' }],
        indent: 20,
      },
      { text: '\b' },
      { text: '' },
      {
        parts: [
          { text: 'Requirement: ' },
          { text: 'bucket name matching the CNAME target.', bold: true },
        ],
      },
      {
        parts: [
          { text: 'Consequence: ' },
          { text: 'bucket names are ', bold: true },
          { text: 'globally unique', bold: true, italic: true },
          { text: ' across ALL AWS accounts.', bold: true },
        ],
      },
      { text: '\b' },
      { text: 'Delete the bucket  → bucket name is immediately available to anyone on AWS.' },
      { text: '\b' },
      { text: 'DNS still resolves to AWS →  dangling CNAME.' },
    ],
  },

  // ─── SLIDE 22: The Attacker's View ───────────────────────────────────────────
  {
    id: 22,
    type: 'content-text',
    title: "The Attacker's View",
    bodyStyle: { top: 159, left: 74, width: 1132 },
    paragraphs: [
      { text: 'How attackers do this — automated, fast, cheap!' },
      { text: '\b' },
      { text: '1.  Enumerate subdomains' },
      { text: '2.  Probe CNAMEs\t\t\t\t→  HTTP 404, error: NoSuchBucket' },
      { text: '3.  Register the bucket\t\t→  claim the vacant name' },
      { text: '4.  Upload content\t\t\t\t→  now serving under the old subdomain' },
    ],
  },

  // ─── SLIDE 23: The Monitoring Gap ────────────────────────────────────────────
  {
    id: 23,
    type: 'content-split-box',
    title: 'The Monitoring Gap',
    leftContent: {
      style: { top: 149, left: 104, width: 599 },
      items: [
        { text: 'What should have caught this:' },
        { text: '❌  No alert on S3 bucket deletion' },
        { text: '❌  No health checks on legacy subdomains' },
        {
          parts: [
            { text: '❌  No uptime monitoring for ' },
            { text: 'www.productpassport.ca', color: COLORS.link },
          ],
        },
        { text: '❌  Testing! No anomaly detection on subdomain content' },
        { text: '' },
        { text: 'Detected by: a client who called to report it' },
        { text: 'Response time: 90 minutes' },
      ],
    },
    rightBox: {
      style: { top: 515, left: 693, width: 525, height: 154 },
      items: [
        'This is not a monitoring strategy.',
        'A client should never be your first alert.',
      ],
      itemStyle: { fontWeight: 'bold' },
    },
  },

  // ─── SLIDE 24: Chapter 4 ─────────────────────────────────────────────────────
  {
    id: 24,
    type: 'chapter',
    title: 'Chapter 4',
    subtitle: 'Undo',
    hasOrnament: true,
    centered: true,
  },

  // ─── SLIDE 25: Moment 1 ───────────────────────────────────────────────────────
  {
    id: 25,
    type: 'content-text',
    title: 'Moment 1 - The Script Runs',
    titleStyle: { top: 74 },
    bodyStyle: { top: 200, left: 74, width: 1132, textAlign: 'center' },
    paragraphs: [
      { text: 'The script did exactly what it was told.' },
      { text: '' },
      { text: "It just didn't know enough to know better." },
    ],
    fontSize: 42,
  },

  // ─── SLIDE 26: Moment 2 ───────────────────────────────────────────────────────
  {
    id: 26,
    type: 'content-text',
    title: 'Moment 2 - The Bucket Is Gone',
    titleStyle: { top: 74 },
    bodyStyle: { top: 200, left: 74, width: 1132, textAlign: 'center' },
    paragraphs: [
      { text: 'The name was easy to find — and available.' },
      { text: '' },
      { text: "It didn't have to be." },
    ],
    fontSize: 42,
  },

  // ─── SLIDE 27: Moment 3 ───────────────────────────────────────────────────────
  {
    id: 27,
    type: 'content-text',
    title: 'Moment 3 - 28 Days of Silence',
    titleStyle: { top: 74 },
    bodyStyle: { top: 200, left: 74, width: 1132, textAlign: 'center' },
    paragraphs: [
      { text: 'No alert fired.' },
      { text: '' },
      { text: 'No health check ran.' },
      { text: '' },
      { text: 'A client called.' },
    ],
    fontSize: 42,
  },

  // ─── SLIDE 28: Monitoring ─────────────────────────────────────────────────────
  {
    id: 28,
    type: 'content-text',
    title: "Monitoring: What Should've Been There",
    titleStyle: { top: 74 },
    bodyStyle: { top: 217, left: 109, width: 1055 },
    paragraphs: [
      {
        bullet: true,
        parts: [
          { text: 'CloudWatch ' },
          { text: 'alarms', underline: true },
          { text: ' for when logs show a bucket deletion.' },
        ],
      },
      { text: '\b ' },
      {
        bullet: true,
        parts: [
          { text: 'Uptime Monitoring / Automated Health Checks', underline: true },
          { text: ' — full coverage, including legacy subdomains.' },
        ],
      },
      { text: '\b ' },
      {
        bullet: true,
        parts: [
          { text: 'Automated ' },
          { text: 'Smoke Testing', underline: true },
          { text: ' on legacy subdomains for when anomalies are detected on the content.' },
        ],
      },
    ],
    fontSize: 34,
  },

  // ─── SLIDE 29: The Hero's Toolkit ────────────────────────────────────────────
  {
    id: 29,
    type: 'toolkit',
    title: "The Hero's Toolkit",
    sections: [
      {
        label: 'VERIFY',
        items: [
          {
            parts: [
              { text: '  □ Run ' },
              { text: 'can-i-take-over-xyz', bold: true },
              { text: ' against your subdomains (open source tool, not an ad).' },
            ],
          },
        ],
      },
      {
        label: 'PREVENT',
        items: [
          { text: '  □ Use non-trivial bucket names for redirect buckets.' },
          { text: '  □ Block deletion of critical buckets.' },
          { text: '  □ Run any deletion scripts with dry-mode and pair the review of the output.' },
        ],
      },
      {
        label: 'DETECT',
        items: [
          { text: '  □ Deploy automated health checks with notification to all subdomains.' },
          { text: '  □ Add smoke testing for subdomain content.' },
          { text: '  □ Set CloudTrail alert on DeleteBucket events.' },
        ],
      },
    ],
    sideNote: {
      brace: true,
      lines: [
        { parts: [{ text: '– ' }, { text: 'Explicit Deny', bold: true, color: COLORS.red }, { text: ' on s3:DeleteBucket.' }] },
        { parts: [{ text: '– ' }, { text: 'Terraform', bold: true }, { text: ': lifecycle { ' }, { text: 'prevent_destroy = true', bold: true, color: COLORS.red }, { text: ' }' }] },
      ],
    },
  },

  // ─── SLIDE 30: The Moral (blank) ─────────────────────────────────────────────
  {
    id: 30,
    type: 'chapter',
    title: 'The Moral Of The Story…',
    subtitle: null,
    hasOrnament: true,
    centered: true,
  },

  // ─── SLIDE 31: The Moral (text) ───────────────────────────────────────────────
  {
    id: 31,
    type: 'content-text',
    title: 'The Moral Of The Story…',
    titleStyle: { top: 74 },
    bodyStyle: { top: 196, left: 97, width: 1085, textAlign: 'center' },
    paragraphs: [
      { text: "The script didn't intend to compromise a live subdomain." },
      { text: '' },
      { text: 'It had no idea it was doing that.' },
      { text: '' },
      {
        parts: [
          { text: 'Automation needs ' },
          { text: 'context boundaries', bold: true },
          { text: ' and ' },
          { text: 'human checkpoints', bold: true },
          { text: '.' },
        ],
      },
    ],
    fontSize: 36,
  },

  // ─── SLIDE 32: Thank You ──────────────────────────────────────────────────────
  {
    id: 32,
    type: 'contact',
    title: 'Thank you!',
    logo: '/talks/atlseccon2026/slides/slide32-fortune-tiger-logo.webp',
    name: 'Alexander Scheibler (he/him)',
    bullets: ['From New Brunswick', 'Senior Software Developer'],
    links: [
      { text: 'appcheckwizard.com', href: 'https://appcheckwizard.com', color: COLORS.link },
      { text: 'admin@appcheckwizard.com', href: 'mailto:admin@appcheckwizard.com', color: COLORS.link },
    ],
    card: '/talks/atlseccon2026/slides/slide32-qrcard.webp',
    cardAlt: 'Alexander S, CTFL – Senior Software Developer LinkedIn QR card',
  },

  // ─── SLIDE 33: References 1 ───────────────────────────────────────────────────
  {
    id: 33,
    type: 'references',
    title: 'References and Resources',
    logo: '/talks/atlseccon2026/slides/slide32-fortune-tiger-logo.webp',
    refs: [
      {
        text: 'AWS: Deleting a general purpose bucket',
        href: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/delete-bucket.html',
      },
      {
        text: 'AWS: Virtual hosting of general purpose buckets',
        href: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html',
      },
      {
        parts: [
          { text: 'Azure', bold: true },
          { text: ': Prevent dangling DNS entries and avoid subdomain takeover' },
        ],
        href: 'https://learn.microsoft.com/en-us/azure/security/fundamentals/subdomain-takeover',
      },
      {
        parts: [
          { text: 'Blog by Joren Vrancken - An in-depth guide to ' },
          { text: 'GitHub Pages', bold: true },
          { text: ' domain takeovers' },
        ],
        href: 'https://blog.nietaanraken.nl/posts/github-pages-domain-takeover/',
      },
    ],
  },

  // ─── SLIDE 34: References 2 ───────────────────────────────────────────────────
  {
    id: 34,
    type: 'references',
    title: 'References and Resources',
    logo: '/talks/atlseccon2026/slides/slide32-fortune-tiger-logo.webp',
    refs: [
      {
        text: 'can-i-take-over-xyz',
        href: 'https://github.com/EdOverflow/can-i-take-over-xyz',
      },
      {
        parts: [
          { text: 'dev.to - ' },
          { text: 'AWS', bold: true },
          { text: ' S3 Bucket Subdomain Takeover' },
        ],
        href: 'https://dev.to/davidkarpinski/aws-s3-bucket-takeover-i5d',
      },
      {
        text: 'OneUptime - How to Use Lifecycle Rules with prevent_destroy',
        href: 'https://oneuptime.com/blog/post/2026-02-23-how-to-use-lifecycle-rules-with-prevent-destroy/view',
      },
    ],
  },
];

export default slides;