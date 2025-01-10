import * as z from 'zod';

export const schema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title cannot exceed 255 characters"),
    main_image: z.custom<FileList>((fileList) => {
        return fileList instanceof FileList;
    }),
    text: z.string().min(1, "Text is required"),
    tags: z.array(z.number()).optional(),
    images: z.custom<FileList>().optional(),
});

