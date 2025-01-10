import {
  useState,
  useEffect
} from 'react';

import {
  useParams
} from 'react-router-dom';

import {
  Card,
  CardContent
} from '@/components/ui/card';

import {
  NewsItem
} from '@/types';

import {
  getNewsItem
} from '@/app/actions';

const NewsItemPage = () => {
  const { id } = useParams();
  const [ newsItem, setNewsItem ] = useState<NewsItem>();

  useEffect(() => {
    getNewsItem(parseInt(id ?? '-1')).then(data => {
      setNewsItem(data);
    });
  }, [id]);

  return (
    <>
      { newsItem ? (
        <div className="min-h-screen flex flex-col items-center gap-2 p-2">
          <header className="flex flex-col justify-center items-center">
            <h2 className="text-3xl min-h-8 mt-2 mb-5 font-bold">{newsItem.title}</h2>
            <img src={newsItem.main_image} className="h-96 aspect-video" alt={newsItem.title}/>
            <div>
                <span className="font-thin">{newsItem.created_on}</span>
            </div>
            <div>
              {newsItem?.tags?.map((tag, index) => (
                <a href={ `/?tag_id=${tag.id}` } key={index} className="inline-block bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-sm mr-2 mb-2">
                  { tag.label }
                </a>
              ))}
            </div>
          </header>
          <div className="p-2 flex flex-row gap-2">
              { newsItem.images?.map(image => (
                <img
                  className="h-48 p-2 aspect-video object-fit object-contain bg-white"
                  src={image.image} alt={ `${newsItem.title} image - ${image.id}`}/>
              ))}
          </div>
          <div className="flex-1">
            <Card className="h-full">
              <CardContent className="h-full">
                {newsItem.text}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div>
          Could not fetch news item.
        </div>
      )}
    </>
  );
}

export default NewsItemPage;