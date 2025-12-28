import {z} from "zod";

export const User = z.object({
    username: z.string(),
    password: z.string(),
    email: z.email(),
    profileDescription: z.string(),
});

export const UserData = z.object({
    username: z.string(),
    email: z.email(),
    profileDescription: z.string(),
});
export const UpdateUser = z.object({
    email: z.email(),
    profileDescription: z.string(),
});

export const UserPasswordChange = z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
});

export const UserLogin = z.object( {
    username: z.string(),
    password: z.string(),
});

export type IUser = z.infer<typeof User>;
export type IUserData = z.infer<typeof UserData>;
export type IUpdateUser = z.infer<typeof UpdateUser>;
export type IUserPasswordChange = z.infer<typeof UserPasswordChange>;
export type IUserLogin = z.infer<typeof UserLogin>;