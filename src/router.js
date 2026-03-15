import ListePays from './pages/ListePays.vue'
import CountryDetails from './pages/CountryDetails.vue'
import VisitedCountries from './pages/VisitedCountries.vue'
import FlagQuizPage from './pages/FlagQuizPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: ListePays,
  },
  {
    path: '/country/:id',
    name: 'details',
    component: CountryDetails,
  },
  {
    path: '/visited',
    name: 'visited',
    component: VisitedCountries,
  },
  {
    path: '/flag-quiz',
    component: FlagQuizPage,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
