import Color from "./color.ts";

export default class ColorInterpolator {
    private colors: Map<number, Color>;

    constructor() {
        this.colors = new Map<number, Color>();
    }

    set(value: number, c: Color): void {
        this.colors.set(value, c);
    }

    clear(): void {
        this.colors.clear();
    }

    size(): number {
        return this.colors.size;
    }

    interpolate(t: number): Color {
        if (this.colors.size === 0)
            throw new Error("ColorInterpolator: No colors set for interpolation.");

        const sortedKeys = Array.from(this.colors.keys()).sort((a, b) => a - b);

        let index = sortedKeys.findIndex(key => key >= t);

        if (index === -1)
            return this.colors.get(sortedKeys[sortedKeys.length - 1])!;

        if (index === 0)
            return this.colors.get(sortedKeys[0])!;

        const prevKey = sortedKeys[index - 1];
        const nextKey = sortedKeys[index];

        const t0 = prevKey;
        const t1 = nextKey;

        const factor = (t - t0) / (t1 - t0);

        const prevColor = this.colors.get(prevKey)!;
        const nextColor = this.colors.get(nextKey)!;

        return prevColor.mix(nextColor, factor);
    }
}