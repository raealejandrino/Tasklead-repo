const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    task_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },

    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'project',
        key: 'id'
      }
    },
    task_tag_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'task_tag',
        key: 'id'
      }
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'task'
  }
);

module.exports = Task;
