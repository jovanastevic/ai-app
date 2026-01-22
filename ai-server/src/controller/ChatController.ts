import { WebSocketServer, WebSocket } from 'ws';
import { ChatService } from '../service/ChatService';
import {IWSChatMessage, IWSEvents} from "../model/Chat";

const chatRooms = new Map<WebSocket, number>();

export class ChatController {
    private static broadcastToChat(wss: WebSocketServer, data:IWSChatMessage){
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN && chatRooms.get(client) === data.chat_id){
                client.send(JSON.stringify({
                    event: 'message', data: {user_id: data.user_id, message:data.message, time_stamp: data.time_stamp}}));
            }
        });
    }
    private static broadcastTypingToChat(wss: WebSocketServer,chat_id:number, user_id: string, typing: 'startTyping' | 'stopTyping'){
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN && chatRooms.get(client) === chat_id){
                client.send(JSON.stringify({event: typing, data: {user_id: user_id}}));
            }
        });
    }

    static async init(wss: WebSocketServer) {
       wss.on('connection', (ws) => {
           ws.on('error', console.error);

           ws.on('message', async message=>{
            const data = JSON.parse(message + '') as IWSEvents;

            switch(data.event){
                case 'join':
                    const result = await  ChatService.isUserInRoom(data.user_id, data.chat_id);
                    if(!result || result === 'error'){
                        ws.send(JSON.stringify({event: 'error', data: {message: "You are not allowed"}}));
                        return;
                    }
                    chatRooms.set(ws, data.chat_id);
                    break;
                case 'startTyping':
                case 'stopTyping':
                    if (chatRooms.get(ws) === data.chat_id) {
                        ChatController.broadcastTypingToChat(wss, data.chat_id, data.user_id, data.event);
                    }
                    break;
                case 'message':
                    if (chatRooms.get(ws) !== data.chat_id) return;
                    if(data.message) {
                        const result = await ChatService.newMessage({chat_id: data.chat_id, user_id: data.user_id, message: data.message,});
                        if(result== 'send'){
                        ChatController.broadcastToChat(wss, {chat_id: data.chat_id, user_id: data.user_id,message: data.message,time_stamp: new Date()});
                        }
                    }
                    break;
            }
           });
           ws.on('close', () =>chatRooms.delete(ws));
        });
    }
}