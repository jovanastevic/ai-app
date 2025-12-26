import {RowDataPacket} from "mysql2";

export interface IUser {
    username: string;
    password: string;
    email: string;
    profileDescription: string;
}

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