'use client';

import React, { useEffect, useRef } from 'react';
import { Microphone, Bar } from '@/utils/microphone';

export const Visualizer = () => {
    const canvasRef = useRef(null);
    const microphoneRef = useRef(null);
    const bars = useRef([]);

    const createBars = () => {
        const barWidth = canvasRef.current.width / 128;
        for (let i = 0; i < 512; i++) {
            bars.current.push(
                new Bar(
                    i * barWidth,
                    canvasRef.current.height / 2,
                    1,
                    20,
                    'white',
                ),
            );
        }
    };

    const animate = () => {
        if (microphoneRef.current && microphoneRef.current.initialized) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // generates audio samples from microphone
            const samples = microphoneRef.current.getSamples();

            // animate bars based on microphone data
            bars.current.forEach((bar, index) => {
                bar.update(samples[index]);
                bar.draw(ctx);
            });
        }
        requestAnimationFrame(animate);
    };

    useEffect(() => {
        const microphone = new Microphone();
        microphoneRef.current = microphone;
        microphone
            .initialize()
            .then(() => {
                createBars();
                animate();
            })
            .catch((err) => console.error(err));

        return () => {
            microphoneRef.current = null;
            bars.current = [];
        };
    }, []);

    return <canvas ref={canvasRef} id="myCanvas" className='w-[80%] h-[150px]'/>;
};

export default Visualizer;
