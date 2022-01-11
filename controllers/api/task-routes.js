const router = require('express').Router();
const { Task, User, TaskTag, Comment, TaskContributor } = require('../../models');


router.get('/', (req, res) => {
    Task.findAll({
        attributes: [
            'id',
            'title',
            'task_text'
            // [sequelize.literal('(SELECT username FROM user WHERE task.id = user.task_id)'), 'users']
            // ]
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
    })
    .then(dbTaskData => res.json(dbTaskData))
    .catch(err => {    
     console.log(err);
     res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Task.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'task_text'
            // [sequelize.literal('(SELECT username FROM user WHERE task.id = user.task_id)'), 'users']
            // ]
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'task_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username'],
                    
                }
            },
            {
                model: User,
                attributes: ['username'],
                as: 'users'
            },
            {
                model: TaskTag,
                attributes: ['name']
            }
        ]
    })
    .then(dbTaskData => {
        if (!dbTaskData) {
          res.status(404).json({ message: 'No task found with this id' });
          return;
        }
        res.json(dbTaskData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/', (req, res) => {
    Task.create({
        title: req.body.title,
        task_text: req.body.task_text,
        user_id: req.body.user_id,
        project_id: req.body.project_id,
        task_tag_id: req.body.task_tag_id
    })
    .then(dbTaskData => res.json(dbTaskData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;