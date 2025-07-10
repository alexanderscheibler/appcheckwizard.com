
import fs from 'fs'
import {PostItem} from "@data/blog/interfaces/PostMetadata";
import {getPostData} from "@utils/functions/blog/posts/getPostData";

export async function getSortedPostsData(postsDirectory: string): Promise<PostItem[]> {
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '')
      return getPostData(id, postsDirectory)
    })
  )

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}