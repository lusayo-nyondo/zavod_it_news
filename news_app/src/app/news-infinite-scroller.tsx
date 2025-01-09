import {
    useState,
    useEffect,
    useRef,
    RefObject
} from 'react';

import {
    NewsItem
} from '@/types';

import NewsItemTile from '@/app/news-item-tile';

import {
    getNewsItemsPage
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

        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('resize', checkVisibility);

        checkVisibility(); // Initial check
    }, [ref]);

    return isBottomVisible;
}

const NewsInfiniteScroller = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const nextPage = useRef<number>(1);

    const ref = useRef<HTMLDivElement>(null);
    const isBottomVisible = useIsBottomVisible({ ref });

    const fetchingRef = useRef<boolean>(false);

    useEffect(() => {
        console.log("Using effect");
        if (!fetchingRef.current) {
            fetchingRef.current = true; // Set fetching flag

            getNewsItemsPage(nextPage.current).then(data => {
                setNewsItems(n => [
                    ...n,
                    ...data[0]
                ]);
                console.log("Nextpage:", data[1]);
                nextPage.current = data[1];
            }).finally(() => {
                fetchingRef.current = false; // Reset fetching flag on error
            });
        }

        console.log("From effect");
        console.log(nextPage);
    }, [isBottomVisible]);

    return (
        <div ref={ ref } className="grid grid-cols-12 gap-2 p-2 w-full mx-auto">
            { newsItems.map((newsItem, index) => (
                <div key={ index } className="col-span-4">
                    <NewsItemTile key={ index } newsItem={ newsItem } />
                </div>
            ))}
        </div>
    )
};

export default NewsInfiniteScroller;