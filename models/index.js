const User = require('./User');
const Project = require('./Project');
const Pipeline = require('./Pipeline');
const Task = require('./Task');
const Comment = require('./Comment');
const DepartmentTag = require('./DepartmentTag');
const TaskTag = require('./TaskTag');

User.hasMany(Project, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// User.belongsTo(Project, {
//     foreignKey: 'project_id',
//     onDelete: 'CASCADE'
// });


// Project.belongsToMany(User, {
//     through: Project,
//     as: 'user',
//     foreignKey: 'project_id',
//     onDelete:'CASCADE'
// });

Project.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


User.hasMany(Task, {
    foreignKey: 'user_id',
   onDelete: 'CASCADE'
});

// User.belongsTo(Task, {
//     foreignKey:'task_id',
//     onDelete: 'CASCADE'
// });

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Task, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE'
});

Task.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Task.hasMany(User, {
//     foreignKey: 'task_id',
//     onDelete: 'CASCADE'
// });

Project.hasMany(Task, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE'
});

Task.belongsTo(Project, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE'
});


Project.hasMany(Pipeline, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE'
});

Pipeline.hasMany(Task, {
    foreignKey: 'pipeline_id',
    onDelete: 'CASCADE'
});


Pipeline.belongsTo(Project, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE'
});


Task.belongsTo(Pipeline, {
    foreignKey: 'pipeline_id',
    onDelete: 'CASCADE'
});




DepartmentTag.hasMany(Project, {
    foreignKey: 'department_tag_id',
    onDelete: 'CASCADE'
});

Project.belongsTo(DepartmentTag, {
    foreignKey: 'department_tag_id',
    onDelete: 'CASCADE'
});






Task.hasMany(TaskTag, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE'
});

Task.hasMany(Comment, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE'
});



TaskTag.belongsTo(Task, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE'
});




module.exports = { User, Comment, DepartmentTag, Pipeline, Project, Task, TaskTag };

