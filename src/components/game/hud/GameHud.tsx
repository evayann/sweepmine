import { useAnimate, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGame } from '../../../hooks/useGame';
import { range } from '../../../utils/iteration';
import { Hud, HudRoot } from '../../dumb';
import { ClickActionRadioButton } from './in-game/ClickActionRadioButton';
import { BoardSettings } from './in-game/board-settings/BoardSettings';
import { CameraPosition } from './in-game/camera-position/CameraPosition';
import { PlayPauseButton } from './in-game/play-pause-button/PlayPauseButton';

export function GameHud() {
    const {
        gameTimeService: { time, stopTimer, startTimer, isRunning },
        gameInformationService: { dimension, editGameInformation },
        gameStateService,
    } = useGame();

    const counterTagName = 'ready-text';
    const counterTag = `#${counterTagName}`;
    const [counterText, setCounterText] = useState(() => 'Ready ?');
    const gameStart = useMotionValue(false);

    const togglePause = () => {
        if (isRunning) {
            stopTimer();
            gameStateService.pause();
            return;
        }

        startTimer();
        gameStateService.play();
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
            gameStateService.play();
        };
        animationSequence();
    }, [animate, counterTag]);

    return (
        <HudRoot ref={scope}>
            {gameStart.get() && !gameStateService.isPaused && (
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
                    <ClickActionRadioButton />
                    <p> Time : {time.toFixed(1)} seconds</p>
                </Hud>
            )}
            {gameStart.get() && (
                <Hud
                    id="pause-button"
                    key={'Pause'}
                    margin={'5rem'}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'start',
                        gap: '5px',
                    }}
                >
                    <PlayPauseButton onClick={togglePause} isPaused={!isRunning} />
                    <CameraPosition />
                    <BoardSettings
                        width={dimension.x}
                        height={dimension.y}
                        updateDimension={(newDimension) => {
                            editGameInformation({ dimension: newDimension });
                        }}
                    />
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
