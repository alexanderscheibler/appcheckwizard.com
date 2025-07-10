// Define an interface to type-check the metadata fields in the Markdown files
export interface PostMetadata {
  title: string;
  date: string;
  modified: string;
  category: string;
  tags: string[];
  slug: string;
  author: string[];
  summary: string;
}

// Define the return type for each post's data
export interface PostData extends PostMetadata {
  id: string;
}

export interface PostItem extends PostData {
  content: string;
}