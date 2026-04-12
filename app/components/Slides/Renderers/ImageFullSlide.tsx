import type {ImageFullSlide as ImageFullSlideData} from "@data/talks/2026-atlseccon/SlidesData";
import CustomImage from "@components/CustomImage";
import React from "react";

export default function ImageFullSlide({ slide }: { slide: ImageFullSlideData }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#000' }}>
      <CustomImage
        src={slide.image}
        alt={slide.imageAlt}
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
      />
      <div style={{
        position: 'absolute',
        top: 8,
        left: 67,
        right: 67,
        fontFamily: 'var(--font-body)',
        fontSize: 18,
        color: '#000',
        lineHeight: 1.3,
        background: 'rgba(255,255,255,0.7)',
        padding: '2px 6px',
      }}>
        {slide.attribution}{' '}
        <a href={slide.attributionLink} style={{ color: '#0000EE' }} target="_blank" rel="noreferrer">
          {slide.attributionLink}
        </a>
      </div>
      {slide.warning && (
        <div style={{
          position: 'absolute',
          bottom: slide.warningStyle?.bottom || 30,
          left: slide.warningStyle?.left || 315,
          right: 40,
          fontFamily: 'var(--font-body)',
          fontSize: slide.warningStyle?.fontSize || 52,
          fontWeight: slide.warningStyle?.fontWeight || 'bold',
          color: slide.warningStyle?.color || '#CC0000',
          textDecoration: slide.warningStyle?.textDecoration,
          textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
          lineHeight: 1.1,
        }}>
          {slide.warning}
        </div>
      )}
    </div>
  );
}