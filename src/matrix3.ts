import { close } from "./math.ts";
import Vector2 from "./vector2.ts";

const ROWS = 3;
const COLUMNS = 3;

export default class Matrix3 {
    readonly values: [number, number, number, number, number, number, number, number, number];

    constructor(v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number) {
        this.values = [
            v1, v2, v3, 
            v4, v5, v6, 
            v7, v8, v9
        ];
    }

    clone() {
        return new Matrix3(...this.values);
    }

    static get ZERO() {
        return new Matrix3(
            0, 0, 0, 
            0, 0, 0, 
            0, 0, 0
        );
    }

    static get IDENTITY() {
        return new Matrix3(
            1, 0, 0, 
            0, 1, 0, 
            0, 0, 1
        );
    }

    sum(other: Matrix3): Matrix3 {
        const values = this.values.map((value, idx) => value + other.values[idx]);
        
        return new Matrix3(
            values[0], values[1], values[2], 
            values[3], values[4], values[5], 
            values[6], values[7], values[8]
        );
    }

    mult(other: Matrix3): Matrix3 {
        const values: number[] = [];
        for (let i = 0; i < ROWS; ++i) {
            for (let j = 0; j < COLUMNS; ++j) {
                let sum = 0;
                for (let k = 0; k < COLUMNS; ++k)
                    sum += this.values[i * COLUMNS + k] * other.values[k * COLUMNS + j];

                values.push(sum);
            }
        }

        return new Matrix3(
            values[0], values[1], values[2], 
            values[3], values[4], values[5], 
            values[6], values[7], values[8]
        );
    }

    multv(vec: Vector2): Vector2 {
        return new Vector2(
            this.values[0 * COLUMNS + 0] * vec.x + this.values[0 * COLUMNS + 1] * vec.y + this.values[0 * COLUMNS + 2] * 1, 
            this.values[1 * COLUMNS + 0] * vec.x + this.values[1 * COLUMNS + 1] * vec.y + this.values[1 * COLUMNS + 2] * 1
        );
    }

    multk(k: number): Matrix3 {
        return new Matrix3(
            k * this.values[0], k * this.values[1], k * this.values[2], 
            k * this.values[3], k * this.values[4], k * this.values[5], 
            k * this.values[6], k * this.values[7], k * this.values[8]
        );
    }

    determinant(): number {
        const [a, b, c, d, e, f, g, h, i] = this.values;

        return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
    }

    inverse(): Matrix3 | null {
        const det = this.determinant();
        if (close(det, 0))
            throw new Error("Matrix is singular and cannot be inverted.");
        
        const [a, b, c, d, e, f, g, h, i] = this.values;
        const adjugate = [
            e * i - f * h, c * h - b * i, b * f - c * e,
            f * g - d * i, a * i - c * g, c * d - a * f,
            d * h - e * g, b * g - a * h, a * e - b * d
        ];
        const inverse = adjugate.map(value => value / det);

        return new Matrix3(
            inverse[0], inverse[1], inverse[2],
            inverse[3], inverse[4], inverse[5],
            inverse[6], inverse[7], inverse[8]
        );
    }

    transpose(): Matrix3 {
        const [a, b, c, d, e, f, g, h, i] = this.values;

        return new Matrix3(
            a, d, g,
            b, e, h,
            c, f, i
        );
    }

    neg(): Matrix3 {
        return new Matrix3(
            -this.values[0], -this.values[1], -this.values[2],
            -this.values[3], -this.values[4], -this.values[5],
            -this.values[6], -this.values[7], -this.values[8]
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