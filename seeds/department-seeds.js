const { DepartmentTag } = require('../models');

const departmentData = [{
        department_tag_name: 'Test Department I',
        project_id: 1
    },
    {
        department_tag_name: 'Test Department 2',
        project_id: 2
    },
    {
        department_tag_name: 'Test Department 3',
        project_id: 3
    }
];

const seedDepartments = () => DepartmentTag.bulkCreate(departmentData);

module.exports = seedDepartments;