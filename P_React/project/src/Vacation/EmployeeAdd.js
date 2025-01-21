import React, { useState } from 'react';

const EmployeeAdd = () => {
    const [employee, setEmployee] = useState({
        name: '',
        position: '',
        department: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission, e.g., send data to API
        console.log('Employee added:', employee);
    };

    return (
        <div>
            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Position:</label>
                    <input
                        type="text"
                        name="position"
                        value={employee.position}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default EmployeeAdd;