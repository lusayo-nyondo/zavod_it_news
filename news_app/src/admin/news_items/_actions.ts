import { getAuthToken } from '@/app/auth/actions';
import { NewsItem } from '@/types';
import { API_URL } from '@/lib/config';

import {
    NewsItemFormData
} from '@/admin/news_items/_types';

export const createNewsItem = async (data: NewsItemFormData): Promise<NewsItem | undefined> => {
    const url = `${API_URL}newsitems/`;
    const token = getAuthToken();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('text', data.text);
    formData.append('main_image', data.main_image[0]);
    
    if (data.images) {
        Array.from(data.images).forEach((file) => {
            formData.append('images', file);
        });
    }
    
    if (data.tags) {
        data.tags.forEach((tag) => {
            formData.append('tags', tag.toString());
        });
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const toPrint = await response.json();
            console.error(toPrint);
            throw new Error(`Error creating news item: ${response.statusText}`);
        }

        const jsonData = await response.json();
        return {
            id: jsonData.id,
            title: jsonData.title,
            main_image: jsonData.main_image,
            images: [],
            text: jsonData.text,
            tags: jsonData.tags,
            created_on: jsonData.created_on,
            updated_on: jsonData.updated_on,
        };
    } catch (error) {
        console.error("Failed to create news item:", error);
    }

    return undefined;
};

export const updateNewsItem = async (id: number, data: NewsItemFormData): Promise<NewsItem | undefined> => {
    const url = `${API_URL}newsitems/${id}/`;
    const token = getAuthToken();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('text', data.text);
    
    if (data.main_image && data.main_image.length > 0) {
        formData.append('main_image', data.main_image[0]);
    }
    
    if (data.images) {
        Array.from(data.images).forEach((file) => {
            formData.append('images', file);
        });
    }
    
    if (data.tags) {
        data.tags.forEach((tag) => {
            formData.append('tags', tag.toString());
        });
    }

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const toPrint = await response.json();
            console.error(toPrint);
            throw new Error(`Error updating news item: ${response.statusText}`);
        }

        const jsonData = await response.json();
        return {
            id: jsonData.id,
            title: jsonData.title,
            main_image: jsonData.main_image,
            images: [],
            text: jsonData.text,
            tags: jsonData.tags,
            created_on: jsonData.created_on,
            updated_on: jsonData.updated_on,
        };
    } catch (error) {
        console.error("Failed to update news item:", error);
    }

    return undefined;
};

export const deleteNewsItem = async (id: number): Promise<boolean> => {
    const url = `${API_URL}newsitems/${id}/`;
    const token = getAuthToken();

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error deleting news item: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Failed to delete news item:", error);
    }

    return false;
};
