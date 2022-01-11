const { Project } = require('../models');

const projectData = [{
        title: 'Test Project 1',
        content: 'This is test content for Test Project 1.',
        user_id: 1

    },
    {
        title: 'Test Project 2',
        content: 'This is test content for Test Project 2.',
        user_id: 2
    },
    {
        title: 'Test Project 3',
        content: 'This is test content for Test Project 3.',
        user_id: 3
    }
];

const seedProjects = () => Project.bulkCreate(projectData);

module.exports = seedProjects;