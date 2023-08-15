import { motion } from 'framer-motion';
import { useGameState } from '../../../hooks/useGameState';
import { Button } from '../../dumb/Button';
import { Hud } from '../../dumb/hud/Hud';

export function EndGameHud() {
    const {
        gameStateService: { toMenu, isWin },
    } = useGameState();
    return (
        <Hud center bottom>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 20 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',

                    backgroundColor: 'red',

                    borderRadius: '2rem',
                    padding: '1rem',
                }}
            >
                <p style={{ textAlign: 'center' }}>You {isWin ? 'win' : 'loose'} in XXX secondes !</p>
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
    );
}
