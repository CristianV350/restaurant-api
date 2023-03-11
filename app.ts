import * as bodyParser from "body-parser";
import express from "express";
import { Logger } from "./logger/logger";
import Routes from "./routes/index";
// in your server file
import cors from "cors";
import { Request, Response, NextFunction } from "express";

class App {

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
        this.express.use(cors())
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get("/", (req: Request, res: Response, next: NextFunction) => {
            res.send("Typescript App works!!!");
        });

        // routes
        this.express.use("/api", Routes);

        // handle undefined routes
        this.express.use("*", (req: Request, res: Response, next: NextFunction) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;