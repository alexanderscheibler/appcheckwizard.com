import {render, screen, within} from '@testing-library/react';
import { renderDescription } from "@utils/functions/textUtils";

describe('renderDescription', () => {
  it('returns null when given undefined', () => {
    const { container } = render(<>{renderDescription(undefined)}</>);
    expect(container.innerHTML).toBe('');
  });

  it('returns null when given null', () => {
    const { container } = render(<>{renderDescription(null)}</>);
    expect(container.innerHTML).toBe('');
  });

  it('returns null when given an empty string', () => {
    const { container } = render(<>{renderDescription('')}</>);
    expect(container.innerHTML).toBe('');
  });

  it('returns null when given only whitespace', () => {
    const { container } = render(<>{renderDescription('   \n  \n  ')}</>);
    expect(container.innerHTML).toBe('');
  });


  it('renders standard text as paragraph elements', () => {
    const input = "First paragraph.\nSecond paragraph.";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    const paragraphs = screen.getAllByText(/paragraph/i);
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0].tagName).toBe('P');
    expect(paragraphs[1].tagName).toBe('P');
  });

  it('renders a single line of text as a single paragraph', () => {
    render(<div data-testid="container">{renderDescription('Only one line.')}</div>);

    const container = screen.getByTestId('container');
    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('P');
    expect(container.firstElementChild).toHaveTextContent('Only one line.');
  });

  it('handles empty lines gracefully without rendering empty paragraphs', () => {
    const input = "Paragraph one.\n\n\nParagraph two.";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    const container = screen.getByTestId('container');
    expect(container.childElementCount).toBe(2);
    expect(container.children[0]).toHaveTextContent('Paragraph one.');
    expect(container.children[1]).toHaveTextContent('Paragraph two.');
  });

  it('does not render empty paragraphs for lines containing only spaces', () => {
    const input = "Paragraph one.\n   \nParagraph two.";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    const container = screen.getByTestId('container');
    expect(container.childElementCount).toBe(2);
  });

  it('does not render the script tag', () => {
    const input = 'Safe <script>alert("xss")</script> text & more';
    const { container } = render(<div>{renderDescription(input)}</div>);

    expect(container.querySelector('script')).toBeNull();
    expect(container.innerHTML).not.toContain('<script>');
  });

  it('renders lines starting with hyphens as list items within an unordered list', () => {
    const input = "- First item\n- Second item";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    const list = screen.getByRole('list');
    expect(list.tagName).toBe('UL');

    const listItems = within(list).getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('First item');
    expect(listItems[1]).toHaveTextContent('Second item');
  });

  it('renders a single hyphen line as a single list item inside a ul', () => {
    render(<div data-testid="container">{renderDescription('- Solo item')}</div>);

    const list = screen.getByRole('list');
    expect(list.tagName).toBe('UL');

    const listItems = within(list).getAllByRole('listitem');
    expect(listItems).toHaveLength(1);
    expect(listItems[0]).toHaveTextContent('Solo item');
  });

  it('treats lines with leading spaces before hyphen as list items', () => {
    const input = "  - Indented item";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    const list = screen.getByRole('list');
    const listItems = within(list).getAllByRole('listitem');
    expect(listItems).toHaveLength(1);
    expect(listItems[0]).toHaveTextContent('Indented item');
  });

  it('does not render a list item for a bare hyphen with no following text', () => {
    const input = "-\nNormal paragraph.";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    // A bare "-" should not produce a list item with empty content
    const listItems = screen.queryAllByRole('listitem');
    listItems.forEach(item => {
      expect(item.textContent?.trim()).not.toBe('');
    });
  });

  it('correctly parses mixed content with paragraphs and lists', () => {
    const input = "Tech Stack Details.\nContaining:\n- Menu component\n- Carousel component\nFinal thoughts.";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    // Check paragraphs
    expect(screen.getByText('Tech Stack Details.')).toBeInTheDocument();
    expect(screen.getByText('Containing:')).toBeInTheDocument();
    expect(screen.getByText('Final thoughts.')).toBeInTheDocument();

    // Check list items
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('Menu component');
    expect(listItems[1]).toHaveTextContent('Carousel component');
  });

  it('renders mixed content in correct document order', () => {
    const input = "Intro.\n- Item A\nOutro.";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    const container = screen.getByTestId('container');
    const children = Array.from(container.children);

    expect(children[0].tagName).toBe('P');
    expect(children[0]).toHaveTextContent('Intro.');

    expect(children[1].tagName).toBe('UL');

    expect(children[2].tagName).toBe('P');
    expect(children[2]).toHaveTextContent('Outro.');
  });

  it('produces two separate ul elements when list groups are separated by a paragraph', () => {
    const input = "- First group item\nMiddle paragraph.\n- Second group item";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    const lists = screen.getAllByRole('list');
    expect(lists).toHaveLength(2);
    expect(within(lists[0]).getByRole('listitem')).toHaveTextContent('First group item');
    expect(within(lists[1]).getByRole('listitem')).toHaveTextContent('Second group item');
  });

  it('handles empty lines gracefully without rendering empty paragraphs', () => {
    const input = "Paragraph one.\n\n\nParagraph two.";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    // Check the container's child count
    const container = screen.getByTestId('container');
    expect(container.childElementCount).toBe(2);
  });

  it('handles Windows-style CRLF line endings correctly', () => {
    const input = "Paragraph one.\r\nParagraph two.";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    expect(screen.getByText('Paragraph one.')).toBeInTheDocument();
    expect(screen.getByText('Paragraph two.')).toBeInTheDocument();
  });

  it('renders list items correctly with CRLF line endings', () => {
    const input = "- First item\r\n- Second item";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('First item');
    expect(listItems[1]).toHaveTextContent('Second item');
  });


  // ─── Accessibility ───────────────────────────────────────────────────────────
  it('list items are accessible via listitem role and nested inside a list role', () => {
    const input = "- Accessible item one\n- Accessible item two";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    // The list must be reachable by ARIA role
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    // Each list item must be a direct ARIA child of the list
    const listItems = within(list).getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  it('paragraphs are not given any ARIA role that would conflict with their semantics', () => {
    render(<div data-testid="container">{renderDescription('Simple text.')}</div>);

    const container = screen.getByTestId('container');
    const para = container.firstElementChild;

    expect(para?.tagName).toBe('P');
    expect(para).not.toHaveAttribute('role');
  });

  it('rendered output contains no empty list items that would confuse screen readers', () => {
    const input = "- Item one\n- Item two";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    const listItems = screen.getAllByRole('listitem');
    listItems.forEach(item => {
      expect(item.textContent?.trim()).not.toBe('');
    });
  });

  it('rendered output contains no empty paragraphs that would create dead tab stops', () => {
    const input = "Para one.\n\nPara two.";
    render(<div data-testid="container">{renderDescription(input)}</div>);

    const container = screen.getByTestId('container');
    Array.from(container.children).forEach(child => {
      expect(child.textContent?.trim()).not.toBe('');
    });
  });
});