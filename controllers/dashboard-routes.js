const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, DepartmentTag, User, Task, TaskTag, ProContributor } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Project.findAll({
        attributes: [
            'id',
            'title',
            'user_id',
            'department_tag_id',
            'description',
            'createdAt',
            // COUNTS???
            [sequelize.literal('(SELECT COUNT(*) FROM task AS tasks WHERE project_id = project.id)'), 'task_count']
            ,
            [sequelize.literal('(SELECT COUNT(*) FROM project_contributor AS project_contributors WHERE project_id = project.id)'), 'contributor_count']
        ],

        include: [
            {
                model: User,
                attributes: ['username'],
                // created by
                as: 'user'
            },
            {
                model: Task,
                // attributes: [sequelize.literal('(SELECT COUNT(*) FROM task)'), 'task_count']


            },
            {
                model: DepartmentTag,
                attributes: ['name']

            },
            {
                model: ProContributor,
                attributes: { exclude: 'id user_id project_id' },
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
        .then(dbProjectData => {

            const projects = dbProjectData.map(project => project.get({ plain: true }));

            res.render('homepage', { projects, layout: false });

            // res.json(dbProjectData);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/new', withAuth, (req, res) => {
    DepartmentTag.findAll({
        attributes: [
            'id',
            'name',

        ]
    })
        .then(dbData => {

            const data = dbData.map(data => data.get({ plain: true }));

            res.render('new-project', { data, layout: false });
        })
});

module.exports = router;