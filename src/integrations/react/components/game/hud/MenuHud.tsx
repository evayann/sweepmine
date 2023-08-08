/** @jsxImportSource react */
import { Canvas, useThree } from '@react-three/fiber';
import { MotionConfig, MotionValue, SpringOptions, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { motion as motion3d } from 'framer-motion-3d';
import { useLayoutEffect, useRef, useState } from 'react';
import { map } from '~/utils/calculations';
import { MotionButton } from '../../dumb/Button';
import { Title } from '../../dumb/Title';
import { Bomb } from '../../dumb/bomb/Bomb';
import { Hud } from '../../dumb/hud/Hud';
import { PerspectiveCamera } from 'three';
import { useGameState } from '~/integrations/react/hooks/useGameState';

export function MenuHud() {
    const { gameStateService } = useGameState();
    const buttonRef = useRef<HTMLButtonElement | undefined>();
    const [isHover, setIsHover] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const resetMousePosition = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <Hud center>
            <MotionConfig
                transition={{
                    type: 'spring',
                    duration: 0.7,
                    bounce: 0.2,
                }}
            >
                <Title> MineSweeper </Title>
                <MotionButton
                    ref={buttonRef}
                    style={{
                        position: 'relative',
                        letterSpacing: '-1px',
                        fontSize: '2rem',
                        width: '10rem',
                        height: '5rem',
                        margin: '2rem',
                    }}
                    initial={false}
                    animate={isHover ? 'hover' : 'rest'}
                    whileTap="press"
                    variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.5 },
                        press: { scale: 1.4 },
                    }}
                    onHoverStart={() => {
                        resetMousePosition();
                        setIsHover(true);
                    }}
                    onHoverEnd={() => {
                        resetMousePosition();
                        setIsHover(false);
                    }}
                    onPointerMove={(e) => {
                        const button = buttonRef.current;
                        if (!button) return;
                        const bbox = button.getBoundingClientRect();
                        const x = map(e.clientX - bbox.x, 0, bbox.width, -1, 1);
                        const y = map(e.clientY - bbox.y, 0, bbox.height, -1, 1);
                        mouseX.set(x);
                        mouseY.set(y);
                    }}
                    onClick={() => {
                        gameStateService.toGame();
                    }}
                >
                    <Canvas
                        shadows
                        resize={{ scroll: false, offsetSize: true }}
                        style={{
                            position: 'absolute',
                            top: '-100px',
                            left: '-100px',
                            right: '-100px',
                            bottom: '-100px',
                            width: 'auto',
                            height: 'auto',
                            pointerEvents: 'none',
                        }}
                    >
                        <Camera mouseX={mouseX} mouseY={mouseY} />
                        <ambientLight />
                        <Bomb position={[-1.75, 0.35, 0]} rotation={[0, 0, Math.PI / 6]} />
                        <Bomb position={[-2, -2, -5]} rotation={[0, 2, 0.4]} />
                        <Bomb position={[1.75, -2, -1]} rotation={[0, 2, 0.4]} />
                        <Bomb position={[2.3, 0.7, 0]} rotation={[0, 2, 0.4]} scale={1.3} />
                    </Canvas>
                    Play
                </MotionButton>
            </MotionConfig>
        </Hud>
    );
}

const spring = { stiffness: 600, damping: 30 };

function Camera({ mouseX, mouseY, ...props }: any) {
    const cameraX = useSmoothTransform(mouseX, spring, (x) => x);
    const cameraY = useSmoothTransform(mouseY, spring, (y) => -1 * y);

    const { set, camera, scene, size } = useThree(({ set, camera, size, scene }) => ({ set, camera, size, scene }));
    const cameraRef = useRef<PerspectiveCamera | undefined>();

    useLayoutEffect(() => {
        const { current: cam } = cameraRef;
        if (cam) {
            cam.aspect = size.width / size.height;
            cam.updateProjectionMatrix();
        }
    }, [size, props]);

    useLayoutEffect(() => {
        if (cameraRef.current) {
            const oldCam = camera;
            const perspectiveCamera = cameraRef.current;
            set(() => ({ camera: perspectiveCamera }));
            return () => set(() => ({ camera: oldCam }));
        }
    }, [camera, cameraRef, set]);

    useLayoutEffect(() => {
        return cameraX.on('change', () => camera.lookAt(scene.position));
    }, [cameraX]);

    return <motion3d.perspectiveCamera ref={cameraRef} fov={90} position={[cameraX, cameraY, 5]} />;
}

function useSmoothTransform(
    value: MotionValue<number>,
    springOptions: SpringOptions,
    transformer: (x: number) => number
) {
    return useSpring(useTransform(value, transformer), springOptions);
}