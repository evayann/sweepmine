import { useAnimate, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGame } from '../../../hooks/useGame';
import { range } from '../../../utils/iteration';
import { HudRoot, Hud, RadioButton, Button } from '../../dumb';
import { BoardDimension } from './in-game/board-dimension/BoardDimension';
import { CameraPosition } from './in-game/camera-position/CameraPosition';

export function GameHud() {
    const {
        gameTimeService: { time, stopTimer, startTimer, isRunning },
        gameStateService: { play, pause, clickAction },
    } = useGame();

    const counterTagName = 'ready-text';
    const counterTag = `#${counterTagName}`;
    const [counterText, setCounterText] = useState(() => 'Ready ?');
    const gameStart = useMotionValue(false);

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
                setCounterText(counterValue);
                await scaleUp();
            }

            await animate(gameStart, true);

            startTimer();
            play();
        };
        animationSequence();
    }, [animate, counterTag]);

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
                <RadioButton
                    id="click-state"
                    defaultSelected="bomb"
                    list={['bomb', 'flag']}
                    onChange={(itemSelected: string) => clickAction(itemSelected === 'flag' ? 'flag' : 'reveal')}
                ></RadioButton>
                <p> Time : {time.toFixed(1)} seconds</p>
            </Hud>
            {gameStart.get() && (
                <Hud
                    id="pause-button"
                    key={'Pause'}
                    margin={'5rem'}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'start',
                    }}
                >
                    <Button onClick={togglePause}> {isRunning ? 'Pause' : 'Play'} </Button>
                    <CameraPosition />
                    <BoardDimension />
                </Hud>
            )}
            {!gameStart.get() && (
                <>
                    <Hud id={counterTagName} center>
                        <p> {counterText} </p>
                    </Hud>
                </>
            )}
        </HudRoot>
    );
}
