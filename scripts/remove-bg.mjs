import { removeBackground } from "@imgly/background-removal-node";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const input = path.join(root, "public/hero-section.png");
const output = path.join(root, "public/hero-section-nobg.png");

console.log("Removing background from hero portrait...");
const blob = await removeBackground(input, {
  model: "medium",
  output: { format: "image/png", type: "foreground" },
});
const outBuffer = Buffer.from(await blob.arrayBuffer());
await writeFile(output, outBuffer);
console.log(`Saved: ${output} (${(outBuffer.length / 1024).toFixed(0)} KB)`);
