import { ReactComponent as CameraLogo } from '../../../../../assets/camera.svg';
import { useGame } from '../../../../../hooks/useGame';
import { Button } from '../../../../dumb';
import { CamPosition } from './camPosition';

import './CameraPosition.css';

export function CameraPosition() {
    const {
        cameraService: { setPosition: setCameraPosition },
    } = useGame();

    return (
        <div className="camera-container">
            <CameraLogo className="camera-logo" width="32px" height="32px" />
            <Button onClick={() => setCameraPosition(CamPosition.Top)}> Top </Button>
            <Button onClick={() => setCameraPosition(CamPosition.Tilted)}> 45° </Button>
            <Button onClick={() => setCameraPosition(CamPosition.Corner)}> Corner </Button>
        </div>
    );
}
