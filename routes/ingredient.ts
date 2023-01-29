import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";

class Ingredient {

  public express: express.Application;
  public logger: Logger;

  // array to hold data for ingredients
  public ingredients: any[];
  public categories: any[];

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.ingredients = [];
    this.categories = [];
    this.logger = new Logger();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {

    // request to get all the users
    this.express.get("/category", (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      res.json(this.categories);
    });

    // request to get all the users by userName
    this.express.get("/category/:categoryId", (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      const category = this.categories.filter(function (category) {
        if (req.params.categoryId === category.id) {
          return category;
        }
      });
      res.json(category);
    });

    // request to post the user
    // req.body has object of type {firstName:"fnam1",lastName:"lnam1",userName:"username1"}
    this.express.post("/category", (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      this.categories.push(req.body.category);
      res.json(this.categories);
    });
  }
}

export default new Ingredient().express;