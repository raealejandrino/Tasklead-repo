const router = require('express').Router();
const { Project, User, Task, DepartmentTag, ProContributor, Comment, TaskTag, TaskContributor } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// getting all projects
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
    attributes: ['id', 'title', 'department_tag_id',

      [sequelize.literal('(SELECT COUNT(*) FROM task WHERE project_id = project.id)'), 'task_count']
    ],

    include: [
      {
        model: User,
        attributes: ['username'],
        as: 'user'
      },
      {
        model: Task,



      },
      {
        model: DepartmentTag,
        attributes: ['name']

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


router.get('/:id/:task_id', (req, res) => {
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
    .then(dbProjectTaskData => {res.json(dbProjectTaskData)})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// post a project 
router.post('/', withAuth, (req, res) => {
  Project.create({
    title: req.body.title,
    // user_id: req.session.user_id
    user_id: req.session.user_id,
    department_tag_id: req.body.department_tag_id,
    description: req.body.description
  })
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update Project title
router.put('/:id', withAuth, (req, res) => {
  Project.update(req.body,
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
router.delete('/:id', withAuth, (req, res) => {
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