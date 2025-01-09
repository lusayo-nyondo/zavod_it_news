import {
  useState,
  useEffect,
  useCallback
} from 'react';

import {
    NewsItem
} from '@/types';

import {
  getUser
} from '@/app/auth/actions';

import {
  setUserReaction,
  getReactionCount
} from '@/app/actions';

const NewsItemTile = ({ newsItem }: { newsItem: NewsItem }) => {
  const user = getUser();
 
  const [likeCount, setLikeCount] = useState<number>(0);
  const [dislikeCount, setDislikeCount] = useState<number>(0);

  const getReactionCounts = useCallback(() => {
    getReactionCount(
      newsItem.id,
      'like',
    ).then(count => setLikeCount(count));

    getReactionCount(
      newsItem.id,
      'dislike',
    ).then(count => setDislikeCount(count));
  }, [newsItem]);

  useEffect(() => {
    getReactionCounts();
  }, [getReactionCounts]);

  const handleLike = () => {
    setUserReaction(
      newsItem.id,
      user.id,
      'like'
    ).then(() => {
      getReactionCounts();
    });
  };

  const handleDislike = () => {
    setUserReaction(
      newsItem.id,
      user.id,
      'dislike'
    ).then(() => {
      getReactionCounts();
    });
  };

  return (
    <div className="group overflow-hidden border rounded-lg shadow-md w-full h-[50vh] flex row gap-2 justify-between items-center bg-white">
      <a className="flex justify-center items-center w-56 h-full" href={`/news_item/${newsItem.id}`}>
        <img
            src={newsItem.main_image} 
            alt="News item main image." 
            className="object-fit object-contain relative h-56 p-2 group-hover:scale-105 transition duration-500"
          />
      </a>
      <div className="p-4">
        <a className="text-lg font-semibold text-gray-700" href={`/news_item/${newsItem.id}`}>{newsItem.title}</a>
        <div className="mt-2">
          {newsItem.tags.map((tag, index) => (
            <a href={ `/?tag_id=${tag.id}` } key={index} className="inline-block bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-sm mr-2 mb-2">
              {tag.label}
            </a>
          ))}
        </div>
        <div className="mt-2">
          <div className="flex flex-row flex-nowrap">
            <button className="text-gray-700 rounded-l-full flex flex-row gap-1 flex-nowrap justify-start items-center border-r border-white bg-gray-200 hover:bg-gray-100 p-1" type="button" onClick={ handleLike }>
              <span>{ likeCount }</span>
              <span>{ likeCount == 1 ? 'Like' : 'Likes'}</span>
            </button>
            <button className="text-gray-700 rounded-r-full flex flex-row gap-1 flex-nowrap justify-start items-center border-l border-white bg-gray-200 hover:bg-gray-100 p-2" type="button" onClick={ handleDislike }>
              <span>{ dislikeCount }</span>
              <span>{ dislikeCount == 1 ? 'Dislike' : 'Dislikes' }</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItemTile;
