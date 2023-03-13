import { Model, DataTypes, BelongsTo } from 'sequelize';
import sequelize from '../config/database';
import Category from './category.model';
import Checkpoint from './checkpoint.model';
import Archive from './archive.model';

class Ingredient extends Model {
  public id!: number;
  public name!: string;
  public categoryId!: number;
  public checkpointId!: number;
  public archiveId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public category?: Category;
  public checkpoint?: Checkpoint;
  public archive?: Archive;

  public static associate: () => void;
}

Ingredient.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  measure: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  checkpoint_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  archive_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'ingredient',
  timestamps: false
});

Ingredient.associate = function () {
  Ingredient.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
}

Ingredient.associate = () => {
  Ingredient.belongsTo(Checkpoint, { foreignKey: 'checkpoint_id', as: 'checkpoint' });
}

Ingredient.associate = () => {
  Ingredient.belongsTo(Archive, { foreignKey: 'archive_id', as: 'archive' });
}

Ingredient.sync({ alter: true, force: false })
export default Ingredient;