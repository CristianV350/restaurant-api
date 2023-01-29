import * as bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { Logger } from "../logger/logger";
import CategoryModel from '../models/category.model';
import Error from "../models/error.model";

const router = express.Router();

interface Category {
    id: number,
    name: string,
    order: number
}

interface CategoryParams {
    id: number,
    name: string
}

class Ingredient {
    public express: express.Application;
    public logger: Logger;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new Logger();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        // Get all categories
        router.get('/', async (req: Request, res: Response) => {
            try {
                
                const categories = await CategoryModel.findAll()
                res.json(categories);
            }catch (error) {
                if (error instanceof Error){
                    this.logger.error(error.message)
                    res.status(500).json({ message: error.message });
                }
            }
        });

        // Create a new category
        router.post('/', async (req: Request, res: Response) => {
            const name = req.body.name;

            if (!name) {
                return res.status(400).json({ message: 'Name is required' });
            }

            const category = new CategoryModel({ name });

            try {
                const newCategory: Category = await category.save();
                res.status(201).json(newCategory.id);
            } catch (error) {
                if (error instanceof Error){
                    this.logger.error(error.message)
                    res.status(400).json({ message: error.message });
                }
            }
        });

        // Update a category
        router.patch('/:id', async (req: Request, res: Response) => {
            const name = req.body.name;
            const id = req.params.id

            try {
                const category = await CategoryModel.findById(id);
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }

                category.name = name;
                const updatedCategory = await category.save();
                res.json(updatedCategory);
            } catch (error) {
                if (error instanceof Error){
                    this.logger.error(error.message)
                    res.status(400).json({ message: error.message });
                }
            }
        });

        // Delete a category
        router.delete('/:id', async (req: Request, res: Response) => {
            try {
                const category = await CategoryModel.findById(req.params.id);
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }

                await category.remove();
                res.json({ message: 'Category deleted' });
            } catch (error) {
                if (error instanceof Error){
                    this.logger.error(error.message)
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
}

export default new Ingredient().express;