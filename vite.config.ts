import { resolve, join } from "node:path";
import { cwd } from "node:process";
import { globSync } from "glob";

export default {
  root: join(cwd(), "frontend"),
  build: {
    outDir: join(cwd(), "build/frontend"),
    emptyOutDir: true,
    rollupOptions: {
      input: globSync(resolve(cwd(), "frontend", "**/*.html")),
    },
  },
  server: {
    proxy: {
      // Example proxying to a local server
      // "/api": {
      //   target: "http://localhost:3000",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },

      // Shorthand for proxying to specific endpoint
      "/hello": "http://localhost:3000",
    },
  },
};
