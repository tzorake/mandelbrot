export function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(value, max))
}

export function close(a: number, b: number, tolerance: number = 1e-9): boolean {
    return Math.abs(a - b) <= tolerance;
}
