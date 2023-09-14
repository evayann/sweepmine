import { GizmoHelper, OrbitControls, OrthographicCamera, ShakeController, useGizmoContext } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { MOUSE, TOUCH } from 'three';
import { useGame } from '../../../hooks/useGame';

export interface CameraProps {
    isPaused: boolean;
    isInGame: boolean;
    canMove: boolean;
}

export function Camera({ isPaused, isInGame, canMove }: CameraProps) {
    const shakeController = useRef<ShakeController | undefined>();

    useEffect(() => {
        shakeController.current?.setIntensity(!isPaused ? 10 : 0);
    }, [isPaused]);

    return (
        <>
            <OrbitControls
                makeDefault
                maxPolarAngle={Math.PI / 2}
                minZoom={30}
                maxZoom={75}
                enabled={!isPaused && isInGame && canMove}
                mouseButtons={{
                    LEFT: MOUSE.ROTATE,
                    MIDDLE: undefined,
                    RIGHT: undefined,
                }}
                touches={{
                    ONE: TOUCH.ROTATE,
                    TWO: TOUCH.DOLLY_PAN,
                }}
            />

            <GizmoHelper>
                <CameraUpdate />
            </GizmoHelper>

            {/* <CameraShake
                ref={shakeController}
                maxPitch={0.05}
                maxRoll={0.05}
                maxYaw={0.05}
                pitchFrequency={0.3}
                rollFrequency={0.3}
                yawFrequency={0.3}
            /> */}
            <OrthographicCamera makeDefault position={[10, 5, 10]} zoom={40} />
        </>
    );
}

function CameraUpdate() {
    const {
        cameraService: { position: cameraPosition },
    } = useGame();
    const { tweenCamera } = useGizmoContext();

    useEffect(() => {
        tweenCamera(cameraPosition);
    }, [cameraPosition, tweenCamera]);
    return <></>;
}
