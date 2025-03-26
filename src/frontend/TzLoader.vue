<script setup lang="ts">
import { computed } from 'vue';
import TzButtonControl from './TzButtonControl.vue';
import TzCheckBoxControl from './TzCheckBoxControl.vue';
import TzComboBoxControl from './TzComboBoxControl.vue';
import TzNumberFieldControl from './TzNumberFieldControl.vue';
import type { ButtonControl, CheckBoxControl, ComboBoxControl, NumberFieldControl } from './types.ts';

const props = defineProps<{ type: string }>();
const emit = defineEmits<{
    (e: "control:number", controlId: number, value: number): void,
    (e: "control:boolean", controlId: number, value: boolean): void,
    (e: "control:string", controlId: number, value: string): void,
}>();

function onNumberInput(controlId: number, value: number) {
    emit("control:number", controlId, value);
}

function onBooleanInput(controlId: number, value: boolean) {
    emit("control:boolean", controlId, value);
}

function onStringInput(controlId: number, value: string) {
    emit("control:string", controlId, value);
}

</script>

<template>
<component 
    :is="TzNumberFieldControl" 
    v-if="props.type === 'NumberField'" 
    v-bind="props as NumberFieldControl"
    class="control" 
    @control:number="onNumberInput"
></component>
<component 
    :is="TzComboBoxControl" 
    v-else-if="props.type === 'ComboBox'" 
    v-bind="props as ComboBoxControl"
    class="control" 
    @control:number="onNumberInput"
></component>
<component 
    :is="TzCheckBoxControl" 
    v-else-if="props.type === 'CheckBox'" 
    v-bind="props as CheckBoxControl"
    class="control" 
    @control:boolean="onBooleanInput"
></component>
<component 
    :is="TzButtonControl" 
    v-else-if="props.type === 'Button'" 
    v-bind="props as ButtonControl"
    class="control" 
    @control:boolean="onBooleanInput"
></component>
</template>

<style scoped>
.control {
    height: 18px;
}
</style>
