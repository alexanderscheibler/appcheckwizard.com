import type {
  ChapterSlide as ChapterSlideData,
} from '@data/talks/2026-atlseccon/SlidesData';
import {Parchment} from "@components/Slides/Primitives/Parchment";
import {Ornament} from "@components/Slides/Primitives/Ornament";

export default function ChapterSlide({ slide }: { slide: ChapterSlideData }) {
  const fs = slide.titleSize || 60;
  return (
    <Parchment>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px 100px',
        }}
      >
        <h1
          data-slide-display
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: fs,
            color: '#3D2314',
            lineHeight: 1.2,
            letterSpacing: '0.01em',
            ...(slide.titleStyle || {}),
          }}
        >
          {slide.title}
        </h1>
        {slide.hasOrnament && <Ornament style={{ marginTop: 22, marginBottom: slide.subtitle ? 22 : 0 }} />}
        {slide.subtitle && (
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: Math.round(fs * 0.85),
              color: '#3D2314',
              lineHeight: 1.25,
              letterSpacing: '0.02em',
            }}
          >
            {slide.subtitle}
          </h2>
        )}
      </div>
    </Parchment>
  );
}