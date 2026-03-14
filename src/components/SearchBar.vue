<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'search'])

function handleSearch(event) {
  emit('update:modelValue', event.target.value)
  emit('search', event.target.value)
}
</script>
<template>
  <input
    type="text"
    :value="props.modelValue"
    @input="handleSearch"
    placeholder="Search countries..."
  />
</template>
