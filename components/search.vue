<script setup lang="ts">
import Fuse from 'fuse.js'

const query = ref('')
const { data } = await useAsyncData('search-data', () => queryCollectionSearchSections('blogs'))

const fuse = new Fuse(data.value ?? [], {
  keys: ['title', 'description']
})

const result = computed(() => fuse.search(toValue(query)).slice(0, 10))
</script>

<template>
  <div class="search-box">
    <input v-model="query" placeholder="Найти..." class="search-input" />
    <ul class="search-results">
      <li v-for="link of result" :key="link.item.id" class="search-item">
        <NuxtLink :to="link.item.id">
          <button class="search-button">
            {{ link.item.title }}
            <span class="preview">
              {{ link.item.content?.slice(0, 100) }}...
            </span>
          </button>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-box {

  margin-top: 1rem;
}

.search-input {
  width: max-content;
  padding: 0.5rem 1rem;
  border: 2px solid var(--primary-color);
  background-color: var(--background-color);
  color: var(--primary-color);
  outline: none;
  transition: border-color 0.2s;
  margin-bottom: 1rem;
}

.search-input:focus {
  border-color: var(--secondary-color);
}

.search-results {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-item {
  margin-bottom: 0.5rem;
}

.search-button {
  width: 100%;
  background-color: var(--background-color);
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s, border-color 0.2s;
}

.search-button:hover {
  background-color: var(--secondary-bg);
  border-color: var(--secondary-color);
}

.preview {
  display: block;
  font-size: 0.75rem;
  color: var(--preview-color);
}
</style>
