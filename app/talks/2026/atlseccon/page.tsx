import type { Metadata } from 'next';
import Presentation from '@components/Presentation';
import slides from '@data/talks/2026-atlseccon/SlidesData';
import { talks } from '@data/talks/talks';

const talk = talks.find((t) => t.id === '2026-atlseccon')!;

export const metadata: Metadata = {
  title: `AppCheckWizard - ${talk.event} - ${talk.title}`,
  description: talk.description,
  openGraph: {
    title: `AppCheckWizard - ${talk.event} - ${talk.title}`,
    description: talk.description,
    images: [
      {
        url: talk.imgSrc,
        alt: talk.imgAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `AppCheckWizard - ${talk.event} - ${talk.title}`,
    description: talk.description,
    images: [talk.imgSrc],
  },
};

export default function PresentationPage() {
  return (
    <main className="font-josefin" style={{ width: '100%', height: '100vh', overflow: 'hidden', background: '#1a1a1a' }}>
      <Presentation slides={slides} />
    </main>
  );
}