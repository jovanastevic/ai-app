import {Express, Request, Response} from "express";
import {UpdateUser,User, UserPasswordChange} from "../model/User";
import {UserService} from "../service/UserService";
import {validateAuth} from "../auth";

export class UserController {
    static init(app: Express) {
        app.post('/user/', UserController.createUser);
        app.put('/user/:username', validateAuth, UserController.updateUser);
        app.get('/user/:username', UserController.getByUsername);
        app.get('/user/', UserController.getAllUsers);
        app.delete('/user/:username', validateAuth, UserController.deleteUser);
        app.put('/user/:username/password', validateAuth, UserController.updatePassword);
    }

    static async getAllUsers(req: Request, res: Response) {
        const users = await UserService.getAllUsers();
        if(!users) {
            res.status(404).send();
            return;
        }else if (users === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }

        res.status(200).json(users);
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
        } else if (user === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }
        res.status(200).json(user);
    }

    static async updateUser(req: Request, res: Response) {
        const data = UpdateUser.safeParse(req.body);

        if (!data.success) {
            res.status(400).json({
                message: 'Wrong input data',
                errors: data.error
            });
            return;
        }

        if (req.params.username !== req.params._username) {
            res.status(403).send();
            return;
        }

        const result = await UserService.updateUser(req.params.username, data.data);

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
        const data = UserPasswordChange.safeParse(req.body);

        if (!data.success) {
            res.status(400).json({
                message: 'Wrong input data',
                errors: data.error
            });
            return;
        }

        if (req.params.username !== req.params._username) {
            res.status(403).send();
            return;
        }

        const result = await UserService.updatePassword(req.params.username, data.data);

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
        if (req.params.username !== req.params._username) {
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