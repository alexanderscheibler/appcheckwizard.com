import Image, { ImageProps } from 'next/image'

export default function CustomImage({ src, alt, ...props }: ImageProps) {
  // For SVGs, do not optimize
  // For other images, use the Next.js Image component normally
  const isSvg = typeof src === 'string' && src.endsWith('.svg')
  // But bypass optimization for slide assets
  const isSlideAsset = typeof src === 'string' && src.includes('/slides/')

  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={isSvg || isSlideAsset}
      sizes={props.sizes || "(max-width: 768px) 100vw, 1280px"}
      fetchPriority="high"
      loading="eager"
      decoding="async"
      {...props}
    />
  )
}