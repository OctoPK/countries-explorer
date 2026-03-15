import { ref } from 'vue'
const visitedCountries = ref([])
export function VisitedCountriesStore() {
  function addCountry(country) {
    if (!hasCountry(country)) {
      visitedCountries.value.push(country)
    }
  }
  function removeCountry(country) {
    visitedCountries.value = visitedCountries.value.filter(
      (c) => c.name.common !== country.name.common,
    )
  }
  function removeAll() {
    visitedCountries.value = []
  }
  function hasCountry(country) {
    if (!country) return false
    return visitedCountries.value.some((c) => c.name.common === country.name.common)
  }
  return {
    visitedCountries,
    addCountry,
    removeCountry,
    removeAll,
    hasCountry,
  }
}
