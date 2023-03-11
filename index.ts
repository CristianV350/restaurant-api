import dotenv from 'dotenv';
import app from './app';
import db from './models/index'
import Models from './models/index'
import { Request } from 'express';
import { Response } from 'express';
import { NextFunction } from 'express';

dotenv.config()

const PORT = process.env.APP_PORT || 3000;


const initApp = async () => {
  console.log("Testing the database connection..");
  /**
   * Test the connection.
   * You can use the .authenticate() function to test if the connection works.
   */
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log("Connection has been established successfully.");

    /**
     * Start the web server on the specified port.
     */

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

/**
 * Initialize the application.
 */

initApp();