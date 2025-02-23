import Vector2 from "./vector2";

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
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                let sum = 0;
                for (let k = 0; k < 3; ++k)
                    sum += this.values[i * 3 + k] * other.values[k * 3 + j];

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
            this.values[0 * 3 + 0] * vec.x + this.values[0 * 3 + 1] * vec.y + this.values[0 * 3 + 2] * 1, 
            this.values[1 * 3 + 0] * vec.x + this.values[1 * 3 + 1] * vec.y + this.values[1 * 3 + 2] * 1
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
        return new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);

    if (matrices.length === 1)
        return matrices[0].clone();

    return matrices.slice(1).reduce((acc, cur) => mmult(acc, cur), matrices[0]);
}