import * as bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import { Logger } from "../logger/logger";
import CheckpointModel from '../models/checkpoint.model';
import ErrorModel from '../models/error';

const controller = require('../controllers/checkpoint')

interface Checkpoint {
  id: number,
  name: string,
  order: number
}

class Checkpoint {
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
    this.express.get('/', controller.get)
    // Get all categories by params
    this.express.post('/search', controller.search);
    //Get checkpoint by id
    this.express.post('/:id', controller.get)

    // Create a new checkpoint
    this.express.post('/', controller.save);

    // Update a checkpoint
    this.express.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const name: string = req.body.name;
      const id: string = req.params.id

      try {
        const checkpoint = await CheckpointModel.findById(id);
        if (!checkpoint) {
          return res.status(404).json({ message: 'Checkpoint not found' });
        }

        checkpoint.name = name;
        const updatedCheckpoint = await checkpoint.save();
        res.json(updatedCheckpoint);
      } catch (error) {
        if (error instanceof Error) {
          this.logger.error(error.message)
          res.status(400).json({ message: error.message });
        }
      }
    });

    // Delete a checkpoint
    this.express.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const checkpoint = await CheckpointModel.findById(req.params.id);
        if (!checkpoint) {
          return res.status(404).json({ message: 'Checkpoint not found' });
        }

        await checkpoint.destroy();
        res.json({ message: 'Checkpoint deleted' });
      } catch (error) {
        if (error instanceof Error) {
          this.logger.error(error.message)
          res.status(500).json({ message: error.message });
        }
      }
    });
  }
}

export default new Checkpoint().express;