import { Html } from "@react-three/drei";
import * as React from 'react';
import Button from '@mui/material/Button';
import { headerStyle, buttonStyle } from "../Styles.jsx";
import { getAuthenticated } from "../DataCom/fireBaseFunctionalActions.js"
const PI = Math.PI




export default function LoginMenu() {


    const buttons = [
        { positions: { top: '40%', left: `40%` }, Name: "Login" },
        { positions: { top: '60%', left: `40%` }, Name: "Sign Up" },
    ]



    return (



        <>
            <h1
                style={headerStyle}>Please Login</h1>

            {buttons.map((value, index) =>
                <Button
                    key={index}
                    variant="contained"
                    disableElevation
                    style={{ ...buttonStyle, ... (value.positions) }}
                    onClick={() => {
                        getAuthenticated()

                    }}
                >
                    {value.Name}
                </Button>
            )}

        </>
    );
}
