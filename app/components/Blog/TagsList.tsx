import React from 'react';
import { Tag } from '@components/Blog/Tag';

interface TagsListProps {
  tags: string[];
}

export default function TagsList({ tags }: TagsListProps) {
  return (
    <div className="mt-12 space-x-5 flex flex-wrap gap-y-4">
      Tags: &nbsp;
      {tags.map(tag => (
        <Tag key={tag} name={tag} />
      ))}
    </div>
  );
};
