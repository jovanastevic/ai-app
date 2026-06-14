import {PromptService} from "../service/PromptService";
import {Express, Request, Response} from "express";
import {EditPrompt, NewPrompt} from "../model/Prompt";
import {CategoryService} from "../service/CategoryService";
import {validateAuth} from "../auth";

export class PromptController {
    static init(app: Express): void {
        app.get('/prompts/', PromptController.getAllPrompts);
        app.get('/prompts/:id', PromptController.getPromptById);
        app.post('/prompts/',validateAuth, PromptController.createPrompt);
        app.put('/prompts/:id',validateAuth, PromptController.updatePrompt);
        app.delete('/prompts/:id',validateAuth, PromptController.deletePrompt);
    }

    static async getAllPrompts(req: Request, res: Response) {
        const prompts = await PromptService.getAllPrompts();

        if (prompts === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }
        res.status(200).json(prompts);
    }

    static async getPromptById(req: Request, res: Response) {
        const prompt = await PromptService.getPromptById(parseInt(req.params.id));
        if (!prompt) {
            res.status(404).send();
            return;
        } else if (prompt === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }
        res.status(200).json(prompt);
    }

    static async createPrompt(req: Request, res: Response) {
        const userowner = req.params._username;
        const data = NewPrompt.safeParse(req.body);
        if (!data.success) {
            res.status(400).json({
                message: 'Wrong input data',
                errors: data.error
            });
            return;
        }
        const categoryCheck = await CategoryService.getByCategoryID(data.data.category_id);
        if (!categoryCheck) {
            res.status(400).json({message: 'Category does not exist'});
            return;
        } else if (categoryCheck === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }
        const result = await PromptService.createPrompt(data.data, userowner);
        if (result === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }
        res.status(201).send();
    }

    static async updatePrompt(req: Request, res: Response) {
        const data = EditPrompt.safeParse(req.body);
        if (!data.success) {
            res.status(400).json({
                message: 'Wrong input data',
                errors: data.error
            });
            return;
        }
        const permission = await PromptService.getPromptById(parseInt(req.params.id));
        if (!permission) {
            res.status(404).send();
            return;
        } else if (permission === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        } else if( permission.userowner !== req.params._username) {
            res.status(403).send();
            return;
        }

        const result = await PromptService.updatePrompt(parseInt(req.params.id), data.data);
        if (result === 'notFound') {
            res.status(404).send();
            return;
        } else if (result === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }
        res.status(200).send();
    }

    static async deletePrompt(req: Request, res: Response) {

        const permission = await PromptService.getPromptById(parseInt(req.params.id));
        if (!permission) {
            res.status(404).send();
            return;
        } else if (permission === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        } else if( permission.userowner !== req.params._username) {
            res.status(403).send();
            return;
        }
        const result = await PromptService.deletePrompt(parseInt(req.params.id));
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