import { Model, DataTypes, BelongsToMany, Sequelize } from 'sequelize';
import Ingredient from './ingredient.model';

class CategoryModel extends Model {
  public id!: number;
  public name!: string;
  public order!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  public static associate(models: { [key: string]: Model }) {
    CategoryModel.hasMany(Ingredient, { foreignKey: 'category_id' });
  }


  public static findById(id: number | string): Promise<CategoryModel | null> {
    return this.findOne({ where: { id } });
  }

  public static initModel(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'CategoryModel',
        tableName: 'category',
        timestamps: false,
      },
    );
    return this;
  }
}

export default CategoryModel;