
import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useCallback, useEffect } from "react";

import { Vector3, Euler, MathUtils, Group, Object3D } from "three";

export interface ExtendedGroup extends Group {
    children: ExtendedObject3DEvent[];
}

export interface ExtendedObject3DEvent extends Object3D<Event> {
    originalPosition: Vector3;
    originalRotation: Euler;

    directionVector: Vector3;

    targetPosition: Vector3;
    targetRotation: Euler;
}

export interface ExplodeProps {
    group: MutableRefObject<ExtendedGroup>,
    percent: number,
    distance?: number,
    enableRotation?: boolean
}

export const useExplode = ({ group, percent, distance = 3, enableRotation = true }: ExplodeProps) => {
    useEffect(() => {
        const groupWorldPosition = new Vector3();
        group.current.getWorldPosition(groupWorldPosition);

        group.current.children.forEach((mesh) => {
            mesh.originalPosition = mesh.position.clone();
            const meshWorldPosition = new Vector3();
            mesh.getWorldPosition(meshWorldPosition);

            mesh.directionVector = meshWorldPosition
                .clone()
                .sub(groupWorldPosition)
                .normalize();

            mesh.originalRotation = mesh.rotation.clone();
            mesh.targetRotation = new Euler(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
        });
    }, []);

    useEffect(() => {
        group.current.children.forEach((mesh) => {
            mesh.targetPosition = mesh.originalPosition
                .clone()
                .add(mesh.directionVector.clone().multiplyScalar(distance));
        });
    }, [distance]);

    const lerpAllDimension = useCallback((mesh: ExtendedObject3DEvent, property: 'Position' | 'Rotation') => {
        const dimensionKey: ['x', 'y', 'z'] = ['x', 'y', 'z'];
        return dimensionKey.map(key => MathUtils.lerp(
            mesh[`original${property}`][key],
            mesh[`target${property}`][key],
            percent
        ));
    }, []);

    useFrame(() => {
        const explosionStart = percent < 0.00001;

        group.current.children.forEach((mesh) => {
            const isOriginalGroup = mesh.name === "original-group";

            mesh.visible = explosionStart ? isOriginalGroup : !isOriginalGroup;

            if (!mesh.originalPosition) return;
            const [x, y, z] = lerpAllDimension(mesh, 'Position');
            mesh.position.set(x, y, z);


            if (enableRotation) {
                if (!mesh.originalRotation) return;
                const [x, y, z] = lerpAllDimension(mesh, 'Rotation');
                mesh.rotation.set(x, y, z);
            }
        });
    });
};