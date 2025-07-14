<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo">
        <span class="logo-full">Grechka WS</span>
        <span class="logo-small">GKWS</span>
        <span v-if="logoMessage" class="logo-message">{{ logoMessage }}</span>
      </div>

      <ul class="nav-links">
        <li><ThemeButton /></li>
        <li><NuxtLink to="/">главное</NuxtLink></li>
        <li><NuxtLink to="/blog">блог</NuxtLink></li>
        <li class="menu-wrapper">
          <span class="menu-toggle" @click="menuOpen = !menuOpen">меню</span>
          <ul v-if="menuOpen" class="dropdown">
          <li><NuxtLink to="/merch">Мерч(заглушка)</NuxtLink></li>
          <li>пока ничего :)</li>
            <!-- <li><NuxtLink to="/extra1">доп. 1</NuxtLink></li>
            <li><NuxtLink to="/extra2">доп. 2</NuxtLink></li> -->
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>



<script setup>
const menuOpen = ref(false)
import { ref, onMounted, nextTick } from 'vue'
import { animate } from 'animejs'

const logoMessage = ref('')

// Массив забавных фраз для случайного выбора
const funnyPhrases = [
  'сайт Grechka GK',
  'Вселенная бесконечна? 🌌',
  'счастье в мелочах 🩵',
  'tea - ❤️',
  'linux user 🤓',
  'let peace = true ',
]

onMounted(async () => {
  const now = new Date()
  const month = now.getMonth() // 0 = январь, 5 = июнь
  const day = now.getDate()

  await nextTick()

  if (month === 5) { // июнь
    logoMessage.value = 'June 🌈'
    animate('.logo', {
      color: ['#FA5145', '#FD9F34', '#F9D81D', '#7FBE59', '#0394D7', '#502C79', '#FA5145'],
      duration: 5000,
      loop: true,
    })
  } else if (month === 0 && day === 1) { // 1 января
    logoMessage.value = 'New Year! 🎉'
    animate('.logo', {
      color: '#0394D7',
      scale: [1, 1.1, 1], // Уменьшено для лучшего выравнивания
      duration: 2000,
      loop: true,
    })
  } else if (month === 9 && day === 8) { // 8 октября
    logoMessage.value = 'HB to me!!!!'
    animate('.logo', {
      color: '#0394D7',
      scale: [1, 1.1, 1],
      duration: 2000,
      loop: true,
    })
  } else {
    // Выбираем случайную фразу из массива
    const randomIndex = Math.floor(Math.random() * funnyPhrases.length)
    logoMessage.value = funnyPhrases[randomIndex]
  }
})
</script>

<style scoped>
.navbar {
  background-color: var(--background-color);
  border-bottom: 2px solid var(--secondary-bg);
  padding: 0.5rem 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 960px;
  margin: 0 auto;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1.5; /* Фиксированная высота строки для выравнивания */
}

.logo-message {
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5; /* Соответствует .logo */
}

.nav-links {
  list-style: none;
  display: flex;
  align-items: center; /* Вертикальное выравнивание элементов */
  gap: 1.2rem;
  margin: 0;
  padding: 0;
}

.nav-links li {
  display: flex;
  align-items: center; /* Выравнивание содержимого li */
}

.nav-links a {
  text-decoration: none;
  color: var(--secondary-color);
  font-weight: 500;
  font-size: 1rem; /* Единый размер шрифта */
  line-height: 1.5; /* Фиксированная высота строки */
  padding: 0.5rem; /* Единые отступы для кликабельной области */
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.menu-wrapper {
  position: relative;
}

.menu-toggle {
  cursor: pointer;
  font-weight: 500;
  color: var(--secondary-color);
  padding: 0.5rem;
  transition: color 0.2s;
}

.menu-toggle:hover {
  color: var(--primary-color);
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--background-color);
  border: 1px solid var(--secondary-bg);
  padding: 0.5rem 1rem;
  box-shadow: 6px 6px var(--secondary-bg);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 120px;
}

.dropdown li {
  display: block;
}

.dropdown a {
  text-decoration: none;
  color: var(--secondary-color);
  font-weight: 500;
  transition: color 0.2s;
}

.dropdown a:hover {
  color: var(--primary-color);
}

/** логика отображение лого при маленьком экране */

.logo-small {
  display: none;
}

@media (max-width: 550px) {
  .logo-full {
    display: none;
  }

  .logo-small {
    display: inline;
  }

  .logo-message {
    display: none;
  }
}

</style>