import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import YouTube from 'react-youtube';

const YouTubePlayer = () => {
    const opts = {
        height: '390', // Height of the player
        width: '640', // Width of the player
        playerVars: {
            autoplay: 1, // Auto-play the video
        },
    };

    const onPlayerReady = (event) => {
        event.target.pauseVideo(); // Pause the video initially
    };

    return (
        <div style={{ pointerEvents: 'none', overflow: 'hidden' }}>
            <YouTube videoId="bdokeqAIulQ" opts={opts} onReady={onPlayerReady} style={{ pointerEvents: 'auto' }} />
        </div>
    );
};

export const YoutubeTV = () => {
    return (

        <Html position={[0, 0, 0]} transform occlude style={{ overflow: 'hidden' }}>
            {/* Place the YouTube player inside the Html component */}
            <YouTubePlayer />
        </Html>
    );
};


