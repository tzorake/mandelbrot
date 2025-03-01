import Color from "./color.ts";

function search(arr: Array<{ value: number, color: Color }>, target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = arr[mid].value;

        if (midValue >= target) {
            if (mid === 0 || arr[mid - 1].value < target) {
                return mid; 
            }
            right = mid - 1; 
        } else {
            left = mid + 1; 
        }
    }

    return -1; 
}

type Entry = { value: number, color: Color };

export default class ColorInterpolator {
    private colors: Array<Entry>;
    private sorted = false;

    constructor() {
        this.colors = [] 
    }

    set(value: number, color: Color): void {
        this.colors.push({ value, color });
        this.sorted = false;
    }

    clear(): void {
        this.colors.length = 0;
    }

    size(): number {
        return this.colors.length;
    }

    interpolate(t: number): Color { 
        if (!this.sorted) {
            this.colors.sort((a, b) => a.value - b.value);
            this.sorted = true;
        }

        if (this.colors.length === 0)
            throw new Error("ColorInterpolator: No colors set for interpolation.");

        let index = search(this.colors, t);

        if (index === -1)
            return this.colors[this.colors.length - 1].color;

        if (index === 0)
            return this.colors[0].color;

        const { value: t0, color: prevColor } = this.colors[index - 1];
        const { value: t1, color: nextColor } = this.colors[index];

        return prevColor.mix(nextColor, (t - t0) / (t1 - t0));
    }
}