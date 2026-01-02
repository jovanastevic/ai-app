import {CategoryService} from "../service/CategoryService";
import {Express, Request, Response} from "express";
import {NewCategory} from "../model/Category";
import {isAdmin, validateAuth} from "../auth";

export class CategoryController {
    static init(app: Express): void {
        app.get('/categories/', CategoryController.getAllCategories);
        app.get('/categories/:id', CategoryController.getByCategoryID);
        app.post('/categories/', validateAuth, isAdmin, CategoryController.creatCategory);
        app.put('/categories/:id', validateAuth, isAdmin, CategoryController.updateCategory);
        app.delete('/categories/:id', validateAuth, isAdmin, CategoryController.deleteCategory);
    }

    static async getAllCategories(req: Request, res: Response) {
        const categories = await CategoryService.getAllCategories();
        if (!categories) {
            res.status(404).send();
            return;
        } else if (categories === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }
        res.status(200).json(categories);
    }

    static async getByCategoryID(req: Request, res: Response) {
        const category = await CategoryService.getByCategoryID(parseInt(req.params.id));
        if (!category) {
            res.status(404).send();
            return;
        } else if (category === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }
        res.status(200).json(category);
    }

    static async creatCategory(req: Request, res: Response) {
        const data = NewCategory.safeParse(req.body);
        if (!data.success) {
            res.status(400).json({
                message: 'Wrong input data',
                errors: data.error
            });
            return;
        }
        const result = await CategoryService.createCategory(data.data);
        if (result === 'conflict') {
            res.status(409).send();
            return;
        } else if (result === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }
        res.status(201).send();
    }

    static async updateCategory(req: Request, res: Response) {
        const data = NewCategory.safeParse(req.body);
        if (!data.success) {
            res.status(400).json({
                message: 'Wrong input data',
                errors: data.error
            });
            return;
        }
        const result = await CategoryService.updateCategory(parseInt(req.params.id), data.data);
        if (result === 'notFound') {
            res.status(404).send();
            return;
        } else if (result === 'error') {
            res.status(500).json({message: 'Database error'});
            return;
        }
        res.status(200).send();
    }

    static async deleteCategory(req: Request, res: Response) {
        const result = await CategoryService.deleteCategory(parseInt(req.params.id));
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