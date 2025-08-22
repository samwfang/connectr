import { Box, Flex, Text, Badge, Button, useColorMode } from '@chakra-ui/react';



interface TopHeaderProps {
    showHeader: boolean;
}

export default function TopHeader({showHeader }: TopHeaderProps) {
     const { toggleColorMode } = useColorMode(); // Add this line

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex={10000}
            opacity={showHeader ? 1 : 0}
            transition="opacity 0.3s ease"
            pointerEvents={showHeader ? 'auto' : 'none'}
            bg="gray.50"
            boxShadow="sm"
            p={4}
        >
            <Flex
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="space-around"
                textAlign="left"
                pl={8}
                mt={4}
            >
                <Flex
                    width="100%"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    position="relative"
                    flexWrap="wrap"  // Added to allow wrapping
                    gap={2}
                >
                    <Flex alignItems="center">
                        <Text fontSize="2xl" fontWeight="bold">
                            The University Database
                        </Text>
                        <Badge variant="subtle" colorScheme="pink" ml={1}>
                            DEMO
                        </Badge>
                    </Flex>
                    <Button variant="outline" onClick={toggleColorMode}>
                        Toggle Mode
                    </Button>

                </Flex>
            </Flex>
        </Box>
    );
}