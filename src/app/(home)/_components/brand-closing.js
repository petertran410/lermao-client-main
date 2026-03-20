'use client';

import { IMG_ALT, PX_ALL } from '@/utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const BrandClosing = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      px={PX_ALL}
      py={{ xs: '48px', lg: '72px' }}
      position="relative"
      overflow="hidden"
      // bg="linear-gradient(180deg, #ffffff 0%, #f0fafd 30%, #f0fafd 70%, #ffffff 100%)"
    >
      {/* ── Decorative bubbles ── */}
      <Box
        position="absolute"
        w="180px"
        h="180px"
        borderRadius="full"
        bg="rgba(0, 183, 233, 0.06)"
        top="-40px"
        left="-40px"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        w="120px"
        h="120px"
        borderRadius="full"
        bg="rgba(255, 158, 32, 0.06)"
        bottom="-30px"
        right="-20px"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        w="80px"
        h="80px"
        borderRadius="full"
        bg="rgba(0, 183, 233, 0.04)"
        top="20%"
        right="15%"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        w="60px"
        h="60px"
        borderRadius="full"
        bg="rgba(255, 158, 32, 0.05)"
        bottom="25%"
        left="10%"
        pointerEvents="none"
      />

      {/* ── Mascot + Slogan ── */}
      <Flex align="center" justify="center" gap={{ xs: '0', lg: '24px' }} position="relative" zIndex={1}>
        {/* Left mascot — desktop only */}
        <Image
          display={{ xs: 'none', lg: 'block' }}
          src="/images/lermao-run.gif"
          alt={IMG_ALT}
          w="80px"
          h="auto"
          sx={{
            animation: 'closingSpringLeft 2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite',
            '@keyframes closingSpringLeft': {
              '0%, 100%': { transform: 'translateY(0) scaleX(-1)' },
              '40%': { transform: 'translateY(-18px) scaleX(-1)' }
            }
          }}
        />

        <Flex direction="column" align="center">
          {/* Mobile mascot — above text */}
          <Image
            display={{ xs: 'block', lg: 'none' }}
            src="/images/lermao-run.gif"
            alt={IMG_ALT}
            w="64px"
            h="auto"
            mb="16px"
            sx={{
              animation: 'closingSpringMobile 2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite',
              '@keyframes closingSpringMobile': {
                '0%, 100%': { transform: 'translateY(0)' },
                '40%': { transform: 'translateY(-16px)' }
              }
            }}
          />

          {/* ── Decorative line top ── */}
          {/* <Box
            w={{ xs: '60px', lg: '80px' }}
            h="3px"
            borderRadius="full"
            bgGradient="linear(to-r, #FF9E20, #ffbd66)"
            mb={{ xs: '16px', lg: '20px' }}
          /> */}

          {/* ── Main slogan — dual layer ── */}
          <Box position="relative">
            {/* Layer 1: Base gradient text — subtle color shift as idle effect */}
            <Text
              as="p"
              fontSize={{ xs: '36px', md: '48px', lg: '60px', xl: '72px' }}
              fontWeight={900}
              textAlign="center"
              lineHeight="1.1"
              letterSpacing="-0.03em"
              bgClip="text"
              sx={{
                WebkitTextFillColor: 'transparent',
                backgroundImage: 'linear-gradient(90deg, #FF9E20, #ffbd66, #FF9E20, #ffbd66, #FF9E20)',
                backgroundSize: '300% 100%',
                animation: 'gradientDrift 5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
                '@keyframes gradientDrift': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' }
                }
              }}
            >
              LerMao Sành Ăn Như Gấu
            </Text>

            {/* Layer 2: Light sweep — gentle pass, subtle brightness */}
            <Text
              as="p"
              aria-hidden="true"
              position="absolute"
              top={0}
              left={0}
              w="full"
              fontSize={{ xs: '36px', md: '48px', lg: '60px', xl: '72px' }}
              fontWeight={900}
              textAlign="center"
              lineHeight="1.1"
              letterSpacing="-0.03em"
              bgClip="text"
              pointerEvents="none"
              sx={{
                WebkitTextFillColor: 'transparent',
                backgroundImage:
                  'linear-gradient(110deg, transparent 20%, transparent 35%, rgba(255,255,255,0.3) 38%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.3) 42%, transparent 45%, transparent 100%)',
                backgroundSize: '300% 100%',
                backgroundPosition: '100% 0',
                animation: 'lightSweep 5s cubic-bezier(0.22, 0.61, 0.36, 1) infinite',
                '@keyframes lightSweep': {
                  '0%': { backgroundPosition: '100% 0' },
                  '60%': { backgroundPosition: '-100% 0' },
                  '100%': { backgroundPosition: '-100% 0' }
                }
              }}
            >
              LerMao Sành Ăn Như Gấu
            </Text>

            {/* Layer 3: Glow shadow behind text — spring pulse */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="80%"
              h="60%"
              borderRadius="full"
              pointerEvents="none"
              sx={{
                background: 'radial-gradient(ellipse, rgba(255, 158, 32, 0.15) 0%, transparent 40%)',
                animation: 'glowPulse 3s cubic-bezier(0.34, 1.56, 0.64, 1) infinite',
                '@keyframes glowPulse': {
                  '0%, 100%': { opacity: 0.4, transform: 'translate(-50%, -50%) scale(1)' },
                  '50%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1.15)' }
                }
              }}
            />
          </Box>

          {/* ── Brand name below ── */}
          {/* <Text
            fontSize={{ xs: '15px', md: '17px', lg: '20px' }}
            fontWeight={600}
            color="#1d2128"
            mt={{ xs: '12px', lg: '16px' }}
            letterSpacing="0.15em"
            textTransform="uppercase"
            opacity={0.6}
          >
            Gấu LerMao
          </Text> */}

          {/* ── Decorative line bottom ── */}
          {/* <Box
            w={{ xs: '60px', lg: '80px' }}
            h="3px"
            borderRadius="full"
            bgGradient="linear(to-r, #ffbd66, #FF9E20)"
            mt={{ xs: '16px', lg: '20px' }}
          /> */}
        </Flex>

        {/* Right mascot — desktop only */}
        <Image
          display={{ xs: 'none', lg: 'block' }}
          src="/images/lermao-run.gif"
          alt={IMG_ALT}
          w="80px"
          h="auto"
          sx={{
            animation: 'closingSpringRight 2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite 0.15s',
            '@keyframes closingSpringRight': {
              '0%, 100%': { transform: 'translateY(0)' },
              '40%': { transform: 'translateY(-18px)' }
            }
          }}
        />
      </Flex>
    </Flex>
  );
};

export default BrandClosing;
