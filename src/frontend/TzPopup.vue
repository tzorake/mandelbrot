<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

const props = defineProps<{
    anchorElement: HTMLElement | null,
    visible: boolean,
}>();
const emit = defineEmits<{
    (e: "popup:visible", state: boolean): void,
}>();

const popup = useTemplateRef("popup")
const popupStyle = ref<{ [key: string]: string }>({});

function show() {
    emit("popup:visible", true);
}

defineExpose({ show });

const calculatePopupPosition = () => {
    if (!props.anchorElement || !popup.value) return;

    const anchorRect = props.anchorElement.getBoundingClientRect();
    const popupRect = popup.value.getBoundingClientRect();

    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - (anchorRect.bottom + popupRect.height);

    if (spaceBelow > 0) {
        popupStyle.value = {
            top: `${anchorRect.bottom}px`,
            left: `${anchorRect.left}px`,
        };
    } else {
        popupStyle.value = {
            bottom: `${windowHeight - anchorRect.top}px`,
            left: `${anchorRect.left}px`,
        };
    }
};

const updatePositionOnResize = () => {
    if (props.visible) {
        calculatePopupPosition();
    }
};

onMounted(() => {
    if (props.visible) {
        calculatePopupPosition();
    }
    window.addEventListener('resize', updatePositionOnResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', updatePositionOnResize);
});

function onClick(event: Event) {
    event.stopPropagation();
}
</script>

    

<template>
<div ref="popup" :style="popupStyle" :class="['popup', { visible: props.visible }]" @click="onClick">
    <slot></slot>
</div>
</template>

  
  <style scoped>
  .popup {
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    display: none;
  }

  .visible {
    display: block;
  }
  </style>