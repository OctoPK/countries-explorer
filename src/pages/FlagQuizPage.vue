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
const highScore = ref(parseInt(localStorage.getItem('quiz-high-score')) || 0)

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
    if (score.value > highScore.value) {
      highScore.value = score.value
      localStorage.setItem('quiz-high-score', highScore.value)
    }
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
  <div class="quiz-container">
    <transition name="toast">
      <div
        v-if="feedback"
        :class="['alert', feedback === 'correct!' ? 'alert-sucess' : 'alert-error']"
      >
        {{ feedback === 'correct!' ? '✅ Bravo !' : '❌ Dommage...' }}
      </div>
    </transition>

    <header class="quiz-header">
      <h1>Quiz Drapeaux</h1>
      <div class="scores-container">
        <div class="score-badge">
          Score : <span>{{ score }}</span>
        </div>
        <div class="score-badge high-score">
          Record : <span>{{ highScore }}</span>
        </div>
      </div>
    </header>

    <p v-if="loading" class="loading">Chargement...</p>

    <div v-else-if="currentCountry" class="quiz-content">
      <div class="flag-card">
        <img :src="currentCountry.flags.png" alt="drapeau à deviner" />
      </div>

      <div class="options-grid">
        <button
          v-for="opt in options"
          :key="opt.name.common"
          @click="checkAnswer(opt.name.common)"
          :disabled="isChecking"
          class="opt-btn"
        >
          {{ opt.name.common }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 20px;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
}

.quiz-header {
  margin-bottom: 2rem;
}

.score-badge {
  display: inline-block;
  background: #f1f5f9;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  color: #475569;
}

.score-badge span {
  color: #3b82f6;
}

/* Carte du drapeau */
.flag-card {
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.flag-card img {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 4px;
}

/* Grille des boutons */
.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.opt-btn {
  padding: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.opt-btn:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.opt-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

/* Le conteneur de base de l'alerte */
.alert {
  position: fixed;
  top: 30px;
  right: 30px;
  min-width: 300px;
  padding: 25px;
  border-radius: 12px;
  color: white !important; /* Force le texte en blanc */
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;
  z-index: 9999;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
}

.alert-success {
  background-color: #2ecc71 !important;
  border: 3px solid #27ae60;
}

.alert-error {
  background-color: #e74c3c !important;
  border: 3px solid #c0392b;
}

/* Animation simple pour l'apparition */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s ease;
}
.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.scores-container {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.high-score {
  border: 1px solid #fbbf24; /* Couleur or */
  background-color: #fffbeb;
}

.high-score span {
  color: #d97706; /* Texte ambre */
}
</style>
