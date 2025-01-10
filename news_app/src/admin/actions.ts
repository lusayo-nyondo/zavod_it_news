import {
  getAuthToken
} from '@/app/auth/actions';

import {
  NewsItem,
} from '@/types';

import {
  API_URL
} from '@/lib/config';


const calculatePaginationIndices = (
  currentPage: number,
  pageSize: number,
  totalItems: number,
  currentResultSetLength: number
): { startIndex: number; endIndex: number; } => {
  if (currentPage < 1) {
      throw new Error("Current page must be at least 1.");
  }

  const startIndex = (currentPage - 1) * pageSize + 1;
  let endIndex = startIndex + pageSize - 1;

  if (endIndex > totalItems) {
      endIndex = totalItems;
  }
  if (endIndex > startIndex + currentResultSetLength) {
      endIndex = startIndex + currentResultSetLength;
  }

  return {
      startIndex,
      endIndex,
  };
}

export const getNewsItems = async (pageNumber: number = 1): Promise<[NewsItem[], number, number, number, number]> => {
  let newsItems: NewsItem[] = [];
  const url = `${API_URL}newsitems/?page_size=18&page=${pageNumber}`;

  let count: number = 0;
  let nextPage: number = 0;

  try {
      const response = await fetch(url, { method: 'GET' });
      
      if (!response.ok) {
          throw new Error(`Error fetching news items: ${response.statusText}`);
      }

      const jsonData = await response.json();
      console.log(jsonData);
      
      count = jsonData.count;
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

  const { startIndex, endIndex } = calculatePaginationIndices(
    pageNumber,
    18,
    count,
    newsItems.length
  );

  return [newsItems, count, nextPage, startIndex, endIndex];
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
};

export const updateNewsItem = async (id: number): Promise<NewsItem | undefined> => {
    console.log(id);
    console.log(getAuthToken());

    let newsItem: NewsItem | undefined;

    return newsItem;
};
