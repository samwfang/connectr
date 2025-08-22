import React, { useEffect, useRef, useState } from 'react';
import { Box, Heading, Text, Button, VStack, useColorMode, useColorModeValue, Flex } from '@chakra-ui/react';
import TopHeader from './TopHeader';
import FrontPageInfo from './FrontPageInfo';
import MultiStepForm from './MultiStepForm';

function App() {
  const { toggleColorMode } = useColorMode();
  const [showHeader, setShowHeader] = useState<boolean>(false);

  const frontPageInfoRef = useRef<HTMLDivElement>(null);

  const handleFormComplete = (email: string, name: string) => {
    console.log('User info:', { email, name });
    // Handle form completion logic here
  };

  const bgGradient = useColorModeValue(
    "linear(to-br, gray.50, gray.100)", "linear(to - br, gray.900, gray.800)"
  );

  useEffect(() => {
    const handleScroll = () => {
      if (frontPageInfoRef.current) {
        // Show header after scrolling past 50% of FrontPageInfo height
        const threshold = frontPageInfoRef.current.offsetHeight * 0.1;
        setShowHeader(window.scrollY > threshold);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box minH="100vh"
      height="100%"
      position="relative"
      overflow="hidden"
      bgGradient={bgGradient} // Chakra's gradient syntax
      p={{ base: 1, md: 4 }}
    >
      {/* Top Header: Only Display when ShowHeader == True */}
      <TopHeader
        showHeader={showHeader}
      />

      <Flex maxW="1000px"
        w="100%" // Ensure it takes full width on mobile
        px={{ base: 2, md: 0 }} // Add padding on mobile
        alignItems="center"
        mx="auto"
        ref={frontPageInfoRef}>
        <FrontPageInfo />


      </Flex>
      <MultiStepForm onComplete={handleFormComplete} />
    </Box>
  );
}

export default App;