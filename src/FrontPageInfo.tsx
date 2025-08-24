import { Badge, Box, Button, Circle, Flex, Icon, List, ListIcon, ListItem, Switch, Text } from "@chakra-ui/react";

import { Grid, Avatar } from '@chakra-ui/react';
import React from "react";

interface FrontPageInfoProps {

};
interface FrontPageInfoProps {
      onTryItOut?: () => void;
};

const FrontPageInfo = React.forwardRef<HTMLDivElement, FrontPageInfoProps>(({onTryItOut}, ref) => {
  return (
    <Box 
      w={{ base: "100%", md: "1000px" }} 
      alignItems="center" 
      mx="auto" 
      p={6}
      ref={ref}  // Attach the ref to the Box component
    >
      <Flex direction="column" alignItems="center" p={3}>
        <Flex direction="column" alignItems="center">
          <Text 
            fontSize={{ base: "5xl", md: "8xl" }} 
            fontWeight="100" 
            sx={{ fontVariationSettings: '"wght" 50' }} 
          >
            connectr
          </Text>
        </Flex>

        <Flex direction="column" alignItems="center" mb={4}>
          <Text fontSize="lg" fontWeight="200">
            connect confidently. discover mutual links.
          </Text>
        </Flex>

        <Flex alignItems="center" gap={4}>
          <Button variant="minimalist" onClick={onTryItOut}>try it out</Button>
          <Button variant="minimalistOutline">why it works</Button>
        </Flex>
      </Flex>
    </Box>
  );
});

export default FrontPageInfo;
