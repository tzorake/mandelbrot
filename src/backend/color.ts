
export namespace tz {

export type Color = number;

export function mix(c1: Color, c2: Color, factor: number): Color {
	const r1 = (c1 >> 24) & 0xFF;
	const g1 = (c1 >> 16) & 0xFF;
	const b1 = (c1 >> 8) & 0xFF;

	const r2 = (c2 >> 24) & 0xFF;
	const g2 = (c2 >> 16) & 0xFF;
	const b2 = (c2 >> 8) & 0xFF;

	return (Math.trunc(r1 + (r2 - r1) * factor) << 24) | (Math.trunc(g1 + (g2 - g1) * factor) << 16) | (Math.trunc(b1 + (b2 - b1) * factor) << 8) | 0xff;
}

export function color(red: number, green: number, blue: number, alpha?: number): Color
{
	return ((red & 0xFF) << 24) | ((green & 0xFF) << 16) | ((blue & 0xFF) << 8) | (alpha !== undefined ? (alpha & 0xFF) : 0xFF)
}

export function red(color: Color)
{
    return (color >> 24) & 0xFF;
}

export function green(color: Color)
{
    return (color >> 16) & 0xFF;
}

export function blue(color: Color)
{
    return (color >> 8) & 0xFF;
}

export function alpha(color: Color)
{
    return (color >> 0) & 0xFF;
}

} // namespace tz
