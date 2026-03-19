'use client';

import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ children, delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: '40px 0px 40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const initialTransform = {
    up: 'translateY(50px)',
    down: 'translateY(-50px)',
    left: 'translateX(-50px)',
    right: 'translateX(50px)'
  }[direction];

  return (
    <Box
      ref={ref}
      opacity={isVisible ? 1 : 0}
      transform={isVisible ? 'translate(0, 0)' : initialTransform}
      transition={
        isVisible
          ? `opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`
          : 'opacity 0.4s ease, transform 0.4s ease'
      }
      willChange="opacity, transform"
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      {children}
    </Box>
  );
};

export default ScrollReveal;
