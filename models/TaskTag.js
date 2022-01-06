const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TaskTag extends Model {}

TaskTag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        task_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'task',
                key: 'id'
            }
        },
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tag',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'task_tag',
    }
);

module.exports = TaskTag;