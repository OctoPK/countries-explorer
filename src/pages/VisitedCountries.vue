<script setup>
import { VisitedCountriesStore } from '@/stores/VisitedCountrieStore'
import CountryCard from '@/components/CountryCard.vue'
const { visitedCountries, removeCountry, removeAll } = VisitedCountriesStore()
</script>

<template>
  <h1>Visited Countries</h1>
  <div class="countries-grid">
    <CountryCard v-for="country in visitedCountries" :key="country.name.common" :country="country">
      <br />
      <button @click="removeCountry(country)">Remove</button>
    </CountryCard>
  </div>
  <button @click="removeAll">Remove All</button>
</template>

<style scoped>
.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>
