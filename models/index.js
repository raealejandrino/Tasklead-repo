const User = require('./User');
const Project = require('./Project');


// Project User reference
Project.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete:'CASCADE'
  });