import {z} from "zod/index";

export const ChatRoom = z.object({
    id: z.number(),
    name: z.string(),
    time_stamp: z.date().or(z.string()),
})

 export const NewChatRoom = z.object({
     name: z.string(),
 })

export const RoomID =  z.object({
    id: z.number(),
})

export type IChatRoom = z.infer<typeof ChatRoom>;
export type INewChatRoom = z.infer<typeof NewChatRoom>;
export type IRoomID = z.infer<typeof RoomID>;