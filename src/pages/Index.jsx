import React, { useState, useEffect } from "react";
import { Container, Text, VStack, Input, Box, Link } from "@chakra-ui/react";

const Index = () => {
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
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Hacker News Top Stories</Text>
        <Input
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredStories.length > 0 ? (
          filteredStories.map((story) => (
            <Box key={story.id} p={4} borderWidth={1} borderRadius="md" width="100%">
              <Text fontSize="lg" fontWeight="bold">
                {story.title}
              </Text>
              <Text>Upvotes: {story.score}</Text>
              <Link href={story.url} color="teal.500" isExternal>
                Read more
              </Link>
            </Box>
          ))
        ) : (
          <Text>No stories found</Text>
        )}
      </VStack>
    </Container>
  );
};

export default Index;