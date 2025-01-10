import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

import {
    schema
} from '@/admin/news_item/_schema';

import {
    NewsItemFormData
} from "@/admin/news_item/_types";

import {
    createNewsItem
} from '@/admin/news_item/_actions';

import { MultiSelect } from "@/components/ui/multi-select";
import { Newspaper, LucideProps } from "lucide-react";

import {
    getTagList
} from '@/app/actions';

import {
    NewsItemTag
} from '@/types';

const CreateNewsItemForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<NewsItemFormData>({
        resolver: zodResolver(schema),
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [ tags, setTags ] = useState<NewsItemTag[]>();

    const [ tagSelectOptions, setTagSelectOptions ] = useState<{
        value: string;
        label: string;
        icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    }[]>();
    const [selectedTags, setSelectedTags] = useState<string[]>();

    const onSubmit = async (data: NewsItemFormData) => {
        const newsItemData: NewsItemFormData = {
            ...data,
            tags: selectedTags?.map(tag => parseInt(tag))
        };

        const newsItem = await createNewsItem(newsItemData);

        if (newsItem) {
            console.log("News item created successfully!", newsItem);
        } else {
            console.error("Failed to create news item.");
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
                    className={`mt-1 block border ${errors.main_image ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`} 
                />
                {errors.images && <span className="text-red-500">{errors.images.message}</span>}
            </div>
            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                {tagSelectOptions && (
                    <MultiSelect
                        id="tags"
                        options={tagSelectOptions}
                        onValueChange={setSelectedTags}
                        defaultValue={selectedTags}
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
                <Plus />
                Create
            </Button>
        </form>
    );
};

export default CreateNewsItemForm;
