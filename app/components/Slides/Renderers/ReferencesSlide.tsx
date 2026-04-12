import type {ReferencesSlide as ReferencesSlideData} from "@data/talks/2026-atlseccon/SlidesData";
import CustomImage from "@components/CustomImage";
import React from "react";
import {SlideTitle} from "@components/Slides/Primitives/SlideTitle";
import {Parchment} from "@components/Slides/Primitives/Parchment";
import {InlineText} from "@components/Slides/Primitives/InlineText";

export default function ReferencesSlide({ slide }: { slide: ReferencesSlideData }) {
  return (
    <Parchment>
      {slide.logo && (
        <CustomImage
          src={slide.logo}
          alt="Logo"
          width={160}
          height={160}
          style={{ position: 'absolute', top: 30, right: 30, objectFit: 'contain' }}
        />
      )}
      {slide.title && <SlideTitle text={slide.title} style={{ top: 63 }} />}
      <div style={{
        position: 'absolute',
        top: 179, left: 76, right: 180,
        fontFamily: 'var(--font-body)',
        fontSize: 24,
        color: '#3D2314',
        lineHeight: 1.7,
      }}>
        {slide.refs.map((ref, i: number) => (
          <p key={i} style={{ margin: '0 0 14px' }}>
            {'- '}
            {ref.parts ? <InlineText parts={ref.parts} /> : ref.text}
            {ref.href && (
              <>
                {' '}
                <a href={ref.href} style={{ color: '#0000FF', wordBreak: 'break-all' }} target="_blank" rel="noreferrer">
                  {ref.href}
                </a>
              </>
            )}
          </p>
        ))}
      </div>
    </Parchment>
  );
}