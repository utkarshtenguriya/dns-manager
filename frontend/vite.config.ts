import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
    // proxy: {
    //     '^/api/.*': {
    //         target: 'https://dns-manager-n39a.onrender.com',
    //         changeOrigin: true,
    //         secure: true,
    //     }
    // }
=======
    proxy: {
        '^/api/.*': {
            target: 'https://dns-manager-n39a.onrender.com',
            changeOrigin: true,
            secure: false,
        }
    }
>>>>>>> 95635779c305f5094ef9688f58503eda8ce6715d
},
})
