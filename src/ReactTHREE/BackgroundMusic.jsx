import { useEffect, useRef } from 'react';

const link = "../public/music/walen - Desert Caravan (freetouse.com).mp3"
const link2 = "../public/music/gentle-ocean-waves-birdsong-and-gull-7109.mp3"
export const MusicPlayer = ({ src = link2, volume = 0.2 }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        // Automatically play music on mount
        setTimeout(() => {
            audioRef.current.play();
        }, 1000);

        audioRef.current.volume = volume;
    }, [volume]);

    const togglePlayPause = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    return (
        <div>
            {/* Add audio element */}
            <audio ref={audioRef} loop>
                <source src={src} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {/* Add a button to control playback */}
            <button onClick={togglePlayPause}>Play/Pause</button>
        </div>
    );
};
