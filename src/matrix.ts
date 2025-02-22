import Vector2 from "./vector2";

export class Matrix3 {
    readonly values: [number, number, number, number, number, number, number, number, number];

    constructor(v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number) {
        this.values = [
            v1, v2, v3, 
            v4, v5, v6, 
            v7, v8, v9
        ];
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

        // const values = Array.from({ length: 9 }, (_, index) => {
        //     const i = Math.floor(index / 3);
        //     const j = index % 3;
    
        //     return Array.from({ length: 3 }, (_, k) => 
        //         this.values[i * 3 + k] * other.values[k * 3 + j]
        //     ).reduce((sum, value) => sum + value, 0);
        // });
    
        // return new Matrix3(
        //     values[0], values[1], values[2], 
        //     values[3], values[4], values[5], 
        //     values[6], values[7], values[8]
        // );
    }

    multv(vec: Vector2): Vector2 {
        return new Vector2(
            this.values[0 * 3 + 0] * vec.x + this.values[0 * 3 + 1] * vec.y + this.values[0 * 3 + 2] * 1, 
            this.values[1 * 3 + 0] * vec.x + this.values[1 * 3 + 1] * vec.y + this.values[1 * 3 + 2] * 1
        );
    }
}