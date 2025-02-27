export default class Complex {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	clone() {
		return new Complex(this.x, this.y);
	}

    static get ZERO() {
        return new Complex(0, 0);
    }

	sum(other: Complex): Complex {
		return new Complex(this.x + other.x, this.y + other.y);
	}

	mult(other: Complex) : Complex {
		return new Complex(
			this.x * other.x - this.y * other.y,
			this.x * other.y + other.x * this.y
		);
	}
}

export function csum(first: Complex, second: Complex): Complex {
	return first.sum(second);
}

export function cmult(first: Complex, second: Complex): Complex {
	return first.mult(second);
}
