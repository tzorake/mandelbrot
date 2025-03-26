import Arena from "./arena.ts";
import Vector2 from "./vector2.ts";
import Matrix3 from "./matrix3.ts";
import Color from "./color.ts";

export class Vector2Arena {
    static instance() { return new Arena<Vector2>(() => new Vector2(0, 0), 1) }
}

export class Matrix3Arena {
    static instance() { return new Arena<Matrix3>(() => new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0), 1) }
}

export class ColorArena {
    static instance() { return new Arena<Color>(() => new Color(0, 0, 0), 1) }
}

export class Arenas {
    static instantiate() {
        Vector2.arena = Vector2Arena.instance();
        Matrix3.arena = Matrix3Arena.instance();
        Color.arena = ColorArena.instance();
    }

    static destroy() {
        Vector2.arena = null;
        Matrix3.arena = null;
        Color.arena = null;
    }

    static releaseAll() {
        if (Vector2.arena)
            Vector2.arena.releaseAll();

        if (Matrix3.arena)
            Matrix3.arena.releaseAll();

        if (Color.arena)
            Color.arena.releaseAll();
    }
}