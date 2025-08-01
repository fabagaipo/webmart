import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            components: path.resolve(__dirname, './src/components'),
            assets: path.resolve(__dirname, './src/assets'),
            contexts: path.resolve(__dirname, './src/contexts'),
            webmart: path.resolve(__dirname, './src/webmart-api'),
            'custom-hooks': path.resolve(__dirname, './src/hooks')
        },
    },
});
