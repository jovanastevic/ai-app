import {z} from 'zod';

export const Prompt = z.object({
    id: z.number(),
    category_id: z.number(),
    userowner: z.string().nullable(),
    title: z.string(),
    description: z.string(),
    time_stamp: z.date().or(z.string()),
})

export const NewPrompt = z.object({
    category_id: z.number(),
    userowner: z.string().nullable(),
    title: z.string(),
    description: z.string(),
})

export const EditPrompt = z.object({
    title: z.string(),
    description: z.string(),
})

export type IPrompt = z.infer<typeof Prompt>;
export type INewPrompt = z.infer<typeof NewPrompt>;
export type IEditPrompt = z.infer<typeof EditPrompt>;