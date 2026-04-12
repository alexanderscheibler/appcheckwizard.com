// app/talks/[year]/[talkId]/[slideId]/page.tsx
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Presentation from '@components/Presentation';
import { talks } from '@data/talks/talks';

type Props = {
  params: Promise<{ year: string; talkId: string; slideId: string }>;
};

async function getSlides(fullTalkId: string) {
  try {
    const module = await import(`@data/talks/${fullTalkId}/SlidesData`);
    return module.default;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;

  const fullTalkId = `${resolvedParams.year}-${resolvedParams.talkId}`;
  const talk = talks.find((t) => t.id === fullTalkId);

  if (!talk) return {};

  const slides = await getSlides(fullTalkId);
  const slideNum = parseInt(resolvedParams.slideId, 10);
  const slideIndex = isNaN(slideNum) || !slides ? 0 : Math.max(0, Math.min(slides.length - 1, slideNum - 1));
  const slide = slides ? slides[slideIndex] : null;

  let specificTitle = `AppCheckWizard - ${talk.event} - ${talk.title}`;
  let specificImage = talk.imgSrc;

  if (slide) {
    if (slide.title) specificTitle = `${slide.title} | ${talk.event}`;
    if ('image' in slide && slide.image) specificImage = slide.image as string;
    else if ('bgImage' in slide && slide.bgImage) specificImage = slide.bgImage as string;
  }

  return {
    title: specificTitle,
    description: talk.description,
    openGraph: { title: specificTitle, description: talk.description, images: [{ url: specificImage }] },
    twitter: { card: 'summary_large_image', title: specificTitle, description: talk.description, images: [specificImage] },
  };
}

export default async function PresentationPage({ params }: Props) {
  const resolvedParams = await params;

  const fullTalkId = `${resolvedParams.year}-${resolvedParams.talkId}`;
  const talk = talks.find((t) => t.id === fullTalkId);
  const slides = await getSlides(fullTalkId);

  if (!talk || !slides) {
    return notFound();
  }

  const slideNum = parseInt(resolvedParams.slideId, 10);
  const initialSlide = isNaN(slideNum) ? 0 : Math.max(0, Math.min(slides.length - 1, slideNum - 1));

  return (
    <main className="font-josefin" style={{ width: '100%', height: '100vh', overflow: 'hidden', background: '#1a1a1a' }}>
      <Presentation
        slides={slides}
        initialSlide={initialSlide}
        basePath={`/talks/${resolvedParams.year}/${resolvedParams.talkId}`}
      />
    </main>
  );
}