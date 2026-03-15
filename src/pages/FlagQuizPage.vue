<script setup>
import { useFetch } from '@/composables/useFetch'
import { ref, watch } from 'vue'

const { data: countries, loading } = useFetch(
  'https://restcountries.com/v3.1/all?fields=name,flags,population,region,common',
)

const currentCountry = ref(null)
const options = ref([])
const score = ref(0)
const feedback = ref(null)
const isChecking = ref(false)

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function generateQuestion() {
  if (!countries.value || countries.value.length === 0) return

  feedback.value = null
  isChecking.value = false

  const target = countries.value[getRandomInt(countries.value.length)]
  currentCountry.value = target

  const tempRegion = countries.value.filter(
    (c) => c.region === target.region && c.name.common !== target.name.common,
  )

  const distractors = []

  for (let i = 0; i < 3; i++) {
    if (tempRegion.length > 0) {
      const index = getRandomInt(tempRegion.length)
      distractors.push(tempRegion.splice(index, 1)[0])
    }
  }

  options.value = [...distractors, target].sort(() => Math.random() - 0.5)
}

function checkAnswer(chosenName) {
  if (isChecking.value) return
  isChecking.value = true

  if (chosenName === currentCountry.value.name.common) {
    feedback.value = 'correct!'
    score.value++
  } else {
    feedback.value = 'wrong'
    score.value = 0
  }

  setTimeout(() => {
    generateQuestion()
  }, 1000)
}

watch(
  countries,
  (newVal) => {
    if (newVal) generateQuestion()
  },
  { immediate: true },
)
</script>

<template>
  <h1>Quiz Drapeaux</h1>
  <p>Score actuel : {{ score }}</p>
  <p v-if="loading">Chargement...</p>
  <div v-else-if="currentCountry">
    <div>
      <img :src="currentCountry.flags.png" alt="drapeau à deviner" />
    </div>

    <div>
      <button v-for="opt in options" :key="opt.name.common" @click="checkAnswer(opt.name.common)">
        {{ opt.name.common }}
      </button>
    </div>
  </div>
</template>
