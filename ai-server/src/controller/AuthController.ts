import {Express, Request, Response} from 'express';
import {UserLogin} from '../model/User';
import {UserService} from '../service/UserService';
import {generateToken} from '../auth';

export class AuthController {
    static init (app: Express): void {
        app.post('/login', AuthController.login);
    }
    static async login (req: Request, res:Response): Promise<void> {
        const data = UserLogin.safeParse(req.body);

        if(!data.success) {
            res.status(400).json({message: 'Missing fields'});
            return;
        }

        const result = await UserService.validatePassword(data.data);

        if(!result){
            res.status(401).send();
            return
        }
        const payload = {username: data.data.username};
        res.json({token: generateToken(payload)});
    }
}