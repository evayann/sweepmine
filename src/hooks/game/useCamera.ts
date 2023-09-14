import { useMemo, useState } from "react";
import { Vector3 } from "three"

export interface CameraService {
    setPosition: (vector: Vector3) => void;
    position: Vector3;
}
export function useCameraService(): CameraService {
    const [position, setPosition] = useState(new Vector3(0, 0, 0));

    return useMemo(() => ({
        position, setPosition
    }), [position]);
}
