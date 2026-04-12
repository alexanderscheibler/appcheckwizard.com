import { InlineTextPart } from "@data/talks/2026-atlseccon/SlidesData";
import React from "react";

export function InlineText({ parts }: { parts: InlineTextPart[] }) {
  return (
    <>
      {parts.map((part, i) => (
        <span
          key={i}
          style={{
            fontWeight: part.bold ? 'bold' : 'inherit',
            fontStyle: part.italic ? 'italic' : 'inherit',
            color: part.color || 'inherit',
            textDecoration: part.underline ? 'underline' : 'inherit',
            fontFamily: part.monospace ? "'Courier New', monospace" : 'inherit',
          }}
        >
          {part.text}
        </span>
      ))}
    </>
  );
}