import { Container, Text, VStack, Button, useColorMode, Box } from "@chakra-ui/react";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={4}>
      <VStack spacing={4} width="100%">
        <Text fontSize={{ base: "xl", md: "2xl" }} textAlign="center">Your Blank Canvas</Text>
        <Text fontSize={{ base: "md", md: "lg" }} textAlign="center">Chat with the agent to start making edits.</Text>
        <Button onClick={toggleColorMode} width={{ base: "100%", md: "auto" }}>
          Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;