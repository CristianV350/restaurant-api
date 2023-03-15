import * as bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import { Logger } from "../logger/logger";
import CategoryModel from '../models/category.model';
import ErrorModel from '../models/error';

const controller = require('../controllers/archive')
const exportController = require('../controllers/export')

interface Archive {
  id: number,
  month: string,
  year: string,
  stockList: string
}

class Archive {
  public express: express.Application;
  public logger: Logger;

  // array to hold data for categories
  public archives: any[];

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.archives = [];
    this.logger = new Logger();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    // Get all categories
    this.express.get('/', controller.get)
    // Get all categories by params
    this.express.post('/search', controller.search);
    //Get category by id
    this.express.post('/:id', controller.get)

    // Create a new category
    this.express.post('/', controller.save);

    // Export archive
    this.express.post('/export', exportController.exportPDF)


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

export default new Archive().express;