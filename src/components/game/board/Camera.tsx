import { CameraShake, OrbitControls, OrthographicCamera, ShakeController } from '@react-three/drei';
import { useEffect, useRef } from 'react';

export interface CameraProps {
    isPaused: boolean;
    isInGame: boolean;
}

export function Camera({ isPaused, isInGame }: CameraProps) {
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
                enabled={!isPaused && isInGame}
            />
            <CameraShake
                ref={shakeController}
                maxPitch={0.05}
                maxRoll={0.05}
                maxYaw={0.05}
                pitchFrequency={0.3}
                rollFrequency={0.3}
                yawFrequency={0.3}
            />
            <OrthographicCamera makeDefault position={[10, 5, 10]} zoom={40} />
        </>
    );
}
