import { useState, useEffect } from 'react';

export interface TimerProps {
    initialTimeInSecond?: number;
    incrementInSecond?: number;
}
export const useTimer = ({ initialTimeInSecond = 0, incrementInSecond = 0.1 }: TimerProps = { initialTimeInSecond: 0, incrementInSecond: 0.1 }) => {
    const [time, setTime] = useState(initialTimeInSecond);
    const [isRunning, setIsRunning] = useState(false);

    const incrementInMs = incrementInSecond * 1000;

    useEffect(() => {
        let interval: NodeJS.Timer;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + incrementInSecond);
            }, incrementInMs);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const resetTimer = () => setTime(initialTimeInSecond);

    return { time, isRunning, startTimer, stopTimer, resetTimer };
};