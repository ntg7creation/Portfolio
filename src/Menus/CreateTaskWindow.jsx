import { useState } from 'react';
import Box from '@mui/material/Box';
import { headerStyle } from "../Styles.jsx";
import Button from '@mui/material/Button';
import { TextField, MenuItem, FormControlLabel, Checkbox, FormControl } from '@mui/material';
import { addTask } from "../DataCom/fireBaseFunctionalActions.js"

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DaySelector = ({ selectedDays, setSelectedDays }) => {


    const handleDayChange = (day) => {
        const isSelected = selectedDays.includes(day);
        if (isSelected) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    return (
        // <FormGroup row>
        <div>
            {
                daysOfWeek.map((day) => (
                    <FormControlLabel
                        key={day}
                        control={
                            <Checkbox
                                checked={selectedDays.includes(day)}
                                onChange={() => handleDayChange(day)}
                            />
                        }
                        label={day}
                    />
                ))
            }
        </div>
        //  </FormGroup>
    );
};



function CreateTask() {
    const colours = [
        'white', 'black', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'gray', 'cyan', 'magenta', 'lime', 'maroon', 'navy',
    ]
    const variant = 'filled'; // 'filled' | 'outlined' | 'standard'





    const [taskName, setTaskName] = useState("");
    const [taskColor, setTaskColor] = useState(colours[0]);
    const [etc, setEtc] = useState("");
    const [type, setType] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);

    const createTaskHandler = () => {
        console.log(taskName, taskColor, etc, type, numberOfPeople);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page
        if (selectedDays.length === 0) {
            alert("Please select at least one day to assign the task to");
            return;
        }

        //TODO send data to firebase
        // console.log('Form submitted:', taskName, taskColor, etc, type, numberOfPeople, selectedDays);

        const numPeople = parseInt(numberOfPeople, 10);
        const EstimatedTime = parseInt(etc, 10);
        if (isNaN(numPeople) || isNaN(EstimatedTime)) {
            alert("Number of people and etc must be a number");
            return;
        }
        // TODO if Task alrady exists, alert user or delete it
        addTask(taskName, taskColor, EstimatedTime, type, numPeople, selectedDays).then((seccess) => {
            // console.log("Task created successfully"); // TODO handle error
            if (!seccess) {
                alert("Task already exists please delete it first or choose another name");
                return;
            }
            setTaskName("");
            setTaskColor(colours[0]);
            setEtc("");
            setType("");
            setNumberOfPeople("");
            setSelectedDays([]);
        });
    }

    return <>
        <h1
            style={headerStyle}
        >Create Task</h1>

        <form onSubmit={handleSubmit} style={{ position: 'relative', top: '5%', left: '5%' }}>
            <FormControl fullWidth margin="normal" required
            >


                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '45%' }, // 2x width
                        '& .MuiInputBase-root': { fontSize: '2vw' }, // 2x font size
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            id="Task_Name"
                            label="Task Name"
                            variant={variant}
                            value={taskName}
                            placeholder="Enter task name"
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                        />
                        <TextField
                            id="Task_Color"
                            // label="Task Color"
                            variant={variant}
                            type="search"
                            select
                            value={taskColor}
                            onChange={(e) => setTaskColor(e.target.value)}
                            defaultValue={colours[0]}
                            required

                        >
                            <label htmlFor="Task_Color_Selector">Color</label>
                            {colours.map((color, index) => (
                                <MenuItem key={index} value={color} style={{ color: color }} >
                                    {color}
                                </MenuItem>
                                // <MenuItem key={index} value={color} >{color}</MenuItem>
                            ))}
                        </ TextField>
                        <TextField
                            id="ETC"
                            label="Estimated Time to Complete"
                            variant={variant}
                            value={etc}
                            placeholder="Enter task ETC in Minutes"
                            onChange={(e) => setEtc(e.target.value)}
                            required
                            type="number" />
                        <TextField
                            id="Type"
                            label="Task Type"
                            variant={variant}
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />
                        <TextField
                            id="Number_of_People"
                            label="Number of People"
                            variant={variant}
                            value={numberOfPeople}
                            placeholder="Number of People"
                            onChange={(e) => setNumberOfPeople(e.target.value)}
                            required
                            type="number"
                        />

                    </div>
                </Box >

                <DaySelector selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
            </FormControl >
            <Button type="submit" variant="contained">Submit</Button>
        </form >


    </>


}

export default CreateTask;
