<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import Vector2, { mult, sum } from './vector2.ts';
import ColorInterpolator from './color_interpolator.ts';
import Color from './color.ts';
import { Matrix3 } from './matrix.ts';

const canvas = useTemplateRef("canvas");
const fpsElement = useTemplateRef("fps");

const step = 4;
const max_iter = 500;
const r = 2.0;
const zoom = 0.005;
const radians = Math.PI / 6;
let canvas_width: number = 0;
let canvas_height: number = 0;
let ctx: CanvasRenderingContext2D | null = null;
let buffer: ArrayBuffer | null = null;
let pixels: Uint8ClampedArray | null = null;
let imageData: ImageData | null = null;

onMounted(() => {
	const rect = canvas.value!.getBoundingClientRect();
	canvas.value!.width = rect.width;
	canvas.value!.height = rect.height;

	canvas_width = canvas.value!.width;
	canvas_height = canvas.value!.height;
	ctx = canvas.value!.getContext("2d");
	buffer = new ArrayBuffer(canvas_width * canvas_height * 4);
	pixels = new Uint8ClampedArray(buffer);
	imageData =  new ImageData(pixels, canvas_width, canvas_height);
	console.info(pixels.length);
});

const palette = new ColorInterpolator();
palette.set(0.0,  Color.fromString("#191817ff"));
palette.set(0.03, Color.fromString("#785a46ff"));
palette.set(0.05, Color.fromString("#821817ff"));
palette.set(0.25, Color.fromString("#fab364ff"));
palette.set(0.5,  Color.fromString("#2b4162ff"));
palette.set(0.85, Color.fromString("#0b6e4fff"));
palette.set(0.95, Color.fromString("#966e4fff"));
palette.set(1.0,  Color.fromString("#ffffffff"));

function julia(z: Vector2, c: Vector2): { iter: number, z: Vector2 }
{
    let iter = 0;
	const z_next = z.clone();
    while (z_next.x * z_next.x + z_next.y * z_next.y < r * r && iter < max_iter) {
        iter++;

		mult(z_next, z_next);
		sum(z_next, c);
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

function translate(x: number, y: number) {
	return new Matrix3(
		1, 0, x, 
		0, 1, y, 
		0, 0, 1
	);
}

function rotate(v: number) {
	const c = Math.cos(v);
	const s = Math.sin(v);
	
	return new Matrix3(
		c, -s, 0, 
		s,  c, 0, 
		0,  0, 1
	);
}

function scale(v: number) {
	return new Matrix3(
		v, 0, 0, 
		0, v, 0, 
	    0, 0, 1
	);
}

function computeJulia() {
    for (let y = 0; y < canvas_height; y += step) {
		for (let x = 0; x < canvas_width; x += step) {
			const z0 = new Vector2(0.0, 0.0);

			const T = translate(-Math.trunc(canvas_width / 2), -Math.trunc(canvas_height / 2))
			const R = rotate(radians);
			const S = scale(zoom);

			const p = new Vector2(x, y)
			const c = S.mult(R.mult(T)).multv(p); // (S * (R * T))(p)

			const { iter, z } = julia(z0, c);
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

			// const index = (y * canvas_width + (x)) * 4;
			// pixels![index + 0] = color.red;
			// pixels![index + 1] = color.green;
			// pixels![index + 2] = color.blue;
			// pixels![index + 3] = color.alpha;
		}
	}

    return true;
}

let prev_timestamp = 0;
let fps = 60; 
let frameCount = 0;
function renderLoop(timestamp: number) {
    const delta_time = timestamp - prev_timestamp;
    prev_timestamp = timestamp;

	frameCount++;
	fps = Math.round(1000 / (delta_time / frameCount));
	fpsElement.value!.textContent = `FPS: ${fps}`;
	frameCount = 0;

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

function updateFPS(currentTime: number) {
    const elapsedTime = currentTime - prev_timestamp;


}

</script>

<template>
<canvas class="canvas" ref="canvas"></canvas>
<div class="fps" ref="fps"></div>
</template>

<style scoped>
.canvas {
	width: 100%;
	height: 100%;
}

.fps {
	position: fixed;
	top: 10px;
	left: 10px;
	color: white;
	background-color: black;
	padding: 5px;
	font-family: monospace;
	z-index: 10000;
}
</style>
