const router = require('express').Router();
const { TaskContributor, User, Project } = require('../../models');

router.get('/', (req, res) => {
    TaskContributor.findAll({
        attributes: [
            'id',
            'user_id',
            'task_id'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Task,
                attributes: ['title'],
                as: 'task'
            }
        ]
    })
    .then(dbTaskContributorData => res.json(dbTaskContributorData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    TaskContributor.create({
        user_id: req.body.user_id,
        task_id: req.body.task_id
    })
    .then(dbTaskContributorData => res.json(dbTaskContributorData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});

module.exports = router;