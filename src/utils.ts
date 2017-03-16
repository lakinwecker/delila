export function clamp(x: number, min: number, max: number) {
  return Math.max(Math.min(x, max), min)
}
