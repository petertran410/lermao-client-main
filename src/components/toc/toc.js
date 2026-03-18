// src/components/toc/toc.js
'use client';

import parse from 'html-react-parser';
import React from 'react';

const TableOfContents = ({ html }) => {
  const elements = parse(html);

  const extractHeadings = (nodes) => {
    const headings = [];
    let idCounter = 0;

    const traverse = (elements) => {
      React.Children.forEach(elements, (element) => {
        if (!element || !element.type) return;

        const tag = element.type;
        if (/^h[1-6]$/.test(tag)) {
          let id = element.props.id || `heading-${idCounter++}`;
          const text = element.props.children;
          const depth = parseInt(tag.replace('h', ''), 10);
          headings.push({ id, text, depth });
        }
        if (element.props && element.props.children) {
          traverse(element.props.children);
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

  if (!headings.length) return null;

  return (
    <nav>
      <ul style={{ listStyle: 'none', padding: 0, margin: '1px 0 0 0' }}>
        {headings.map((heading, index) => (
          <li
            key={index}
            style={{
              paddingLeft: `${(heading.depth - 2) * 20}px`,
              marginBottom: '6px'
            }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleScroll(heading.id);
              }}
              style={{
                fontWeight: 400,
                fontSize: '15px',
                color: '#333',
                textDecoration: 'none',
                lineHeight: '1.5',
                display: 'inline-block',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#00b7e9';
                e.target.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#333';
                e.target.style.textDecoration = 'none';
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
