/** @jsxImportSource react */

import { useGameState } from '~/integrations/react/hooks/useGameState';
import { Button } from '../../dumb/Button';
import { Hud } from '../../dumb/hud/Hud';
import { motion } from 'framer-motion';

export function EndGameHud() {
    const {
        gameStateService: { toMenu, isWin },
    } = useGameState();
    return (
        <Hud center bottom>
            <motion.div
                animate={{ opacity: 1 }}
                transition={{ duration: 20, from: { opacity: 0 } }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',

                    backgroundColor: 'red',

                    borderRadius: '2rem',
                    padding: '1rem',
                }}
            >
                <p style={{ textAlign: 'center' }}>You {isWin() ? 'win' : 'loose'} in XXX secondes !</p>
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        toMenu();
                    }}
                >
                    Restart
                </Button>
            </motion.div>
        </Hud>
    );
}
