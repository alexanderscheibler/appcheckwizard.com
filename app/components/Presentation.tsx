'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import slides, {SLIDE_WIDTH, SLIDE_HEIGHT, BULLETS_SVG} from '../data/talks/2026-atlseccon/SlidesData';
import { talks } from '@data/talks/talks';
import { Metadata } from "next";

type InlineTextPart = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  color?: string;
  underline?: boolean;
  monospace?: boolean;
};

type ParagraphData = {
  bullet?: boolean;
  text?: string;
  indent?: number;
  italic?: boolean;
  bold?: boolean;
  color?: string;
  align?: any;
  monospace?: boolean;
  parts?: InlineTextPart[];
};

const talk = talks.find((t) => t.id === '2026-atlseccon')!;

export const metadata: Metadata = {
  title: 'AppCheckWizard - ' + talk.event + ' - ' + talk.title,
  description: talk.description
};

function InlineText({ parts }: { parts: InlineTextPart[] }) {
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

function Paragraph({ para, style = {} }: { para: ParagraphData; style?: React.CSSProperties }) {
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
      <span
        style={{ marginLeft: 10 }}
      >
        {para.parts ? <InlineText parts={para.parts} /> : para.text}
      </span>
    </p>
  );
}

function Parchment({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#e8d9b0',
        ...style,
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
                    radial-gradient(ellipse at 15% 15%, rgba(210,185,130,0.55) 0%, transparent 55%),
                    radial-gradient(ellipse at 85% 10%, rgba(195,168,108,0.45) 0%, transparent 50%),
                    radial-gradient(ellipse at 10% 85%, rgba(200,172,112,0.50) 0%, transparent 52%),
                    radial-gradient(ellipse at 88% 88%, rgba(215,188,125,0.55) 0%, transparent 50%),
                    radial-gradient(ellipse at 50% 50%, rgba(240,225,180,0.30) 0%, transparent 65%),
                    linear-gradient(168deg, #dcc998 0%, #e5d4a8 20%, #eddcb2 42%, #e8d6a8 65%, #ddc898 85%, #d4be8e 100%)
                `,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        boxShadow: 'inset 0 0 60px rgba(90,55,10,0.28), inset 0 0 120px rgba(70,38,5,0.14)',
      }} />
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="parchment-noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.68 0.72" numOctaves={4} seed="3" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended" />
            <feComponentTransfer in="blended">
              <feFuncA type="linear" slope={1} />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
          mixBlendMode: 'multiply',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

function Ornament({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', ...style }}>
      <svg width="200" height="20" viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10,10 C30,2 50,18 70,10 C90,2 100,14 100,10 C100,6 110,18 130,10 C150,2 170,18 190,10"
          stroke="#5C3317" strokeWidth="2.5" fill="none" strokeLinecap="round"
        />
        <circle cx="100" cy="10" r="3" fill="#5C3317" />
      </svg>
    </div>
  );
}

function SlideTitle({ text, style = {} }: { text: string; style?: React.CSSProperties }) {
  const textAlign = (style as any).textAlign || 'center';
  return (
    <h1
      style={{
        position: 'absolute',
        top: 30,
        left: 76,
        width: 1128,
        margin: 0,
        textAlign,
        fontFamily: 'var(--font-display)',
        fontWeight: 400,
        fontSize: 68,
        color: '#3D2314',
        lineHeight: 1.1,
        letterSpacing: '0.01em',
        ...style,
      }}
    >
      {text}
    </h1>
  );
}

function BorderBox({ style = {}, children, color = '#1a5276' }: { style?: React.CSSProperties; children: React.ReactNode; color?: string }) {
  const { top, left, width, height, ...rest } = style as any;
  return (
    <div
      style={{
        position: 'absolute',
        top, left, width, height,
        border: `3px solid ${color}`,
        boxSizing: 'border-box',
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.12)',
        ...rest,
      }}
    >
      {children}
    </div>
  );
}

function CoverSlide({ slide }: { slide: any }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <img
        src={slide.bgImage}
        alt="Cover Background"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
      />
      <div
        style={{
          position: 'absolute',
          left: slide.titleStyle.left,
          top: slide.titleStyle.top,
          width: slide.titleStyle.width,
        }}
      >
        <h1
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

function VideoSlide({ slide }: { slide: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <Parchment>
      {slide.title && <SlideTitle text={slide.title} style={{ top: 30 }} />}
      <div
        style={{
          position: 'absolute',
          top: slide.title ? 118 : 32,
          left: 40,
          right: 40,
          bottom: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.06)',
          borderRadius: 4,
          border: '1px solid rgba(92,51,23,0.15)',
        }}
      >
        {slide.videoSrc ? (
          <video
            ref={videoRef}
            controls
            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 2 }}
            poster={slide.poster || undefined}
          >
            <source src={slide.videoSrc} type="video/mp4" />
            <source src={slide.videoSrc.replace('.mp4', '.mov')} type="video/quicktime" />
            Your browser does not support video playback.
          </video>
        ) : (
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 36,
            color: '#5C3317',
            opacity: 0.6,
            letterSpacing: 2,
          }}>
            [Video]
          </div>
        )}
      </div>
    </Parchment>
  );
}

function ChapterSlide({ slide }: { slide: any }) {
  const fs = slide.titleSize || 60;
  return (
    <Parchment>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px 100px',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: fs,
            color: '#3D2314',
            lineHeight: 1.2,
            letterSpacing: '0.01em',
            ...(slide.titleStyle || {}),
          }}
        >
          {slide.title}
        </h1>
        {slide.hasOrnament && <Ornament style={{ marginTop: 22, marginBottom: slide.subtitle ? 22 : 0 }} />}
        {slide.subtitle && (
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: Math.round(fs * 0.85),
              color: '#3D2314',
              lineHeight: 1.25,
              letterSpacing: '0.02em',
            }}
          >
            {slide.subtitle}
          </h2>
        )}
      </div>
    </Parchment>
  );
}

function ContentImageMidSlide({ slide }: { slide: any }) {
  const imgStyle = slide.imageStyle || { top: 155, left: 90, width: 1100, height: 510 };
  return (
    <Parchment>
      <SlideTitle text={slide.title} />
      <div style={{ position: 'absolute', ...imgStyle, overflow: 'hidden' }}>
        <img
          src={slide.image}
          alt={slide.imageAlt || 'Slide image'}
          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top center' }}
        />
      </div>
      {slide.imageCaption && (
        <p style={{
          position: 'absolute',
          top: (imgStyle.top + imgStyle.height) + 4,
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
            <li key={i} style={{ marginBottom: 6 }}>· {b}</li>
          ))}
        </ul>
      )}
    </Parchment>
  );
}

function ContentTextSlide({ slide }: { slide: any }) {
  const bStyle = slide.bodyStyle || { top: 155, left: 76, width: 1155 };
  const fs = slide.fontSize || 28;
  return (
    <Parchment>
      <SlideTitle text={slide.title} style={{ top: 30, ...(slide.titleStyle || {}) }} />
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
        {slide.paragraphs.map((para: any, i: number) => (
          <Paragraph key={i} para={{ ...para, align: para.align || bStyle.textAlign }} />
        ))}
      </div>
    </Parchment>
  );
}

function ContentBoxSlide({ slide }: { slide: any }) {
  return (
    <Parchment>
      <SlideTitle text={slide.title} />
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
          top: (slide.boxStyle.top + slide.boxStyle.height + 20),
          left: slide.bodyStyle?.left || 117,
          width: slide.bodyStyle?.width || 1054,
          fontFamily: 'var(--font-body)',
          fontSize: 28,
          color: '#3D2314',
          lineHeight: 1.55,
        }}>
          {slide.bodyLines.map((line: any, i: number) => (
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
          ))}
        </div>
      )}
    </Parchment>
  );
}

function ImageFullSlide({ slide }: { slide: any }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#000' }}>
      <img
        src={slide.image}
        alt={slide.imageAlt || 'Full slide image'}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 20%',
        }}
      />
      <div style={{
        position: 'absolute',
        top: 8,
        left: 67,
        right: 67,
        fontFamily: 'var(--font-body)',
        fontSize: 18,
        color: '#000',
        lineHeight: 1.3,
        background: 'rgba(255,255,255,0.7)',
        padding: '2px 6px',
      }}>
        {slide.attribution}{' '}
        <a href={slide.attributionLink} style={{ color: '#0000EE' }} target="_blank" rel="noreferrer">
          {slide.attributionLink}
        </a>
      </div>
      {slide.warning && (
        <div style={{
          position: 'absolute',
          bottom: slide.warningStyle?.bottom || 30,
          left: slide.warningStyle?.left || 315,
          right: 40,
          fontFamily: 'var(--font-body)',
          fontSize: slide.warningStyle?.fontSize || 52,
          fontWeight: slide.warningStyle?.fontWeight || 'bold',
          color: slide.warningStyle?.color || '#CC0000',
          textDecoration: slide.warningStyle?.textDecoration,
          textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
          lineHeight: 1.1,
        }}>
          {slide.warning}
        </div>
      )}
    </div>
  );
}

function ContentTwoColSlide({ slide }: { slide: any }) {
  const l = slide.leftContent;
  const r = slide.rightContent;
  const bodyFs = 26;
  return (
    <Parchment>
      <SlideTitle text={slide.title} />
      <div style={{ position: 'absolute', ...l.imageStyle, overflow: 'hidden' }}>
        <img src={l.image} alt={l.imageAlt || 'Left content'} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top left' }} />
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
        {r.items.map((item: any, i: number) => {
          if (item.label) {
            return <p key={i} style={{ margin: '0 0 6px', fontWeight: 'bold' }}>{item.label}</p>;
          }
          if (item.inline) {
            return (
              <p key={i} style={{ margin: '0 0 6px', color: item.color || '#3D2314' }}>
                <InlineText parts={item.inline} />
              </p>
            );
          }
          if (item.text === '\b' || item.text === '') {
            return <p key={i} style={{ margin: 0 }}>&nbsp;</p>;
          }
          return (
            <p key={i} style={{ margin: '0 0 6px', color: item.color || '#3D2314' }}>{item.text}</p>
          );
        })}
      </div>
    </Parchment>
  );
}

function ContentSplitBoxSlide({ slide }: { slide: any }) {
  const l = slide.leftContent;
  const r = slide.rightBox;
  return (
    <Parchment>
      <SlideTitle text={slide.title} />
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
        {l.items.map((item: any, i: number) => {
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

function ToolkitSlide({ slide }: { slide: any }) {
  return (
    <Parchment>
      <SlideTitle text={slide.title} style={{ top: 33 }} />
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
        {slide.sections.map((section: any, si: number) => (
          <div key={si} style={{ marginBottom: 8 }}>
            <p style={{ margin: '0 0 2px', fontWeight: '600', fontSize: 22, letterSpacing: 1 }}>{section.label}</p>
            {section.items.map((item: any, ii: number) => {
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
            top: 293,
            left: 530,
            width: 30,
            height: 159,
            fontFamily: 'var(--font-body)',
            fontSize: 94,
            color: '#3D2314',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
          }}>{'{'}</div>
          <div style={{
            position: 'absolute',
            top: 327,
            left: 555,
            width: 468,
            fontFamily: 'var(--font-body)',
            fontSize: 20,
            color: '#3D2314',
            lineHeight: 1.9,
          }}>
            {slide.sideNote.lines.map((line: any, i: number) => (
              <p key={i} style={{ margin: '2px 0' }}>
                <InlineText parts={line.parts} />
              </p>
            ))}
          </div>
        </>
      )}
    </Parchment>
  );
}

function ContactSlide({ slide }: { slide: any }) {
  return (
    <Parchment>
      {slide.logo && (
        <img
          src={slide.logo}
          alt="Logo"
          style={{ position: 'absolute', top: 20, left: 20, width: 220, height: 'auto', objectFit: 'contain' }}
        />
      )}
      <SlideTitle text={slide.title} style={{ left: 85, top: 71, fontSize: 94 }} />
      <div style={{
        position: 'absolute',
        top: 233,
        left: 154,
        width: 731,
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
        top: 477,
        left: 174,
        fontFamily: 'var(--font-body)',
        fontSize: 32,
        lineHeight: 1.6,
      }}>
        {slide.links.map((link: any, i: number) => (
          <p key={i} style={{ margin: '0 0 4px' }}>
            <a href={link.href} style={{ color: link.color || '#0000FF', textDecoration: 'underline' }} target="_blank" rel="noreferrer">
              {link.text}
            </a>
          </p>
        ))}
      </div>
      {slide.card && (
        <img
          src={slide.card}
          alt={slide.cardAlt || 'Contact Card'}
          style={{ position: 'absolute', top: 203, right: 70, width: 400, height: 'auto', objectFit: 'contain' }}
        />
      )}
    </Parchment>
  );
}

function ReferencesSlide({ slide }: { slide: any }) {
  return (
    <Parchment>
      {slide.logo && (
        <img
          src={slide.logo}
          alt="Logo"
          style={{ position: 'absolute', top: 30, right: 30, width: 160, height: 'auto', objectFit: 'contain', zIndex: 2 }}
        />
      )}
      <SlideTitle text={slide.title} style={{ top: 63 }} />
      <div style={{
        position: 'absolute',
        top: 179,
        left: 76,
        right: 180,
        fontFamily: 'var(--font-body)',
        fontSize: 24,
        color: '#3D2314',
        lineHeight: 1.7,
      }}>
        {slide.refs.map((ref: any, i: number) => (
          <p key={i} style={{ margin: '0 0 14px' }}>
            {'- '}
            {ref.parts ? <InlineText parts={ref.parts} /> : ref.text}
            {ref.href && (
              <>
                {' '}
                <a href={ref.href} style={{ color: '#0000FF', wordBreak: 'break-all' }} target="_blank" rel="noreferrer">
                  {ref.href}
                </a>
              </>
            )}
          </p>
        ))}
      </div>
    </Parchment>
  );
}

function SlideRenderer({ slide }: { slide: any }) {
  switch (slide.type) {
    case 'cover':             return <CoverSlide slide={slide} />;
    case 'video':             return <VideoSlide slide={slide} />;
    case 'chapter':           return <ChapterSlide slide={slide} />;
    case 'content-image-top':
    case 'content-image-mid': return <ContentImageMidSlide slide={slide} />;
    case 'content-text':      return <ContentTextSlide slide={slide} />;
    case 'content-box':       return <ContentBoxSlide slide={slide} />;
    case 'image-full':        return <ImageFullSlide slide={slide} />;
    case 'content-two-col':   return <ContentTwoColSlide slide={slide} />;
    case 'content-split-box': return <ContentSplitBoxSlide slide={slide} />;
    case 'toolkit':           return <ToolkitSlide slide={slide} />;
    case 'contact':           return <ContactSlide slide={slide} />;
    case 'references':        return <ReferencesSlide slide={slide} />;
    default:
      return (
        <Parchment>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontFamily: 'sans-serif', color: '#666' }}>Slide {slide.id}</p>
          </div>
        </Parchment>
      );
  }
}

function SlideWrapper({ slide, direction }: { slide: any; direction: string }) {
  return (
    <div
      key={slide.id}
      style={{
        position: 'absolute',
        inset: 0,
        animation: `slideIn${direction} 0.35s cubic-bezier(0.4, 0, 0.2, 1) both`,
      }}
    >
      <SlideRenderer slide={slide} />
    </div>
  );
}

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('Right');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const total = slides.length;

  const goTo = useCallback((index: number) => {
    if (index === current) return;
    setDirection(index > current ? 'Right' : 'Left');
    setCurrent(index);
  }, [current]);

  const prev = useCallback(() => goTo(Math.max(0, current - 1)), [current, goTo]);
  const next = useCallback(() => goTo(Math.min(total - 1, current + 1)), [current, total, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev(); }
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  useEffect(() => {
    const updateScale = () => {
      if (!scaleRef.current || !containerRef.current) return;
      const containerW = containerRef.current.clientWidth;
      const containerH = containerRef.current.clientHeight;

      const availH = containerH - 80;
      const scaleByW = containerW / SLIDE_WIDTH;
      const scaleByH = availH / SLIDE_HEIGHT;
      const scale = Math.min(scaleByW, scaleByH, 1);

      scaleRef.current.style.transform = `scale(${scale})`;

      if (scaleRef.current.parentElement) {
        scaleRef.current.parentElement.style.width = `${SLIDE_WIDTH * scale}px`;
        scaleRef.current.parentElement.style.height = `${SLIDE_HEIGHT * scale}px`;
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const slide = slides[current];

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        background: '#1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        gap: 0,
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div
            ref={scaleRef}
            style={{
              width: SLIDE_WIDTH,
              height: SLIDE_HEIGHT,
              transformOrigin: 'top left',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
            }}
          >
            <SlideWrapper key={slide.id} slide={slide} direction={direction} />
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginTop: 14,
          padding: '8px 20px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 40,
          backdropFilter: 'blur(4px)',
          flexShrink: 0,
        }}
      >
        <button onClick={prev} disabled={current === 0} style={btnStyle(current === 0)} aria-label="Previous slide">◀</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#ccc', fontFamily: 'monospace', fontSize: 14, minWidth: 70, textAlign: 'center' }}>
                        {current + 1} / {total}
                    </span>
          <input
            type="range"
            min={0}
            max={total - 1}
            value={current}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => goTo(Number(e.target.value))}
            style={{ width: 160, accentColor: '#c9a96e', cursor: 'pointer' }}
            aria-label="Slide scrubber"
          />
        </div>

        <button onClick={next} disabled={current === total - 1} style={btnStyle(current === total - 1)} aria-label="Next slide">▶</button>

        <button onClick={toggleFullscreen} style={btnStyle(false)} aria-label="Toggle fullscreen">
          {isFullscreen ? '⊡' : '⛶'}
        </button>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 6, fontFamily: 'monospace', flexShrink: 0 }}>
        ← → arrow keys to navigate · F for fullscreen
      </p>

      {/* Since layout.tsx is now injecting the fonts directly into CSS variables,
                we can just map your legacy variable names to the new Next.js ones.
            */}
      <style>{`
                :root {
                    --font-display: var(--font-parchment), 'Papyrus', fantasy;
                    --font-body: var(--font-josefin), 'Gill Sans', sans-serif;
                }

                * { box-sizing: border-box; }
                p { margin: 0; }

                @keyframes slideInRight {
                    from { transform: translateX(60px); opacity: 0; }
                    to   { transform: translateX(0);    opacity: 1; }
                }
                @keyframes slideInLeft {
                    from { transform: translateX(-60px); opacity: 0; }
                    to   { transform: translateX(0);     opacity: 1; }
                }
            `}</style>
    </div>
  );
}

function btnStyle(disabled: boolean): React.CSSProperties {
  return {
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: disabled ? 'rgba(255,255,255,0.25)' : '#fff',
    borderRadius: 8,
    padding: '6px 14px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: 16,
    transition: 'background 0.15s',
  };
}