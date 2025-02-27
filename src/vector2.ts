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

    static get ZERO() {
        return new Vector2(0, 0);
    }

	sum(other: Vector2): Vector2 {
		return new Vector2(this.x + other.x, this.y + other.y);
	}
}
