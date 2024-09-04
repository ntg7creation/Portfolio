import { Html } from "@react-three/drei";
import * as React from 'react';
import Button from '@mui/material/Button';
import { headerStyle, buttonStyle } from "../Styles.jsx";
import { signOut } from "../DataCom/fireBaseCom.js"
const PI = Math.PI


export function LogoutMenu() {

    return <>
        <h1
            style={headerStyle}>Thanks for signing up Please wait for our Admin to approve your account</h1>
        <Button
            variant="contained"
            disableElevation
            style={{ ...buttonStyle, ... ({ top: '40%', left: `40%` }) }}
            onClick={() => signOut()}
        >
            Logout
        </Button>
    </>
}

export default function MainMenu(setface_State, resolution) {

    const buttonStyle = {
        position: 'absolute',
        // width: `${resolution / 4}px`,
        width: '25%',
        // height: `${resolution / 8}px`,
        height: '12.5%',
        // fontSize: `${resolution / 600}rem`,
        fontSize: '2vw',
    };

    // const headerStyle = {
    //     position: 'absolute',
    //     // top: ` ${resolution / 20}`, // Adjust as necessary to position the header above the buttons
    //     top: '5%',
    //     width: '100%',
    //     textAlign: 'center',
    //     fontFamily: 'Rye, serif',
    //     // fontSize: `${resolution / 300}rem`,
    //     fontSize: '4vw',
    // };
    //TODO recive the buttons as props
    const buttons = [
        { positions: { top: '25%', left: `${100 / 6}%` }, rotation: [0, PI / 2, 0], Name: "My Week", cameraPos: "left" },
        { positions: { top: '25%', right: `${100 / 6}%` }, rotation: [PI / 2, 0, 0], Name: "Delete Data", cameraPos: "top" },
        { positions: { left: `${100 / 6}%`, bottom: '25%' }, rotation: [0, PI, 0], Name: "Create Task", cameraPos: "back" },
        // { positions: { right: `${100 / 6}%`, bottom: '25%' }, rotation: [0, -PI / 2, 0], Name: "Create Crew", cameraPos: "right" },
        // { positions: { top: '40%', left: `40%` }, rotation: [-PI / 2, 0, 0], Name: "Temp button", cameraPos: "bottom" },
        { positions: { top: '0%', left: `0%` }, rotation: [0, 0, 0], Name: "Logout", cameraPos: "front" },
    ]



    return (



        <>
            {/* <div style={{ position: 'relative', width: '260px', height: '230px' }}> Adjust height to fit header and buttons */}
            <h1
                style={headerStyle}>Main Menu</h1>

            {buttons.map((value, index) =>
                // { console.log(value) }
                <Button
                    key={index}
                    variant="contained"
                    disableElevation
                    style={{ ...buttonStyle, ... (value.positions) }}
                    onClick={() => 
                        setface_State(value.cameraPos)
                    }
                >
                    {value.Name}
                </Button>
            )}
            <Button
                variant="contained"
                disableElevation
                style={{ ...buttonStyle, ... ({ top: '0%', left: `0%` }) }}
                onClick={() => signOut()}
            >
                Logout
            </Button>





            {/* </div> */}
        </>
    );
}
