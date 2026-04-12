import type {ContentSplitBoxSlide as ContentSplitBoxSlideData, ListItem} from "@data/talks/2026-atlseccon/SlidesData";
import React from "react";
import {SlideTitle} from "@components/Slides/Primitives/SlideTitle";
import {Parchment} from "@components/Slides/Primitives/Parchment";
import {InlineText} from "@components/Slides/Primitives/InlineText";
import BorderBox from "@components/Slides/Primitives/BorderBox";

export default function ContentSplitBoxSlide({ slide }: { slide: ContentSplitBoxSlideData }) {
  const l = slide.leftContent;
  const r = slide.rightBox;
  return (
    <Parchment>
      {slide.title && <SlideTitle text={slide.title} />}
      <div style={{
        position: 'absolute',
        top: l.style.top,
        left: l.style.left,
        width: l.style.width,
        fontFamily: 'var(--font-body)',
        fontSize: 27,
        color: '#3D2314',
        lineHeight: 1.55,
      }}>
        {l.items.map((item: ListItem, i: number) => {
          if (item.parts) return <p key={i} style={{ margin: '0 0 6px' }}><InlineText parts={item.parts} /></p>;
          if (item.text === '') return <p key={i} style={{ margin: 0 }}>&nbsp;</p>;
          return <p key={i} style={{ margin: '0 0 6px', fontWeight: item.bold ? 'bold' : 'normal' }}>{item.text}</p>;
        })}
      </div>
      <BorderBox style={r.style}>
        {r.items.map((item: string, i: number) => (
          <p key={i} style={{
            margin: '8px 0',
            fontFamily: 'var(--font-body)',
            fontSize: 28,
            color: '#3D2314',
            fontWeight: r.itemStyle?.fontWeight || 'normal',
          }}>
            {item}
          </p>
        ))}
      </BorderBox>
    </Parchment>
  );
}