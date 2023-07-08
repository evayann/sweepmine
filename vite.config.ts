import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { qwikReact } from '@builder.io/qwik-react/vite';
import { vanillaExtractPlugin } from 'styled-vanilla-extract/vite';

export default defineConfig(() => {
    return {
        plugins: [qwikCity(), qwikVite(), tsconfigPaths(), qwikReact(), vanillaExtractPlugin()],
        optimizeDeps: {
            include: ['@react-three/fiber'],
        },
        preview: {
            headers: {
                'Cache-Control': 'public, max-age=600',
            },
        },
    };
});
