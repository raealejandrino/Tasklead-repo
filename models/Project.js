const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Project model
class Project extends Model {}

Project.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: {
         type: DataTypes.INTEGER,
         references: {
          model: 'user',
          key: 'id'
         }
        },
      department_tag_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'department_tag',
          key: 'id'
        }
      }


      
        // add project desc
    },
      {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'project'
     
      }
  );


  module.exports = Project;