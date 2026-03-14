<script setup>
import CountryCard from '../components/CountryCard.vue'
import SearchBar from '../components/SearchBar.vue'
import RegionFilter from '../components/RegionFilter.vue'
import StatsCard from '../components/StatsCard.vue'
import { computed, ref } from 'vue'
import { useFetch } from '../composables/useFetch'

const searchTerm = ref('')
const selectedRegion = ref('')

const filteredCountries = computed(() => {
  const result = countries.value?.filter((country) => {
    const nameMatch = country.name.common.toLowerCase().includes(searchTerm.value.toLowerCase())
    const regionMatch = selectedRegion.value ? country.region === selectedRegion.value : true
    return nameMatch && regionMatch
  })

  return result
    ? [...result].sort((a, b) => {
        return a.name.common.localeCompare(b.name.common)
      })
    : []
})

function handleSearch(search) {
  searchTerm.value = search
}
function resetFilters() {
  searchTerm.value = ''
  selectedRegion.value = ''
}

const { data: countries, loading } = useFetch(
  'https://restcountries.com/v3.1/all?fields=name,flags,population,region,common',
)
</script>

<template>
  <h1>Explorateur de Pays du Monde</h1>
  <p v-if="loading">Chargement en cours...</p>

  <br />
  <StatsCard />
  <br />

  <SearchBar v-model="searchTerm" @search="handleSearch" />
  <RegionFilter v-model="selectedRegion" />
  <button @click="resetFilters">Réinitialiser les filtres</button>

  <p>Nombre de pays : {{ filteredCountries?.length }}</p>

  <div class="countries-grid">
    <CountryCard
      v-for="country in filteredCountries"
      :key="country.name.common"
      :country="country"
    />
  </div>
</template>

<style scoped>
.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>
