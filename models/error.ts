import { Model, DataTypes, BelongsToMany, Sequelize } from 'sequelize';

interface Error {
    message: string
}


class ErrorModel extends Error {

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


}
export default ErrorModel