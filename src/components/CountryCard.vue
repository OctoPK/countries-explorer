<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  country: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="country-card" style="padding: 16px; background-color: #f3f6fb">
    <p>Pays : {{ props.country.name.common }}</p>
    <img :src="props.country.flags.svg" :alt="props.country.flags.alt" width="100" height="50" />
    <p>Population : {{ props.country.population.toLocaleString() }}</p>
    <p>Région : {{ props.country.region }}</p>
    <router-link :to="{ name: 'details', params: { id: country.name.common } }">
      <button>Voir les détails</button>
    </router-link>
  </div>
</template>
