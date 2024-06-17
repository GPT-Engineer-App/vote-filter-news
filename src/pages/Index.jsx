import React, { useEffect, useState } from 'react';
import { Container, VStack, Text, Link, Spinner, Box, Heading } from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';

const Index = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const storyIds = await response.json();
        const top5StoryIds = storyIds.slice(0, 5);

        const storyPromises = top5StoryIds.map(async (id) => {
          const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return storyResponse.json();
        });

        const stories = await Promise.all(storyPromises);
        setStories(stories);
      } catch (error) {
        console.error('Error fetching top stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={6}>Top 5 Hacker News Stories</Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          stories.map((story) => (
            <Box key={story.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Link href={story.url} isExternal fontSize="xl" fontWeight="bold">
                {story.title}
              </Link>
              <Text mt={2} fontSize="md" color="gray.500">
                <FaArrowUp /> {story.score} upvotes
              </Text>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;