'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { preload } from 'react-dom';
import { SLIDE_WIDTH, SLIDE_HEIGHT } from '@data/talks/2026-atlseccon/SlidesData';

import type {
  Slide,
  CoverSlide as CoverSlideData,
  VideoSlide as VideoSlideData,
  ChapterSlide as ChapterSlideData,
  ContentImageSlide as ContentImageSlideData,
  ContentTextSlide as ContentTextSlideData,
  ContentBoxSlide as ContentBoxSlideData,
  ImageFullSlide as ImageFullSlideData,
  ContentTwoColSlide as ContentTwoColSlideData,
  ContentSplitBoxSlide as ContentSplitBoxSlideData,
  ToolkitSlide as ToolkitSlideData,
  ContactSlide as ContactSlideData,
  ReferencesSlide as ReferencesSlideData
} from '@data/talks/2026-atlseccon/SlidesData';

// Primitives and Icons
import { Parchment } from "@components/Slides/Primitives/Parchment";
import { NavIconNext } from "@components/Slides/Primitives/NavIconNext";
import { NavIconPrev } from "@components/Slides/Primitives/NavIconPrev";
import { NavIconExitFullscreen } from "@components/Slides/Primitives/NavIconExitFullscreen";
import { NavIconFullscreen } from "@components/Slides/Primitives/NavIconFullscreen";
import localFont from "next/font/local";
import { Josefin_Sans } from "next/font/google";

// ─── Dynamic Slide Imports ─────────────────────────────────────────────────────
const CoverSlide = dynamic(() => import('@components/Slides/Renderers/CoverSlide'));
const VideoSlide = dynamic(() => import('@components/Slides/Renderers/VideoSlide'), {
  loading: () => <p style={{ color: 'white', textAlign: 'center' }}>Loading Video...</p>
});
const ChapterSlide = dynamic(() => import('@components/Slides/Renderers/ChapterSlide'));
const ContentImageMidSlide = dynamic(() => import('@components/Slides/Renderers/ContentImageMidSlide'));
const ContentTextSlide = dynamic(() => import('@components/Slides/Renderers/ContentTextSlide'));
const ContentBoxSlide = dynamic(() => import('@components/Slides/Renderers/ContentBoxSlide'));
const ImageFullSlide = dynamic(() => import('@components/Slides/Renderers/ImageFullSlide'));
const ContentTwoColSlide = dynamic(() => import('@components/Slides/Renderers/ContentTwoColSlide'));
const ContentSplitBoxSlide = dynamic(() => import('@components/Slides/Renderers/ContentSplitBoxSlide'));
const ToolkitSlide = dynamic(() => import('@components/Slides/Renderers/ToolkitSlide'));
const ContactSlide = dynamic(() => import('@components/Slides/Renderers/ContactSlide'));
const ReferencesSlide = dynamic(() => import('@components/Slides/Renderers/ReferencesSlide'));

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
});

const parchment = localFont({
  src: '../../app/fonts/ParchmentMF.woff2',
  variable: '--font-parchment',
  display: 'block',
  fallback: ['Papyrus', 'fantasy', 'serif']
});

// ─── Slide Dispatcher & Wrapper ────────────────────────────────────────────────
function SlideRenderer({ slide }: { slide: Slide }) {
  switch (slide.type) {
    case 'cover':             return <CoverSlide slide={slide as CoverSlideData} />;
    case 'video':             return <VideoSlide slide={slide as VideoSlideData} />;
    case 'chapter':           return <ChapterSlide slide={slide as ChapterSlideData} />;
    case 'content-image-top':
    case 'content-image-mid': return <ContentImageMidSlide slide={slide as ContentImageSlideData} />;
    case 'content-text':      return <ContentTextSlide slide={slide as ContentTextSlideData} />;
    case 'content-box':       return <ContentBoxSlide slide={slide as ContentBoxSlideData} />;
    case 'image-full':        return <ImageFullSlide slide={slide as ImageFullSlideData} />;
    case 'content-two-col':   return <ContentTwoColSlide slide={slide as ContentTwoColSlideData} />;
    case 'content-split-box': return <ContentSplitBoxSlide slide={slide as ContentSplitBoxSlideData} />;
    case 'toolkit':           return <ToolkitSlide slide={slide as ToolkitSlideData} />;
    case 'contact':           return <ContactSlide slide={slide as ContactSlideData} />;
    case 'references':        return <ReferencesSlide slide={slide as ReferencesSlideData} />;
    default:
      return (
        <Parchment>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontFamily: 'sans-serif', color: '#666' }}>Slide {(slide as Slide).id}</p>
          </div>
        </Parchment>
      );
  }
}

function SlideWrapper({ slide, direction }: { slide: Slide; direction: string }) {
  return (
    <div
      key={slide.id}
      style={{
        position: 'absolute',
        inset: 0,
        animation: `slideIn${direction} 0.35s cubic-bezier(0.4, 0, 0.2, 1) both`,
      }}
    >
      <Suspense fallback={
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e8d9b0' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 24, color: 'rgba(92,51,23,0.5)' }}>Loading...</p>
        </div>
      }>
        <SlideRenderer slide={slide} />
      </Suspense>
    </div>
  );
}

// ─── Navigation Bar ──────────────────────────────────────────────────
function PresentationControls({
                                current, total, isFullscreen, onPrev, onNext, onGoTo, onToggleFullscreen
                              }: {
  current: number, total: number, isFullscreen: boolean,
  onPrev: () => void, onNext: () => void, onGoTo: (i: number) => void, onToggleFullscreen: () => void
}) {
  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: disabled ? 'rgba(255,255,255,0.25)' : '#fff',
    borderRadius: 8,
    padding: '6px 14px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: 16,
    transition: 'background 0.15s',
  });

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16, marginTop: 14,
      padding: '8px 20px', background: 'rgba(255,255,255,0.08)',
      borderRadius: 40, backdropFilter: 'blur(4px)', flexShrink: 0,
    }}>
      <button onClick={onPrev} disabled={current === 0} style={btnStyle(current === 0)} aria-label="Previous slide">
        <NavIconPrev />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#ccc', fontFamily: 'monospace', fontSize: 14, minWidth: 70, textAlign: 'center' }}>
          {current + 1} / {total}
        </span>
        <input
          type="range" min={0} max={total - 1} value={current}
          onChange={(e) => onGoTo(Number(e.target.value))}
          style={{ width: 160, accentColor: '#c9a96e', cursor: 'pointer' }}
          aria-label="Slide scrubber"
        />
      </div>

      <button onClick={onNext} disabled={current === total - 1} style={btnStyle(current === total - 1)} aria-label="Next slide">
        <NavIconNext />
      </button>

      <button onClick={onToggleFullscreen} style={btnStyle(false)} aria-label="Toggle fullscreen">
        {isFullscreen ? <NavIconExitFullscreen /> : <NavIconFullscreen />}
      </button>
    </div>
  );
}

// ─── Main Presentation Core ────────────────────────────────────────────────────
function PresentationCore({ slides, initialSlide, basePath }: { slides: Slide[], initialSlide: number, basePath: string }) {
  const total = slides.length;

  const [current, setCurrent] = useState(initialSlide);
  const [direction, setDirection] = useState('Right');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef(0);

  // Initialize browser history state if it's empty so the first popstate works
  useEffect(() => {
    if (!window.history.state) {
      window.history.replaceState({ slideIndex: initialSlide }, '', `${basePath}/${initialSlide + 1}`);
    }
  }, [initialSlide, basePath]);

  const goTo = useCallback((index: number) => {
    if (index === current) return;
    setDirection(index > current ? 'Right' : 'Left');
    setCurrent(index);

    // We pass the index into the state object so we can read it when the user clicks 'Back'
    window.history.pushState({ slideIndex: index }, '', `${basePath}/${index + 1}`);
  }, [current, basePath]);

  const prev = useCallback(() => goTo(Math.max(0, current - 1)), [current, goTo]);
  const next = useCallback(() => goTo(Math.min(total - 1, current + 1)), [current, total, goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) < 40) return;

    if (diff > 0) {
      next();
    } else {
      prev();
    }
  };

  // Listen for the Browser Back/Forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      let newIndex = 0;

      // If we have our explicitly pushed state, use it
      if (event.state && typeof event.state.slideIndex === 'number') {
        newIndex = event.state.slideIndex;
      } else {
        // Fallback: parse it from the URL
        const pathParts = window.location.pathname.split('/');
        const urlSlide = parseInt(pathParts[pathParts.length - 1], 10);
        newIndex = isNaN(urlSlide) ? 0 : Math.max(0, Math.min(total - 1, urlSlide - 1));
      }

      if (newIndex !== current) {
        setDirection(newIndex > current ? 'Right' : 'Left');
        setCurrent(newIndex);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [current, total]);

  useEffect(() => {
    const nextSlides = slides.slice(current + 1, current + 3);
    nextSlides.forEach((s) => {
      if ('bgImage' in s && s.bgImage) preload(s.bgImage, { as: 'image' });
      if ('image' in s && s.image) preload(s.image, { as: 'image' });
    });
  }, [current, slides]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => console.warn(err.message));
    } else {
      document.exitFullscreen().catch((err) => console.warn(err.message));
    }
  };

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

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
      const scale = Math.min(containerW / SLIDE_WIDTH, availH / SLIDE_HEIGHT, 1);

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

  const slide = slides[current];

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        width: '100%', height: '100%', minHeight: '100vh',
        background: '#1a1a1a', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', userSelect: 'none', gap: 0,
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div
            ref={scaleRef}
            style={{
              width: SLIDE_WIDTH, height: SLIDE_HEIGHT,
              transformOrigin: 'top left', position: 'relative',
              overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
            }}
          >
            <SlideWrapper key={slide.id} slide={slide} direction={direction} />
          </div>
        </div>
      </div>

      <PresentationControls
        current={current}
        total={total}
        isFullscreen={isFullscreen}
        onPrev={prev}
        onNext={next}
        onGoTo={goTo}
        onToggleFullscreen={toggleFullscreen}
      />

      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 6, fontFamily: 'monospace', flexShrink: 0 }}>
        ← → arrow keys or swipe to navigate · F for fullscreen
      </p>

      <style>{`
        :root {
          --font-display: 'ParchmentMF', 'Papyrus', fantasy;
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

// ─── Default Export ────────────────────────────────────────────────────────────
export default function Presentation({ slides, initialSlide = 0, basePath }: { slides: Slide[], initialSlide?: number, basePath: string }) {
  return (
    <div className={`${josefin.variable} ${parchment.variable} presentation-wrapper`} style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={
        <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a', color: 'white' }}>
          Loading Presentation...
        </div>
      }>
        <PresentationCore slides={slides} initialSlide={initialSlide} basePath={basePath} />
      </Suspense>
    </div>
  );
}