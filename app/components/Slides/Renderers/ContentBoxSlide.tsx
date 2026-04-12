import type {ContentBoxSlide as ContentBoxSlideData, ParagraphData} from "@data/talks/2026-atlseccon/SlidesData";
import React from "react";
import {Parchment} from "@components/Slides/Primitives/Parchment";
import {SlideTitle} from "@components/Slides/Primitives/SlideTitle";
import BorderBox from "@components/Slides/Primitives/BorderBox";

export default function ContentBoxSlide({ slide }: { slide: ContentBoxSlideData }) {
  return (
    <Parchment>
      {slide.title && <SlideTitle text={slide.title} />}
      {slide.intro && (
        <p style={{
          position: 'absolute',
          top: slide.introStyle?.top || 149,
          left: slide.introStyle?.left || 112,
          width: slide.introStyle?.width || 1114,
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 28,
          color: '#3D2314',
          lineHeight: 1.5,
        }}>
          {slide.intro}
        </p>
      )}
      <BorderBox style={slide.boxStyle}>
        {slide.boxContent.map((line: string, i: number) => (
          <p key={i} style={{
            margin: '0.7em 0',
            paddingLeft: '2em',
            fontFamily: 'var(--font-body)',
            fontSize: 24,
            color: '#3D2314',
            whiteSpace: 'pre-wrap',
          }}>
            {line}
          </p>
        ))}
      </BorderBox>
      {slide.bodyLines && (
        <div style={{
          position: 'absolute',
          top: (Number(slide.boxStyle.top) + Number(slide.boxStyle.height) + 20),
          left: slide.bodyStyle?.left || 117,
          width: slide.bodyStyle?.width || 1054,
          fontFamily: 'var(--font-body)',
          fontSize: 28,
          color: '#3D2314',
          lineHeight: 1.55,
        }}>
          {slide.bodyLines.map((line: ParagraphData, i: number) =>
            line.text === '' || line.text === '\b'
              ? <p key={i} style={{ margin: 0 }}>&nbsp;</p>
              : <p key={i} style={{
                margin: '2px 0',
                fontWeight: line.bold ? 'bold' : 'normal',
                fontStyle: line.italic ? 'italic' : 'normal',
                textAlign: line.align || 'left',
              }}>
                {line.text}
              </p>
          )}
        </div>
      )}
    </Parchment>
  );
}