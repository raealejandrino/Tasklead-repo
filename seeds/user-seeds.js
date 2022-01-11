const { User } = require('../models');

const userData = [{
        username: 'TestUser1',
        email: 'testuser1@email.com',
        password: 'testuser1'
    },
    {
        username: 'TestUser2',
        email: 'testuser2@email.com',
        password: 'ttestuser2'
    },
    {
        username: 'TestUser3',
        email: 'testuser3@email.com',
        password: 'testuser3'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;