import { Container, Text, VStack, Button, useColorMode, List, ListItem, Link, Spinner } from "@chakra-ui/react";
import { useQuery } from 'react-query';
import { fetchTopStories } from '../api/hackerNewsApi';

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data, error, isLoading } = useQuery('topStories', fetchTopStories);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Top 5 Hacker News Stories</Text>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Text>Error fetching stories</Text>
        ) : (
          <List spacing={3} overflowY="auto" maxHeight="60vh" width="100%">
            {data.map(story => (
              <ListItem key={story.id} borderWidth="1px" borderRadius="lg" p={4}>
                <Text fontSize="lg" fontWeight="bold">{story.title}</Text>
                <Link href={story.url} color="teal.500" isExternal>Read more</Link>
                <Text>Upvotes: {story.score}</Text>
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </Container>
  );
};

export default Index;