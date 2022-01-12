const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, DepartmentTag, User, Task, TaskTag, Comment, TaskContributor, ProContributor } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:id', withAuth, (req, res) => {
    Project.findOne({
        where: {
            id: req.params.id
        },
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
                attributes: [
                    'id',
                    'title',
                    'task_text'
                ],
                include: [
                    {
                        model: Comment,
                        attributes: ['id', 'comment_text', 'created_at'],
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    },
                    {
                        model: User,
                        attributes: ['username'],
                        as: 'user'
                    },
                    {
                        model: TaskTag,
                        attributes: ['name']
                    },
                    {
                        model: TaskContributor,
                        include: [
                            {
                                model: User,
                                attributes: ['username']
                            }
                        ]
                    }
                ]

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
        const project = dbProjectData.get({ plain: true });

        res.render('single-project-home', { project, layout: 'single-project-main'});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id/tasks', (req, res) => {
    Project.findOne({
        where: {
            id: req.params.id
        },
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
                attributes: [
                    'id',
                    'title',
                    'task_text',
                    'project_id'
                ],
                include: [
                    {
                        model: Comment,
                        attributes: ['id', 'comment_text', 'created_at'],
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    },
                    {
                        model: User,
                        attributes: ['username'],
                        as: 'user'
                    },
                    {
                        model: TaskTag,
                        attributes: ['name']
                    },
                    {
                        model: TaskContributor,
                        include: [
                            {
                                model: User,
                                attributes: ['username']
                            }
                        ]
                    }
                ]

            },
            {
                model: DepartmentTag,
                attributes: ['name']

            },
        ]
    })
    .then(dbProjectTasksData => {
        // const tasks =  dbProjectTasksData.map(task => task.get({ plain: true }));
        const project = dbProjectTasksData.get({ plain: true });

        res.render('single-project-tasks', { project, layout: 'single-project-main', });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id/tasks/:task_id', (req, res) => {
    Project.findOne({
        where: {
            id: req.params.id
        },
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
                where: {
                    id: req.params.task_id
                },
                attributes: [
                    'id',
                    'title',
                    'task_text',
                    'project_id'
                ],
                include: [
                    {
                        model: Comment,
                        attributes: ['id', 'comment_text', 'created_at'],
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    },
                    {
                        model: User,
                        attributes: ['username'],
                        as: 'user'
                    },
                    {
                        model: TaskTag,
                        attributes: ['name']
                    },
                    {
                        model: TaskContributor,
                        include: [
                            {
                                model: User,
                                attributes: ['username']
                            }
                        ]
                    }
                ]

            },
            {
                model: DepartmentTag,
                attributes: ['name']

            },
        ]
    })
    .then(dbProjectTaskData => {
        
        // const tasks =  dbProjectTasksData.map(task => task.get({ plain: true }));
        const project = dbProjectTaskData.get({ plain: true });

        res.render('single-project-task-info', { project, layout: 'single-project-main', });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/:id/new-task', withAuth, (req, res) => {
    Project.findOne({
        where: {
            id: req.params.id
        },
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
            },
            
        ]
    })
    .then(dbProjectData => {
        const project = dbProjectData.get({ plain: true });

        res.render('new-task', { project, layout: 'single-project-main'});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;