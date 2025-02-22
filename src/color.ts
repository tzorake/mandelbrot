import { clamp } from "./math.ts";

export default class Color {
	private r: number; 
	private g: number; 
	private b: number; 
	private a: number;

	constructor(r: number, g: number, b: number, a: number) {
		this.r = clamp(Math.trunc(r), 0, 255);
		this.g = clamp(Math.trunc(g), 0, 255);
		this.b = clamp(Math.trunc(b), 0, 255);
		this.a = clamp(Math.trunc(a), 0, 255);
	}

	get red() {
		return this.r;
	}

	get green() {
		return this.g;
	}

	get blue() {
		return this.b;
	}

	get alpha() {
		return this.a;
	}

	mix(other: Color, factor: number): Color {
        const r = this.r + (other.r - this.r) * factor;
        const g = this.g + (other.g - this.g) * factor;
        const b = this.b + (other.b - this.b) * factor;

        return new Color(r, g, b, 255);
    }

	static fromString(c: string): Color {
        let cleanedHex = c;
        if (cleanedHex.startsWith("#"))
            cleanedHex = cleanedHex.substring(1);

        if (cleanedHex.length === 3 || cleanedHex.length === 4) {
            let expanded = "";
            for (const char of cleanedHex)
                expanded += char + char;
            cleanedHex = expanded;
        }

        const r = parseInt(cleanedHex.substring(0, 2), 16);
        const g = parseInt(cleanedHex.substring(2, 4), 16);
        const b = parseInt(cleanedHex.substring(4, 6), 16);
        const a = cleanedHex.length === 8 ? parseInt(cleanedHex.substring(6, 8), 16) : 255;

        return new Color(r, g, b, a);
    }
}