import type Arena from "./arena.ts";
import { clamp } from "./math.ts";

export default class Color {
	private r: number; 
	private g: number; 
	private b: number; 
	private a: number;

	static arena: Arena<Color> | null = null;
	static count: number = 0;

	constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 255) {
		this.r = clamp(Math.trunc(r), 0, 255);
		this.g = clamp(Math.trunc(g), 0, 255);
		this.b = clamp(Math.trunc(b), 0, 255);
		this.a = clamp(Math.trunc(a), 0, 255);
		Color.count++;
	}

	static acquire(r: number = 0, g: number = 0, b: number = 0, a: number = 255): Color {
        if (Color.arena) {
			const instance = Color.arena.acquire(); 
			instance.r = r;
			instance.g = g;
			instance.b = b;
			instance.a = a;

			return instance;
		} else {
			return new Color(r, g, b, a);
		}
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
        return Color.acquire(
			this.r + (other.r - this.r) * factor,
			this.g + (other.g - this.g) * factor,
			this.b + (other.b - this.b) * factor,
			255
		);
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

        return Color.acquire(
			parseInt(cleanedHex.substring(0, 2), 16),
			parseInt(cleanedHex.substring(2, 4), 16),
			parseInt(cleanedHex.substring(4, 6), 16),
			cleanedHex.length === 8 
				? parseInt(cleanedHex.substring(6, 8), 16) 
				: 255
		);
    }
}
