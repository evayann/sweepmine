import { AnimatePresence, motion } from 'framer-motion';
import { useGameState } from '../../../hooks/useGameState';
import { Button } from '../../dumb/Button';
import { Hud } from '../../dumb/hud/Hud';
import { RadioButton } from '../../dumb/radio-button/radio-button';

export function GameHud() {
    const {
        gameTimeService: { time, stopTimer, startTimer, isRunning },
        gameStateService: { play, pause },
    } = useGameState();

    const togglePause = () => {
        if (isRunning) {
            stopTimer();
            pause();
            return;
        }

        startTimer();
        play();
    };

    const animationsProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1 },
        exit: { opacity: 0 },
    };
    return (
        <AnimatePresence>
            <Hud
                {...animationsProps}
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
                {...animationsProps}
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
        </AnimatePresence>
    );
}
