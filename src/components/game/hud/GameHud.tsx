import { useEffect, useState } from 'react';
import { useGameState } from '../../../hooks/useGameState';
import { Button } from '../../dumb/Button';
import { Hud } from '../../dumb/hud/Hud';
import { RadioButton } from '../../dumb/radio-button/radio-button';
import { useAnimate, useMotionValue } from 'framer-motion';
import { HudRoot } from '../../dumb/hud/HudRoot';
import { range } from '../../../utils/iteration';

export function GameHud() {
    const {
        gameTimeService: { time, stopTimer, startTimer, isRunning },
        gameStateService: { play, pause },
    } = useGameState();

    const counterTagName = 'ready-text';
    const counterTag = `#${counterTagName}`;
    const counter = useMotionValue('Ready ?');
    const displayCounter = useMotionValue(true);

    const togglePause = () => {
        if (isRunning) {
            stopTimer();
            pause();
            return;
        }

        startTimer();
        play();
    };

    const [scope, animate] = useAnimate();

    useEffect(() => {
        const counterDuration = 3;
        const counterValueList = range(1, counterDuration + 1, 1)
            .map((value) => `${value}`)
            .reverse();
        const scaleUp = async () => animate(counterTag, { scale: [1, 2, 1] }, { duration: 1 });
        const animationSequence = async () => {
            const valueList = ['Ready ?', ...counterValueList, 'Go !'];

            for await (const counterValue of valueList) {
                await animate(counter, counterValue);
                await scaleUp();
            }

            await animate(displayCounter, false);

            startTimer();
            play();
        };
        animationSequence();
    }, [animate, counter, counterTag]);

    return (
        <HudRoot ref={scope}>
            <Hud
                id="game-information"
                key={'Information'}
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <RadioButton id="left-click" defaultSelected="bomb" list={['bomb', 'flag']}></RadioButton>
                <p> Time : {time.toFixed(1)} seconds</p>
            </Hud>
            <Hud
                id="pause-button"
                key={'Pause'}
                margin={'5%'}
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'start',
                }}
            >
                <Button onClick={togglePause}> {isRunning ? 'Pause' : 'Play'} </Button>
            </Hud>
            {displayCounter.get() && (
                <Hud id={counterTagName} center>
                    <p> {counter.get()} </p>
                </Hud>
            )}
        </HudRoot>
    );
}
