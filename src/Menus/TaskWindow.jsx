import { useEffect, useState } from 'react';
import EmployeeTable from "../Mui/TableCLicker.jsx"

import { Paper, Typography, Divider, Box } from '@mui/material';
import { headerStyle, dataStyle, BoxStyle, paragraphStyle } from "../Styles.jsx";
import Background from 'three/examples/jsm/renderers/common/Background.js';
import { assignToTask, unassignFromTask, getTaskInstance } from "../DataCom/fireBaseFunctionalActions.js"



const emptydata = {
    id: undefined,
    Job_Title: 'Empty Slot',
    name: 'this slot is empty click to add a new note',
}





const loadingTaskInstance = {
    id: "PuUS1minRnyynrAFnZiJ",
    name: "loading...",
    Job_Title: "loading...",
    NumberOfSlots: 1,
    EstimatedTimeToComplete: 0,
    Description: "loading...",
    Type: "loading...",
    requiredAccessLevel: 0,
    Location: { "latitude": 0, "longitude": 0 },
    AssignedCrew: ["tempID"],
    AssignedCrewName: ["tempName"],
    Date: {
        nanoseconds: 0,
        seconds: 0
    }
}

function NoteComponent({ maxWidth, maxHeight, AssigendCrew = emptydata, Name = undefined, onClick = () => { console.log("clicked") } }) {

    return (
        <Paper elevation={3}
            sx={{
                padding: 2,
                margin: '16px 0',
                maxWidth: maxWidth,
                maxHeight: maxHeight,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                transition: 'background-color 0.3s',
                '&:hover': {
                    backgroundColor: !(AssigendCrew.id) ? 'rgba(0, 255, 0, 0.9)' : 'rgba(255, 0, 0, 0.9)', // Adjust this value to set the hover color
                },

            }}
            onClick={onClick}
        >
            <Typography variant="h5" component="h2">
                {AssigendCrew.Job_Title}
            </Typography>
            <Divider style={{ margin: '6px 0' }} />
            <Box>
                <Typography variant="body1">
                    {Name ? Name : "Empty Slot Click here to assign yourself to task"}
                </Typography>
            </Box>
        </Paper>
    );
};


function generateNotes(taskInstance, unAssgenSelf, assigenSelf) {
    return (
        <Box
            style={{
                ...BoxStyle,
                //  backgroundColor: '#FFFFFF',
                display: 'grid',
                gridTemplateColumns: 'auto auto auto',
                height: '80%',
            }}
        >
            {Array(taskInstance.NumberOfSlots).fill(0).map((_, index) =>
                index < taskInstance.AssignedCrew.length ?
                    <NoteComponent
                        key={index}
                        Name={taskInstance.AssignedCrewName[index]}
                        AssigendCrew={{
                            id: 1,
                            Job_Title: 'Slot ' + (index + 1),
                            name: 'this slot is empty click to add a new note',
                        }}
                        onClick={() => unAssgenSelf(taskInstance.name, taskInstance.id)}
                    />

                    : <NoteComponent
                        key={index}
                        onClick={() => assigenSelf(taskInstance.name, taskInstance.id)}
                    />
            )}

        </Box>
    );
}


export default function TaskComponent(props) {
    const taskInstance = props.taskInstance ? props.taskInstance : loadingTaskInstance;

    const [notes, setNotes] = useState()

    const fetchingCrew = () => {
        getTaskInstance(taskInstance.name, taskInstance.id).then((data) => {
            // console.log("data : ", data)
            //! assignedCrewName is lower case due to it not exist in firebase
            const { AssignedCrew, assignedCrewName } = data;
            const additionalSlots = taskInstance.NumberOfSlots - AssignedCrew.length;
            const updatedArray = [...AssignedCrew];
            const updatedArrayName = [...assignedCrewName];

            taskInstance.AssignedCrew = updatedArray
            taskInstance.AssignedCrewName = updatedArrayName

            setTimeout(() => {
                setNotes(generateNotes(taskInstance, unAssgenSelf, assigenSelf));
            }, 2000);
            //! bug sometimes this runs before the data is fetched or before the data is updated
            setNotes(generateNotes(taskInstance, unAssgenSelf, assigenSelf));
        });
    }
    const assigenSelf = (taskName, taskID) => {
        //TODO deal with loading data
        assignToTask(taskName, taskID).then(() => {
            fetchingCrew()
        })

    }

    const unAssgenSelf = (taskName, taskID) => {
        //TODO deal with loading data
        // console.log("unAssgenSelf")
        unassignFromTask(taskName, taskID).then(() => {
            fetchingCrew()
        })

    }

    useEffect(() => {
        setNotes(generateNotes(taskInstance, unAssgenSelf, assigenSelf))

    }, [taskInstance])


    return (
        < >
            <h2
                style={{
                    position: 'absolute',
                    right: '9%',
                    top: '5%'
                }}
            >Task Type
                {/* {props.tempstate} */}
                <p style={paragraphStyle}>
                    {taskInstance.Type}
                </p>
            </h2>
            <h1
                style={headerStyle}>Task Window

            </h1>

            <Box style={{
                ...BoxStyle,
                // backgroundColor: '#FF0000',
                display: 'grid',
                top: '5%',
                height: '80%',
            }} 
            >

                <Box style={{
                    ...BoxStyle,
                    // backgroundColor: '#00FF00',
                    display: 'grid',
                    gridTemplateColumns: 'auto auto',
                }}>
                    <h2 style={dataStyle}>
                        Task Date: 
                        <p style={paragraphStyle}>
                            {new Date(taskInstance.Date.seconds * 1000).toUTCString()}
                        </p>
                    </h2>
                    <h2 style={dataStyle} >
                        ETC:
                        <p style={paragraphStyle}>
                            {taskInstance.EstimatedTimeToComplete} Miniutes
                        </p>
                    </h2>
                    <h3 style={dataStyle}>
                        Task description
                        <p style={paragraphStyle}>
                            {taskInstance.Description}
                        </p>
                    </h3>

                </Box>

                {notes}

            </Box>

        </>
    )
}
