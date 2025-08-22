import React, { useState } from 'react';
import {
  Box,
  Input,
  Flex,
  Text,
  IconButton,
  Circle,
  Fade,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@chakra-ui/icons';


const NUM_STEPS = 3;

interface MultiStepFormProps {
  onComplete?: (email: string, name: string) => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const handleStepChange = (newStep: number) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentStep(newStep);
      setIsVisible(true);
    }, 200);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Flex direction="column" gap={4} align="center">
            <Text fontWeight="200" textAlign="center" fontSize={{ base: "lg", md: "xl" }}>
              enter your email
            </Text>
            <Flex w="40vw">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                variant="flushed"
                borderColor="rgba(0, 0, 0, 0.2)"
                _focus={{ borderColor: 'rgba(0, 0, 0, 0.4)' }}
                textAlign="center"
                fontWeight="200"
                fontSize={{ base: "lg", md: "2xl" }}
                autoFocus
              />
            </Flex>

          </Flex>
        );

      case 1:
        return (
          <Flex direction="column" gap={4} align="center">
            <Text fontWeight="200" textAlign="center" fontSize={{ base: "lg", md: "xl" }}>
              enter your name
            </Text>
            <Flex direction={{ base: "column", md: "row" }} w="40vw" gap={4}>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="first name"
                variant="flushed"
                borderColor="rgba(0, 0, 0, 0.2)"
                _focus={{ borderColor: 'rgba(0, 0, 0, 0.4)' }}
                textAlign="center"
                fontWeight="200"
                fontSize={{ base: "lg", md: "2xl" }}
                autoFocus
              />

              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="last name"
                variant="flushed"
                borderColor="rgba(0, 0, 0, 0.2)"
                _focus={{ borderColor: 'rgba(0, 0, 0, 0.4)' }}
                textAlign="center"
                fontWeight="300"
                fontSize={{ base: "lg", md: "2xl" }}
                autoFocus
              />
            </Flex>

          </Flex>
        );

      case 2:
        return (
          <Flex direction="column" gap={4} align="center">
            <Text fontWeight="300" textAlign="center" fontSize="lg">
              confirm your details
            </Text>
            <Box textAlign="center">
              <Text fontSize="sm" opacity={0.7}>
                email: {email}
              </Text>
              <Text fontSize="sm" opacity={0.7}>
                name: {firstName + lastName}
              </Text>
            </Box>
          </Flex>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < NUM_STEPS - 1) {
      handleStepChange(currentStep + 1);
    } else {
      onComplete?.(email, firstName + lastName);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      handleStepChange(currentStep - 1);
    }
  };

  const isValid = () => {
    switch (currentStep) {
      case 0: return email.includes('@');
      case 1: return firstName.trim().length >= 2;
      case 2: return true;
      default: return false;
    }
  };

  const showBackButton = currentStep > 0;
  const isLastStep = currentStep === NUM_STEPS - 1;

  return (
    <Box
      w="100%"
      maxW={{ base: "400px", md: "700px" }}
      mx="auto"
      p={8}
      minH={{ base: "200px", md: "300px" }}
      display="flex"
      alignItems="center"
      border="1px solid"
      borderColor="blackAlpha.300"
      borderRadius="lg"
    >
      <Flex direction="column" gap={6} w="100%">
        <Flex direction="row" align="center" gap={3}>
          <Circle
            size={{ base: "35px", md: "50px" }}
            border="1px solid black"  // Narrow black outline
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">1</Text>
          </Circle>
          <Text fontWeight={200} fontSize={{ base: "2xl", md: "3xl" }} mt="1">
            establish a link
          </Text>
        </Flex>

        <Text fontWeight={200}> To establish a link, enter your info, then the info of who you wish to connect with.</Text>

        <Alert
          status="info"
          variant="subtle"
          bg="transparent"
          border="1px solid"
          borderColor="blackAlpha.300"
          borderRadius="md"
          color="black"
          fontSize="sm"
          fontWeight="200"
          p={3}
        >
          <AlertIcon color="black" boxSize="16px" mr={2} />
          <Box>
            Your connections will NOT know it was you until they independently establish a link with you. {" "}
            <Text as="span" fontStyle="italic" opacity={0.8} cursor="pointer" _hover={{ opacity: 1 }}>
              learn more
            </Text>
          </Box>
        </Alert>
        <Flex direction="column" gap={6} align="center" w="100%">
          {/* Step indicator */}
          <Flex gap={2}>
            {Array.from({ length: NUM_STEPS }, (_, index) => (
              <Circle
                key={index}
                size={{ base: "8px", md: "12px" }}
                bg={index <= currentStep ? 'black' : 'gray.300'}
                opacity={index === currentStep ? 1 : 0.5}
              />
            ))}
          </Flex>

          {/* Current step content */}
          <Box minH="120px" w="100%" display="flex" alignItems="center" justifyContent="center">
            <Fade in={isVisible} transition={{ enter: { duration: 0.1 }, exit: { duration: 0.1 } }}>
              {renderStep()}
            </Fade>
          </Box>

          {/* Navigation */}
          <Flex gap={4} align="center">
            {showBackButton && (
              <IconButton
                aria-label="Back"
                icon={<ChevronLeftIcon boxSize={{ base: "3", md: "4" }} />}
                onClick={handleBack}
                variant="minimalistOutline"
                size={{ base: "md", md: "lg" }}
                isRound
                sx={{
                  "&.chakra-button": {
                    width: { base: "40px", md: "48px" },
                    height: { base: "40px", md: "48px" },
                  }
                }}
              />
            )}

            <IconButton
              aria-label={isLastStep ? "Complete" : "Next"}
              icon={isLastStep ? <CheckIcon /> : <ChevronRightIcon boxSize={{ base: "3", md: "4" }} />}
              onClick={handleNext}
              variant="minimalistOutline"
              size={{ base: "md", md: "lg" }}
              isRound
              sx={{
                "&.chakra-button": {
                  width: { base: "40px", md: "48px" },
                  height: { base: "40px", md: "48px" },
                }
              }}
              isDisabled={!isValid()}
            />
          </Flex>
        </Flex>
      </Flex>

    </Box>
  );
};

export default MultiStepForm;