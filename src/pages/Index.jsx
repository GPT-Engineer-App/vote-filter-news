import React, { useState, useEffect } from "react";
import { Container, Text, VStack, Button, useColorMode, Input, Box } from "@chakra-ui/react";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((response) => response.json())
      .then((storyIds) => {
        const top5StoryIds = storyIds.slice(0, 5);
        return Promise.all(
          top5StoryIds.map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((response) => response.json())
          )
        );
      })
      .then((stories) => {
        setStories(stories);
        setFilteredStories(stories);
      })
      .catch((error) => console.error("Error fetching stories:", error));
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = stories.filter((story) =>
      story.title.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredStories(filteredData);
  }, [searchTerm, stories]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Hacker News Top Stories</Text>
        <Input
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Box width="100%" overflowY="auto" maxHeight="60vh">
          {filteredStories.map((story) => (
            <Box key={story.id} p={4} borderWidth="1px" borderRadius="md" mb={4}>
              <Text fontSize="lg" fontWeight="bold">
                {story.title}
              </Text>
              <Text>Upvotes: {story.score}</Text>
              <Button as="a" href={story.url} target="_blank" mt={2}>
                Read more
              </Button>
            </Box>
          ))}
        </Box>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;