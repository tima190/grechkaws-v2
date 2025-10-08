<template>
  <div v-if="!isHidden && !isClosed" class="promo" :class="{ expanded: isExpanded }">
    <div v-if="isExpanded" class="promo-bg" :style="{ backgroundImage: `url(${image})` }" />

    <div class="promo-container">
      <header class="promo-header">
        <h1 class="promo-title">{{ name }}</h1>
        <div class="promo-controls">
          <icons-close-icon class="icon-close icon" @click="closePromo" />
          <button class="btn-toggle icon" @click="toggleExpand" :aria-expanded="isExpanded">
            <icons-down-icon />
          </button>
        </div>
      </header>

      <transition name="slide-fade">
        <section v-if="isExpanded" class="promo-body">
          <p class="promo-desc">{{ description }}</p>
          <a :href="link" class="btn-primary">Перейти по ссылке</a>
          <button class="btn-text" @click="hidePromo">Больше не показывать!</button>
        </section>
      </transition>
    </div>
  </div>
  <div v-else></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { defineProps } from 'vue'

const props = defineProps<{
  id: string
  name: string
  description: string
  link: string
  image: string
}>()

const isHidden = ref(false)
const isClosed = ref(false)
const isExpanded = ref(false)

const makePromoKey = (id: string) => `promo-state:${id}`

function getPromoState(id: string) {
  if (typeof window === 'undefined') return { hidden: false, expanded: false }
  const raw = localStorage.getItem(makePromoKey(id))
  return raw ? JSON.parse(raw) : { hidden: false, expanded: false }
}

function setPromoState(id: string, state: { hidden: boolean; expanded: boolean }) {
  if (typeof window === 'undefined') return
  localStorage.setItem(makePromoKey(id), JSON.stringify(state))
}

onMounted(() => {
  const state = getPromoState(props.id)
  isHidden.value = state.hidden
  isExpanded.value = state.expanded
})

function closePromo() {
  isClosed.value = true
}

function hidePromo() {
  isHidden.value = true
  isClosed.value = true
  setPromoState(props.id, { hidden: true, expanded: isExpanded.value })
}

function toggleExpand() {
  isExpanded.value = !isExpanded.value
  setPromoState(props.id, { hidden: isHidden.value, expanded: isExpanded.value })
}
</script>

<style scoped>
.promo {
  position: relative;
  border: 2px solid var(--primary-color);
  background-color: var(--background-color);
  overflow: hidden;
  transition: border-color 0.2s ease;
  margin: 1rem 0;
  font-family: inherit;
}

.promo.expanded {
  background: none;
}

.promo-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.2;
  z-index: 0;
  transition: opacity 0.3s ease;
}

.promo-container {
  position: relative;
  z-index: 1;
  padding: 0.3rem 1rem 0.3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.promo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.promo-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0;
}

.promo-controls {
  display: flex;
  gap: 0.25rem;
}

.icon-close,
.btn-toggle.icon {
  background: none;
  border: none;
  font-size: 1.1rem;
  color: var(--link-color);
  cursor: pointer;
  padding: 0.25rem;
}

.promo-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.promo-desc {
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--primary-color);
}

.btn-primary {
  align-self: start;
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  background: transparent;
  text-decoration: none;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: var(--secondary-bg);
}

.btn-text {
  font-size: 0.7rem;
  opacity: 70%;
  border: none;
  color: var(--primary-color);
  background: transparent;
  text-decoration: none;
  cursor: pointer;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-0.25rem);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
