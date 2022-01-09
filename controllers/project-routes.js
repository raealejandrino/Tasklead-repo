const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, DepartmentTag, User, Task, TaskTag } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:name', withAuth, (req, res) => {
    Project.findOne({
        where: {
            title: req.params.name
        },
        attributes: [
            'id',
            'title',
            'created_at',

        ],
        include: [
            {
                model: DepartmentTag,
                attributes: ['id', 'department_tag_name', 'project_id']
            },
            {
                model: Task,
                attributes: ['id', 'title', 'task_text', 'project_id',' user_id'],
                include: [
                    {
                        model: Comment,
                        attributes: ['id', 'task_id'],
                        
                    },
                    {
                        model: TaskTag,
                        attributes: ['id', 'task_tag_name', 'task_id']
                    },
                    {
                        model: User,
                        attributes: ['id', 'username']
                    }
                ]
            },
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    })
});

router.get('/:name/new-task', withAuth, (req, res) => {

    res.render('new-task');
    
});


module.exports = router;