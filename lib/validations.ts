import {z} from 'zod';

export const formSchema = z.object({
    name: z.string().min(3).max(255),
    image: z.string().url().refine(async (url) => {
        try {
            const res = await fetch(url, { method: "HEAD" });
            const contentType = res.headers.get("content-type");

            return contentType?.startsWith("image/");
        } catch {
            return false;
        }
        }),
    description: z.string().min(3).max(500),
    type: z.string().min(3).max(100),
    price: z.number().int().min(1).max(1000000),
    quantity: z.number().int().min(1).max(1000),
    rating: z.string().min(1).max(3),
})