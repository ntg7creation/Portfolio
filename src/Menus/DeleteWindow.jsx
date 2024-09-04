import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { headerStyle } from "../Styles.jsx";
import Button from '@mui/material/Button';
import { TextField, MenuItem, Radio, FormControlLabel, RadioGroup, FormControl, Paper } from '@mui/material';
import { deleteCrews, deleteTasks, fetchAllCrewNames, getTasks } from "../DataCom/fireBaseFunctionalActions.js"
import { Color } from 'three';

const tempTask = [{ id: 'task333', Type: 'Cooking', Description: 'go cook', Color: 'yellow', }];
const tempCrew = [{ id: 'TempName' }];

function SelectedPaper(HandleClick = () => { console.log("clicked"); }, task) {
    return (
        //TODO add fade animtion
        <Paper
            sx={{
                height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: task?.Color || 'white',
                userSelect: 'none',
                transition: 'background-color 0.3s',
                // '&:hover': {
                //     backgroundColor: 'red', // Adjust this value to set the hover color
                // },
            }}
            onClick={() => {
                HandleClick();
            }}
        >

            {task?.Name || task.id}
        </Paper>
    )
}

function DeleteWindow() {

    const [shownState, setShownState] = useState("Tasks");
    const [aviailableTasks, setAviailableTasks] = useState(tempTask);
    const [aviailableCrew, setAviailableCrew] = useState(tempCrew);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [selectedCrew, setSelectedCrew] = useState([]);

    const createTaskHandler = () => {
        console.log(taskName, taskColor, etc, type, numberOfPeople);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log("selected tasks : ", selectedTasks, "selected crew :", selectedCrew);

        //TODO: delete data

        // console.log("selected tasks ids : ", selectedTasks.map(task => task.id));
        // console.log("selected crew ids : ", selectedCrew.map(crew => crew.id));

        deleteTasks(selectedTasks.map(task => task.id)).then((data) => {
            //! if deleted
            setSelectedTasks([]);
            getTasks().then((data) => {


                setTimeout(() => {
                    setAviailableTasks(data);
                }, 2000);

            })
        });

        deleteCrews(selectedCrew.map(crew => crew.id)).then((data) => {
            //! if deleted
            setSelectedCrew([]);
            fetchAllCrewNames().then((data) => {

                setTimeout(() => {
                    data = data.filter(task => task.AccessLevel < 3);

                    setAviailableCrew(data);
                }, 2000);


            })
        })

    }

    useEffect(() => {

        // fetchData();
        getTasks().then((data) => {
            setAviailableTasks(data);
            // console.log(data);
        })

        fetchAllCrewNames().then((data) => {
            // console.log(data);
            data = data.filter(task => task.AccessLevel
                < 3);

            setAviailableCrew(data);
        })
        // getCrewName().then((data) => {
        //     // setAviailableCrew(data);
        //     console.log(data);
        // })

    }, [])

    useEffect(() => { }, [shownState])

    return <>
        <h1
            style={headerStyle}
        >Delete Data</h1>


        <form onSubmit={handleSubmit} style={{ position: 'relative', top: '-3%', left: '5%' }}>
            <FormControl fullWidth margin="normal" required
            >
                <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                    defaultValue={"Tasks"}
                    onChange={(event) => setShownState(event.target.value)}
                >
                    <FormControlLabel value="Tasks" control={<Radio />} label="Tasks" />
                    <FormControlLabel value="Crew" control={<Radio />} label="Crew" />
                </RadioGroup>
                <label style={{ fontSize: '1.5vw', position: 'relative', top: '5%', left: '5%' }}>Aviailable Tasks</label>
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
                    gap={2}

                    minHeight={100}
                    maxHeight={150}
                    bgcolor="lightgray"
                    overflow="auto"
                    style={{ position: 'relative', left: '0%', width: '90%' }}
                    sx={{

                        // backgroundColor: 'green',
                        border: '2px solid',
                        outline: '1px solid #00000099',
                        // '& .MuiTextField-root': { m: 1, width: '45%' }, // 2x width
                        // '& .MuiInputBase-root': { fontSize: '2vw' }, // 2x font size
                    }}

                    noValidate
                    autoComplete="off"
                >
                    {shownState == "Tasks" ?
                        aviailableTasks.map((task, index) => (
                        <div key={index}>
                                {SelectedPaper(() => { setSelectedTasks([...selectedTasks, task]), setAviailableTasks(aviailableTasks.filter((_, i) => i !== index)) }, task)}
                            </div>)) :
                        aviailableCrew.map((crew, index) => (
                            <div key={index}>
                                {SelectedPaper(() => { setSelectedCrew([...selectedCrew, crew]), setAviailableCrew(aviailableCrew.filter((_, i) => i !== index)) }, crew)}
                            </div>))
                    }
                </Box >

                <label style={{ fontSize: '1.5vw', position: 'relative', top: '5%', left: '5%' }}>Selected Tasks</label>
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
                    gap={2}

                    minHeight={100}
                    maxHeight={150}
                    bgcolor="lightgray"
                    overflow="auto"
                    style={{ position: 'relative', left: '0%', width: '90%' }}
                    sx={{

                        // backgroundColor: 'green',
                        border: '2px solid',
                        outline: '1px solid #00000099',
                        // '& .MuiTextField-root': { m: 1, width: '45%' }, // 2x width
                        // '& .MuiInputBase-root': { fontSize: '2vw' }, // 2x font size
                    }}

                    noValidate
                    autoComplete="off"
                >
                    {selectedTasks.map((task, index) => (
                        <div key={index}>
                            {SelectedPaper(() => { setAviailableTasks([...aviailableTasks, task]), setSelectedTasks(selectedTasks.filter((_, i) => i !== index)) }, task)}
                        </div>
                    ))}
                    {selectedCrew.map((crew, index) => (
                        <div key={index} >
                            {SelectedPaper(() => { setAviailableCrew([...aviailableCrew, crew]), setSelectedCrew(selectedCrew.filter((_, i) => i !== index)) }, crew)}
                        </div>
                    ))}
                </Box >

                {/* <DaySelector selectedDays={selectedDays} setSelectedDays={setSelectedDays} /> */}
            </FormControl >
            <Button style={{ backgroundColor: 'red', color: 'white', fontSize: '2vw', padding: '1vw', borderRadius: '1vw' }} type="DELETE" variant="contained">DELETE</Button>
            {/* <Button   type="DELETE" variant="contained">Submit</Button> */}
        </form >


    </>


}

export default DeleteWindow;