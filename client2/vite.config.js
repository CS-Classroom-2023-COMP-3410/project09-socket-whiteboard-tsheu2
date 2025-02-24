import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 5174,
        host: true,  // Allows access from network (useful for testing on multiple devices)
        strictPort: true, // Ensures it sticks to port 5173
        proxy: {
            '/socket.io': {
                target: 'http://localhost:3000', // Proxy Socket.IO requests to the backend server
                ws: true
            }
        }
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true
    }
});
