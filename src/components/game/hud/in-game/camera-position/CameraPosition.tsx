import { ReactComponent as CameraLogo } from '../../../../../assets/camera.svg';
import { useGame } from '../../../../../hooks/useGame';
import { Button } from '../../../../dumb';
import { CamPosition } from './camPosition';

import './CameraPosition.css';
import { useState } from 'react';

export function CameraPosition() {
    const [toggleCameraMenu, setToggleCameraMenu] = useState(false);
    const {
        cameraService: { setPosition: setCameraPosition },
    } = useGame();

    return (
        <div style={{ position: 'relative' }}>
            <Button
                invisible
                onClick={() => setToggleCameraMenu(!toggleCameraMenu)}
                style={{ width: '32px', height: '32px' }}
            >
                <CameraLogo />
            </Button>
            {toggleCameraMenu && (
                <div className="camera-container">
                    <Button onClick={() => setCameraPosition(CamPosition.Top)}> Top </Button>
                    <Button onClick={() => setCameraPosition(CamPosition.Tilted)}> 45° </Button>
                    <Button onClick={() => setCameraPosition(CamPosition.Corner)}> Corner </Button>
                </div>
            )}
        </div>
    );
}
