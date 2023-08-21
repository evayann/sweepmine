import { useCallback, useEffect, useMemo, useState } from "react";

export interface Timer {
    initialTimeInSecond: number;
    incrementInSecond: number;
}

export interface TimeService {
    time: number;
    isRunning: boolean;
    startTimer: (timer?: Timer) => void;
    stopTimer: () => void;
    resetTimer: () => void;
}

export function useTimer(): TimeService {
    const [timer, setTimer] = useState<Timer>(() => ({ initialTimeInSecond: 0, incrementInSecond: 0.1 }));
    const [time, setTime] = useState<number>(() => timer.initialTimeInSecond);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timer;
        const incrementInMs = timer.incrementInSecond * 1000;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + timer.incrementInSecond);
            }, incrementInMs);
        }

        return () => clearInterval(interval);
    }, [isRunning, timer]);

    const resetTimer = useCallback(() => setTime(timer.initialTimeInSecond), [timer.initialTimeInSecond]);
    const stopTimer = useCallback(() => setIsRunning(false), []);
    const startTimer = useCallback((timer?: Timer) => {
        stopTimer();
        if (timer) setTimer(timer);
        setIsRunning(true);
    }, [stopTimer]);

    const memoizedFunctions = useMemo(() => ({ startTimer, stopTimer, resetTimer }), [startTimer, stopTimer, resetTimer]);
    return { time, isRunning, ...memoizedFunctions };
};