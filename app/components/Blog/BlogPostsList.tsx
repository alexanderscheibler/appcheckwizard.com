'use client'

import Link from 'next/link'
import { PostData } from '@data/blog/interfaces/PostMetadata'
import TagsList from '@components/Blog/TagsList';
import React from 'react';

interface BlogPostsListProps {
  posts: PostData[],
  currentPage: number
  totalPages: number
  baseUrl: string
}

export default function BlogPostsList({ posts, currentPage, totalPages, baseUrl }: Readonly<BlogPostsListProps>) {

  return (
    <div className="container pt-14 md:pt-0 md:mt-0 mx-auto py-8">
      <article className="space-y-4 pt-14 md:pt-0 md:mt-0">
        {posts.map(({id, date, title, author, summary, tags}) => (
          <section key={id} className="border-b border-gray-700 pb-4">
            <Link href={`/blog/${id}`} className="text-xl font-semibold hover:underline" title={`${title}`}>
              {title}
            </Link>
            <br/>
            <small className="text-gray-400">by {author} on&nbsp;
              <time dateTime={date}>
                {new Date(date).toLocaleDateString('en-CA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              .
            </small>
            <p className="py-4">{summary}</p>

            <Link href={`/blog/${id}`} className="underline pb-8 text-amber-50">
              Read more →
            </Link>
            <br/>
            {tags && (
              <TagsList tags={tags}/>
            )}
          </section>
        ))}
      </article>

      <div className="mt-8 flex justify-between">
        {currentPage > 1 && (
          <Link href={`${baseUrl}/${currentPage - 1}`}>
            <button
              className="outline hover:bg-blue-300 hover:text-black text-white font-bold py-2 px-4 transition-colors"
            >
              &lt; Previous page
            </button>
          </Link>
        )}

        {currentPage < totalPages && (
          <Link href={`${baseUrl}/${currentPage + 1}`}>
            <button
              className="outline hover:bg-blue-300 hover:text-black text-white font-bold py-2 px-4 transition-colors ml-auto"
            >
              Next page &gt;
            </button>
          </Link>
        )}
      </div>

    </div>
  )
}