import {Express, Request, Response} from "express";
import {IUpdateUser, IUser, IUserPasswordChange, User} from "../model/user";
import {UserService} from "../service/userService";
import {validateAuth} from "../auth";

export class UserController {
    static init(app: Express) {
        app.post('/user/', UserController.createUser);
        app.put('/user/:username', validateAuth, UserController.updateUser);
        app.get('/user/:username', UserController.getByUsername);
        app.delete('/user/:username', validateAuth, UserController.deleteUser);
        app.put('/user/:username/password', validateAuth, UserController.updatePassword);
    }

    static async createUser(req: Request, res: Response) {
        const data = User.safeParse(req.body);

        if (!data.success) {
            res.status(400).json({
                message: 'Wrong input data',
                errors: data.error
            });
            return;
        }

        const result = await UserService.create(data.data);

        if (result === 'conflict') {
            res.status(409).send();
            return;
        } else if (result === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }

        res.status(201).send();
    }

    static async getByUsername(req: Request, res: Response) {
        const user = await UserService.getByUsername(req.params.username);

        if (!user) {
            res.status(404).send();
            return;
        }
        res.status(200).json(user);
    }

    static async updateUser(req: Request, res: Response) {
        const data = req.body as IUpdateUser;

        if (!data || !data.email || !data.profileDescription) {
            res.status(400).json({message: 'Missing fields'});
            return;
        }

        if(req.params.username !== req.params._username){
            res.status(403).send();
            return;
        }

        const result = await UserService.updateUser(req.params.username, data);

        if (result === 'notFound') {
            res.status(404).send();
            return;
        } else if (result === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }

        res.status(200).send();
    }

    static async updatePassword(req: Request, res: Response) {
        const data = req.body as IUserPasswordChange;

        if (!data || !data.oldPassword || !data.newPassword) {
            res.status(400).json({message: 'Missing fields'});
            return;
        }

        if(req.params.username !== req.params._username){
            res.status(403).send();
            return;
        }

        const result = await UserService.updatePassword(req.params.username, data);

        if (result === 'notFound') {
            res.status(404).send();
            return;
        } else if (result === 'mismatch') {
            res.status(400).json({message: 'Old password does not match'});
            return;
        } else if (result === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }

        res.status(200).send();
    }

    static async deleteUser(req: Request, res: Response) {
        if(req.params.username !== req.params._username){
            res.status(403).send();
            return;
        }

        const result = await UserService.deleteUser(req.params.username);

        if (result === 'notFound') {
            res.status(404).send();
            return;
        } else if (result === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }

        res.status(200).send();
    }
}