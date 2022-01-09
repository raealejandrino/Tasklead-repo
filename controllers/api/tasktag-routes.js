const router = require('express').Router();
const { TaskTag } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    TaskTag.findAll({})
        .then(dbTaskTagData => res.json(dbTaskTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    TaskTag.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(dbTaskTagData => res.json(dbTaskTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.post('/', withAuth, (req, res) => {
    if (req.session) {
        TaskTag.create({
                task_tag_name: req.body.task_tag_name,
                task_id: req.body.task_id,
            })
            .then(dbTaskTagData => res.json(dbTaskTagData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
});

router.put('/:id', withAuth, (req, res) => {
    TaskTag.update({
        TaskTag_text: req.body.TaskTag_text
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbTaskTagData => {
        if (!dbTaskTagData) {
            res.status(404).json({ message: 'No TaskTag found with this id' });
            return;
        }
        res.json(dbTaskTagData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    TaskTag.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbTaskTagData => {
        if (!dbTaskTagData) {
            res.status(404).json({ message: 'No TaskTag found with this id' });
            return;
        }
        res.json(dbTaskTagData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;