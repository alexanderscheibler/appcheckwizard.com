import type {ContentImageSlide as ContentImageSlideData} from "@data/talks/2026-atlseccon/SlidesData";
import CustomImage from "@components/CustomImage";
import React from "react";
import {SlideTitle} from "@components/Slides/Primitives/SlideTitle";
import {Parchment} from "@components/Slides/Primitives/Parchment";

export default function ContentImageMidSlide({ slide }: { slide: ContentImageSlideData }) {
  const imgStyle = slide.imageStyle || { top: 155, left: 90, width: 1100, height: 510 };

  const topVal = Number(imgStyle.top || 155);
  const heightVal = Number(imgStyle.height || 510);
  const captionTop = topVal + heightVal + 4;

  return (
    <Parchment>
      {slide.title && <SlideTitle text={slide.title}/>}
      <div style={{position: 'absolute', ...imgStyle, overflow: 'hidden'}}>
        <CustomImage
          src={slide.image}
          alt={slide.imageAlt || 'Slide image'}
          fill
          style={{objectFit: 'contain', objectPosition: 'top center'}}
        />
      </div>

      {slide.imageCaption && (
        <p style={{
          position: 'absolute',
          top: captionTop,
          left: imgStyle.left,
          width: imgStyle.width,
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: 20,
          fontStyle: 'italic',
          color: '#5C3317',
          margin: 0,
        }}>
          {slide.imageCaption}
        </p>
      )}
      {slide.bullets && (
        <ul style={{
          position: 'absolute',
          top: slide.bulletsStyle?.top || 500,
          left: slide.bulletsStyle?.left || 128,
          right: 40,
          margin: 0,
          padding: 0,
          listStyle: 'none',
          fontFamily: 'var(--font-body)',
          fontSize: 28,
          color: '#3D2314',
          lineHeight: 1.45,
        }}>
          {slide.bullets.map((b: string, i: number) => (
            <li key={i} style={{marginBottom: 6}}>· {b}</li>
          ))}
        </ul>
      )}
    </Parchment>
  );
}