export default class Vector2 {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	clone() {
		return new Vector2(this.x, this.y);
	}

	sum(other: Vector2): Vector2 {
		return new Vector2(this.x + other.x, this.y + other.y);
	}

	mult(other: Vector2) : Vector2 {
		return new Vector2(
			this.x * other.x - this.y * other.y,
			this.x * other.y + other.x * this.y
		);
	}
}

export function sum(first: Vector2, second: Vector2): void {
    const x = first.x + second.x;
    const y = first.y + second.y;

    first.x = x;
    first.y = y;
}

export function mult(first: Vector2, second: Vector2): void {
    const x = first.x * second.x - first.y * second.y;
    const y = first.x * second.y + second.x * first.y;

    first.x = x;
    first.y = y;
}