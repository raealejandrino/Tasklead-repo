const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, DepartmentTag, User, Task, TaskTag } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {

    Project.findAll({
        attributes: [
            'id',
            'title',
            'created_at'
        ],
        include: [
            {
                model: DepartmentTag,
                attributes: ['id', 'department_tag_name', 'project_id']
            },
            {
                model: Task,
                attributes: ['id', 'project_id']
            },
            {
                model: User,
                attributes: ['username'],
                as: 'user'
            }
        ]
    })
    .then(dbProjectData => {

        // const projects = dbProjectData.map(project => project.get({ plain: true }));

        // res.render('homepage', { projects });

        res.json(dbProjectData);

    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/new', withAuth, (req, res) => {

    res.render('new-project');
    
});

module.exports = router;