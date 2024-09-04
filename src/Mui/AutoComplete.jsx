import React, { useState } from 'react';
import { Autocomplete, TextField, Avatar } from '@mui/material';

const employees = [
    { id: 1, name: 'John Doe', avatarUrl: '/path/to/avatar1.jpg' },
    { id: 2, name: 'Jane Smith', avatarUrl: '/path/to/avatar2.jpg' },
    { id: 3, name: 'Alice Johnson', avatarUrl: '/path/to/avatar3.jpg' }
];

const EmployeeAutocomplete = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleSelect = (event, value) => {
        setSelectedEmployee(value);
        console.log('Selected employee:', value);
    };

    return (
        <Autocomplete
            options={employees}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
                <li {...props}>
                    <Avatar alt={option.name} src={option.avatarUrl} sx={{ mr: 2 }} />
                    {option.name}
                </li>
            )}
            renderInput={(params) => <TextField {...params} label="Select Employee" variant="outlined" />}
            onChange={handleSelect}
        />
    );
};

export default EmployeeAutocomplete;
