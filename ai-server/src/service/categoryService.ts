import {DB} from "../db";
import {z} from "zod";
import {Category, ICategory, INewCategory} from "../model/category";
import {ResultSetHeader, RowDataPacket} from "mysql2";

export class CategoryService{
    static async getAllCategories():Promise<'error' |ICategory[]| undefined >{
        try{
            const [categories] = await DB.query<RowDataPacket[]>('select id, name, description from category');
            if(!categories ||categories.length === 0) {
                return undefined;
            }
            return z.array(Category).safeParse(categories).data;
        }catch(e){
            console.error(e);
            return 'error';
        }
    }

    static async getByCategoryID(id :number): Promise<'error'| undefined | ICategory>{
        try{
            const [category] = await DB.query<RowDataPacket[]>('select id, name, description from category where id= ?', [id]);
            if(!category || category.length === 0) {
                return undefined;
            }
            return Category.safeParse(category[0]).data;
        } catch (e){
            console.error(e);
            return 'error';
        }
    }
    static async createCategory(data :INewCategory): Promise<'error' | 'created' | 'conflict'>{
        try{
            const [exsiting] = await DB.query<RowDataPacket[]>('select id from category where name = ?', [data.name]);
            if(exsiting.length > 0) return 'conflict';

            const [insert] = await DB.execute<ResultSetHeader>('insert into category (name, description) values(?, ?)', [data.name, data.description]);
            if (insert.affectedRows < 1) return 'error';
            return 'created';
        } catch (e){
            console.error(e);
            return 'error';
        }
    }

    static async updateCategory(id:number, data : INewCategory): Promise<'error' | 'updated' | 'notFound'>{
        const existingCategory = await CategoryService.getByCategoryID(id);
        if(!existingCategory) return 'notFound';
        try{
            const [insert] = await DB.execute<ResultSetHeader>('update category set name = ?, description = ? where id = ?', [data.name, data.description, id]);
            if (insert.affectedRows < 1) return 'error';
            return 'updated';
        }catch (e) {
            console.error(e);
            return 'error';
        }
    }

    static async deleteCategory(id: number): Promise<'error' | 'deleted' | 'notFound'>{
        const existingCategory = await CategoryService.getByCategoryID(id);
        if(!existingCategory) return 'notFound';
        try {
            const  [deleted] = await DB.execute<ResultSetHeader>('delete from category where id = ?', [id]);
            if(deleted.affectedRows < 1) return 'error';
            return 'deleted';
        } catch (e){
            console.error(e);
            return 'error';
        }
    }
}