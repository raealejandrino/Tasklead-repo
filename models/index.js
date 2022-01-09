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

User.hasMany(Task, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

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

Task.belongsToMany(User, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE'
});

Project.belongsToMany(User, {
    foreignKey: 'project_id',
    onDelete:'CASCADE'
});

Project.hasMany(Pipeline, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE'
});

Task.belongsTo(Pipeline, {
    foreignKey: 'pipeline_id',
    onDelete: 'CASCADE'
});

Project.hasMany(DepartmentTag, {
    foreignKey: 'project_id',
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

DepartmentTag.belongsToMany(Project, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE'
});

TaskTag.belongsToMany(Task, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE'
});

Pipeline.belongsTo(Project, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE'
});


module.exports = { User, Comment, DepartmentTag, Pipeline, Project, Task, TaskTag };

