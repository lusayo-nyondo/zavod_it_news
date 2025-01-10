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
  getReactionCount,
  getUserReaction as getUserReactionFromAPI
} from '@/app/actions';

import LoginRequiredDialog from './login-required-for-reaction-dialog';

const NewsItemTile = ({ newsItem }: { newsItem: NewsItem }) => {
  const user = getUser();
 
  const [userReaction, setUserReactionState] = useState<string>('');
  const [likeCount, setLikeCount] = useState<number>(0);
  const [dislikeCount, setDislikeCount] = useState<number>(0);

  const getUserReaction = useCallback(() => {
    if(user) (
      getUserReactionFromAPI(newsItem?.id ?? -1, user.id).then(reaction => {
        setUserReactionState(reaction);
      })
    );
  }, [newsItem, user]);

  const getReactionCounts = useCallback(() => {
    getReactionCount(
      newsItem?.id ?? -1,
      'like',
    ).then(count => setLikeCount(count));

    getReactionCount(
      newsItem?.id ?? -1,
      'dislike',
    ).then(count => setDislikeCount(count));
  }, [newsItem]);

  useEffect(() => {
    getUserReaction();
    getReactionCounts();
  }, [getReactionCounts, getUserReaction]);

  const handleLike = () => {
    setUserReaction(
      newsItem?.id ?? -1,
      user.id,
      'like'
    ).then(() => {
      getUserReaction();
      getReactionCounts();
    });
  };

  const handleDislike = () => {
    setUserReaction(
      newsItem?.id ?? -1,
      user.id,
      'dislike'
    ).then(() => {
      getUserReaction();
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
          {newsItem?.tags?.map((tag, index) => (
            <a href={ `/?tag_id=${tag.id}` } key={index} className="inline-block bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-sm mr-2 mb-2">
              {tag.label}
            </a>
          ))}
        </div>
        <div className="mt-2">
          <div className="flex flex-row flex-nowrap">
            { user ? (
              <>
                <button
                  className={ `${userReaction == 'like' ? 'text-gray-100 bg-gray-700 hover:bg-gray-500' : 'text-gray-700 bg-gray-200 hover:bg-gray-100'} rounded-l-full flex flex-row gap-1 flex-nowrap justify-start items-center border-r border-white px-2`}
                  type="button"
                  onClick={ handleLike }>
                  <span>{ likeCount }</span>
                  <span>{ likeCount == 1 ? 'Like' : 'Likes'}</span>
                </button>
                <button
                  className={ `${userReaction == 'dislike' ? 'text-gray-100 bg-gray-700 hover:bg-gray-500' : 'text-gray-700 bg-gray-200 hover:bg-gray-100'} rounded-r-full flex flex-row gap-1 flex-nowrap justify-start items-center border-l border-white px-2` }
                  type="button"
                  onClick={ handleDislike }>
                  <span>{ dislikeCount }</span>
                  <span>{ dislikeCount == 1 ? 'Dislike' : 'Dislikes' }</span>
                </button>
              </>
            ) : (
              <>
                <LoginRequiredDialog
                  userReaction="like"
                  count={ likeCount }
                  />
                <LoginRequiredDialog
                  userReaction="dislike"
                  count={ dislikeCount }/>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItemTile;
