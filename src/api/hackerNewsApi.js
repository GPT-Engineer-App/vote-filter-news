import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const fetchTopStories = async () => {
  const { data: storyIds } = await axios.get(`${BASE_URL}/topstories.json`);
  const top5StoryIds = storyIds.slice(0, 5);
  const storyPromises = top5StoryIds.map(id => axios.get(`${BASE_URL}/item/${id}.json`));
  const stories = await Promise.all(storyPromises);
  return stories.map(story => story.data);
};