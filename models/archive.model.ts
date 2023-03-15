import { Model, DataTypes } from 'sequelize';
import Ingredient from './ingredient.model';
import sequelize from './../config/database';


class ArchiveModel extends Model {
  public id!: number;
  public month!: string;
  public year!: string;
  public stockList!: any;

  public static findById(id: number | string | any): Promise<ArchiveModel | null> {
    return this.findOne({ where: { id } });
  }
}
ArchiveModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stockList: {
    type: DataTypes.JSON,
    allowNull: false,
  },
},
  {
    sequelize: sequelize,
    timestamps: false,
    modelName: 'Archive',
    tableName: "archive",
  });

ArchiveModel.sync({ alter: true, force: false });

export default ArchiveModel