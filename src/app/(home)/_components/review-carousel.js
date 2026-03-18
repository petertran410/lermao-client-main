'use client';

import { IMG_ALT } from '@/utils/const';
import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CARD_W = 220;
const CARD_H = 400;
const GAP = 16;
const STEP = CARD_W + GAP;
const CENTER_SCALE = 1.35;
const AUTO_MS = 2000;
const FALLBACK = '/images/lermao.png';

const stripHtml = (h) => (h ? h.replace(/<[^>]*>/g, '').trim() : '');

const ReviewCarousel = ({ reviews = [] }) => {
  const count = reviews.length;
  const tripled = count > 0 ? [...reviews, ...reviews, ...reviews] : [];
  const [pos, setPos] = useState(count);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef(null);
  const trackRef = useRef(null);

  const startAuto = useCallback(() => {
    if (count <= 1) return;
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setPos((p) => p + 1);
    }, AUTO_MS);
  }, [count]);

  const stopAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto]);

  useEffect(() => {
    if (!isTransitioning) return;
    const onEnd = () => {
      if (pos >= count * 2) {
        setIsTransitioning(false);
        setPos(count);
      } else if (pos < count) {
        setIsTransitioning(false);
        setPos(pos + count);
      }
    };
    const el = trackRef.current;
    if (el) el.addEventListener('transitionend', onEnd);
    return () => el?.removeEventListener('transitionend', onEnd);
  }, [pos, count, isTransitioning]);

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitioning(true));
      });
    }
  }, [isTransitioning]);

  const goTo = (dir) => {
    stopAuto();
    setIsTransitioning(true);
    setPos((p) => p + dir);
    startAuto();
  };

  if (count === 0) return null;

  const centerPixel = pos * STEP;
  const transitionCSS = isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none';
  const cardTransitionCSS = isTransitioning ? 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none';

  const containerH = Math.ceil(CARD_H * CENTER_SCALE) + 60;

  return (
    <Box mt="56px" py="40px" overflow="hidden">
      <Text textAlign="center" fontSize={{ xs: '22px', md: '28px' }} fontWeight={800} color="#1d2128" mb="40px">
        Khách hàng nói gì về{' '}
        <Text as="span" color="#00b7e9" fontSize={{ xs: '22px', md: '28px' }} fontWeight={800}>
          Gấu Lermao
        </Text>
      </Text>

      <Box position="relative" h={`${containerH}px`} onMouseEnter={stopAuto} onMouseLeave={startAuto}>
        <Flex
          ref={trackRef}
          position="absolute"
          left="50%"
          top="50%"
          gap={`${GAP}px`}
          align="center"
          transition={transitionCSS}
          transform={`translate(calc(-${centerPixel}px - ${CARD_W / 2}px), -50%)`}
          willChange="transform"
        >
          {tripled.map((review, i) => {
            const offset = i - pos;
            const absOffset = Math.abs(offset);
            const isCenter = absOffset === 0;

            const rotate = isCenter ? 0 : offset * 5;
            const scale = isCenter ? CENTER_SCALE : Math.max(0.78, 1 - absOffset * 0.07);
            const opacity = absOffset > 3 ? 0 : Math.max(0.3, 1 - absOffset * 0.2);
            const zIndex = isCenter ? 20 : 10 - absOffset;

            return (
              <Flex
                key={`${review.id}-${i}`}
                direction="column"
                flex="0 0 auto"
                w={`${CARD_W}px`}
                h={`${CARD_H}px`}
                bg="#FFF"
                borderRadius={isCenter ? '20px' : '16px'}
                overflow="hidden"
                zIndex={zIndex}
                boxShadow={
                  isCenter
                    ? '0 16px 48px rgba(0, 183, 233, 0.3), 0 6px 20px rgba(0,0,0,0.1)'
                    : '0 4px 16px rgba(0,0,0,0.06)'
                }
                border={isCenter ? '2.5px solid #00b7e9' : '1px solid #eee'}
                transition={cardTransitionCSS}
                transform={`rotate(${rotate}deg) scale(${scale})`}
                opacity={opacity}
              >
                {/* Image */}
                <Box flex="1" minH="0" overflow="hidden" bg="#f5f5f5">
                  <Image
                    src={review.image || FALLBACK}
                    alt={review.name || IMG_ALT}
                    w="full"
                    h="full"
                    objectFit="cover"
                    onError={(e) => {
                      e.target.src = FALLBACK;
                    }}
                  />
                </Box>

                {/* Info */}
                <Flex
                  direction="column"
                  p="12px"
                  gap="4px"
                  flex="0 0 auto"
                  h="120px"
                  bg={isCenter ? 'linear-gradient(180deg, #fff 0%, #f0fafd 100%)' : '#FFF'}
                >
                  <Text fontSize="14px" fontWeight={700} color="#1d2128" noOfLines={1}>
                    {review.name}
                  </Text>
                  <Text fontSize="12px" color="gray.500" noOfLines={5} lineHeight="1.7">
                    {stripHtml(review.review_description)}
                  </Text>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Box>

      <Flex justify="center" gap="16px" mt="24px">
        <IconButton
          aria-label="Previous"
          icon={<FiChevronLeft size={20} />}
          onClick={() => goTo(-1)}
          w="44px"
          h="44px"
          borderRadius="full"
          bg="#FF9E20"
          color="#FFF"
          _hover={{ bg: '#e88d1a', transform: 'scale(1.1)' }}
          _active={{ bg: '#d07a10' }}
          transition="all 0.2s"
          boxShadow="0 4px 12px rgba(255, 158, 32, 0.4)"
        />
        <IconButton
          aria-label="Next"
          icon={<FiChevronRight size={20} />}
          onClick={() => goTo(1)}
          w="44px"
          h="44px"
          borderRadius="full"
          bg="#FF9E20"
          color="#FFF"
          _hover={{ bg: '#e88d1a', transform: 'scale(1.1)' }}
          _active={{ bg: '#d07a10' }}
          transition="all 0.2s"
          boxShadow="0 4px 12px rgba(255, 158, 32, 0.4)"
        />
      </Flex>
    </Box>
  );
};

export default ReviewCarousel;
