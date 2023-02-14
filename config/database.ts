import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('restaurant', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3309,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default sequelize;