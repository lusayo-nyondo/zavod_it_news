export type NewsItem = {
    id: number;
    title: string;
    main_image: string;
    text: string;
    created_on: string;
    updated_on: string;
    tags: NewsItemTag[];
};

export type NewsItemImage = {
    id: number;
    news_item: NewsItem;
    image: string;
    created_on: string;
    updated_on: string;
};

export type NewsItemTag = {
    id: number;
    news_item: NewsItem[];
    label: string;
    created_on: string;
    updated_on: string;
};

export type NewsItemUserReactionEvent = {
    id: number;
    event_type: 'like' | 'dislike';
    user: User;
    news_item: NewsItem;
    created_on: string;
    updated_on: string;
};

export type User = {
    id: number;
    username: string;
    email?: string;
};
