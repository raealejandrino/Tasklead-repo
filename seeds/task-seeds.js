const { Task } = require('../models');

const taskData = [{
        title: 'Test Task 1',
        task_text: 'This is test task text for Test Task 1.',
        user_id: 1,
        project_id: 1

    },
    {
        title: 'Test Task 2',
        content: 'This is test task text for Test Task 2.',
        user_id: 2,
        project_id: 2
    },
    {
        title: 'Test Task 3',
        content: 'This is test task text for Test Task 3.',
        user_id: 3,
        project_id: 3
    }
];

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;

