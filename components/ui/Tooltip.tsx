"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils"; // Ensure you have a utility function for class merging

export function Tooltip({ content, children }: { content: string; children: React.ReactNode }) {
    return (
        <TooltipPrimitive.Provider delayDuration={200}>
            <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content
                        side="top"
                        align="center"
                        className={cn(
                            "bg-gray-800 text-white text-sm px-2 py-1 rounded-md shadow-lg animate-fade-in"
                        )}
                    >
                        {content}
                        <TooltipPrimitive.Arrow className="fill-gray-800" />
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}
