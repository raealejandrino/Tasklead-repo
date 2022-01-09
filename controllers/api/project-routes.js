const router = require('express').Router();
const { Project, User } = require('../../models');
const withAuth = require('../../utils/auth');

// getting all projects
router.get('/', (req, res) => {
    Project.findAll({
      attributes: [
        'id',
        'title'  
      ]
      
    })
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  
});


// getting single project
router.get('/:id', (req, res) => {
    Project.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id',  'title' ],

      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbProjectData => {
        if (!dbProjectData) {
          res.status(404).json({ message: 'No Project found with this id' });
          return;
        }
        res.json(dbProjectData);
   })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post a project 
router.post('/',withAuth, (req, res) => {
    Project.create({
      title: req.body.title,
      // user_id: req.session.user_id
      user_id: req.body.user_id
    })
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
       console.log(err);
       res.status(500).json(err);
    });
});

// update Project title
router.put('/:id',withAuth, (req, res) => {
    Project.update(
      {
        title: req.body.title,
      },
      {
        where: {
          id: req.params.id
        }
    })
    .then(dbProjectData => {
        if (!dbProjectData) {
          res.status(404).json({ message: 'No Project found with this id' });
          return;
        }
        res.json(dbProjectData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });  
});


// delete posts
router.delete('/:id',withAuth, (req, res) => {
    Project.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbProjectData => {
        if (!dbProjectData) {
          res.status(404).json({ message: 'No Project found with this id' });
          return;
        }
        res.json(dbProjectData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;