<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import Vector2 from './vector2.ts';
import Complex, { cmult, csum } from './complex.ts';
import Matrix3, { mlmult, mmult, mmultv } from './matrix3.ts';
import { translate as T, rotate as R, scale as S } from './transform2.ts';
import ColorInterpolator from './color_interpolator.ts';
import Color from './color.ts';

const canvas = useTemplateRef("canvas");
const fpsElement = useTemplateRef("fpsElement");

let step = 4;
let max_iter = 200;
let r = 2.0;
let zoom = 0.005;
let radians = -Math.PI / 6;
let canvas_width: number = 0;
let canvas_height: number = 0;
let ctx: CanvasRenderingContext2D | null = null;
let buffer: ArrayBuffer | null = null;
let pixels: Uint8ClampedArray | null = null;
let imageData: ImageData | null = null;

let translation = new Vector2(0, 0);
let previous_translation: Vector2 | null = null;

onMounted(() => {
	if (!canvas.value)
		return;

	ctx = canvas.value.getContext("2d");

	const rect = canvas.value.getBoundingClientRect();
	canvas.value.width = rect.width;
	canvas.value.height = rect.height;
	canvas_width = canvas.value.width;
	canvas_height = canvas.value.height;

	buffer = new ArrayBuffer(canvas_width * canvas_height * 4);
	pixels = new Uint8ClampedArray(buffer);
	imageData =  new ImageData(pixels, canvas_width, canvas_height);

	translation.x = 0;
	translation.y = 0;
});

function onWheel(event: WheelEvent): void {
    event.preventDefault();

	zoom = event.deltaY >= 0 ? zoom * 10 / 11 : zoom * 11 / 10; 
}

let isLeftButtonPressed: boolean = false;
let startX: number | null = null;
let startY: number | null = null;

function onMouseDown(event: MouseEvent): void {
    if (event.button === 0) {
        isLeftButtonPressed = true;
		startX = event.clientX;
        startY = event.clientY;
		previous_translation = translation.clone();
	}
}

function onMouseUp(event: MouseEvent): void {
    if (event.button === 0) {
        isLeftButtonPressed = false;
		startX = null;
        startY = null;
		previous_translation = null;
	}
}

function onMouseMove(event: MouseEvent): void {
	if (isLeftButtonPressed && startX !== null && startY !== null && previous_translation !== null) {
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

		translation.x = previous_translation.x - deltaX
		translation.y = previous_translation.y - deltaY
	}
}

const palette = new ColorInterpolator();
palette.set(0.0,  Color.fromString("#191817ff"));
palette.set(0.03, Color.fromString("#785a46ff"));
palette.set(0.05, Color.fromString("#821817ff"));
palette.set(0.25, Color.fromString("#fab364ff"));
palette.set(0.5,  Color.fromString("#2b4162ff"));
palette.set(0.85, Color.fromString("#0b6e4fff"));
palette.set(0.95, Color.fromString("#966e4fff"));
palette.set(1.0,  Color.fromString("#ffffffff"));

function julia(zx: number, zy: number, cx: number, cy: number): { iter: number, z: Complex } {
    let iter = 0;
	let z_next = new Complex(zx, zy);
	let c = new Complex(cx, cy);
    while (z_next.x * z_next.x + z_next.y * z_next.y < r * r && iter < max_iter) {
        iter++;

		const z_new = csum(cmult(z_next, z_next), c);
		z_next.x = z_new.x;
		z_next.y = z_new.y;
    }

    return { iter, z: z_next };
}

function smooth(iter: number, z: Vector2): number {
    if (iter < max_iter) {
        const nu = Math.log(Math.log(z.x * z.x + z.y * z.y) / 2 / Math.log(2)) / Math.log(2);

        return iter + 1 - nu;
    }

    return max_iter;
}

function computeJulia() {
	const [cx, cy] = [-Math.trunc(canvas_width / 2), -Math.trunc(canvas_height / 2)]
    for (let y = 0; y < canvas_height; y += step) {
		for (let x = 0; x < canvas_width; x += step) {
			const z0 = new Complex(0.0, 0.0);

			// const T = translate(translation.x, translation.y)
			// const R = rotate(radians);
			// const S = scale(zoom);

			const p = new Vector2(x, y);
			// const c = S(zoom).mult(R(radians)).mult(T(translation.x + cx, translation.y + cy)).multv(p)

			const c = mmultv(
				mlmult(S(zoom), R(radians), T(cx + translation.x, cy + translation.y)),
				p
			);
			const { iter, z } = julia(z0.x, z0.y, c.x, c.y);
			const ratio = smooth(iter, z) / max_iter;
			const color = palette.interpolate(ratio);
			for (let dy = 0; dy < step && y + dy < canvas_height; ++dy) {
				for (let dx = 0; dx < step && x + dx < canvas_width; ++dx) {
					const index = ((y + dy) * canvas_width + (x + dx)) * 4;
					pixels![index + 0] = color.red;
					pixels![index + 1] = color.green;
					pixels![index + 2] = color.blue;
					pixels![index + 3] = color.alpha;
				}
			}
		}
	}

    return true;
}

let prev_timestamp = 0;
function renderLoop(timestamp: number) {
    const delta_time = timestamp - prev_timestamp;
    prev_timestamp = timestamp;

	const fps = Math.trunc(1000 / delta_time);
	if (fpsElement.value)
		fpsElement.value.textContent = `FPS: ${fps}`;
	
    update();
    render();

    requestAnimationFrame(renderLoop);
}

requestAnimationFrame(renderLoop);

function update() {
	computeJulia();
}

function render() {
	if (ctx)
		ctx.putImageData(imageData!, 0, 0);
}
</script>

<template>
<canvas class="canvas" ref="canvas" @mousewheel="onWheel" @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove="onMouseMove"></canvas>
<div class="fps" ref="fpsElement"></div>
</template>

<style scoped>
.canvas {
	width: 100%;
	height: 100%;
}

.fps {
	position: fixed;
	bottom: 10px;
	right: 10px;
	color: white;
	background-color: black;
	padding: 5px;
	font-family: monospace;
	z-index: 10000;
}
</style>
