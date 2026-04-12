import type {ListItem, ToolkitSlide as ToolkitSlideData} from "@data/talks/2026-atlseccon/SlidesData";
import React from "react";
import {SlideTitle} from "@components/Slides/Primitives/SlideTitle";
import {Parchment} from "@components/Slides/Primitives/Parchment";
import {InlineText} from "@components/Slides/Primitives/InlineText";

export default function ToolkitSlide({ slide }: { slide: ToolkitSlideData }) {
  return (
    <Parchment>
      {slide.title && <SlideTitle text={slide.title} style={{ top: 33 }} />}
      <div style={{
        position: 'absolute',
        top: 130,
        left: 125,
        width: 1030,
        fontFamily: 'var(--font-body)',
        fontSize: 24,
        color: '#3D2314',
        lineHeight: 1.55,
      }}>
        {slide.sections.map((section, si: number) => (
          <div key={si} style={{ marginBottom: 8 }}>
            <p style={{ margin: '0 0 2px', fontWeight: '600', fontSize: 22, letterSpacing: 1 }}>{section.label}</p>
            {section.items.map((item: ListItem, ii: number) => {
              if (item.text) return <p key={ii} style={{ margin: '20px 0' }}>{item.text}</p>;
              if (item.parts) return <p key={ii} style={{ margin: '20px 0' }}><InlineText parts={item.parts} /></p>;
              return null;
            })}
          </div>
        ))}
      </div>
      {slide.sideNote && (
        <>
          <div style={{
            position: 'absolute',
            top: 283, left: 530,
            width: 30, height: 170,
            fontFamily: 'var(--font-body)',
            fontSize: 84,
            color: '#3D2314',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
          }}>{'{'}</div>
          <div style={{
            position: 'absolute',
            top: 327, left: 555,
            width: 468,
            fontFamily: 'var(--font-body)',
            fontSize: 20,
            color: '#3D2314',
            lineHeight: 1.9,
          }}>
            {slide.sideNote.lines.map((line, i: number) => (              <p key={i} style={{ margin: '2px 0' }}>
                <InlineText parts={line.parts} />
              </p>
            ))}
          </div>
        </>
      )}
    </Parchment>
  );
}