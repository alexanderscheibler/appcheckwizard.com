import { getSortedPostsData } from '@utils/functions/blog/posts/getSortedPostsData'
import { getPostsDirectory } from "@utils/functions/blog/posts/getPostsDirectory";

import BlogPostsList from '@components/Blog/BlogPostsList'
import { notFound } from 'next/navigation'
import {getPostsByTag} from '@utils/functions/blog/tags/getPostsByTag';
import TagsList from '@components/Blog/TagsList';
import BlogPostItem from '@components/Blog/BlogPost';
import { getAllTags } from '@utils/functions/blog/tags/getAllTags';
import { PostItem } from '@data/blog/interfaces/PostMetadata';

const POSTS_PER_PAGE = 10

export async function generateStaticParams() {

  try {
    // Fetch the data
    const postsDirectory: string = getPostsDirectory();
    const posts: PostItem[] = await getSortedPostsData(postsDirectory)
    const totalPages: number = Math.ceil(posts.length / POSTS_PER_PAGE)

    // Create the Set of tags from all posts
    const tags: Set<string> = getAllTags(posts)

    // Generate all possible params
    return [
      { slug: [] }, // Main blog page
      ...Array.from({ length: totalPages }, (_, i) => ({
        slug: [(i + 1).toString()]
      })), // Blog post list page
      { slug: ['tag'] }, // Tags list page
      ...posts.map(post => ({
        slug: [post.slug]
      })), // Individual blog post
      ...Array.from(tags).map(tag => ({
        slug: ['tag', tag]
      })) // Individual tag page
    ]
  } catch (error) {
    console.error('Error generating static params:', error)
    return [{ slug: [] }]
  }
}

type Params = Promise<{ slug: string[] }>

export default async function BlogPage(props: {
  params: Readonly<Params>
}) {
  const params = await props.params
  const { slug = [] } = params
  const [firstSlug, secondSlug] = slug

  // Main blog page or paginated blog posts list
  if (!firstSlug || !isNaN(Number(firstSlug))) {
    const page = firstSlug ? parseInt(firstSlug, 10) : 1
    const postsDirectory = getPostsDirectory();
    const allPosts = await getSortedPostsData(postsDirectory)
    const startIndex = (page - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    const paginatedPosts = allPosts.slice(startIndex, endIndex)
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <BlogPostsList
          posts={paginatedPosts}
          currentPage={page}
          totalPages={totalPages}
          baseUrl="/blog"
        />
      </div>
    )
  }

  // Tag pages
  if (firstSlug === 'tag') {
    const postsDirectory = getPostsDirectory()
    const allPosts = await getSortedPostsData(postsDirectory)

    // All tags page
    if (!secondSlug) {
      const allTags = new Set(allPosts.flatMap(post => post.tags || []))
      const tagsArray: string[] = [...allTags];

      return (
        <div>
          <h1 className="text-3xl pt-36 md:pt-0 md:mt-0 font-bold mb-8">All Tags</h1>
          {allTags && (
            <TagsList tags={tagsArray}/>
          )}
        </div>
      )
    }

    // Specific tag page
    const tagPosts = getPostsByTag(secondSlug, allPosts)

    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Posts tagged with &quot;{secondSlug}&quot;</h1>
        <BlogPostsList
          posts={tagPosts}
          currentPage={1}
          totalPages={1}
          baseUrl={`/blog/tag/${secondSlug}`}
        />
      </div>
    )
  }

  // Individual blog post
  if (firstSlug && !secondSlug) {
    const postsDirectory = getPostsDirectory()
    const posts = await getSortedPostsData(postsDirectory)
    const postData = posts.find(post => post.id === firstSlug)
    if (!postData) return notFound()

    return <BlogPostItem post={postData} />
  }

  return notFound()
}