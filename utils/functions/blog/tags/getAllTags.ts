import {PostData} from "@data/blog/interfaces/PostMetadata";

// Function to Create the Set of tags from all posts provided
export function getAllTags(posts: PostData[]): Set<string> {
  const tags = new Set<string>()
  posts.forEach(post => post.tags?.forEach(tag => tags.add(tag)))
  return tags
}