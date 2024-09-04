import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: '#f5f5f5',
        cursor: 'pointer'
    }
}));

const employees = [
    { id: 1, name: 'John Doe', avatarUrl: '/path/to/avatar1.jpg', jobDescription: 'Designing the main interface' },
    { id: 2, name: 'Jane Smith', avatarUrl: '/path/to/avatar2.jpg', jobDescription: 'Implementing the backend' }
];




const EmployeeTable = () => {
    const handleClick = () => {
        console.log('click');
    };

    return (

        <TableContainer component={Paper}
            style={{
                width: '400px',
                height: '200px',
                // transform: 'scale(0.8)',
                transformOrigin: 'top left',
            }}>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Employee</TableCell>
                        <TableCell>Job Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <StyledTableRow key={employee.id} onClick={handleClick}>
                            <TableCell component="th" scope="row" style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar alt={employee.name} src={employee.avatarUrl} sx={{ mr: 1 }} />
                                {employee.name}
                            </TableCell>
                            <TableCell>{employee.jobDescription}</TableCell>
                        </StyledTableRow>
                    ))}
                    {Array.from(Array(4 - employees.length).keys()).map((_, index) => (
                        <StyledTableRow key={`empty-${index}`} onClick={handleClick}>
                            <TableCell component="th" scope="row" style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ mr: 1 }} />
                                Empty Slot
                            </TableCell>
                            <TableCell>Click to assign yourself</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>



    );
};

export default EmployeeTable;
