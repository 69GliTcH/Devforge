import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    link: z.string().url().superRefine(async (url, ctx) => {
        // If it's a GitHub raw image link, consider it valid
        if (url.includes("github.com") && url.includes("?raw=true")) {
            return;
        }

        try {
            const res = await fetch(url, { method: "HEAD" });
            const contentType = res.headers.get("content-type");

            if (!contentType?.startsWith("image/")) {
                ctx.addIssue({
                    code: "custom",
                    message: "The provided URL must point to an image.",
                });
            }
        } catch {
            ctx.addIssue({
                code: "custom",
                message: "Failed to fetch the URL. Please check if it's accessible.",
            });
        }
    }),
    pitch: z.string().min(10),
});
