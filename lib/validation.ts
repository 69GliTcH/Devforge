import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    link: z.string().url().superRefine(async (url, ctx) => {
        // If it's a GitHub raw image link, consider it valid
        if (url.includes("github.com") && url.includes("?raw=true")) {
            return;
        } else if (url.includes("github.com") && !url.includes("?raw=true")) {
            url += "?raw=true";
            return;
        }

        // If it's a Google Drive link, try converting it to a direct image URL
        const googleDriveRegex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view\?usp=sharing/;
        const match = url.match(googleDriveRegex);

        if (match && match[1]) {
            const googleDriveImageUrl = `https://drive.google.com/uc?id=${match[1]}`;
            try {
                const res = await fetch(googleDriveImageUrl, { method: "HEAD" });
                const contentType = res.headers.get("content-type");

                if (!contentType?.startsWith("image/")) {
                    ctx.addIssue({
                        code: "custom",
                        message: "The provided Google Drive URL must point to an image.",
                    });
                }
            } catch {
                ctx.addIssue({
                    code: "custom",
                    message: "Failed to fetch the Google Drive URL. Please check if it's accessible.",
                });
            }
            return;
        }

        // If it's not a Google Drive or GitHub image, check if it's a valid image URL
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
