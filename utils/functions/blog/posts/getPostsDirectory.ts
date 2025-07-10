import path from "path";

export function getPostsDirectory() {
  return path.join(process.cwd(), 'app', 'data', 'blog', 'content')
}