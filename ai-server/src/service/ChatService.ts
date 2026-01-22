import {INewChatMessage} from "../model/Chat";
import {DB} from "../db";
import {ResultSetHeader, RowDataPacket} from "mysql2";

export class ChatService{
    static async isUserInRoom(userid: string, chatid: number): Promise<'error' | boolean> {
        try {
            const [rows] = await DB.query<RowDataPacket[]>('select chat_id, user_id from chat_member where user_id = ? and chat_id = ?', [userid, chatid]);
            if(!rows || rows.length === 0) return false;
            return true;
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async newMessage(data:INewChatMessage): Promise<'error' | 'send'>{
        try {
            const [insert] = await DB.execute<ResultSetHeader[]>('insert into chat_messages(chat_id, user_id, message) values (?, ?, ?)', [data.chat_id, data.user_id, data.message]);
            return 'send'
        }catch (e) {
            console.error(e);
            return 'error';
        }
    }
}