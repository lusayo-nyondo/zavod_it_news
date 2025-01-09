import {
  getAuthToken
} from '@/app/auth/actions';

import {
  NewsItem,
} from '@/types';

import {
  API_URL
} from '@/lib/config';


export const getNewsItemsPage = async (pageNumber: number = 1): Promise<[NewsItem[], number]> => {
  let newsItems: NewsItem[] = [];
  let nextPage = 1;

  const url = `${API_URL}newsitems/?page=${pageNumber}`;

  try {
      const response = await fetch(url, { method: 'GET' });
      
      if (!response.ok) {
          throw new Error(`Error fetching news items: ${response.statusText}`);
      }

      const jsonData = await response.json();
      const data = jsonData.results;
      
      newsItems = data.map((item: NewsItem) => ({
          id: item.id,
          title: item.title,
          text: item.text,
          created_on: item.created_on,
          tags: item.tags,
          main_image: item.main_image
      }));
      
      const nextPageURL = new URL(jsonData.next);
      const urlParams = new URLSearchParams(nextPageURL.search);
      nextPage = parseInt(urlParams.get('page') ?? '1');
  } catch (error) {
      console.error("Failed to fetch news items:", error);
      console.log(error);
  }

  return [newsItems, nextPage];
};


export const setUserReaction = async (newsItemId: number, userId: number, reaction: string) => {
  const url = `${API_URL}newsitems/${newsItemId}/set_user_reaction/`;
  const data = {
    user: userId,
    reaction: reaction
  };
  const token = getAuthToken();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to set user reaction');
    }

    const result = await response.json();
    console.log('Reaction set successfully:', result);
  } catch (error) {
    console.error('Error setting user reaction:', error);
    console.log(error);
  }
};
