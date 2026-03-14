<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

function updateRegion(value) {
  emit('update:modelValue', value.target.value)
}
</script>

<template>
  <div>
    <select @change="updateRegion" :value="props.modelValue">
      <option value="">All Regions</option>
      <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
    </select>
  </div>
</template>
