<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isOpen = ref(false)
function toggle() {
  isOpen.value = !isOpen.value
}


const toc = ref<{ id: string; text: string; level: number }[]>([])

onMounted(() => {
  toc.value = Array.from(document.querySelectorAll('h2, h3, h4')).map((heading) => {
    const anchor = heading.querySelector('a')
    return {
      id: heading.id || anchor?.getAttribute('href')?.replace('#', '') || '',
      text: anchor?.textContent?.trim() || heading.textContent?.trim() || '',
      level: parseInt(heading.tagName.replace('H', ''))
    }
  })
})
</script>

<template>
  <div class="collapsible" :class="{ open: isOpen }" @click="toggle">
    <span class="label">{{ 'Заголовки' }}</span>
    <span class="icon">{{ isOpen ? '−' : '+' }}</span>
  </div>
  <nav v-if="isOpen" class="toc">
    <ul>
      <li
        v-for="item in toc"
        :key="item.id"
        :style="{ paddingLeft: `${(item.level - 2) * 1.5}rem` }"
      >
        <a :href="'#' + item.id">{{ item.text }}</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc {
  border-left: 2px solid /* #90D1CA */;
  padding-left: 1rem;
}
.toc a {
  /* color: #096B68 */
  text-decoration: none;
}
.toc a:hover {
  text-decoration: underline;
}

.collapsible {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color:  #FFFBDE */;
  border: 2px solid /* #096B68 */;
  padding: 0.5rem 1rem;
  cursor: pointer;
  /* color: #096B68; */
  user-select: none;
  transition: background-color 0.2s, border-color 0.2s;
  margin-top: 1rem;
}
.collapsible.open {
  /* background-color: #90D1CA;
  border-color: #129990; */
}
</style>
