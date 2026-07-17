import type {Prompt} from "@/lib/api.ts";

import {PromptCard} from "@/components/PromptCard.tsx";

export function PromptList (prompts: Prompt[]) {
    return (
        <div className="w-full">
            {
                prompts.map((prompt) => {
                    return <PromptCard key={prompt} prompt={prompt}/>
                })
            }

        </div>
)
}