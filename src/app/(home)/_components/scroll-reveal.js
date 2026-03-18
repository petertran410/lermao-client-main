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
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
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
      transition={`opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`}
      willChange="opacity, transform"
    >
      {children}
    </Box>
  );
};

export default ScrollReveal;
