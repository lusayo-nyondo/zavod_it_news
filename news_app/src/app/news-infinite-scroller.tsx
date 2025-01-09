import {
  useState,
  useEffect,
  useRef,
  RefObject
} from 'react';

import {
  NewsItem,
  NewsItemTag,
} from '@/types';

import NewsItemTile from '@/app/news-item-tile';

import {
  getNewsItemsPage,
  getTag
} from '@/app/actions';


const useIsBottomVisible = ({ ref }: { ref: RefObject<HTMLDivElement> }) => {
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setIsBottomVisible(rect.bottom <= window.innerHeight && rect.bottom >= 0);
      }
    }

    const observer = new MutationObserver(() => { console.log("From observer: "); checkVisibility(); });
    
    if (ref.current) {
      observer.observe(ref.current, {
        childList: true,
      });
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      observer.disconnect();
    }
  }, [ref]);

  return isBottomVisible;
}

const NewsInfiniteScroller = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [tag, setTag] = useState<NewsItemTag>();

  const nextPage = useRef<number>(1);
  const currentPage = useRef<number>(1);

  const ref = useRef<HTMLDivElement>(null);
  const isBottomVisible = useIsBottomVisible({ ref });

  const fetchingRef = useRef<boolean>(false);

  useEffect(() => {
    const tag = new URLSearchParams(window.location.search).get('tag_id');

    if(tag) {
      getTag(parseInt(tag)).then(data => {
        setTag(data);
      });
    };
  }, []);

  useEffect(() => {
    console.log("Using effect");
    if (!fetchingRef.current) {
      fetchingRef.current = true; // Set fetching flag

      const tag = new URLSearchParams(window.location.search).get('tag_id');
 
      getNewsItemsPage(nextPage.current, tag).then(data => {
        setNewsItems(n => [
          ...n,
          ...data[0]
        ]);
        console.log("Nextpage:", data[1]);
        currentPage.current = nextPage.current;
        nextPage.current = data[1];
      }).finally(() => {
        fetchingRef.current = false; // Reset fetching flag on error
      });
    }
  }, [isBottomVisible]);

  return (
    <div ref={ ref } className="grid grid-cols-12 gap-2 p-2 w-full mx-auto">
      { tag && (
        <>
          <div className="col-span-12 p-1 flex flex-row justify-center items-center gap-2">
            <span className="inline-block bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-sm">
              {tag.label}
            </span>
          </div>
          <div className="col-span-12 p-1 flex flex-row justify-center items-center gap-2">
            <a href="/" className="text-gray-400 underline">Clear Filter</a>
          </div>
        </>
      )}
      { newsItems.map((newsItem, index) => (
        <div key={ index } className="col-span-4">
          <NewsItemTile key={ index } newsItem={ newsItem } />
        </div>
      ))}
    </div>
  )
};

export default NewsInfiniteScroller;