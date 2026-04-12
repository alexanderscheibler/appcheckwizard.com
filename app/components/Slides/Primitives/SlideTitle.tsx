export function SlideTitle({ text, style = {} }: { text: string; style?: React.CSSProperties }) {
  const textAlign = style.textAlign || 'center';
  return (
    <h1
      data-slide-display
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