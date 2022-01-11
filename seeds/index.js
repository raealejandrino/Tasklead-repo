const seedUsers = require('./user-seeds');
const seedProjects = require('./project-seeds');
const seedDepartments = require('./deparment-seeds');
const seedTasks = require('./task-seeds');
const seedTaskTags = require('./tasktag-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedProjects();    
    await seedDepartments();
    await seedTasks();
    await seedTaskTags();
    await seedComments();
    process.exit(0);
};

seedAll();