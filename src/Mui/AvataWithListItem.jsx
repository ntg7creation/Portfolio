import React from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const employees = [
    { id: 1, name: 'John Doe', avatarUrl: '/path/to/avatar1.jpg', task: 'Design' },
    { id: 2, name: 'Jane Smith', avatarUrl: '/path/to/avatar2.jpg', task: 'Development' },
    { id: 3, name: 'Alice Johnson', avatarUrl: '/path/to/avatar3.jpg', task: 'Testing' }
];

const EmployeeTaskList = () => (
    <List>
        {employees.map((employee) => (
            <ListItem key={employee.id}>
                <ListItemAvatar>
                    <Avatar alt={employee.name} src={employee.avatarUrl} />
                </ListItemAvatar>
                <ListItemText primary={employee.name} secondary={employee.task} />
            </ListItem>
        ))}
    </List>
);

export default EmployeeTaskList;
