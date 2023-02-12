import { Model, DataTypes, BelongsToMany, Sequelize } from 'sequelize';
import Ingredient from './ingredient.model';
import sequelize from './../config/database';

class CategoryModel extends Model {
  public id!: number;
  public name!: string;
  public order!: number;


  public static associate(models: { [key: string]: Model }) {
    CategoryModel.hasMany(Ingredient, { foreignKey: 'category_id' });
  }

  public static findById(id: number | string): Promise<CategoryModel | null> {
    return this.findOne({ where: { id } });
  }
}

CategoryModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: sequelize,
  timestamps: false,
  modelName: 'Category',
  tableName: "category",
});

export default CategoryModel;