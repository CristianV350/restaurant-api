import { Model, DataTypes } from 'sequelize';
import sequelize from './../config/database';
import Ingredient from './ingredient.model';
import Archive from './archive.model';

interface CheckpointParams {
  id: number,
  name: string
}

class CheckpointModel extends Model {
  public id!: number;
  public name!: string;
  public order!: number;


  public static associate(models: { [key: string]: Model }) {
    CheckpointModel.hasMany(Ingredient, { foreignKey: 'checkpoint_id' });
    // CheckpointModel.hasMany(Archive, { foreignKey: 'checkpoint_id' });
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize: sequelize,
  timestamps: false,
  modelName: 'Checkpoint',
  tableName: "checkpoint",
});

CheckpointModel.sync({ alter: true, force: true })

export default CheckpointModel;