import { copyFileSync, mkdirSync } from "node:fs";

// Repository-root Pages serves public/resume.pdf at this URL. Vite normally
// flattens public/ into dist/, so preserve the fallback's source-root URL too.
mkdirSync("dist/public", { recursive: true });
copyFileSync("public/resume.pdf", "dist/public/resume.pdf");
