<template>
  <section class="blog-page">
    <h1 class="page-title">Блог</h1>

    <div class="blog-image">
      <NuxtImg 
        src="printing.png"
        width="256"
        height="256"
        alt="Иллюстрация"
        draggable="false"
      />
    </div>

    <Search />

    <div class="blog-list">
      <NuxtLink
        v-for="blog in blogs"
        :key="blog.path"
        :to="blog.path"
        class="blog-entry"
      >
        <h2 class="blog-title">{{ blog.title }}</h2>
        <p class="blog-description">{{ blog.description }}</p>
      </NuxtLink>
    </div>
  </section>
</template>


<script lang="ts" setup>
const route = useRoute()
const { data: blogs } = await useAsyncData(route.path, () => {
  return queryCollection('blogs')
    .select('title', 'path', 'description')
    .all()
})

useSeoMeta({
  title:"Blog"
})
</script>

<style scoped>
.blog-page {
  padding: 2rem 1rem;
  background-color: var(--background-color);
  color: var(--primary-color);
  font-family: system-ui, sans-serif;
}

/* Заголовок страницы */
.page-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  border-left: 4px solid var(--secondary-bg);
  padding-left: 1rem;
  color: var(--primary-color);
}

/* Контейнер изображения блога */
.blog-image {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

/* Список записей блога */
.blog-list {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Запись блога */
.blog-entry {
  padding: 1rem;
  border: 2px solid var(--primary-color);
  background-color: var(--secondary-bg);
  text-decoration: none;
  transition: background-color 0.3s, border-color 0.3s;
}

.blog-entry:hover {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: var(--background-color);
}

/* Заголовок записи блога */
.blog-title {
  margin: 0;
  font-size: 1.3rem;
  color: inherit;
}

/* Описание записи блога */
.blog-description {
  margin: 0.5rem 0 0;
  font-style: italic;
  color: inherit;
}
</style>
