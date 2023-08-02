/** @jsxImportSource react */

/*
Generated by: https://github.com/pmndrs/gltfjsx
Modified by hand.
Command: npx gltfjsx@6.2.10 bomb.glb -o bomb.jsx -r public 
*/

import { forwardRef, useRef } from 'react';
import bomb from './bomb.glb';
import { useGLTF } from '@react-three/drei';

export const BombModel = forwardRef(function (props, ref) {
    const { nodes, materials } = useGLTF(bomb);

    return (
        <group {...props} dispose={null} ref={ref}>
            <mesh
                geometry={nodes.Bomb_cell.geometry}
                material={materials['Black.002']}
                position={[0.13, -0.289, 0.391]}
            />
            <group position={[-0.319, 1.046, -0.011]}>
                <mesh geometry={nodes.Bomb_cell080.geometry} material={materials['Black.002']} />
                <mesh geometry={nodes.Bomb_cell080_1.geometry} material={materials['White.001']} />
            </group>
            <group position={[-0.307, 1.126, -0.007]}>
                <mesh geometry={nodes.Bomb_cell001_1.geometry} material={materials['Black.002']} />
                <mesh geometry={nodes.Bomb_cell001_2.geometry} material={materials['White.001']} />
            </group>
            <group position={[-0.346, 0.959, -0.037]}>
                <mesh geometry={nodes.Bomb_cell002_1.geometry} material={materials['Black.002']} />
                <mesh geometry={nodes.Bomb_cell002_2.geometry} material={materials['White.001']} />
            </group>
            <group position={[-0.109, 0.656, -0.038]}>
                <mesh geometry={nodes.Bomb_cell003_1.geometry} material={materials['Black.002']} />
                <mesh geometry={nodes.Bomb_cell003_2.geometry} material={materials['DarkMetal.001']} />
            </group>
            <mesh
                geometry={nodes.Bomb_cell006.geometry}
                material={materials['Black.002']}
                position={[-0.41, 0.326, -0.191]}
            />
            <mesh
                geometry={nodes.Bomb_cell007.geometry}
                material={materials['Black.002']}
                position={[0.357, 0.067, -0.413]}
            />
            <group position={[-0.08, 0.813, -0.014]}>
                <mesh geometry={nodes.Bomb_cell006_1.geometry} material={materials['Black.002']} />
                <mesh geometry={nodes.Bomb_cell006_2.geometry} material={materials['White.001']} />
            </group>
            <mesh
                geometry={nodes.Bomb_cell012.geometry}
                material={materials['Black.002']}
                position={[0.293, 0.245, -0.069]}
            />
            <group position={[0.042, 0.59, -0.112]}>
                <mesh geometry={nodes.Bomb_cell008.geometry} material={materials['Black.002']} />
                <mesh geometry={nodes.Bomb_cell008_1.geometry} material={materials['DarkMetal.001']} />
            </group>
            <mesh
                geometry={nodes.Bomb_cell018.geometry}
                material={materials['Black.002']}
                position={[-0.054, -0.483, 0.135]}
            />
            <mesh
                geometry={nodes.Bomb_cell021.geometry}
                material={materials['Black.002']}
                position={[-0.398, -0.03, -0.305]}
            />
            <group position={[-0.092, 0.541, -0.174]}>
                <mesh geometry={nodes.Bomb_cell011.geometry} material={materials['Black.002']} />
                <mesh geometry={nodes.Bomb_cell011_1.geometry} material={materials['DarkMetal.001']} />
            </group>
            <group position={[-0.19, 0.472, -0.005]}>
                <mesh geometry={nodes.Bomb_cell012_1.geometry} material={materials['Black.002']} />
                <mesh geometry={nodes.Bomb_cell012_2.geometry} material={materials['DarkMetal.001']} />
            </group>
            <group position={[-0.264, 0.904, -0.006]}>
                <mesh geometry={nodes.Bomb_cell013_1.geometry} material={materials['Black.002']} />
                <mesh geometry={nodes.Bomb_cell013_2.geometry} material={materials['White.001']} />
            </group>
            <mesh
                geometry={nodes.Bomb_cell031.geometry}
                material={materials['Black.002']}
                position={[-0.456, 0.22, -0.017]}
            />
            <group position={[0.005, 0.617, 0.113]}>
                <mesh geometry={nodes.Bomb_cell015.geometry} material={materials['Black.002']} />
                <mesh geometry={nodes.Bomb_cell015_1.geometry} material={materials['DarkMetal.001']} />
            </group>
            <mesh
                geometry={nodes.Bomb_cell036.geometry}
                material={materials['Black.002']}
                position={[0.307, -0.424, -0.108]}
            />
            <mesh
                geometry={nodes.Bomb_cell037.geometry}
                material={materials['Black.002']}
                position={[0.244, 0.163, 0.353]}
            />
            <mesh
                geometry={nodes.Bomb_cell038.geometry}
                material={materials['Black.002']}
                position={[-0.3, -0.047, 0.083]}
            />
            <mesh
                geometry={nodes.Bomb_cell040.geometry}
                material={materials['Black.002']}
                position={[-0.207, 0.382, 0.223]}
            />
            <mesh
                geometry={nodes.Bomb_cell047.geometry}
                material={materials['Black.002']}
                position={[0.206, 0.296, -0.339]}
            />
            <mesh
                geometry={nodes.Bomb_cell051.geometry}
                material={materials['Black.002']}
                position={[0.13, -0.143, 0.497]}
            />
            <mesh
                geometry={nodes.Bomb_cell052.geometry}
                material={materials['Black.002']}
                position={[0.347, 0.329, 0.246]}
            />
            <mesh
                geometry={nodes.Bomb_cell053.geometry}
                material={materials['Black.002']}
                position={[-0.098, -0.353, 0.33]}
            />
            <group position={[-0.238, 0.877, 0.034]}>
                <mesh geometry={nodes.Bomb_cell024.geometry} material={materials['Black.002']} />
                <mesh geometry={nodes.Bomb_cell024_1.geometry} material={materials['White.001']} />
            </group>
            <mesh
                geometry={nodes.Bomb_cell055.geometry}
                material={materials['Black.002']}
                position={[-0.009, -0.31, -0.326]}
            />
            <mesh
                geometry={nodes.Bomb_cell061.geometry}
                material={materials['Black.002']}
                position={[-0.032, -0.478, -0.068]}
            />
            <mesh
                geometry={nodes.Bomb_cell063.geometry}
                material={materials['Black.002']}
                position={[-0.11, 0.197, -0.362]}
            />
            <mesh
                geometry={nodes.Bomb_cell067.geometry}
                material={materials['Black.002']}
                position={[-0.325, -0.218, 0.259]}
            />
            <mesh
                geometry={nodes.Bomb_cell068.geometry}
                material={materials['Black.002']}
                position={[0.444, 0.189, -0.218]}
            />
            <mesh
                geometry={nodes.Bomb_cell069.geometry}
                material={materials['Black.002']}
                position={[-0.099, 0.279, 0.357]}
            />
            <mesh
                geometry={nodes.Bomb_cell071.geometry}
                material={materials['Black.002']}
                position={[0.345, -0.201, 0.141]}
            />
            <mesh
                geometry={nodes.Bomb_cell072.geometry}
                material={materials['Black.002']}
                position={[-0.049, 0.015, 0.498]}
            />
            <group position={[0.167, 0.483, 0.105]}>
                <mesh geometry={nodes.Bomb_cell033.geometry} material={materials['Black.002']} />
                <mesh geometry={nodes.Bomb_cell033_1.geometry} material={materials['DarkMetal.001']} />
            </group>
            <mesh
                geometry={nodes.Bomb_cell074.geometry}
                material={materials['Black.002']}
                position={[-0.343, -0.378, -0.074]}
            />
            <mesh
                geometry={nodes.Bomb_cell077.geometry}
                material={materials['Black.002']}
                position={[0.358, -0.103, -0.332]}
            />
            <mesh
                geometry={nodes.Bomb_cell078.geometry}
                material={materials['Black.002']}
                position={[0.266, -0.053, 0.466]}
            />
            <group position={[-0.013, 0.732, -0.011]}>
                <mesh geometry={nodes.Bomb_cell037_1.geometry} material={materials['Black.002']} />
                <mesh geometry={nodes.Bomb_cell037_2.geometry} material={materials['White.001']} />
            </group>
            <group name='origin' rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes.Bomb002.geometry} material={materials['Black.002']} />
                <mesh geometry={nodes.Bomb002_1.geometry} material={materials['DarkMetal.001']} />
                <mesh geometry={nodes.Bomb002_2.geometry} material={materials['White.001']} />
            </group>
        </group>
    );
});
