const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pipeline extends Model {};

Pipeline.init(
    {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
        // task_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'task',
        //         key: 'id'
        //     }
        // }
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