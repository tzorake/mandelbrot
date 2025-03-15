<script setup lang="ts">
const props = defineProps<{ icon: string }>()
</script>

<template>
<component :is="{ template: props.icon }"></component>
</template>

<style scoped>
</style>
