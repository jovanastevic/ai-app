import {IUpdateUser, IUser, IUserData, IUserPasswordChange, IUserLogin, UserData} from "../model/User";
import {compare, hash} from "bcrypt";
import {DB} from "../db";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import {z} from "zod";

export class UserService {
    static async getAllUsers():Promise<IUserData[] | 'error' | undefined> {
        try{
            const [rows] = await DB.query<RowDataPacket[]>('select username, email, profileDescription from user');
            if (!rows || rows.length === 0) {
                return undefined;
            }
            return z.array(UserData).safeParse(rows).data;
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }
    static async create(user: IUser): Promise<'conflict' | 'created' | 'error'> {
        const existingUser = await UserService.getByUsername(user.username);

        if (existingUser) return 'conflict';

        user.password = await hash(user.password, 10);

        try {
            const [inserted] = await DB.execute<ResultSetHeader>('insert into user(username, password, email, profileDescription) values(?, ?, ?, ?)', [user.username, user.password, user.email, user.profileDescription]);

            if (inserted.affectedRows < 1) return 'error';
            return 'created';
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async getByUsername(username: string): Promise<IUserData | undefined | 'error'> {
        try {
            const [rows] = await DB.query<RowDataPacket[]>('select username, email, profileDescription from user where username = ?', [username]);

            if (!rows || rows.length === 0) {
                return undefined;
            }

            return UserData.safeParse(rows[0]).data;
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async updateUser(username: string, data: IUpdateUser): Promise<'notFound' | 'updated' | 'error'> {
        const existingUser = await UserService.getByUsername(username);

        if (!existingUser) return 'notFound';

        try {
            const [updated] = await DB.execute<ResultSetHeader>('update user set email = ?, profileDescription = ? where username = ?', [data.email, data.profileDescription, username]);

            if (updated.affectedRows < 1) return 'error';
            return 'updated';
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async updatePassword(username: string, data: IUserPasswordChange): Promise<'notFound' | 'mismatch' | 'updated' | 'error'> {
        const [rows] = await DB.query<RowDataPacket[]>('select password from user where username = ?', [username]);

        if (rows && rows.length === 0) {
            return 'notFound';
        }

        const oldPasswordHash = rows[0].password;
        const oldPasswordsMatch = await compare(data.oldPassword, oldPasswordHash);

        if (!oldPasswordsMatch) return 'mismatch';

        data.newPassword = await hash(data.newPassword, 10);

        try {
            const [updated] = await DB.execute<ResultSetHeader>('update user set password = ? where username = ?', [data.newPassword, username]);

            if (updated.affectedRows < 1) return 'error';
            return 'updated';
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async deleteUser(username: string): Promise<'notFound' | 'deleted' | 'error'> {
        const existingUser = await UserService.getByUsername(username);

        if (!existingUser) return 'notFound';

        try {
            const [deleted] = await DB.execute<ResultSetHeader>('delete from user where username = ?', [username]);

            if (deleted.affectedRows < 1) return 'error';
            return 'deleted';
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async validatePassword(data: IUserLogin): Promise<boolean> {
        const [rows] = await DB.query<RowDataPacket[]>('select password from user where username = ?', [data.username]);

        if (rows && rows.length === 0) {
            return false;
        }

        const oldPasswordHash = rows[0].password;
        return await compare(data.password, oldPasswordHash);
    }
}