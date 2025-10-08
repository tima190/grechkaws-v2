<template>
  <span class="emoji-wrapper">
    <NuxtImg
      :src="emojiPath"
      :alt="alt || 'Emoji'"
      :width="width"
      :height="height"
      :format="format"
      class="emoji"
    />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  src: { 
    type: String, 
    required: true,
    // Теперь принимает только имя эмодзи (например, "aww" вместо "/emojis/aww.png")
  },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  height: { type: [String, Number], default: undefined },
  format: { type: String, default: 'png' },
  loading: { type: String, default: 'lazy' }
})

// Формируем правильный путь к эмодзи на основе имени и формата [[3]]
const emojiPath = computed(() => `/emojis/${props.src}.${props.format}`)
</script>

<style scoped>
.emoji-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  margin: 0 2px;
}

.emoji {
  display: block;
  max-height: 1.5em;
  object-fit: contain;
}
</style>