<script setup lang="ts">
import TzCanvasView from './frontend/TzCanvasView.vue';
import TzSideBar from './frontend/TzSideBar.vue';
</script>

<template>
<TzSideBar />
<TzCanvasView class="canvas-view" />
</template>

<style scoped>
.app {
	display: flex;
}

.canvas-view {
	flex-grow: 1;
}
</style>
