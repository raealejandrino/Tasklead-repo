const router = require('express').Router();
const userRoutes = require('./user-routes');
const projectRoutes = require('./project-routes');
const taskRoutes = require('./task-routes');
const commentRoutes = require('./comment-routes');
const departmentTagRoutes = require('./department-tag-routes');
const taskTagRoutes = require('./tasktag-routes');
const projectContributorRoutes = require('./project-contributor-routes');
const taskContributorRoutes = require('./task-contributor-routes');


router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/comments', commentRoutes);
router.use('/departments', departmentTagRoutes);
router.use('/tasktags', taskTagRoutes);
router.use('/project_contributors', projectContributorRoutes);
router.use('/task_contributors', taskContributorRoutes);

module.exports = router;
