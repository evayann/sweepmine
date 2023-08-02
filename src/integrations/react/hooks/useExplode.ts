import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useEffect } from "react";

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

    useFrame(() => {
        group.current.children.forEach((mesh) => {
            if (percent < 0.00001) {
                if (mesh.name === "origin") {
                    mesh.visible = true;
                } else {
                    mesh.visible = false;
                }
            }
            else {
                if (mesh.name === "origin") {
                    mesh.visible = false;
                } else {
                    mesh.visible = true;
                }
            }

            mesh.position.x = MathUtils.lerp(
                mesh.originalPosition.x,
                mesh.targetPosition.x,
                percent
            );
            mesh.position.y = MathUtils.lerp(
                mesh.originalPosition.y,
                mesh.targetPosition.y,
                percent
            );
            mesh.position.z = MathUtils.lerp(
                mesh.originalPosition.z,
                mesh.targetPosition.z,
                percent
            );

            if (enableRotation) {
                mesh.rotation.x = MathUtils.lerp(
                    mesh.originalRotation.x,
                    mesh.targetRotation.x,
                    percent
                );
                mesh.rotation.y = MathUtils.lerp(
                    mesh.originalRotation.y,
                    mesh.targetRotation.y,
                    percent
                );
                mesh.rotation.z = MathUtils.lerp(
                    mesh.originalRotation.z,
                    mesh.targetRotation.z,
                    percent
                );
            }
        });
    });
};