import NewsItemsInfiniteScroller from '@/app/news-infinite-scroller';


export default function Index() {
    return (
        <div>
            <header>
                <h3 className="h-3">News Items</h3>
            </header>
            <NewsItemsInfiniteScroller />
        </div>
    );
}