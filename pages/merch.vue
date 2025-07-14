<template>
  <div class="merch-page">
    <h1>Каталог мерча</h1>
    <blockquote>На данный момент просто заглушка, ничего из ниже представленного нельзя купить.</blockquote>
    <div v-if="merch?.length" class="merch-grid">
      <div v-for="item in merch" :key="item.title" class="merch-card">
        <NuxtImg
          v-if="selectedVariant[item.title]"
          :src="getSelectedImage(item)"
          :alt="`Вариант ${selectedVariant[item.title]}`"
          width="400"
          height="600"
          format="webp"
          loading="lazy"
          class="merch-image"
        />
        <div class="merch-text">
          <h2>{{ item.title }}</h2>
          <p class="price">{{ item.price }} ₽</p>
          <p class="description">{{ item.description || 'Описание отсутствует' }}</p>
          <div class="variant-switcher">
            <button
              v-for="variant in item.variants"
              :key="variant.color"
              class="variant-button"
              :class="{ active: selectedVariant[item.title] === variant.color }"
              @click="selectVariant(item.title, variant.color)"
            >
              {{ variant.color }}
            </button>
          </div>
          <button class="buy-button" disabled>Купить</button>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>Нет товаров для отображения</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: merch } = await useAsyncData('documents-list', () => 
  queryCollection('merch').all()
)

const selectedVariant = ref<{ [key: string]: string }>({})

watch(
  merch,
  (newMerch) => {
    if (newMerch?.length) {
      newMerch.forEach((item) => {
        if (!selectedVariant.value[item.title] && item.variants.length) {
          selectedVariant.value[item.title] = item.variants[0].color
        }
      })
    }
  },
  { immediate: true }
)

const selectVariant = (title: string, color: string) => {
  selectedVariant.value[title] = color
}

const getSelectedImage = (item: any) => {
  const variant = item.variants.find((v: any) => v.color === selectedVariant.value[item.title])
  return variant?.image || item.variants[0]?.image || ''
}
</script>

<style scoped>
:root {
  --background-color: #1a1a1a;
  --primary-color: #e0e0e0;
  --secondary-bg: #2a2a2a;
  --secondary-color: #ff6b6b;
}

.merch-page {
  background: var(--background-color);
  color: var(--primary-color);
  min-height: 100vh;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2.25rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

blockquote {
  text-align: center;
  margin-bottom: 2rem;
}

.merch-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.merch-card {
  background: var(--secondary-bg);
  border: 1px solid var(--secondary-color);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  transition: transform 0.2s ease;
}

.merch-card:hover {
  transform: translateY(-4px);
}

.merch-image {
  width: 100%;
  max-width: 250px;
  height: auto;
  object-fit: cover;
  border: 1px solid var(--secondary-color);
  transition: transform 0.2s ease;
}

.merch-image:hover {
  transform: scale(1.03);
}

.merch-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.merch-text h2 {
  font-size: 1.5rem;
}

.price {
  font-weight: 600;
  color: var(--secondary-color);
}

.description {
  opacity: 0.8;
}

.variant-switcher {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.variant-button {
  background: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.variant-button:hover {
  background: var(--secondary-color);
  color: var(--background-color);
}

.variant-button.active {
  background: var(--secondary-color);
  color: var(--background-color);
  border-color: var(--secondary-color);
}

.buy-button {
  background: var(--secondary-color);
  color: var(--background-color);
  border: none;
  padding: 0.6rem 1.5rem;
  cursor: not-allowed;
  font-weight: 500;
  transition: background 0.2s ease;
  align-self: flex-start;
}

.buy-button:hover {
  background: #e55a5a;
}

.empty-state {
  text-align: center;
  padding: 1.5rem;
  background: var(--secondary-bg);
  border: 1px solid var(--secondary-color);
  max-width: 400px;
  margin: 2rem auto;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.75rem;
  }

  .merch-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }

  .merch-image {
    max-width: 200px;
    margin: 0 auto;
  }
}
</style>