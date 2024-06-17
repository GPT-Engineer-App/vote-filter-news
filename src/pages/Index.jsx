import React from "react";
import { Container, Text, VStack, Button, useColorMode, Box, Link, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";

const fetchTopStories = async () => {
  const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
  const storyIds = await response.json();
  const top5StoryIds = storyIds.slice(0, 5);

  const storyPromises = top5StoryIds.map(async (id) => {
    const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    return storyResponse.json();
  });

  return Promise.all(storyPromises);
};

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data, error, isLoading } = useQuery("topStories", fetchTopStories);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={4}>
      <VStack spacing={4} w="100%">
        <Text fontSize={{ base: "xl", md: "2xl" }} textAlign="center">Top 5 Hacker News Stories</Text>
        <Button onClick={toggleColorMode} w={{ base: "100%", sm: "auto" }}>
          Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
        {isLoading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Text>Error fetching stories</Text>
        ) : (
          <Box maxH="60vh" overflowY="auto" w="100%">
            {data.map((story) => (
              <Box key={story.id} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
                <Text fontSize="lg" fontWeight="bold">{story.title}</Text>
                <Link href={story.url} color="teal.500" isExternal>Read more</Link>
                <Text>Upvotes: {story.score}</Text>
              </Box>
            ))}
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;