const { Comment } = require('../models');

const commentData = [{
        comment_text: "This is test content for Test Comment I.",
        user_id: 1,
        task_id: 1
    },
    {
        comment_text: "This is test content for Test Comment II.",
        user_id: 2,
        task_id: 2
    },
    {
        comment_text: "This is test content for Test Comment III.",
        user_id: 3,
        task_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;