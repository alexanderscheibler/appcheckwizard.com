import React from "react";

export function Parchment({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#e8d9b0', ...style }}>
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
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.18,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px 300px',
        mixBlendMode: 'multiply',
      }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}