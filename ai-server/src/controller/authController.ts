import {Express, Request, Response} from 'express';
import {IUserLogin} from '../model/user';
import {UserService} from '../service/userService';
import {generateToken} from '../auth';

export class AuthController {
    static init (app: Express): void {
        app.post('/login', AuthController.login);
    }
    static async login (req: Request, res:Response): Promise<void> {
        const data = req.body as IUserLogin;

        if(!data || !data.username || !data.password) {
            res.status(400).json({message: 'Missing fields'});
            return;
        }

        const result = await UserService.validatePassword(data);

        if(!result){
            res.status(401).send();
            return
        }
        const payload = {username: data.username};
        res.json({token: generateToken(payload)});
    }
}