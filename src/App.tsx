import React, { useState } from 'react';
import { Box, Heading, Text, Button, VStack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import TopHeader from './TopHeader';

function App() {
  const { toggleColorMode } = useColorMode();
   const [showHeader, setShowHeader] = useState<boolean>(false);

  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, blue.100)", "linear(to - br, blue.900, blue.800)" 
  );

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
    </Box>
  );
}

export default App;