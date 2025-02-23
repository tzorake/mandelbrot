export function clamp(value: number, min: number, max: number) {
	return Math.max(Math.min(value, max), min)
}

export function pipe<T>(value: T, ...fns: Array<(input: T) => T>): T {
    return fns.reduce((acc, fn) => fn(acc), value);
}