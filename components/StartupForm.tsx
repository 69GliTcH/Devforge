"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Info, Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";
import { Tooltip } from "@/components/ui/Tooltip";
const customCommands = [
    commands.title1, // H1
    commands.title2, // H2
    commands.title3, // H3
    commands.bold, // Bold
    commands.italic, // Italic
    commands.quote, // Blockquote
    commands.unorderedListCommand, // Bulleted List
    commands.orderedListCommand, // Numbered List
    commands.link, // Link
    commands.code, // Inline Code
    commands.codeBlock, // Code Block
];

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const { toast } = useToast();
    const router = useRouter();
    const [category, setCategory] = useState("");

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            };

            await formSchema.parseAsync(formValues);

            const result = await createPitch(prevState, formData, pitch);

            if (result.status == "SUCCESS") {
                toast({
                    title: "Success",
                    description: "Your startup pitch has been created successfully",
                });

                router.push(`/startup/${result._id}`);
            }

            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErorrs = error.flatten().fieldErrors;

                setErrors(fieldErorrs as unknown as Record<string, string>);

                toast({
                    title: "Error",
                    description: "Please check your inputs and try again",
                    variant: "destructive",
                });

                return { ...prevState, error: "Validation failed", status: "ERROR" };
            }

            toast({
                title: "Error",
                description: "An unexpected error has occurred",
                variant: "destructive",
            });

            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR",
            };
        }
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
    });

    return (
        <form action={formAction} className="startup-form">
            {/* Title */}
            <div>
                <label htmlFor="title" className="startup-form_label flex items-center gap-2">
                    Title
                    <Tooltip content="Enter between 3 to 100 characters">
                        <Info className="size-4 text-gray-500 cursor-pointer" />
                    </Tooltip>
                </label>
                <Input
                    id="title"
                    name="title"
                    className="startup-form_input"
                    required
                    minLength={3}
                    maxLength={100}
                    placeholder="Project Title"
                />
                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="startup-form_label flex items-center gap-2">
                    Description
                    <Tooltip content="Enter between 20 to 500 characters">
                        <Info className="size-4 text-gray-500 cursor-pointer" />
                    </Tooltip>
                </label>
                <Textarea
                    id="description"
                    name="description"
                    className="startup-form_textarea"
                    required
                    minLength={20}
                    maxLength={500}
                    placeholder="Project Description"
                />
                {errors.description && <p className="startup-form_error">{errors.description}</p>}
            </div>

            {/* Category (Auto Uppercase) */}
            <div>
                <label htmlFor="category" className="startup-form_label flex items-center gap-2">
                    Category
                    <Tooltip content="Enter between 3 to 20 characters">
                        <Info className="size-4 text-gray-500 cursor-pointer" />
                    </Tooltip>
                </label>
                <Input
                    id="category"
                    name="category"
                    className="startup-form_input"
                    required
                    minLength={3}
                    maxLength={20}
                    placeholder="Project Category (Web, AIML...)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value.toUpperCase())}
                />
                {errors.category && <p className="startup-form_error">{errors.category}</p>}
            </div>

            {/* Image URL */}
            <div>
                <label htmlFor="link" className="startup-form_label flex items-center gap-2">
                    Image URL
                    <Tooltip content="GitHub or Google Drive Image Link">
                        <Info className="size-4 text-gray-500 cursor-pointer" />
                    </Tooltip>
                </label>
                <Input
                    id="link"
                    name="link"
                    className="startup-form_input"
                    required
                    type="url"
                    placeholder="Project Image URL"
                />
                {errors.link && <p className="startup-form_error">{errors.link}</p>}
            </div>

            {/* Pitch (Minimum 10 Characters) */}
            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label flex items-center gap-2">
                    Pitch
                    <Tooltip content="Minimum 10 characters (No max limit)">
                        <Info className="size-4 text-gray-500 cursor-pointer" />
                    </Tooltip>
                </label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value || "")}
                    commands={customCommands}
                    preview="edit"
                    height={300}
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{
                        placeholder: "Briefly describe your project and what problem it solves. You can include code snippets, images, and URLs to illustrate your work.",
                        minLength: 10,
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                />
                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                className="startup-form_btn text-white group flex items-center"
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Post Your Project"}
                <Send className="size-6 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
        </form>
    );
};

export default StartupForm;