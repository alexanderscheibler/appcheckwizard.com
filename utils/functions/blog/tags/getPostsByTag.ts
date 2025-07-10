import { PostData } from "@data/blog/interfaces/PostMetadata";

export function getPostsByTag(tag: string, posts: PostData[]): PostData[] {
  return posts.filter(post => post.tags?.includes(tag))
}