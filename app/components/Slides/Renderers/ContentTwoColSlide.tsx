import type {ContentTwoColSlide as ContentTwoColSlideData, ListItem} from "@data/talks/2026-atlseccon/SlidesData";
import CustomImage from "@components/CustomImage";
import React from "react";
import {SlideTitle} from "@components/Slides/Primitives/SlideTitle";
import {Parchment} from "@components/Slides/Primitives/Parchment";
import {InlineText} from "@components/Slides/Primitives/InlineText";

export default function ContentTwoColSlide({ slide }: { slide: ContentTwoColSlideData }) {
  const l = slide.leftContent;
  const r = slide.rightContent;
  const bodyFs = 26;
  return (
    <Parchment>
      {slide.title && <SlideTitle text={slide.title} />}
      <div style={{ position: 'absolute', ...l.imageStyle, overflow: 'hidden' }}>
        <CustomImage
          src={l.image}
          alt={l.imageAlt || 'Left content'}
          fill
          sizes="50vw"
          style={{ objectFit: 'contain', objectPosition: 'top left' }}
        />
      </div>
      {l.caption && (
        <p style={{
          position: 'absolute',
          top: l.captionStyle?.top,
          left: l.captionStyle?.left,
          width: l.captionStyle?.width,
          textAlign: 'center',
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 20,
          fontStyle: 'italic',
          color: '#5C3317',
        }}>
          {l.caption}
        </p>
      )}
      <div style={{
        position: 'absolute',
        top: r.style.top,
        left: r.style.left,
        width: r.style.width,
        fontFamily: 'var(--font-body)',
        fontSize: bodyFs,
        color: '#3D2314',
        lineHeight: 1.5,
      }}>
        {r.items.map((item: ListItem, i: number) => {
          if (item.label) return <p key={i} style={{ margin: '0 0 6px', fontWeight: 'bold' }}>{item.label}</p>;
          if (item.inline) return <p key={i} style={{ margin: '0 0 6px', color: item.color || '#3D2314' }}><InlineText parts={item.inline} /></p>;
          if (item.text === '\b' || item.text === '') return <p key={i} style={{ margin: 0 }}>&nbsp;</p>;
          return <p key={i} style={{ margin: '0 0 6px', color: item.color || '#3D2314' }}>{item.text}</p>;
        })}
      </div>
    </Parchment>
  );
}