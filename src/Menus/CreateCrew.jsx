import { useState } from 'react';
import Box from '@mui/material/Box';
import { headerStyle } from "../Styles.jsx";
import Button from '@mui/material/Button';
import { TextField, FormControl } from '@mui/material';
import { addCrewMember } from "../DataCom/fireBaseFunctionalActions.js"




function CreateCrew() {
    const colours = [
        'white', 'black', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'gray', 'cyan', 'magenta', 'lime', 'maroon', 'navy',
    ]
    const variant = 'filled'; // 'filled' | 'outlined' | 'standard'





    const [crewName, setCrewName] = useState("");
    const [crewEmail, setCrewEmail] = useState("");
    // const [taskColor, setTaskColor] = useState(colours[0]);
    // const [etc, setEtc] = useState("");
    // const [type, setType] = useState("");
    // const [numberOfPeople, setNumberOfPeople] = useState("");
    // const [selectedDays, setSelectedDays] = useState([]);

    const createTaskHandler = () => {
        console.log("crewName", crewName, "crewEmail", crewEmail);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page


        addCrewMember(crewName, crewEmail).then(() => {
            // console.log("Task created successfully"); // TODO handle error
        });
    }

    return <>
        <h1
            style={headerStyle}
        >Create Crew</h1>

        <form onSubmit={handleSubmit} style={{ position: 'relative', top: '5%', left: '5%' }}>
            <FormControl fullWidth margin="normal" required>


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
                            id="Crew_Name"
                            label="Crew Name"
                            variant={variant}
                            value={crewName}
                            placeholder="Enter crew member name"
                            onChange={(e) => setCrewName(e.target.value)}
                            required
                        />
                        <TextField
                            id="Crew_Email"
                            label="Crew Email"
                            variant={variant}
                            value={crewEmail}
                            placeholder="Enter crew member email"
                            onChange={(e) => setCrewEmail(e.target.value)}
                            required
                        />
                        {/* <TextField
                            id="Task_Color"
                            label="Task Color"
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
                        /> */}

                    </div>
                </Box >

            </FormControl >
            <Button type="submit" variant="contained">Submit</Button>
        </form >


    </>


}

export default CreateCrew;
