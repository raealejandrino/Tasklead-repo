const { TaskTag } = require('../models');

const taskTagData = [{
        task_tag_name: 'TestTaskTag1',
        task_id: 1
    },
    {
        task_tag_name: 'TestTaskTag2',
        task_id: 2
    },
    {
        task_tag_name: 'TestTaskTag3',
        task_id: 3
    }
];

const seedTaskTags = () => TaskTag.bulkCreate(taskTagData);

module.exports = seedTaskTags;