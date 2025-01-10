import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MultiSelect } from "@/components/ui/multi-select";
import {
    getNewsItem,
    getTagList
} from '@/app/actions'; // Adjust import based on your project structure
import {
    NewsItem,
    NewsItemTag
} from '@/types'; // Adjust import based on your project structure
import {
    LucideProps,
    Newspaper,
    Pencil
} from 'lucide-react';

import DeleteDialog from './delete-dialog';

const ViewNewsItem: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [newsItem, setNewsItem] = useState<NewsItem | null>(null);

    const [ tags, setTags ] = useState<NewsItemTag[]>();
    const [tagSelectOptions, setTagSelectOptions] = useState<{
        value: string;
        label: string;
        icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    }[]>();

    useEffect(() => {
        getTagList().then(newTags => {
            setTags(newTags);
        })
    }, []);

    useEffect(() => {
        const newTagSelectOptions = tags?.map(tag => {
            return {
                value: tag.id.toString(),
                label: tag.label,
                icon: Newspaper
            }
        });

        setTagSelectOptions(newTagSelectOptions);
    }, [tags]);

    useEffect(() => {
        const fetchNewsItem = async () => {
            const item = await getNewsItem(parseInt(id ?? '-1'));
            if (item) {
                setNewsItem(item);
            }
        };

        fetchNewsItem();
    }, [id]);

    if (!newsItem) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <Input 
                    id="title" 
                    value={newsItem.title} 
                    readOnly 
                    className="mt-1 block border border-gray-300 rounded-md shadow-sm bg-gray-100" 
                />
            </div>
            <div>
                <label htmlFor="main_image" className="block text-sm font-medium text-gray-700">Main Image</label>
                <Input 
                    type="text"
                    value={newsItem.main_image || 'No image uploaded'}
                    readOnly
                    className="mt-1 block border border-gray-300 rounded-md shadow-sm bg-gray-100"
                />
                {newsItem.main_image && (
                    <img src={newsItem.main_image} alt="Main Image Preview" className="mt-2 max-w-xs border rounded-md" />
                )}
            </div>
            <div>
                <label htmlFor="extra_images" className="block text-sm font-medium text-gray-700">Extra Images</label>
                <Input 
                    type="text"
                    value={newsItem.images ? `${newsItem.images.length} images uploaded` : 'No extra images uploaded'}
                    readOnly
                    className="mt-1 block border border-gray-300 rounded-md shadow-sm bg-gray-100"
                />
            </div>
            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                {newsItem && tagSelectOptions && (
                    <MultiSelect
                        id="tags"
                        options={tagSelectOptions}
                        onValueChange={ () => console.log()}
                        defaultValue={newsItem.tags?.map(tag => tag.id.toString())}
                        placeholder="Selected Tags"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                        disabled
                    />
                )}
            </div>
            <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700">Text</label>
                <Textarea 
                    id="text" 
                    value={newsItem.text} 
                    readOnly 
                    className="mt-1 block border border-gray-300 rounded-md shadow-sm bg-gray-100" 
                />
            </div>
            <div className="flex flex-row justify-between">
                <Button asChild>
                    <a href={ `/admin/news_items/${newsItem.id}/update` }>
                        <Pencil />
                        Edit
                    </a>
                </Button>
                <DeleteDialog newsItem={ newsItem }/>
            </div>
        </div>
    );
};

export default ViewNewsItem;
