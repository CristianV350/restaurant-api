import * as bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import { Logger } from "../logger/logger";
import CategoryModel from '../models/category.model';
import ErrorModel from '../models/error';


interface Category {
    id: number,
    name: string,
    order: number
}

interface CategoryParams {
    id: number,
    name: string
}

class Category {
    public express: express.Application;
    public logger: Logger;

    // array to hold data for categories
    public categories: any[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.categories = [];
        this.logger = new Logger();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        // Get all categories
        this.express.get('/', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const categories = await CategoryModel.findAll()
                console.log(categories)
                // res.json(categories);
            } catch (error) {
                if (error instanceof Error) {
                    this.logger.error(error.message)
                    res.status(500).json({ message: error.message });
                }
            }
        });

        // Create a new category
        this.express.post('/', async (req: Request, res: Response, next: NextFunction) => {
            const name = req.body.name;

            if (!name) {
                return res.status(400).json({ message: 'Name is required' });
            }

            const category = new CategoryModel({ name });

            try {
                const newCategory: CategoryModel = await category.save();
                res.status(201).json(newCategory.id);
            } catch (error) {
                if (error instanceof ErrorModel) {
                    this.logger.error(error.message)
                    res.status(400).json({ message: error.message });
                }
            }
        });

        // Update a category
        this.express.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
            const name: string = req.body.name;
            const id: string = req.params.id

            try {
                const category = await CategoryModel.findById(id);
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }

                category.name = name;
                const updatedCategory = await category.save();
                res.json(updatedCategory);
            } catch (error) {
                if (error instanceof Error) {
                    this.logger.error(error.message)
                    res.status(400).json({ message: error.message });
                }
            }
        });

        // Delete a category
        this.express.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const category = await CategoryModel.findById(req.params.id);
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }

                await category.destroy();
                res.json({ message: 'Category deleted' });
            } catch (error) {
                if (error instanceof Error) {
                    this.logger.error(error.message)
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
}

export default new Category().express;