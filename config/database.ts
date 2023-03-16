import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://b6c611638e833c:7cdaec52@us-cdbr-east-06.cleardb.net/heroku_d9eea5a9760a88a?reconnect=true');

export default sequelize;