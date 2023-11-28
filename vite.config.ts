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
};
