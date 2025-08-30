import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@/components": path.resolve(__dirname, "./src/presentation/components"),
            "@/hooks": path.resolve(__dirname, "./src/presentation/hooks"),
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
