import type Arena from "./arena.ts";

export default class Vector2 {
	x: number;
	y: number;

	static arena: Arena<Vector2> | null = null;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	static acquire(x: number = 0, y: number = 0): Vector2 {
        if (Vector2.arena) {
			const instance = Vector2.arena.acquire(); 
			instance.x = x;
			instance.y = y;

			return instance;
		} else {
			return new Vector2(x, y);
		}
    }

	clone() {
        return Vector2.acquire(
			this.x, this.y
		);
	}

    static get ZERO() {
        return Vector2.acquire();
    }

	sum(other: Vector2): Vector2 {
		return Vector2.acquire(
			this.x + other.x, this.y + other.y
		);
	}
}

export function csum(first: Vector2, second: Vector2, inplace: boolean = false): Vector2 {
	if (inplace) {
		first.x += second.x;
		first.y += second.y;

		return first;
	} else {
		return Vector2.acquire(
			first.x + second.x, 
			first.y + second.y
		);
	}
}

export function cmult(first: Vector2, second: Vector2, inplace: boolean = false): Vector2 {
	if (inplace) {
		const x = first.x * second.x - first.y * second.y;
		const y = first.x * second.y + second.x * first.y;
		first.x = x;
		first.y = y;

		return first;
	} else {
		return Vector2.acquire(
			first.x * second.x - first.y * second.y, 
			first.x * second.y + second.x * first.y
		);
	}
}

export function vec(x: number, y: number) {
	return Vector2.acquire(x, y);
}
