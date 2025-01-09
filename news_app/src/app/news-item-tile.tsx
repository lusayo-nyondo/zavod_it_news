import {
    NewsItem
} from '@/types';

const NewsItemTile = ({ newsItem }: { newsItem: NewsItem }) => {
  const handleLike = () => {

  };

  const handleDislike = () => {

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
      </div>
    </div>
  );
};

export default NewsItemTile;
