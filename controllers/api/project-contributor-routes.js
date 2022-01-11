const router = require('express').Router();
const { ProContributor, User, Project } = require('../../models');

router.get('/', (req, res) => {
    ProContributor.findAll({
        attributes: [
            'id',
            'user_id',
            'project_id'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Project,
                attributes: ['title'],
                as: 'project'
            }
        ]
    })
    .then(dbProjectContributorData => res.json(dbProjectContributorData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    ProContributor.create({
        user_id: req.body.user_id,
        project_id: req.body.project_id
    })
    .then(dbProjectContributorData => res.json(dbProjectContributorData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});

module.exports = router;