const employee = [
    { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
    res.status(200)
        .json({
            data: employee
        });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
    const { id } = req.params;
    const index = employee.findIndex(employee => employee.id === id);
    if (index > -1) {
        employee.splice(index, 1);
        res.status(204)
            .json({
                status: 'success',
                data: null
            });
    }
    else {
        res.status(404).json({message: 'Employee not found'});
    }
};

// TODO
exports.createEmployee = async (req, res, next) => {
    const newEmployee = req.body;
    employee.push(newEmployee);
    res.status(201)
        .json({
            status: 'success',
        });
};
