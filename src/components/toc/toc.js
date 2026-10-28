'use client';

import { Box } from '@chakra-ui/react';
import parse from 'html-react-parser';
import React from 'react';

// Lấy text thuần từ children đã parse (bỏ span/strong + inline style 20px của CMS trong heading).
const getPlainText = (node) => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getPlainText).join('');
  return getPlainText(node.props?.children);
};

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
          const text = getPlainText(element.props.children).trim();
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
      <ul style={{ padding: '0 0 0 16px', margin: '1px 0 0 0' }}>
        {headings.map((heading, index) => (
          <li
            key={index}
            style={{
              paddingLeft: `${(heading.depth - 2) * 20}px`,
              marginBottom: '6px'
            }}
          >
            {/* Hover bằng CSS (_hover) thay cho JS đổi style e.target — tránh kẹt gạch chân/màu ở thẻ con. */}
            <Box
              as="a"
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleScroll(heading.id);
              }}
              display="inline-block"
              fontSize="15px"
              lineHeight="1.5"
              color="#065fd4"
              textDecoration="underline"
              transition="color 0.2s"
              _hover={{ color: '#00b7e9' }}
            >
              {heading.text}
            </Box>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
