import React from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography } from '@mui/material';

const employee = {
    id: 1,
    name: 'John Doe',
    avatarUrl: '/path/to/avatar1.jpg',
    task: 'Design',
    taskDetails: 'Designing the main interface'
};

const EmployeeTaskCard = () => (
    <Card>
        <CardHeader
            avatar={<Avatar alt={employee.name} src={employee.avatarUrl} />}
            title={employee.name}
            subheader={employee.task}
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary">
                Task Details: {employee.taskDetails}
            </Typography>
        </CardContent>
    </Card>
);

export default EmployeeTaskCard;
