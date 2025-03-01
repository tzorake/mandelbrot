import type Arena from "./arena.ts";

export default class Complex {
	x: number;
	y: number;

	static arena: Arena<Complex> | null = null;
	static count: number = 0;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
		Complex.count++;
	}

	static acquire(x: number = 0, y: number = 0): Complex {
        if (Complex.arena) {
			const instance = Complex.arena.acquire(); 
			instance.x = x;
			instance.y = y;

			return instance;
		} else {
			return new Complex(x, y);
		}
    }

	clone() {
        return Complex.acquire(
			this.x, 
			this.y
		); 
	}

    static get ZERO() {
        return Complex.acquire(); 
    }

	sum(other: Complex, inplace: boolean = false): Complex {
		if (inplace) {
			this.x += other.x;
			this.y += other.y;

			return this;
		} else {
			return Complex.acquire(
				this.x + other.x, 
				this.y + other.y
			);
		}
	}
	
	mult(other: Complex, inplace: boolean = false): Complex {
		if (inplace) {
			const x = this.x * other.x - this.y * other.y;
			const y = this.x * other.y + other.x * this.y;
			this.x = x;
			this.y = y;

			return this;
		} else {
			return Complex.acquire(
				this.x * other.x - this.y * other.y, 
				this.x * other.y + other.x * this.y
			);
		}
	}
}

export function csum(first: Complex, second: Complex, inplace: boolean = false): Complex {
	return first.sum(second, inplace);
}

export function cmult(first: Complex, second: Complex, inplace: boolean = false): Complex {
	return first.mult(second, inplace);
}
