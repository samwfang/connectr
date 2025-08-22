import React from 'react';
import { Box, Heading, Text, Button, VStack, useColorMode } from '@chakra-ui/react';

function App() {
  const { toggleColorMode } = useColorMode();

  return (
    <Box p={8}>
      <VStack spacing={6} align="center">
        <Heading as="h1" size="2xl" color="blue.500">
          Chakra UI v2.0 + React + TypeScript
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Now using Chakra UI version 2.0 with enhanced features
        </Text>
        <Button colorScheme="blue" size="lg">
          Get Started
        </Button>
        <Button onClick={toggleColorMode} variant="outline">
          Toggle Color Mode
        </Button>
      </VStack>
    </Box>
  );
}

export default App;