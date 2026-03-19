'use client';

import { IMG_ALT } from '@/utils/const';
import {
  Box,
  Flex,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CARD_W = 200;
const CARD_H = 340;
const GAP = 16;
const STEP = CARD_W + GAP;
const CENTER_SCALE = 1.3;
const AUTO_MS = 2000;
const VISIBLE_RANGE = 4;
const FALLBACK = '/images/lermao.png';

const stripHtml = (h) => (h ? h.replace(/<[^>]*>/g, '').trim() : '');
const mod = (n, m) => ((n % m) + m) % m;

const ReviewCarousel = ({ reviews = [] }) => {
  const count = reviews.length;
  const [pos, setPos] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const intervalRef = useRef(null);
  const restartRef = useRef(null);

  const startAuto = useCallback(() => {
    if (count <= 1) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setPos((p) => p + 1), AUTO_MS);
  }, [count]);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAuto();
    return () => {
      stopAuto();
      if (restartRef.current) clearTimeout(restartRef.current);
    };
  }, [startAuto, stopAuto]);

  const goTo = (dir) => {
    stopAuto();
    if (restartRef.current) clearTimeout(restartRef.current);
    setPos((p) => p + dir);
    restartRef.current = setTimeout(() => startAuto(), 3000);
  };

  const handleCardClick = (review, isCenter, offset) => {
    if (isCenter && review) {
      stopAuto();
      if (restartRef.current) clearTimeout(restartRef.current);
      setSelectedReview(review);
      onOpen();
    } else if (!isCenter) {
      goTo(offset);
    }
  };

  const handleModalClose = () => {
    onClose();
    setSelectedReview(null);
    startAuto();
  };

  if (count === 0) return null;

  // Tạo danh sách card: mỗi card có virtualIndex duy nhất
  const visibleCards = [];
  for (let offset = -VISIBLE_RANGE; offset <= VISIBLE_RANGE; offset++) {
    const virtualIndex = pos + offset;
    const reviewIndex = mod(virtualIndex, count);
    visibleCards.push({
      review: reviews[reviewIndex],
      offset,
      virtualIndex
    });
  }

  const containerH = Math.ceil(CARD_H * CENTER_SCALE) + 60;
  const cardTransition =
    'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.6s ease, box-shadow 0.4s ease, border-color 0.4s ease';

  return (
    <>
      <Box mt="56px" py="40px" overflow="hidden">
        <Text textAlign="center" fontSize={{ xs: '22px', md: '28px' }} fontWeight={800} color="#1d2128" mb="40px">
          Khách hàng nói gì về{' '}
          <Text as="span" color="#00b7e9" fontSize={{ xs: '22px', md: '28px' }} fontWeight={800}>
            Gấu Lermao
          </Text>
        </Text>

        <Box position="relative" h={`${containerH}px`} onMouseEnter={stopAuto} onMouseLeave={startAuto}>
          {visibleCards.map(({ review, offset, virtualIndex }) => {
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;
            const rotate = isCenter ? 0 : offset * 5;
            const scale = isCenter ? CENTER_SCALE : Math.max(0.78, 1 - absOffset * 0.07);
            const opacity = absOffset > 3 ? 0 : Math.max(0.3, 1 - absOffset * 0.2);
            const zIndex = isCenter ? 20 : 10 - absOffset;
            const tx = offset * STEP;

            return (
              <Flex
                key={virtualIndex}
                direction="column"
                position="absolute"
                left="50%"
                top="50%"
                w={`${CARD_W}px`}
                h={`${CARD_H}px`}
                ml={`-${CARD_W / 2}px`}
                mt={`-${CARD_H / 2}px`}
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
                transition={cardTransition}
                transform={`translateX(${tx}px) rotate(${rotate}deg) scale(${scale})`}
                opacity={opacity}
                cursor="pointer"
                onClick={() => handleCardClick(review, isCenter)}
                _hover={
                  isCenter
                    ? { boxShadow: '0 20px 56px rgba(0, 183, 233, 0.4), 0 8px 24px rgba(0,0,0,0.12)' }
                    : {
                        opacity: Math.min(1, opacity + 0.2),
                        transform: `translateX(${tx}px) rotate(${rotate * 0.5}deg) scale(${Math.min(scale + 0.03, 1)})`
                      }
                }
              >
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

                <Flex
                  direction="column"
                  p="10px 12px"
                  gap="4px"
                  flex="0 0 auto"
                  h="120px"
                  bg={isCenter ? 'linear-gradient(180deg, #fff 0%, #f0fafd 100%)' : '#FFF'}
                >
                  <Text fontSize="13px" fontWeight={700} color="#1d2128" noOfLines={1}>
                    {review.name}
                  </Text>
                  <Text fontSize="11px" color="gray.500" noOfLines={3} lineHeight="1.7">
                    {stripHtml(review.review_description)}
                  </Text>
                  {isCenter && (
                    <Text fontSize="10px" color="#00b7e9" fontWeight={600} mt="auto">
                      Xem chi tiết →
                    </Text>
                  )}
                </Flex>
              </Flex>
            );
          })}
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

      <Modal isOpen={isOpen} onClose={handleModalClose} isCentered motionPreset="slideInBottom">
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(6px)" />
        <ModalContent borderRadius="24px" overflow="hidden" mx="16px" maxH="85vh" bg="#FFF" maxW="900px" w="900px">
          <ModalCloseButton
            zIndex={10}
            bg="white"
            borderRadius="full"
            boxShadow="0 2px 8px rgba(0,0,0,0.15)"
            top="12px"
            right="12px"
            _hover={{ bg: 'gray.100' }}
          />
          <ModalBody p={0}>
            {selectedReview && (
              <Flex direction={{ xs: 'column', md: 'row' }} minH="400px">
                <Box
                  flex={{ md: '0 0 280px' }}
                  h={{ xs: '300px', md: 'auto' }}
                  minH={{ md: '400px' }}
                  overflow="hidden"
                  bg="#f5f5f5"
                >
                  <Image
                    src={selectedReview.image || FALLBACK}
                    alt={selectedReview.name || IMG_ALT}
                    w="full"
                    h="full"
                    objectFit="cover"
                    onError={(e) => {
                      e.target.src = FALLBACK;
                    }}
                  />
                </Box>
                <Flex direction="column" flex="1" p={{ xs: '24px', md: '32px' }} gap="16px" overflowY="auto">
                  <Flex align="center" gap="12px">
                    <Box w="4px" h="28px" borderRadius="full" bg="#00b7e9" flexShrink={0} />
                    <Text fontSize={{ xs: '20px', md: '24px' }} fontWeight={800} color="#1d2128" lineHeight="1.3">
                      {selectedReview.name}
                    </Text>
                  </Flex>
                  <Box h="1px" bg="gray.100" />
                  <Box
                    fontSize="15px"
                    color="gray.600"
                    lineHeight="1.9"
                    className="html-content"
                    dangerouslySetInnerHTML={{ __html: selectedReview.review_description }}
                    sx={{
                      p: { mb: '8px' },
                      img: { borderRadius: '12px', my: '12px', maxW: '100%' },
                      'h2, h3': { fontWeight: 700, color: '#1d2128', mt: '16px', mb: '8px' }
                    }}
                  />
                </Flex>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewCarousel;
