import Matrix3 from "./matrix3.ts";

export function translate(x: number, y: number) {
	return Matrix3.acquire(
		1, 0, x, 
		0, 1, y, 
		0, 0, 1, 
	);
}

export function rotate(v: number) {
	const c = Math.cos(v);
	const s = Math.sin(v);
	
	return Matrix3.acquire(
		c, -s, 0, 
		s,  c, 0, 
		0,  0, 1
	);
}

export function scale(v: number) {
	return Matrix3.acquire(
		v, 0, 0, 
		0, v, 0, 
		0, 0, 1, 
	)
}
