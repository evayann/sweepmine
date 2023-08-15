import { CameraShake, OrbitControls, OrthographicCamera } from '@react-three/drei';

export interface CameraProps {
    isPaused: boolean;
    isInGame: boolean;
}

export function Camera({ isPaused, isInGame }: CameraProps) {
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
                intensity={isPaused ? 0.1 : undefined}
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
