import { Hud } from '../../dumb/hud/Hud';
import { RadioButton } from '../../dumb/radio-button/radio-button';

export function GameHud() {
    return (
        <Hud
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <RadioButton id="left-click" defaultSelected="bomb" list={['bomb', 'flag']}></RadioButton>
            {/* <p> Time : {time.toFixed(1)} seconds</p>     */}
        </Hud>
    );
}
