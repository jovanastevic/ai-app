import {RowDataPacket} from "mysql2";
import {z} from "zod";

export const User = z.object({
    username: z.string(),
    password: z.string(),
    email: z.email(),
    profileDescription: z.string(),
});
export type IUser = z.infer<typeof User>;

export interface IUserData extends RowDataPacket {
    username: string;
    email: string;
    profileDescription: string;
}

export interface IUpdateUser {
    email: string;
    profileDescription: string;
}

export interface IUserPasswordChange {
    oldPassword: string;
    newPassword: string;
}

export interface IUserPassword extends RowDataPacket {
    password: string;
}

export interface IUserLogin {
    username: string;
    password: string;
}