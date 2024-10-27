import Image, { ImageProps } from 'next/image'

export default function CustomImage({ src, ...props }: ImageProps) {
  if (typeof src === 'string' && src.endsWith('.svg')) {
    // For SVGs, do not optimize
    return <Image src={src} {...props} unoptimized />
  }

  // For other images, use the Next.js Image component normally
  return <Image src={src} {...props} />
}