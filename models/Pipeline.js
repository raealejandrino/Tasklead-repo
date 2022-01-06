const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pipeline extends Model {};

Pipeline.init(
    {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'pipeline',
    }
);


module.exports = Pipeline;