/** @jsxImportSource react */

import { Button } from '../dumb/Button';

export interface GameEndMenuProps {
    isWin: boolean;
    restartCallback: () => void;
}

export function GameEndMenu({ isWin, restartCallback }: GameEndMenuProps) {
    return (
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
            <p style={{ textAlign: 'center' }}>You {isWin ? 'win' : 'loose'} in XXX secondes !</p>
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    restartCallback();
                }}
            >
                Restart
            </Button>
        </div>
    );
}
