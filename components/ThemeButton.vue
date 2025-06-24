<template>
  <div class="theme-switcher">
    <!-- <p>Текущая тема: {{ theme }}</p> -->
    <div class="theme-icons">
      <LightThemeIcon v-if="theme === 'dark'" @click="toggleTheme" />
      <DarkThemeIcon v-if="theme === 'light'" @click="toggleTheme" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import LightThemeIcon from '~/components/icons/LightThemeIcon.vue'
import DarkThemeIcon from '~/components/icons/DarkThemeIcon.vue'
import { useThemeStore } from '~/composables/useTheme'

const themeStore = useThemeStore()

const theme = computed(() => themeStore.currentTheme)
const toggleTheme = themeStore.toggleTheme
</script>



<style scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-icons {
  display: flex;
  gap: 0.5rem;
}
</style>