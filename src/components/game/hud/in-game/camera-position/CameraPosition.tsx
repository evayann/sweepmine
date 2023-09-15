import { ReactComponent as CameraLogo } from '../../../../../assets/camera.svg';
import { useCloseOutsideRef } from '../../../../../hooks/game/useFocus';
import { useGame } from '../../../../../hooks/useGame';
import { Button } from '../../../../dumb';
import { CamPosition } from './camPosition';

import { useRef } from 'react';

import './CameraPosition.css';

export function CameraPosition() {
    const cameraMenuRef = useRef(null);
    const [isCameraMenuOpen, open] = useCloseOutsideRef(cameraMenuRef);
    const {
        cameraService: { setPosition: setCameraPosition },
    } = useGame();

    return (
        <div style={{ position: 'relative' }}>
            <Button invisible onClick={open} style={{ width: '32px', height: '32px' }}>
                <CameraLogo />
            </Button>
            {isCameraMenuOpen && (
                <div ref={cameraMenuRef} className="camera-container">
                    <Button onMouseDown={() => setCameraPosition(CamPosition.Top)}> Top </Button>
                    <Button onMouseDown={() => setCameraPosition(CamPosition.Tilted)}> 45° </Button>
                    <Button onMouseDown={() => setCameraPosition(CamPosition.Corner)}> Corner </Button>
                </div>
            )}
        </div>
    );
}
