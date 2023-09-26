// import { Outlines } from '@react-three/drei';
// import { useLoader } from '@react-three/fiber';
// import { useMemo } from 'react';
// import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

// export function Flag() {
//     const svgData = useLoader(SVGLoader, FlagSvg);
//     const shapes = useMemo(() => {
//         return svgData.paths.flatMap((p, index) => p.toShapes(true).map((shape) => ({ shape, color: g.color, index })));
//     }, [svgData]);

//     return (
//         <mesh scale={0.05} position={[-0.7, 0.5, 0]}>
//             {/* {shapes.map((s, i) => (
//                 <shapeBufferGeometry
//                     key={i}
//                     args={[
//                         s,
//                         {
//                             depth: 1,
//                             bevelEnabled: false,
//                             steps: 30,
//                         },
//                     ]}
//                 />
//             ))} */}
//             <shapeGeometry args={shapes} />
//             <meshBasicMaterial color="black" />
//             <Outlines outlineColor="white" outlineWidth={3} />
//         </mesh>
//     );
// }

import { MeshBasicMaterialProps, MeshProps, Object3DProps, useLoader } from '@react-three/fiber';
import { Fragment, useEffect, useMemo } from 'react';
import { DoubleSide } from 'three';
import { SVGLoader } from 'three-stdlib';
import FlagSvg from '../../../assets/flag.svg';
import { Outlines } from '@react-three/drei';

export interface SvgProps extends Omit<Object3DProps, 'ref'> {
    skipStrokes?: boolean;
    fillMaterial?: MeshBasicMaterialProps;
    strokeMaterial?: MeshBasicMaterialProps;
    fillMeshProps?: MeshProps;
    strokeMeshProps?: MeshProps;
}

export function Flag({
    skipStrokes,
    fillMaterial,
    strokeMaterial,
    fillMeshProps,
    strokeMeshProps,
    ...props
}: SvgProps) {
    const svg = useLoader(SVGLoader, FlagSvg);

    const strokeGeometries = useMemo(
        () =>
            skipStrokes
                ? []
                : svg.paths.map((path) =>
                      path.userData?.style.stroke === undefined || path.userData.style.stroke === 'none'
                          ? null
                          : path.subPaths.map((subPath) =>
                                SVGLoader.pointsToStroke(subPath.getPoints(), path.userData!.style)
                            )
                  ),
        [svg, skipStrokes]
    );

    useEffect(() => {
        return () => strokeGeometries.forEach((group) => group && group.map((g) => g.dispose()));
    }, [strokeGeometries]);

    return (
        <object3D {...props}>
            <object3D scale={[1, -1, 1]}>
                {svg.paths.map((path, p) => (
                    <Fragment key={p}>
                        {!skipStrokes &&
                            path.userData?.style.stroke !== undefined &&
                            path.userData.style.stroke !== 'none' &&
                            path.subPaths.map((_subPath, s) => (
                                <mesh key={s} geometry={strokeGeometries[p]![s]} {...strokeMeshProps}>
                                    <meshBasicMaterial
                                        color={path.userData!.style.stroke}
                                        opacity={path.userData!.style.strokeOpacity}
                                        transparent={true}
                                        side={DoubleSide}
                                        depthWrite={false}
                                        {...strokeMaterial}
                                    />
                                    {/* <Outlines
                                        color="white"
                                        thickness={3}
                                        screenspace={false}
                                        opacity={1}
                                        angle={5}
                                        transparent={false}
                                    /> */}
                                </mesh>
                            ))}
                    </Fragment>
                ))}
            </object3D>
        </object3D>
    );
}
