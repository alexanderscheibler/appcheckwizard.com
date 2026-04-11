import Image, { ImageProps } from 'next/image'

export default function CustomImage({ src, alt, ...props }: ImageProps) {
  // For SVGs, do not optimize
  // For other images, use the Next.js Image component normally
  const isSvg = typeof src === 'string' && src.endsWith('.svg')

  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={isSvg}
      sizes={props.sizes || "(max-width: 768px) 100vw, 1280px"}
      decoding="sync"
      loading="eager"
      {...props}
    />
  )
}