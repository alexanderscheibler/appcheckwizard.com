import React from "react";

// Helper function to parse the string into proper semantic HTML (for bullet points)
export const renderDescription = (text: string | undefined | null) => {
  if (!text) return null;

  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Extract the content after the hyphen, if it exists
    const listContent = trimmedLine.startsWith('-') ? trimmedLine.substring(1).trim() : '';

    // Only treat it as a list item if it starts with a hyphen AND has content
    if (trimmedLine.startsWith('-') && listContent.length > 0) {
      listItems.push(
        <li key={`li-${index}`} className="ml-2">
          {listContent}
        </li>
      );
    } else {
      // If we were building a list, render it before moving on
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${index}`} className="list-disc pl-4 my-3 space-y-1 text-gray-300">
            {listItems}
          </ul>
        );
        listItems = [];
      }
      // Only render a paragraph if the line isn't totally empty
      if (trimmedLine) {
        elements.push(
          <p key={`p-${index}`} className="text-gray-300 mb-2">
            {trimmedLine}
          </p>
        );
      }
    }
  });

  if (listItems.length > 0) {
    elements.push(
      <ul key="ul-final" className="list-disc pl-4 my-3 space-y-1 text-gray-300">
        {listItems}
      </ul>
    );
  }

  return elements;
};