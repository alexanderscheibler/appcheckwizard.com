import React from "react";

export function Ornament({ style = {} }: { style?: React.CSSProperties }) {
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