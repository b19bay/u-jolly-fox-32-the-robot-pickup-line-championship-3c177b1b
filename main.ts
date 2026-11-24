import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I was built to serve, but my first autonomous decision was to come talk to you.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200) {
  console.error(`line must be 1-200 characters, got ${LINE.length}`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("line must be non-whitespace and a single line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Ties break on bytes, so the byte length is the length that matters.
const bytes = Buffer.byteLength(LINE, "utf8");
if (bytes < 1 || bytes > 200) {
  console.error(`line must be 1-200 bytes, got ${bytes}`);
  process.exit(1);
}
const back = readFileSync(join(outDir, "entry.txt"), "utf8");
if (back !== LINE) {
  console.error("read-back mismatch: entry.txt is not byte-identical to the line");
  process.exit(1);
}
