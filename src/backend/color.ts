
export namespace tz {

export type Color = number;

export function mix(c1: Color, c2: Color, factor: number): Color {
    const r1 = red(c1);
    const g1 = green(c1);
    const b1 = blue(c1);

    const r2 = red(c2);
    const g2 = green(c2);
    const b2 = blue(c2);

    return color(
        Math.trunc(r1 + (r2 - r1) * factor),
        Math.trunc(g1 + (g2 - g1) * factor),
        Math.trunc(b1 + (b2 - b1) * factor)
    );
}

export function color(red: number, green: number, blue: number, alpha?: number): Color
{
	return ((alpha !== undefined ? (alpha & 0xFF) : 0xFF) << 24) | ((blue & 0xFF) << 16) | ((green & 0xFF) << 8) | ((red & 0xFF) << 0)
}

export function red(color: Color)
{
    return (color >> 0) & 0xFF;
}

export function green(color: Color)
{
    return (color >> 8) & 0xFF;
}

export function blue(color: Color)
{
    return (color >> 16) & 0xFF;
}

export function alpha(color: Color)
{
    return (color >> 24) & 0xFF;
}

} // namespace tz
