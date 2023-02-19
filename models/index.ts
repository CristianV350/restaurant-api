import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import sequelize from '../config/database';

const basename = path.basename(__filename);
const db: { [key: string]: any } = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-9) === '.model.ts' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    let model = require(path.join(__dirname, file)).default;
    console.log(model)
    db[model] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;