import {BULLETS_SVG, ParagraphData} from "@data/talks/2026-atlseccon/SlidesData";
import React from "react";
import {InlineText} from "@components/Slides/Primitives/InlineText";

export function Paragraph({ para, style = {} }: { para: ParagraphData; style?: React.CSSProperties }) {
  if (para.text === '\b' || para.text === '') {
    return <p style={{ margin: 0, lineHeight: 'inherit', ...style }}>&nbsp;</p>;
  }

  const base: React.CSSProperties = {
    margin: 0,
    paddingLeft: para.indent || 0,
    fontStyle: para.italic ? 'italic' : undefined,
    fontWeight: para.bold ? 'bold' : undefined,
    color: para.color || undefined,
    textAlign: para.align || 'left',
    fontFamily: para.monospace ? "'Courier New', monospace" : 'var(--font-body)',
    whiteSpace: 'pre-wrap',
    ...style,
  };

  return (
    <p style={base}>
      {para.bullet && (
        <span
          dangerouslySetInnerHTML={{ __html: BULLETS_SVG }}
          style={{ display: 'inline-flex', marginTop: 6 }}
        />
      )}
      <span style={{ marginLeft: 10 }}>
        {para.parts ? <InlineText parts={para.parts} /> : para.text}
      </span>
    </p>
  );
}