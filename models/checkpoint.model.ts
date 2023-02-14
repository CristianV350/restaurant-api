import { Model, DataTypes } from 'sequelize';
import sequelize from './../config/database';
import CategoryModel from './category.model';

interface CheckpointParams {
  id: number,
  name: string
}

class CheckpointModel extends Model {
  public id!: number;
  public name!: string;
  public order!: number;


  public static associate(models: { [key: string]: Model }) {
    CheckpointModel.belongsTo(CategoryModel, { foreignKey: 'category_id' });
  }

  public static findById(id: number | string | any): Promise<CheckpointModel | null> {
    return this.findOne({ where: { id } });
  }
}

CheckpointModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: sequelize,
  timestamps: false,
  modelName: 'Checkpoint',
  tableName: "checkpoint",
});

CheckpointModel.sync({ alter: true, force: false })

export default CheckpointModel;