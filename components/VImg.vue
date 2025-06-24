<template>
  <div class="collapsible" :class="{ open: isOpen }" @click="toggle">
    <span class="label">{{ alt || 'Image' }}</span>
    <span class="icon">{{ isOpen ? '−' : '+' }}</span>
  </div>
  <div v-if="isOpen" class="image-container">
    <NuxtImg
      :src="src"
      :alt="alt || 'Image'"
      :width="width"
      :height="height"
      :format="format || 'webp'"
      :loading="'lazy'"
      class="responsive-img"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  height: { type: [String, Number], default: undefined },
  format: { type: String, default: 'webp' },
  loading: { type: String, default: 'lazy' }
})

const isOpen = ref(false)
function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.collapsible {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid;
  padding: 0.5rem 1rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s, border-color 0.2s;
}
.icon {
  font-size: 1.2rem;
  line-height: 1;
}
.image-container {
  margin-top: 0.5rem;
  padding: 0.5rem;
}
.responsive-img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
