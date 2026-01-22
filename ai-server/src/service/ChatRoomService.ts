import {ChatRoom, IChatRoom, INewChatRoom, IRoomID, RoomID} from "../model/ChatRoom";
import { ChatMessage, IChatMessage } from "../model/Chat";
import {z} from "zod";
import {DB} from "../db";
import {ResultSetHeader, RowDataPacket} from "mysql2";

export class ChatRoomService{
    static async getChatRommByID(id: number): Promise<'error' | IChatRoom| undefined> {
        try {
            const [rows] = await DB.query<RowDataPacket[]>('select id, name, time_stamp from chat_room where id = ?', [id]);
            if (!rows || rows.length === 0) {
                return undefined;
            }
            return ChatRoom.safeParse(rows[0]).data;
        }catch (e) {
            console.error(e);
            return 'error';
        }
    }
    static async getUserChatRooms(userId: string): Promise<IChatRoom[] | 'error'| undefined> {
        try {
            const [rows] = await DB.query<RowDataPacket[]>(
                `SELECT r.* FROM chat_room r JOIN chat_member m ON r.id = m.chat_id WHERE m.user_id = ?`, [userId]);
            if (!rows || rows.length === 0) {
                return undefined;
            }
            return z.array(ChatRoom).parse(rows);
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async getMessagesByChatID(chat_id: number): Promise<'error' | IChatMessage[] | undefined> {
        try {
            const [rows] = await DB.query<RowDataPacket[]>('select user_id, message, time_stamp from chat_messages where chat_id = ? order by time_stamp asc', [chat_id]);
            if (!rows || rows.length === 0) {
                return undefined;
            }
            return z.array(ChatMessage).safeParse(rows).data;
        }catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async createChatRoom(name: INewChatRoom): Promise<undefined | 'error'| IRoomID > {
        try {
            const [result] = await DB.execute<ResultSetHeader>('insert into chat_room (name) values(?)', [name.name]);
            if(result.affectedRows > 1) return 'error';
            const [rows] = await DB.query<RowDataPacket[]>('select id from chat_room where name=?', [name.name])
            if (!rows || rows.length === 0) {
                return undefined;
            }
            return RoomID.safeParse(rows[0]).data;
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async addUserToRoom(chatId: IRoomID, userId: string): Promise<'added' | 'error'> {
        try {
            await DB.execute('INSERT INTO chat_member (chat_id, user_id) VALUES (?, ?)', [chatId.id, userId]);
            return 'added';
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }


    static async deleteChatRoom(id: number): Promise<'error' | 'deleted'| undefined> {
        try {
            const [deleted] = await DB.execute<ResultSetHeader>('delete from chat_room where id = ?', [id]);
            if (deleted.affectedRows < 1) return undefined;
            return 'deleted';
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }
}