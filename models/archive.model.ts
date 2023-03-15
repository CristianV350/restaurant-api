import { Model, DataTypes } from 'sequelize';
import Ingredient from './ingredient.model';
import sequelize from './../config/database';


class ArchiveModel extends Model {
  public id!: number;
  public month!: string;
  public year!: string;
  public stockList!: any;

  public static associate(models: { [key: string]: Model }) {
    ArchiveModel.hasMany(Ingredient, { foreignKey: 'archive_id' });
  }
  public static findByDate(date: Date): Promise<ArchiveModel | null> {
    return this.findOne({ where: { date } });
  }

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
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  checkpoint_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  stockList: {
    type: DataTypes.TEXT,
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