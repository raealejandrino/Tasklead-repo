const router = require('express').Router();
const { DepartmentTag } = require('../../models');

router.get('/', (req, res) => {
    DepartmentTag.findAll({
        attributes: [
            'id',
            'name',
            
        ]
    })
    .then(dbDTagData => res.json(dbDTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    DepartmentTag.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'project_id'
        ]

    })
    .then(dbDTagData => {
        if (!dbDTagData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbDTagData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    DepartmentTag.create({
        name: req.body.name
    })
    .then(dbDTagData => res.json(dbDTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    DepartmentTag.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;