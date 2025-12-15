import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import { PostItem } from '@data/blog/interfaces/PostMetadata'
import remarkToc from 'remark-toc'
import type { Element } from 'hast'

export async function getPostData(id: string, postsDirectory: string): Promise<PostItem> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  // Define the SVG icon for anchor links
  const linkIcon: Element = {
    type: 'element',
    tagName: 'svg',
    properties: {
      xmlns: 'http://www.w3.org/2000/svg',
      width: 16,
      height: 16,
      fill: 'currentColor',
      className: ['ml-2', 'opacity-60', 'hover:opacity-100']
    },
    children: [{
      type: 'element',
      tagName: 'path',
      properties: {
        d: 'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z'
      },
      children: []
    }]
  }

  // Process the markdown content
  const processedContent = await unified()
    .use(remarkParse)               // Parse markdown
    .use(remarkGfm)                 // Support GFM (tables, strikethrough, etc.)
    .use(remarkToc, {
      heading: 'Table of Contents',
      tight: true,                  // More compact list
      ordered: false,               // Use unordered list
      maxDepth: 3                   // Only include h1, h2, and h3 headers
    })
    .use(remarkRehype, {
      allowDangerousHtml: true      // Allow HTML in markdown
    })
    .use(rehypeSlug)                // Add ids to headings
    .use(rehypeAutolinkHeadings, {  // Add anchor links to headings
      behavior: 'append',
      properties: {
        className: ['anchor-link'],
        ariaHidden: true,
        tabIndex: -1
      },
      content: linkIcon
    })
    .use(rehypeHighlight, {         // Add Syntax highlighting
      detect: true,                 // Auto-detect language
      ignoreMissing: true
    })
    .use(rehypeStringify, {
      allowDangerousHtml: true
    })
    .process(matterResult.content)

  // Extract data and process tags
  const { data } = matterResult
  const tags = typeof data.tags === 'string' ? data.tags.split(',') : data.tags || []

  return {
    id: id,
    title: data.title,
    date: data.date,
    modified: data.modified,
    category: data.category,
    tags: tags,
    slug: data.slug,
    author: data.author,
    summary: data.summary,
    content: processedContent.toString()
  }
}