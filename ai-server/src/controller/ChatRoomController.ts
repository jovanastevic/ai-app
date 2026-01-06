import {Express, Request, Response} from "express";
import {validateAuth} from "../auth";
import {NewChatRoom} from "../model/ChatRoom";
import {ChatRoomService} from "../service/ChatRoomService";

export class ChatRoomController {
    static init(app: Express): void {
        app.get('/chat/:id', validateAuth, ChatRoomController.getChatRoomByID);
        app.get('/chat/', validateAuth, ChatRoomController.getUserChatRooms);
        app.get('chat/:id/messages', validateAuth, ChatRoomController.getChatMessages)
        app.post('/chat', validateAuth,ChatRoomController.createChatRoom);
        app.delete('/chat/:id', validateAuth, ChatRoomController.deleteChatRoom);
    }

    static async getChatRoomByID(req: Request, res: Response){
      const room = await ChatRoomService.getChatRommByID(parseInt(req.params.id));
        if(!room){
            res.status(404).send();
            return;
        }else if(room === 'error'){
          res.status(500).json({message: 'Database error'});
          return;
      }
        res.status(200).send(room);
    }

    static async getUserChatRooms(req: Request, res: Response){
        const result = await ChatRoomService.getUserChatRooms(req.params._username);
        if(!result){
            res.status(404).send();
            return
        } else if(result === 'error'){
            res.status(500).json({message: 'Database error'});
            return;
        }
        return res.status(200).json(result);
    }

    static async getChatMessages(req: Request, res: Response){
        const result = await ChatRoomService.getMessagesByChatID(parseInt(req.params.id));
        if(!result){
            res.status(404).send();
            return;
        } else if(result === 'error'){
            res.status(500).json({message: 'Database error'});
            return;
        }
        res.status(200).json(result);
    }

    static async createChatRoom(req: Request, res: Response){
        const data = NewChatRoom.safeParse(req.body);
        if(!data.success){
            res.status(400).json({
                message: 'Wrong input data',
                errors: data.error
            });
            return;
        }

        const room = await ChatRoomService.createChatRoom(data.data);
        if(room === 'error'){
            res.status(500).json({message: 'Database error'});
            return;

        } else if (room === undefined) return res.status(400).json({message: 'Conflict in Database'});

        const addUsertoRoom = await ChatRoomService.addUserToRoom(room, req.params._username);
        if(addUsertoRoom === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }
        res.status(200).send();
    }

    static async deleteChatRoom(req: Request, res: Response){
        const result = await ChatRoomService.deleteChatRoom(parseInt(req.params.id));
        if(!result){
            res.status(404).send();
            return;
        }else if(result === 'error'){
            res.status(500).json({message: 'Database error'});
            return;
        }
        res.status(200).send();
    }
}