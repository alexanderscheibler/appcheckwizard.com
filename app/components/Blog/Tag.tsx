import React from 'react'
import Link from 'next/link'
import { tagColors } from '@data/blog/TagColors';

export function Tag({ name }: { name: string }) {
  const color = tagColors[name.toLowerCase()] || tagColors.default

  return (
    <Link href={`/blog/tag/${name}`} title={`See posts tagged ${name}`}>
      <button className={`px-3 py-1 text-xs font-semibold rounded-none ${color}`}>
        {name}
      </button>
    </Link>
  )
}