import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { headerStyle } from "../Styles.jsx";

import dayjs from 'dayjs';
export default function UserProfile() {
  const variant = 'filled'; // 'filled' | 'outlined' | 'standard'


  return (
    <>
      <h1
        style={headerStyle}
      >User Profile</h1>



      <Box
        style={{ position: 'relative', top: '5%', left: '5%' }}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '45%' }, // 2x width
          '& .MuiInputBase-root': { fontSize: '2vw' }, // 2x font size
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="User_Profile-Name_Box"
            label="Full Name"
            // helperText="Some important text"
            variant={variant}
            required
          />
          <TextField
            required
            id="User_Profile-Gender_Box"
            label="Gender"
            type="search"
            select
            defaultValue=""
            variant={variant}
          >
            <label htmlFor="User_Profile-Gender_Box">Gender</label>
            {/* <MenuItem value="">None</MenuItem> */}
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
            <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              required
              id="User_Profile-Date_of_arrival"
              maxDate={dayjs(new Date()).endOf('day')}

              label="Date of arrival" />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="User_Profile-Date_of_birth"
              label="Date of birth"
              maxDate={dayjs(new Date()).endOf('day')}
            />

          </LocalizationProvider>

          <TextField

            id="User_Profile-Origin"
            label="Origin"
            variant={variant}
          />

          <TextField

            id="User_Profile-Study_Fields"
            label="Study Fields"
            variant={variant}
          />
          <TextField
            id="User_Profile-Spoken_Languages"
            label="Spoken Languages"
            variant={variant}
          />

          {/* <TextField
          id="filled-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant={variant}
        /> */}
        </div>
        <TextField
          id="User_Profile-Dietary_Needs"
          label="Dietary Needs"
          style={{ width: '90%' }}
          variant={variant}
          multiline
          rows={2}
        />
        <TextField
          id="User_Profile-Description"
          label="Description"
          style={{ width: '90%' }}
          variant={variant}
          multiline
          rows={4}
        />

      </Box >




    </>
  );
}

// export default UserProfile;
