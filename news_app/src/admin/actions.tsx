import {
  getAuthToken
} from '@/app/auth/actions';

import {
  NewsItem,
} from '@/types';

import {
  API_URL
} from '@/lib/config';


export const getNewsItems = async (pageNumber: number = 1): Promise<NewsItem[]> => {
  let newsItems: NewsItem[] = [];
  const url = `${API_URL}newsitems_admin/?page=${pageNumber}`;

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
  } catch (error) {
      console.error("Failed to fetch news items:", error);
  }

  return newsItems;
};

export const getNewsItem = async (id: number): Promise<NewsItem | undefined> => {
  let newsItem: NewsItem;
  const url = `${API_URL}newsitems_admin/${id}/`;
  
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
};

export const updateNewsItem = async (id: number): Promise<NewsItem | undefined> => {
    console.log(id);
    console.log(getAuthToken());

    let newsItem: NewsItem | undefined;

    return newsItem;
};
