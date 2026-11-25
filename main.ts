// Worst Fix Ever: Funniest Commit Message
// Writes a single commit-message line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output). Gate: UTF-8 text, 1-100 chars, no newline inside.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "fix: reduced alert volume 90%; the rest now arrive as voicemail transcripts.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Validation: the judge reads entry.txt as a commit subject line, so it
// must be exactly one line — no trailing newline, no embedded whitespace-only
// content. Length is checked in characters (not bytes) because the gate is
// defined on the UTF-8 text length, 1-100 chars.
if (ENTRY.length < 1 || ENTRY.length > 100) {
  throw new Error(
    `entry length ${ENTRY.length} chars is outside the 1-100 gate`
  );
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${join(outDir, "entry.txt")}`);
