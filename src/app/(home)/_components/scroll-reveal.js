'use client';

import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ children, delay = 0, direction = 'up', minH = '200px', lazy = true }) => {
  const sentinelRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasRendered, setHasRendered] = useState(!lazy);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);

        if (visible && !hasRendered) {
          setHasRendered(true);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '-200px 0px -60px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasRendered]);

  const initialTransform = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(-40px)',
    right: 'translateX(40px)'
  }[direction];

  return (
    // Sentinel — vị trí cố định, không bao giờ di chuyển, chỉ dùng để observe
    <Box ref={sentinelRef} minH={hasRendered ? 'auto' : minH}>
      {/* Inner — element thực sự được animated */}
      <Box
        opacity={isVisible ? 1 : 0}
        transform={isVisible ? 'translate(0, 0)' : initialTransform}
        transition={
          isVisible
            ? `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`
            : 'opacity 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19), transform 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19)'
        }
        willChange="opacity, transform"
      >
        {hasRendered ? children : null}
      </Box>
    </Box>
  );
};

export default ScrollReveal;
