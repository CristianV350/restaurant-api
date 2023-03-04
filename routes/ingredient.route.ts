import * as bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import { Logger } from "../logger/logger";
import CategoryModel from '../models/ingredient.model';
import ErrorModel from '../models/error';

const controller = require('../controllers/ingredient')

interface Ingredient {
  id: number,
  name: string,
  order: number
}

class Ingredient {
  public express: express.Application;
  public logger: Logger;

  // array to hold data for categories
  public ingredients: any[];

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.ingredients = [];
    this.logger = new Logger();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    //Get ingredient by category id
    this.express.get('/:id', controller.find)

    // Get all ingredients by params
    this.express.post('/search', controller.search);

    // Create a new ingredient
    this.express.post('/', controller.save);

    // // Update a category
    // this.express.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    //   const name: string = req.body.name;
    //   const id: string = req.params.id
    //   console.log(name, id)
    //   if (!name) {
    //     return res.status(400).json({ message: 'Name is required' });
    //   }
    //   if (!id) {
    //     return res.status(400).json({ message: 'Id is required' });
    //   }

    //   try {
    //     const category = await CategoryModel.findById(id);
    //     if (!category) {
    //       return res.status(404).json({ message: 'Category not found' });
    //     }

    //     category.name = name;
    //     const updatedCategory = await category.save();
    //     res.json(updatedCategory);
    //   } catch (error) {
    //     if (error instanceof Error) {
    //       this.logger.error(error.message)
    //       res.status(400).json({ message: error.message });
    //     }
    //   }
    // });

    //     // Delete a category
    //     this.express.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    //       try {
    //         const category = await CategoryModel.findAll(req.params.id);
    //         if (!category) {
    //           return res.status(404).json({ message: 'Category not found' });
    //         }

    //         await category.destroy();
    //         res.json({ message: 'Category deleted' });
    //       } catch (error) {
    //         if (error instanceof Error) {
    //           this.logger.error(error.message)
    //           res.status(500).json({ message: error.message });
    //         }
    //       }
    //     });
  }
}

export default new Ingredient().express