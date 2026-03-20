'use client';

import { Box, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Introduction from './introduction';
import ProductProcess from './production-process';
import Statistic from './statistic';
import Strength from './strength';
import Vision from './vision';

const MotionBox = motion(Box);

const IntroWrapper = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const components = [
    { position: 500, component: Statistic },
    { position: 800, component: Vision },
    { position: 1400, component: Strength },
    { position: 1700, component: ProductProcess }
  ];

  return (
    <Flex direction="column" zIndex={10} pos="relative" bgColor="#FFF" overflow="hidden">
      <Introduction />

      {components.map((item, index) => {
        return (
          <MotionBox
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollY > item.position ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {<item.component />}
          </MotionBox>
        );
      })}

      {/* <MotionBox
        id={`intro-element-${0}`}
        initial={{ opacity: 1 }}
        animate={showElements[0] ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        <Vision />
      </MotionBox>
      <MotionBox
        id={`intro-element-${1}`}
        initial={{ opacity: 1 }}
        animate={showElements[1] ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        <Strength />
      </MotionBox> */}

      {/* <MotionBox
        id={`intro-element-${0}`}
        initial={{ opacity: 0 }}
        animate={showElements[0] ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        <Process />
      </MotionBox> */}

      {/* <MotionBox
        id={`intro-element-${2}`}
        initial={{ opacity: 0 }}
        animate={showElements[2] ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        <ProductProcess />
      </MotionBox> */}
      {/* 
      <MotionBox
        id={`intro-element-${3}`}
        initial={{ opacity: 0 }}
        animate={showElements[3] ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        <Statistic />
      </MotionBox>
      <MotionBox
        id={`intro-element-${4}`}
        initial={{ opacity: 0 }}
        animate={showElements[4] ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        <Feedback />
      </MotionBox> */}
    </Flex>
  );
};

export default IntroWrapper;
