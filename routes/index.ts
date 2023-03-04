import * as bodyParser from "body-parser";
import express from "express";
import { Logger } from "../logger/logger";
import Category from "./category.route";
import Checkpoint from "./checkpoint.route";
import Ingredient from "./ingredient.route";
import User from "./user";

class Routes {

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
        // category route
        this.express.use("/category", Category)

        //checkpoint roue
        this.express.use("/checkpoint", Checkpoint)

        //checkpoint roue
        this.express.use("/ingredient", Ingredient)

        // user route
        this.express.use("/", User);

    }
}

export default new Routes().express;