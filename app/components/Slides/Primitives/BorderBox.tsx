export default function BorderBox({
                            style = {},
                            children,
                            color = '#1a5276',
                          }: {
  style?: React.CSSProperties;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        border: `3px solid ${color}`,
        boxSizing: 'border-box',
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.12)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}