import {z} from "zod";

export const ChatMessage = z.object({
    user_id: z.string(),
    message: z.string(),
    time_stamp: z.date().or(z.string()),
})

export const NewChatMessage = z.object({
    chat_id: z.number(),
    user_id: z.string(),
    message: z.string(),
})

export type IChatMessage = z.infer<typeof ChatMessage>;
export type INewChatMessage = z.infer<typeof NewChatMessage>;