import {
  getAuthToken
} from '@/app/auth/actions';

import {
  NewsItem,
  NewsItemTag
} from '@/types';

import {
  API_URL
} from '@/lib/config';


export const getNewsItemsPage = async (pageNumber: number = 1, tag: string | null): Promise<[NewsItem[], number]> => {
  let newsItems: NewsItem[] = [];
  let nextPage = 1;

  let url = '';
  
  if (tag) {
    url = `${API_URL}newsitems/?page=${pageNumber}&tag=${tag}`;
  } else {
    url = `${API_URL}newsitems/?page=${pageNumber}`;
  }
  
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
  }

  return [newsItems, nextPage];
};

export const getNewsItem = async (id: number): Promise<NewsItem | undefined> => {
  let newsItem: NewsItem;
  const url = `${API_URL}newsitems/${id}/`;
  
  try {
    const response = await fetch(
      url,
      {
        'method': 'GET'
      }
    );

    const jsonData = await response.json();

    newsItem = {
      id: jsonData.id,
      title: jsonData.title,
      main_image: jsonData.main_image,
      text: jsonData.text,
      images: jsonData.images,
      tags: jsonData.tags,
      created_on: jsonData.created_on,
      updated_on: jsonData.updated_on
    };
    
    return newsItem;
  } catch (error) {
    console.error(error);
  }

  return undefined;
}

export const getTagList = async () => {
  const url = `${API_URL}tags/`;
  let tags: NewsItemTag[] = [];

  try {
      const response = await fetch(url, { method: 'GET' });
      
      if (!response.ok) {
          throw new Error(`Error fetching news items: ${response.statusText}`);
      }

      const data = await response.json();

      tags = data.map((item: NewsItemTag) => ({
          id: item.id,
          label: item.label,
          image: item.image,
      }));
  } catch (error) {
      console.error("Failed to fetch tags:", error);
  }

  return tags;
}

export const getTag = async(id: number): Promise<NewsItemTag | undefined> => {
  let tag: NewsItemTag;
  const url = `${API_URL}tags/${id}/`;

  try {
    const response = await fetch(
      url,
      {
        'method': 'GET'
      }
    );

    const jsonData = await response.json();

    tag = {
      id: jsonData.id,
      label: jsonData.label,
      image: jsonData.image
    };
    
    return tag;
  } catch (error) {
    console.error(error);
  }

  return undefined;
};

export const setUserReaction = async (newsItemId: number, userId: number, reaction: string) => {
  const url = `${API_URL}newsitems/${newsItemId}/set_user_reaction/`;
  const data = {
    user: userId,
    reaction: reaction
  };
  console.log("Data is: ", data);
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
  }
};

export const getReactionCount = async (newsItemId: number, type: string | undefined) => {
  let url = '';

  if (type && type === 'like') {
    url = `${API_URL}newsitems/${newsItemId}/get_likes_count/`;
  } else if (type && type === 'dislike') {
    url = `${API_URL}newsitems/${newsItemId}/get_dislikes_count/`;
  };

  try {
    const response = await fetch(
      url,
      {
        method: 'GET'
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get count for user reactions.');
    }

    const jsonData = await response.json();
    return jsonData.data.count;
  } catch (error) {
    console.error(error);
  }
};

export const getUserReaction = async (newsItemId: number, userId: number) => {
  const url = `${API_URL}newsitems/${newsItemId}/get_user_reaction/?user=${userId}`;

  try {
    const response = await fetch(
      url,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to user reaction.');
    }

    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    console.error(error);
  }
};
