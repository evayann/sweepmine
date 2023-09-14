import { ClickAction } from '../../../../hooks/game/useGameInformation';
import { useGame } from '../../../../hooks/useGame';
import { RadioButton } from '../../../dumb';

export function ClickActionRadioButton() {
    const {
        gameInformationService: { clickAction },
    } = useGame();

    const actionBydisplayName: Record<string, ClickAction> = {
        Bomb: 'reveal',
        Flag: 'flag',
        'Move Camera': 'camera',
    };

    return (
        <RadioButton
            id="click-state"
            defaultSelected="Bomb"
            list={Object.keys(actionBydisplayName)}
            onChange={(itemSelected: string) => clickAction(actionBydisplayName[itemSelected])}
        ></RadioButton>
    );
}
