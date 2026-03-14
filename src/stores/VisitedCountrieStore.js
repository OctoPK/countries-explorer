import { ref } from 'vue'
const visitedCountries = ref([])
export function VisitedCountriesStore() {
  function addCountry(country) {
    visitedCountries.value.push(country)
  }
  function removeCountry(country) {
    visitedCountries.value = visitedCountries.value.filter((c) => c !== country)
  }
  return {
    visitedCountries,
    addCountry,
    removeCountry,
  }
}
