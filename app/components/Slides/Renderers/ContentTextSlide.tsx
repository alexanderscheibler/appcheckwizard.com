import type {ContentTextSlide as ContentTextSlideData, ParagraphData} from "@data/talks/2026-atlseccon/SlidesData";
import React from "react";
import {SlideTitle} from "@components/Slides/Primitives/SlideTitle";
import {Parchment} from "@components/Slides/Primitives/Parchment";
import {Paragraph} from "@components/Slides/Primitives/Paragraph";

export default function ContentTextSlide({ slide }: { slide: ContentTextSlideData }) {
  const bStyle = slide.bodyStyle || { top: 155, left: 76, width: 1155 };
  const fs = slide.fontSize || 28;
  return (
    <Parchment>
      {slide.title && <SlideTitle text={slide.title} style={{ top: 30, ...(slide.titleStyle || {}) }} />}
      <div
        style={{
          position: 'absolute',
          top: bStyle.top,
          left: bStyle.left,
          width: bStyle.width,
          fontFamily: 'var(--font-body)',
          fontSize: fs,
          color: '#3D2314',
          lineHeight: 1.55,
          textAlign: bStyle.textAlign || 'left',
        }}
      >
        {slide.paragraphs.map((para: ParagraphData, i: number) => (
          <Paragraph
            key={i}
            para={{
              ...para,
              align: para.align || (bStyle.textAlign as 'left' | 'center' | 'right' | 'justify' | undefined)
            }}
          />
        ))}
      </div>
    </Parchment>
  );
}