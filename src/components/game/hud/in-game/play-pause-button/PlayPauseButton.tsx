import { motion } from 'framer-motion';
import { useState } from 'react';
import { theme } from '../../../../../themes/theme';
import { Button } from '../../../../dumb';

import './PlayPauseButton.css';

export interface PlayPauseButtonProps {
    isPaused: boolean;
    onClick: () => void;
}

export function PlayPauseButton({ onClick, isPaused }: PlayPauseButtonProps) {
    const pausePathRight =
        'M22 6C22 4.11438 22 3.17157 21.4142 2.58579C20.8284 2 19.8856 2 18 2C16.1144 2 15.1716 2 14.5858 2.58579C14 3.17157 14 4.11438 14 6V18C14 19.8856 14 20.8284 14.5858 21.4142C15.1716 22 16.1144 22 18 22C19.8856 22 20.8284 22 21.4142 21.4142C22 20.8284 22 19.8856 22 18V10';

    const variants = {
        play: {
            d: 'M3 12L3 18.9671C3 21.2763 5.53435 22.736 7.59662 21.6145L10.7996 19.8727M3 8L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L14.0026 18.131',
        },
        pauseLeft: {
            d: 'M2 18C2 19.8856 2 20.8284 2.58579 21.4142C3.17157 22 4.11438 22 6 22C7.88562 22 8.82843 22 9.41421 21.4142C10 20.8284 10 19.8856 10 18V6C10 4.11438 10 3.17157 9.41421 2.58579C8.82843 2 7.88562 2 6 2C4.11438 2 3.17157 2 2.58579 2.58579C2 3.17157 2 4.11438 2 6V14',
        },
    };

    return (
        <Button invisible className="play-pause" onClick={onClick} style={{ width: '32px', height: '32px' }}>
            <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    animate={isPaused ? 'play' : 'pauseLeft'}
                    variants={variants}
                    transition={{
                        ease: 'easeInOut',
                        delay: 0.5,
                        duration: 0.5,
                    }}
                    stroke={theme.game.ui.primary}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    className={`pause-right ${isPaused ? 'pause-right-outside' : ''}`}
                    d={pausePathRight}
                    stroke={theme.game.ui.primary}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        </Button>
    );
}
