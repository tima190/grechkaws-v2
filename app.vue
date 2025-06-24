<template>
  <div id="preloader" class="preloader visible">
    <NuxtImg src="cat-dancing.gif"/>
  </div>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <div class="centered">
      <Navbar/>
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<script setup>

onMounted(() => {
  const preloader = document.getElementById('preloader')
  if (preloader) {
    preloader.classList.add('hidden')

    // Можно полностью удалить элемент после анимации, если хочешь
    setTimeout(() => {
      preloader.remove()
    }, 600) // чуть больше, чем transition (0.5s)
  }
})
</script>

<style>
/* Прелоадер с использованием CSS-переменных */
.preloader {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.9);
  color: var(--primary-color);
  transition: opacity 0.5s ease, visibility 0.5s ease;
}

.preloader.hidden {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}
</style>