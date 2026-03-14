<script setup>
import { useFetch } from '../composables/useFetch.js'
import { computed } from 'vue'

const { data: country, loading } = useFetch(
  'https://restcountries.com/v3.1/all?fields=name,population',
)

const stats = computed(() => {
  if (!country.value || country.value.length === 0) return null

  const totalPopulation = country.value.reduce((acc, curr) => acc + curr.population, 0)
  const mostPopulated = country.value.reduce((acc, curr) =>
    acc.population > curr.population ? acc : curr,
  )

  return {
    count: country.value.length,
    totalPopulation: totalPopulation.toLocaleString(),
    topCountryName: mostPopulated.name.common,
    topCountryPopulation: mostPopulated.population.toLocaleString(),
  }
})
</script>

<template>
  <div v-if="loading" class="loading-status">Calcul des statistiques...</div>
  <div v-else-if="stats" class="stats-container">
    <div class="stat-item">
      <h1>🌍Nombre total de pays</h1>
      <p class="stat-value">total : {{ stats.count }}</p>
    </div>
    <div class="stat-item">
      <h1>👥Population mondiale</h1>
      <p class="stat-value">Somme de la population mondiale : {{ stats.totalPopulation }}</p>
      <span class="subtitle">Données approximatives</span>
    </div>
    <div class="stat-item">
      <h1>🏆Le plus peuplé</h1>
      <p class="stat-value">Pays : {{ stats.topCountryName }}</p>
      <p class="stat-value">Population : {{ stats.topCountryPopulation }}</p>
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  display: flex;
  justify-content: space-around;
  gap: 15px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  flex-wrap: wrap; /* Pour le mobile */
}

.stat-item {
  flex: 1;
  min-width: 150px;
  text-align: center;
  padding: 10px;
  border-right: 1px solid #ddd;
}

/* On enlève la bordure sur le dernier élément */
.stat-item:last-child {
  border-right: none;
}

h3 {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

.subtitle {
  font-size: 0.8rem;
  color: #888;
}

.loading-status {
  text-align: center;
  font-style: italic;
  color: #666;
}

/* Responsivité pour mobile */
@media (max-width: 600px) {
  .stat-item {
    border-right: none;
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
  }
  .stat-item:last-child {
    border-bottom: none;
  }
}
</style>
