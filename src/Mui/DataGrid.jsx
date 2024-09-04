import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'task', headerName: 'Task', width: 200 },
    { field: 'taskDetails', headerName: 'Task Details', width: 250 },
];

const employees = [
    { id: 1, name: 'John Doe', task: 'Design', taskDetails: 'Designing the main interface' },
    { id: 2, name: 'Jane Smith', task: 'Development', taskDetails: 'Implementing the backend' },
    { id: 3, name: 'Alice Johnson', task: 'Testing', taskDetails: 'Testing the application' }
];

const EmployeeTaskTable = () => (
    <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={employees} columns={columns} pageSize={5} />
    </div>
);

export default EmployeeTaskTable;
