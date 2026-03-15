<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '../composables/useFetch.js'
import { VisitedCountriesStore } from '../stores/VisitedCountrieStore.js'
import { computed } from 'vue'

const { addCountry, removeCountry, hasCountry } = VisitedCountriesStore()
const route = useRoute()
const router = useRouter()
const { data: countryArray, loading } = useFetch(
  `https://restcountries.com/v3.1/name/${route.params.id}`,
)

const country = computed(() => countryArray.value?.[0])

const goBack = () => {
  router.push('/')
}

function handleCheckboxChange(event) {
  if (event.target.checked) {
    addCountry(country.value)
  } else {
    removeCountry(country.value)
  }
}
</script>

<template>
  <div v-if="loading">
    Chargement en cours...
    <br />
    <button @click="goBack">Fermer / Retour</button>
  </div>

  <div v-else-if="country" class="details">
    <button @click="goBack">Fermer / Retour</button>
    <h1>{{ country.name.official }}</h1>
    <img :src="country.flags.svg" :alt="country.flag.alt" width="200" />

    <p><strong>Capitale:</strong> {{ country.capital }}</p>
    <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
    <p><strong>Région:</strong> {{ country.region }}</p>

    <p><strong>Langues:</strong> {{ Object.values(country.languages).join(', ') }}</p>

    <p>
      <strong>Devises:</strong>
      <span v-for="currency in country.currencies" :key="currency.name">
        {{ currency.name }} ({{ currency.symbol }})</span
      >
    </p>

    <p v-if="country.borders">
      <strong>Frontières:</strong>
      {{ country.borders.join(', ') }}
    </p>

    Pays visité
    <input type="checkbox" @change="handleCheckboxChange" :checked="hasCountry(country)" />
  </div>
</template>
