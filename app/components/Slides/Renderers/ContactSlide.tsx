import {Parchment} from "@components/Slides/Primitives/Parchment";
import CustomImage from "@components/CustomImage";
import {SlideTitle} from "@components/Slides/Primitives/SlideTitle";

import type {
  ContactSlide as ContactSlideData
} from '@data/talks/2026-atlseccon/SlidesData';

export default function ContactSlide({ slide }: { slide: ContactSlideData }) {
  return (
    <Parchment>
      {slide.logo && (
        <CustomImage
          src={slide.logo}
          alt="Logo"
          width={220}
          height={220}
          style={{ position: 'absolute', top: 20, left: 20, objectFit: 'contain' }}
        />
      )}
      {slide.title && <SlideTitle text={slide.title} style={{ left: 85, top: 71, fontSize: 94 }} />}
      <div style={{
        position: 'absolute',
        top: 233, left: 154, width: 731,
        fontFamily: 'var(--font-body)',
        fontSize: 34,
        color: '#3D2314',
        lineHeight: 1.5,
      }}>
        <p style={{ margin: '0 0 10px' }}>{slide.name}</p>
        {slide.bullets.map((b: string, i: number) => (
          <p key={i} style={{ margin: '0 0 4px' }}>· {b}</p>
        ))}
      </div>
      <div style={{
        position: 'absolute',
        top: 477, left: 174,
        fontFamily: 'var(--font-body)',
        fontSize: 32,
        lineHeight: 1.6,
      }}>
        {slide.links.map((link, i: number) => (
          <p key={i} style={{ margin: '0 0 4px' }}>
            <a href={link.href} style={{ color: link.color || '#0000FF', textDecoration: 'underline' }} target="_blank" rel="noreferrer">
              {link.text}
            </a>
          </p>
        ))}
      </div>
      {slide.card && (
        <CustomImage
          src={slide.card}
          alt={slide.cardAlt || 'Contact Card'}
          width={400}
          height={400}
          style={{ position: 'absolute', top: 203, right: 70, objectFit: 'contain' }}
        />
      )}
    </Parchment>
  );
}