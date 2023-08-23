import { motion } from 'framer-motion';
import { useGame } from '../../../hooks/useGame';
import { HudRoot, Hud, Button } from '../../dumb';

export function EndGameHud() {
    const {
        gameStateService: { toMenu, isWin },
        gameTimeService: { time },
    } = useGame();
    return (
        <HudRoot>
            <Hud center bottom>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',

                        backgroundColor: 'red',

                        borderRadius: '2rem',
                        padding: '1rem',
                    }}
                >
                    <p style={{ textAlign: 'center' }}>
                        You {isWin ? 'win' : 'loose'} in {time.toFixed(1)} secondes !
                    </p>
                    <Button
                        onClick={(mouseEvent: React.MouseEvent) => {
                            mouseEvent.stopPropagation();
                            toMenu();
                        }}
                    >
                        Restart
                    </Button>
                </motion.div>
            </Hud>
        </HudRoot>
    );
}
