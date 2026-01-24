import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction } from 'express';
import {DB} from "./db";
import {RowDataPacket} from "mysql2";

interface ITokenPayload {
    username : string;
}

export function generateToken(payload: ITokenPayload):string {
    return jwt.sign(payload, process.env.JWT_SECRET!);
}

export function validateAuth(req: Request, res: Response, next: NextFunction) {
    try{
        const token = req.cookies.auth_token;

        if (!token) {
            res.status(401).json({ message: "Kein Cookie gefunden" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as ITokenPayload;

        req.params._username = decoded.username;
        next();
    } catch {
        res.status(401).send();
    }
}

export async function  isAdmin(req: Request, res: Response, next: NextFunction) {
    try{
        const [result] = await DB.query<RowDataPacket[]>('select admin from user where username = ?', [req.params._username]);
        if(result[0].admin !== 1) return res.status(403).send();
        next();
    } catch(e){
        res.status(500).json({message: 'Database error'});
        return;
    }
}