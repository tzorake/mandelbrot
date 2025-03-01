import type Arena from "./arena.ts";

export default class Vector2 {
	x: number;
	y: number;

	static arena: Arena<Vector2> | null = null;
	static count: number = 0;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
		Vector2.count++;
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
