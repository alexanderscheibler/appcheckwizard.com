import type {VideoSlide as VideoSlideData} from "@data/talks/2026-atlseccon/SlidesData";
import React, {useEffect, useRef} from "react";
import {SlideTitle} from "@components/Slides/Primitives/SlideTitle";
import {Parchment} from "@components/Slides/Primitives/Parchment";

export default function VideoSlide({ slide }: { slide: VideoSlideData }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Kill the video download when the slide unmounts
  useEffect(() => {
    const video = videoRef.current;

    return () => {
      // Cleanup function that runs when leaving the slide
      if (video) {
        video.pause();
        video.removeAttribute('src'); // Clear out any direct src
        video.load(); // Force the browser to abort the network request
      }
    };
  }, []);

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
            preload="none"
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
            letterSpacing: 2
          }}>
            [Video]
          </div>
        )}
      </div>
    </Parchment>
  );
}