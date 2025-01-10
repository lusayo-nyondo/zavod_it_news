import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

import { getNewsItem } from '@/app/actions';
import { schema } from '@/admin/news_item/_schema';
import { NewsItemFormData } from "@/admin/news_item/_types";
import { updateNewsItem } from '@/admin/news_item/_actions';
import { MultiSelect } from "@/components/ui/multi-select";
import { Newspaper, LucideProps } from "lucide-react";
import { getTagList } from '@/app/actions';
import { NewsItemTag, NewsItem } from '@/types';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateNewsItemForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [newsItem, setNewsItem] = useState<NewsItem>();
    
    const [tags, setTags] = useState<NewsItemTag[]>([]);
    const [tagSelectOptions, setTagSelectOptions] = useState<{
        value: string;
        label: string;
        icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    }[]>([]);

    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<NewsItemFormData>({
        resolver: zodResolver(schema),
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    const [selectedTags, setSelectedTags] = useState<string[]>();

    useEffect(() => {
        getNewsItem(parseInt(id ?? '-1')).then(data => {
            setNewsItem(data);
        })
    }, [id]);

    useEffect(() => {
        const currentSelectedTags = newsItem?.tags?.map(tag => tag.id.toString());
        setSelectedTags(currentSelectedTags);
    }, [newsItem]);

    useEffect(() => {
        setValue('title', newsItem?.title ?? '');
        setValue('text', newsItem?.text ?? '');
        
        if (newsItem?.main_image) {
            setImagePreview(newsItem.main_image);
        }
    }, [newsItem, setValue]);

    useEffect(() => {
        getTagList().then(newTags => {
            setTags(newTags);
        });
    }, []);

    useEffect(() => {
        const newTagSelectOptions = tags.map(tag => ({
            value: tag.id.toString(),
            label: tag.label,
            icon: Newspaper,
        }));
        setTagSelectOptions(newTagSelectOptions);
    }, [tags]);

    const onSubmit = async (data: NewsItemFormData) => {
        const newsItemData: NewsItemFormData = {
            ...data,
            tags: selectedTags?.map(tag => parseInt(tag)),
        };

        const updatedNewsItem = await updateNewsItem(parseInt(id ?? '-1'), newsItemData);

        if (updatedNewsItem) {
            console.log("News item updated successfully!", updatedNewsItem);
            navigate(`/admin/news_items/${id}`); // Redirect to the view page or wherever appropriate
        } else {
            console.error("Failed to update news item.");
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <Input 
                    id="title" 
                    {...register('title')} 
                    className={`mt-1 block border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`} 
                />
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
            </div>
            <div>
                <label htmlFor="main_image" className="block text-sm font-medium text-gray-700">Main Image</label>
                <Input 
                    type="file"
                    accept="image/*" 
                    id="main_image"
                    {...register('main_image')} 
                    onChange={handleImageChange}
                    className={`mt-1 block border ${errors.main_image ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`} 
                />
                {errors.main_image && <span className="text-red-500">{errors.main_image.message}</span>}
                {imagePreview && (
                    <img src={imagePreview} alt="Image Preview" className="mt-2 max-w-xs border rounded-md" />
                )}
            </div>
            <div>
                <label htmlFor="extra_images" className="block text-sm font-medium text-gray-700">Extra Images</label>
                <Input 
                    type="file"
                    accept="image/*" 
                    id="images"
                    multiple
                    {...register('images')} 
                    className={`mt-1 block border ${errors.images ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`} 
                />
                {errors.images && <span className="text-red-500">{errors.images.message}</span>}
            </div>
            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                {newsItem && tagSelectOptions && (
                    <MultiSelect
                        id="tags"
                        options={tagSelectOptions}
                        onValueChange={setSelectedTags}
                        defaultValue={newsItem.tags?.map(tag => tag.id.toString())}
                        placeholder="Select Tags"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                    />
                )}
            </div>
            <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700">Text</label>
                <Textarea 
                    id="text" 
                    {...register('text')} 
                    className={`mt-1 block border ${errors.text ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`} 
                />
                {errors.text && <span className="text-red-500">{errors.text.message}</span>}
            </div>
            <Button type="submit">
                <Save />
                Update
            </Button>
        </form>
    );
};

export default UpdateNewsItemForm;
