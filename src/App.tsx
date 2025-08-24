import React, { useEffect, useRef, useState } from 'react';
import { Box, Heading, Text, Button, VStack, useColorMode, useColorModeValue, Flex, Fade } from '@chakra-ui/react';
import TopHeader from './TopHeader';
import FrontPageInfo from './FrontPageInfo';
import MultiStepForm from './MultiStepForm';

function App() {
  const { toggleColorMode } = useColorMode();
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isScrollingEnabled, setIsScrollingEnabled] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);


  const handleFormComplete = (email: string, name: string) => {
    console.log('User info:', { email, name });
    // Handle form completion logic here
  };

  const handleTryItOut = () => {
    // Trigger scroll animation to show the form
    setIsScrollingEnabled(false);
    setScrollProgress(1); // Jump to fully showing the form
    setTimeout(() => {
      setIsScrollingEnabled(true); // Enable scrolling after animation completes
    }, 300);
  };

  const bgGradient = useColorModeValue(
    "linear(to-br, gray.50, gray.100)", "linear(to-br, gray.900, gray.800)"
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only prevent default scrolling when animation is active
      if (scrollProgress < 1 && !isScrollingEnabled) {
        e.preventDefault();

        const delta = e.deltaY;
        const maxScroll = 1000;
        const newProgress = Math.min(Math.max(scrollProgress + (delta / maxScroll), 0), 1);
        setScrollProgress(newProgress);

        // Enable scrolling once form is fully visible
        if (newProgress >= 0.99) {
          setIsScrollingEnabled(true);
        }
      }

      // Handle reverse animation when scrolling up at form top
      if (isScrollingEnabled && formContainerRef.current) {
        const form = formContainerRef.current;
        const isAtTop = form.scrollTop === 0;
        const isScrollingUp = e.deltaY < 0;

        if (isAtTop && isScrollingUp && scrollProgress > 0) {
          e.preventDefault();
          setIsScrollingEnabled(false);

          const delta = e.deltaY;
          const maxScroll = 1000;
          const newProgress = Math.min(Math.max(scrollProgress + (delta / maxScroll), 0), 1);
          setScrollProgress(newProgress);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [scrollProgress, isScrollingEnabled]);


  // Calculate transformations based on scroll progress
  const frontPageOpacity = 1 - scrollProgress;
  const frontPageTranslateY = `-${scrollProgress * 100}px`;
  const formOpacity = Math.max(0, (scrollProgress - 0.7) / 0.3);
  const headerOpacity = scrollProgress;

  return (
    <Box
      minH="100vh"
      height="100vh"
      position="relative"
      overflow="hidden"
      bgGradient={bgGradient}
      p={{ base: 1, md: 4 }}
      ref={scrollContainerRef}
    >
      {/* Top Header: Fades in with scroll */}
      <Box
        opacity={headerOpacity}
        transition="opacity 0.3s ease"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="10"
      >
        <TopHeader showHeader={headerOpacity > 0.1} />
      </Box>

      {/* FrontPageInfo: Fades out and moves up */}
      <Flex
        maxW="1000px"
        w="100%"
        px={{ base: 2, md: 0 }}
        alignItems="center"
        mx="auto"
        position="absolute"
        top="50%"
        left="50%"
        transform={`translate(-50%, -50%) translateY(${frontPageTranslateY})`}
        opacity={frontPageOpacity}
        transition="all 0.3s ease"
        pointerEvents={frontPageOpacity > 0.5 ? 'auto' : 'none'}
      >
        <FrontPageInfo onTryItOut={handleTryItOut} />
      </Flex>

      {/* MultiStepForm: Fades in */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        opacity={formOpacity}
        transition="opacity 0.3s ease"
        width="100%"
        maxW="1000px"
        maxH="80vh"
        pointerEvents={formOpacity > 0.5 ? 'auto' : 'none'}
        overflow={isScrollingEnabled ? 'auto' : 'hidden'}
        ref={formContainerRef}
      >
        <MultiStepForm onComplete={handleFormComplete} />
      </Box>

      {/* Scroll indicator (optional) */}
      {scrollProgress < 0.9 && !isScrollingEnabled && (
        <Box
          position="fixed"
          bottom="20px"
          left="50%"
          transform="translateX(-50%)"
          opacity={1 - scrollProgress}
          fontSize="sm"
          color="gray.500"
          transition="opacity 0.3s ease"
        >
          Scroll ↓ to continue
        </Box>
      )}
    </Box>
  );
}

export default App;