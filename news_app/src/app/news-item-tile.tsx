import {
    NewsItem
} from '@/types';

const NewsItemTile = ({ newsItem }: { newsItem: NewsItem }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md w-full bg-white">
      <img
          src={newsItem.main_image} 
          alt="News item main image." 
          className="object-fit object-contain h-48 relative w-full p-2"
        />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{newsItem.title}</h3>
        <div className="mt-2">
          {newsItem.tags.map((tag, index) => (
            <span key={index} className="inline-block bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-sm mr-2 mb-2">
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsItemTile;
