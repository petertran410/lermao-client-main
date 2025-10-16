'use client';

import parse from 'html-react-parser';
import React from 'react';

const TableOfContents = ({ html }) => {
  // Parse HTML string thành React elements
  const elements = parse(html);

  // Hàm đệ quy để xử lý các thẻ heading
  const extractHeadings = (nodes) => {
    const headings = [];
    let idCounter = 0;

    const traverse = (elements, level = 0) => {
      React.Children.forEach(elements, (element) => {
        if (!element || !element.type) return;

        const tag = element.type;
        if (/^h[1-6]$/.test(tag)) {
          let id = element.props.id || `heading-${idCounter++}`;
          const text = element.props.children;
          const depth = parseInt(tag.replace('h', ''), 10);

          headings.push({ id, text, depth });
        }
        // Tiếp tục duyệt các phần tử con nếu có
        if (element.props && element.props.children) {
          traverse(element.props.children, level + 1);
        }
      });
    };

    traverse(nodes);
    return headings;
  };

  const headings = extractHeadings(elements);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 120;
      setTimeout(() => {
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
          left: 0
        });
      }, 100);
    }
  };

  // Render danh sách mục lục
  const renderToc = (headings) => {
    return (
      <ul>
        {headings.map((heading, index) => (
          <li key={index} style={{ paddingLeft: `${(heading.depth - 1) * 20}px` }}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleScroll(heading.id);
              }}
              style={{ fontWeight: 600, fontSize: 15 }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return <nav>{renderToc(headings)}</nav>;
};

export default TableOfContents;
