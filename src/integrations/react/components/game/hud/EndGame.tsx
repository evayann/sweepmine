/** @jsxImportSource react */

import { MotionHud } from '../../dumb/hud/Hud';

export function EndGameHud() {
    return <p> Test </p>;
    // return (
    //     <MotionHud center animate={{ opacity: 1 }} transition={{ duration: 20 }}>
    //         <div
    //             style={{
    //                 display: 'flex',
    //                 flexDirection: 'column',
    //                 justifyContent: 'center',

    //                 backgroundColor: 'red',

    //                 borderRadius: '2rem',
    //                 padding: '1rem',
    //             }}
    //         >
    //             <p style={{ textAlign: 'center' }}>You {isWin ? 'win' : 'loose'} in XXX secondes !</p>
    //             <Button
    //                 onClick={(e) => {
    //                     e.stopPropagation();
    //                     restartCallback();
    //                 }}
    //             >
    //                 Restart
    //             </Button>
    //         </div>
    //     </MotionHud>
    // );
}
