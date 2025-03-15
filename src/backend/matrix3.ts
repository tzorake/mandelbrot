import Arena from "./arena.ts";
import { close } from "./math.ts";
import Vector2 from "./vector2.ts";

export default class Matrix3 {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    g: number;
    h: number;
    i: number;
    
    static arena: Arena<Matrix3> | null = null;

    constructor(a: number = 0, b: number = 0, c: number = 0, d: number = 0, e: number = 0, f: number = 0, g: number = 0, h: number = 0, i: number = 0) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
        this.g = g;
        this.h = h;
        this.i = i;
    }

    static acquire(a: number = 0, b: number = 0, c: number = 0, d: number = 0, e: number = 0, f: number = 0, g: number = 0, h: number = 0, i: number = 0): Matrix3 {
        if (Matrix3.arena) {
			const instance = Matrix3.arena.acquire(); 
            instance.a = a;
            instance.b = b;
            instance.c = c;
            instance.d = d;
            instance.e = e;
            instance.f = f;
            instance.g = g;
            instance.h = h;
            instance.i = i;

			return instance;
		} else {
			return new Matrix3(a, b, c, d, e, f, g, h, i);
		}
    }

    clone() {
        return Matrix3.acquire(
            this.a, this.b, this.c, this.d, this.e, this.f, this.g, this.h, this.i, 
        );
    }

    static get ZERO() {
        return Matrix3.acquire();
    }

    static get IDENTITY() {
        return Matrix3.acquire(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }

    sum(other: Matrix3): Matrix3 {
        return Matrix3.acquire(
            this.a + other.a, this.b + other.b, this.c + other.c, 
            this.d + other.d, this.e + other.e, this.f + other.f, 
            this.g + other.g, this.h + other.h, this.i + other.i,
        );
    }

    mult(other: Matrix3): Matrix3 {
        return Matrix3.acquire(
            this.a * other.a + this.b * other.d + this.c * other.g,
            this.a * other.b + this.b * other.e + this.c * other.h,
            this.a * other.c + this.b * other.f + this.c * other.i,
            this.d * other.a + this.e * other.d + this.f * other.g,
            this.d * other.b + this.e * other.e + this.f * other.h,
            this.d * other.c + this.e * other.f + this.f * other.i,
            this.g * other.a + this.h * other.d + this.i * other.g,
            this.g * other.b + this.h * other.e + this.i * other.h,
            this.g * other.c + this.h * other.f + this.i * other.i,
        );
    }

    multv(vec: Vector2): Vector2 {
		return Vector2.acquire(
            this.a * vec.x + this.b * vec.y + this.c * 1,
            this.d * vec.x + this.e * vec.y + this.f * 1
        );
    }

    multk(k: number): Matrix3 {
        return Matrix3.acquire(
            k * this.a, k * this.b, k * this.c,
            k * this.d, k * this.e, k * this.f,
            k * this.g, k * this.h, k * this.i
        );
    }

    determinant(): number {
        return this.a * (this.e * this.i - this.f * this.h) - this.b * (this.d * this.i - this.f * this.g) + this.c * (this.d * this.h - this.e * this.g);
    }

    inverse(): Matrix3 | null {
        const det = this.determinant();
        if (close(det, 0))
            throw new Error("Matrix is singular and cannot be inverted.");
        
        return Matrix3.acquire(
            (this.e * this.i - this.f * this.h) / det,
            (this.c * this.h - this.b * this.i) / det,
            (this.b * this.f - this.c * this.e) / det,
            (this.f * this.g - this.d * this.i) / det,
            (this.a * this.i - this.c * this.g) / det,
            (this.c * this.d - this.a * this.f) / det,
            (this.d * this.h - this.e * this.g) / det,
            (this.b * this.g - this.a * this.h) / det,
            (this.a * this.e - this.b * this.d) / det
        );
    }

    transpose(): Matrix3 {
        return Matrix3.acquire(
            this.a, this.d, this.g,
            this.b, this.e, this.h,
            this.c, this.f, this.i,
        );
    }

    neg(): Matrix3 {
        return Matrix3.acquire(
            -this.a, -this.b, -this.c,
            -this.d, -this.e, -this.f,
            -this.g, -this.h, -this.i
        );
    }
}

export function mmult(first: Matrix3, second: Matrix3): Matrix3 {
    return first.mult(second);
}

export function mmultv(first: Matrix3, second: Vector2): Vector2 {
    return first.multv(second);
}

export function mlmult(...matrices: Array<Matrix3>): Matrix3 {
    if (matrices.length === 0)
        return Matrix3.ZERO;

    if (matrices.length === 1)
        return matrices[0].clone();

    return matrices.slice(1).reduce((acc, cur) => mmult(acc, cur), matrices[0]);
}
