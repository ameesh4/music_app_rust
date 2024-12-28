import { useState } from "react";

export const useSound = () => {
    const [ audio, setAudio ] = useState() as any;

    const playUrl = (url: string) => {
        setAudio(new Audio(url));
        audio.play();
    };

    const play = () => {
        audio.play();
    }

    const pause = () => {
        audio.pause();
    }

    return {
        playUrl,
        play,
        pause
    }
}