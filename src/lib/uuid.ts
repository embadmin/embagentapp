// Simple UUID generator for creating unique IDs
// Note: This is not a cryptographically secure UUID implementation
// It's used as a simple solution for generating unique IDs in our demo

export function v4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
