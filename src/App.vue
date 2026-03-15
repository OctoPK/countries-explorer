<script setup></script>

<template>
  <header class="navbar">
    <h1 class="logo">CountryExplorer</h1>
    <nav class="nav-links">
      <router-link to="/" class="nav-item">Liste des Pays</router-link>
      <router-link to="/visited" class="nav-item">Mes Visites</router-link>
      <router-link to="/flag-quiz" class="nav-item">Quiz Drapeaux</router-link>
    </nav>
  </header>

  <main class="container">
    <router-view></router-view>
  </main>
</template>

<style scoped>
/* Conteneur principal de la barre de navigation */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.logo {
  font-size: 1.5rem;
  margin: 0;
  color: #2c3e50;
}

.nav-links {
  display: flex;
  gap: 20px;
}

/* Style de base des liens */
.nav-item {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

/* Effet au survol */
.nav-item:hover {
  background-color: #f1f5f9;
  color: #3b82f6;
}

/* Style du lien actif (automatiquement géré par Vue Router) */
.router-link-active {
  color: #3b82f6;
  background-color: #eff6ff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
