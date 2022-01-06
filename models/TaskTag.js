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
        task_tag_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        task_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'task',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'task_tag'
    }
);

module.exports = TaskTag;