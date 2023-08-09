/** @jsxImportSource react */

import { useGameState } from '~/integrations/react/hooks/useGameState';
import { Button } from '../../dumb/Button';
import { MotionHud } from '../../dumb/hud/Hud';

export function EndGameHud() {
    const {
        gameStateService: { toMenu, isWin },
    } = useGameState();
    return (
        <MotionHud center bottom animate={{ opacity: 1 }} transition={{ duration: 20 }}>
            <div
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
            </div>
        </MotionHud>
    );
}
