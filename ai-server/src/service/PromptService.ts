import {DB} from "../db";
import {z} from "zod";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import {IEditPrompt, INewPrompt, IPrompt, Prompt} from "../model/Prompt";

export class PromptService {
    static async getAllPrompts(): Promise< 'error' | IPrompt[]> {
        try {
            const [prompts] = await DB.query<RowDataPacket[]>('select p.id, c.name, p.userowner, p.title, p.description, p.time_stamp from prompts p join category c on c.id = p.category_id');
            const parsed = z.array(Prompt).safeParse(prompts);
            if (!parsed.success) {
                console.error("Zod Validierungsfehler:", parsed.error);
                return 'error';
            }
            return parsed.data;
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async getPromptById(Id: number): Promise<'error' | undefined | IPrompt> {
        try {
            const [prompt] = await DB.query<RowDataPacket[]>('select p.id, c.name, p.userowner, p.title, p.description, p.time_stamp from prompts p join category c on c.id = p.category_id WHERE p.id = ?', [Id]);
            if (!prompt || prompt.length === 0) {
                return undefined;
            }
            return Prompt.safeParse(prompt[0]).data;
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async createPrompt(data: INewPrompt, userowner:string): Promise<'error' | 'created'> {
        try {
            const [insert] = await DB.execute<ResultSetHeader>('insert into prompts (category_id, userowner, title, description) values (?, ?, ?, ?)', [data.category_id, userowner, data.title, data.description]);
            if (insert.affectedRows < 1) return 'error';
            return 'created';
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async updatePrompt(id: number, data: IEditPrompt): Promise<'error' | 'updated' | 'notFound'> {
        const existingPrompt = await PromptService.getPromptById(id);
        if (!existingPrompt) return 'notFound';
        try {
            const [update] = await DB.execute<ResultSetHeader>('update prompts set title = ?, description = ? where id = ?', [data.title, data.description, id]);
            if (update.affectedRows < 1) return 'error';
            return 'updated';
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async deletePrompt(id: number): Promise<'error' | 'deleted' | 'notFound'> {
        const existingPrompt = await PromptService.getPromptById(id);
        if (!existingPrompt) return 'notFound';
        try {
            const [deleted] = await DB.execute<ResultSetHeader>('delete from prompts where id = ?', [id]);
            if (deleted.affectedRows < 1) return 'error';
            return 'deleted';
        } catch (e) {
            console.error(e);
            return 'error';
        }
    }
}