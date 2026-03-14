<script setup>
import { VisitedCountriesStore } from '@/stores/VisitedCountrieStore'
const { visitedCountries, removeCountry } = VisitedCountriesStore()
</script>

<template>
  <h1>Visited Countries</h1>
  <div v-for="country in visitedCountries" :key="country" class="country-card">
    <img :src="country.flags.svg" :alt="country.flags.alt" width="100" height="50" />
    <p>Pays : {{ country.name.common }}</p>
    <button @click="removeCountry(country)">Remove</button>
  </div>
</template>
