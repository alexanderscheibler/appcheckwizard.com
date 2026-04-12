import type {CoverSlide as CoverSlideData} from "@data/talks/2026-atlseccon/SlidesData";
import CustomImage from "@components/CustomImage";
import React from "react";

export default function CoverSlide({ slide }: { slide: CoverSlideData }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <CustomImage style={{ objectFit: 'contain', objectPosition: 'center'  }}
                   src={slide.bgImage}
                   alt="Cover Background"
                   fill
      />
      <div style={{ position: 'absolute', left: slide.titleStyle.left, top: slide.titleStyle.top, width: slide.titleStyle.width }}>
        <h1
          data-slide-display
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: slide.titleStyle.fontSize || 60,
            color: slide.titleStyle.color,
            textShadow: slide.titleStyle.textShadow,
            lineHeight: slide.titleStyle.lineHeight,
          }}
        >
          {slide.title}
        </h1>
      </div>
    </div>
  );
}