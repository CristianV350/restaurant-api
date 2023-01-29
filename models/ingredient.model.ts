import { Model, DataTypes, BelongsTo } from 'sequelize';
import sequelize from '../config/database';
import Category from './category.model';

class Ingredient extends Model {
  public id!: number;
  public name!: string;
  public categoryId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public category?: Category;

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
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'ingredient'
});

Ingredient.associate = function() {
  Ingredient.belongsTo(Category, { foreignKey: 'categoryId' });
}

export default Ingredient;