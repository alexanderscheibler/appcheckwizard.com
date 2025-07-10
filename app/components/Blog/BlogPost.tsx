'use client'

import { PostItem } from '@data/blog/interfaces/PostMetadata'
import Comments from '@components/Blog/Comments'
import TagsList from '@components/Blog/TagsList';
import Link from 'next/link'
import 'highlight.js/styles/github-dark.css'

interface BlogPostProps {
  post: PostItem
}

export default function BlogPost({ post }: Readonly<BlogPostProps>) {
  return (
    <div className="container mx-auto pt-16 md:pt-0 px-4 py-8">
      <header className="flex justify-between items-center pt-16 md:pt-0 mb-8">
        <Link href="/blog" className="text-xl font-semibold hover:underline">
          ← Back to blog
        </Link>
      </header>
      <article className="pb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <header className="mb-8 text-gray-400">
          {post.author && (
            <span>by {post.author} on </span>
          )}
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-CA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          .
        </header>
        <div className="prose prose-lg max-w-none
          prose-headings:text-gray-100 prose-headings:font-bold
          prose-h1:text-3xl
          prose-h2:text-2xl
          prose-h3:text-xl
          prose-h4:text-l
          prose-p:text-gray-300
          prose-ul:text-gray-300
          prose-ol:text-gray-300
          prose-li:text-gray-300
          prose-strong:text-gray-300
          prose-a:text-gray-300 prose-a:underline hover:prose-a:text-blue-500
          prose-blockquote:text-gray-300
          prose-code:text-gray-300
          prose-ul:list-disc
          prose-ol:list-decimal"
          dangerouslySetInnerHTML={{__html: post.content}}
        />
        {post.tags && (
          <TagsList tags={post.tags}/>
        )}

      </article>
      <hr/>
      <Comments postSlug={post.id}/>

      <Link href="/blog#top" className="md:hidden text-xl font-semibold hover:underline">
        ← Back to blog
      </Link>
    </div>
  )
}