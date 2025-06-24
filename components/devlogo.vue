<template>
  <div :class="wrapperClass">
    <NuxtImg 
      :src="src"
      :alt="alt || 'Image'"
      :width="width"
      :height="height"
      :format="format || 'webp'"
      :loading="'lazy'"
      draggable="false"
      class="responsive-img"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick } from 'vue'
import { createDraggable, createSpring, animate, svg } from 'animejs'

const props = defineProps({
  name: { type: String, required: true },
  src:  { type: String, required: true },
  alt:  { type: String, default: '' },
  width:  { type: [String, Number], default: 64 },
  height: { type: [String, Number], default: 64 },
  format:  { type: String, default: 'webp' },
  loading: { type: String, default: 'lazy' }
})

// вычисляем имя класса, например, если name="vue", класс будет "devlogo-vue"
const wrapperClass = `devlogo devlogo-${props.name}`

onMounted(async () => {
  await nextTick() // ждём, пока Nuxt вставит всё в DOM

  // найдём именно этот элемент по сгенерированному классу
  const el = document.querySelector(`.devlogo-${props.name}`)
  if (el instanceof HTMLElement) {
    const dev = createDraggable(el, {
      container: [0, 0, 0, 0],
      releaseEase: createSpring({ 
        stiffness: 400,
        damping: 10,
       }),
       containerFriction: 0.3,
    });
    
    const dev2 = animate(el, {
      autoplay: false,
      rotate: [0, 10, 0, -10, 0],
      loop: true,
      duration: 300,
      
    });

    dev.onGrab =  () => dev2.play()
    dev.onRelease = () => dev2.pause()
  }
})
</script>

<style scoped>
.responsive-img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* пример базового стиля для .devlogo, можно дорабатывать под свои нужды */
.devlogo {
  touch-action: none;
  cursor: grab;
}
</style>
