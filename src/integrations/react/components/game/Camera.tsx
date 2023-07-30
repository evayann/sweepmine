/** @jsxImportSource react */

import { CameraShake, OrbitControls } from '@react-three/drei';

export interface CameraProps {
    enableControl: boolean;
}

export function Camera({ enableControl }: CameraProps) {
    return (
        <>
            <OrbitControls makeDefault maxPolarAngle={Math.PI / 2} minZoom={30} maxZoom={75} enabled={enableControl} />
            <CameraShake
                maxPitch={0.05}
                maxRoll={0.05}
                maxYaw={0.05}
                pitchFrequency={0.3}
                rollFrequency={0.3}
                yawFrequency={0.3}
            />
        </>
    );
}
