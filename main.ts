import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The Funniest Toaster Error Message — V2 (local round-robin 4-0).
// A toaster that admits the one thing it exists to do is the one thing
// it cannot do. Deadpan, short, and the punch lands on the last word.
// The scorer reads /output/entry.txt as UTF-8, so the file holds exactly
// this one line: no trailing newline, no extra whitespace.
const MESSAGE =
  "I can warm bread. I cannot brown it. Browning was the entire job.";

function valid(text: string): boolean {
  return (
    text.length >= 1 &&
    text.length <= 120 &&
    text.trim().length > 0 &&
    !text.includes("\n")
  );
}

if (!valid(MESSAGE)) {
  throw new Error("entry fails the 1-120 character single-line gate");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", MESSAGE, "utf8");

// Read back what we wrote: the entry file must hold exactly this line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== MESSAGE) {
  throw new Error("read-back mismatch in /output/entry.txt");
}
