<template>
  <div class="gallery">
    <div class="grid">
      <div
        v-for="(img, index) in images"
        :key="img + index"
        class="grid-item"
        @click="toggleFullscreen(img)"
      >
        <div class="image-wrapper">
          <img
            :src="getImagePath(img)"
            :alt="`Artwork ${index + 1}`"
            class="art-image"
            draggable="false"
          />

          <div class="caption" @click.stop>
            <span class="caption-name">{{ fileName(img) }}</span>
            <span class="caption-actions">
              <a
                :href="getImagePath(img)"
                :download="fileName(img)"
                class="caption-btn"
                @click.stop
                aria-label="Download image"
                title="Скачать"
              >
                скачать
              </a>
              <a
                :href="getImagePath(img)"
                target="_blank"
                rel="noopener"
                class="caption-btn"
                @click.stop
                aria-label="Open image in new tab"
                title="Открыть в новой вкладке"
              >
                открыть
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="fullscreenImage"
      class="fullscreen-overlay"
      @click="fullscreenImage = null"
    >
      <img
        :src="getImagePath(fullscreenImage)"
        class="fullscreen-image"
        :alt="`Fullscreen artwork`"
        @click.stop
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const images = ref([])
const fullscreenImage = ref(null)

onMounted(() => {
  const context = import.meta.glob(
    '/public/img/artworks/*.{jpg,jpeg,png,gif,webp,avif}',
    { eager: true, query: '?url', import: 'default' }
  )

  images.value = Object.keys(context).map((path) => path.replace('/public', ''))
})

const getImagePath = (imgPath) => {
  return imgPath.startsWith('/') ? imgPath : `/img/artworks/${imgPath}`
}

const toggleFullscreen = (img) => {
  fullscreenImage.value = img
}

const fileName = (imgPath) => {
  const path = getImagePath(imgPath)
  const parts = path.split('/').pop() || ''
  return parts.replace(/\.[^/.]+$/, '')
}
</script>

<style scoped>
.gallery {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.grid-item {
  cursor: pointer;
  background-color: var(--secondary-bg);
  border: 1px solid var(--secondary-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  overflow: hidden;
  position: relative;
}

.grid-item:hover {
  border-color: var(--secondary-color);
}

.image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 6px;
}

/* изображение масштабируется, но не растягивается */
.art-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  cursor: zoom-in;
  user-select: none;
  -webkit-user-drag: none;
  background: var(--background-color);
  border: 1px solid rgba(0,0,0,0.04);
}

/* плашка внутри фото */
.caption {
  position: absolute;
  left: 6px;
  right: 6px;
  bottom: 6px;
  display: flex;
  padding:0.3em;
  align-items: center;
  justify-content: space-between;
  opacity: 0;
  transition: opacity 0.18s ease, transform 0.18s ease;
  pointer-events: none;
  z-index: 2;
  line-height: 1;
}

/* фоновый слой плашки — цвет на основе --primary-color, текст — контрастный --background-color */
.caption::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--primary-color);
  opacity: 0.5;
  pointer-events: none;
  z-index: -1;
}

/* текст и кнопки поверх слоя */
.caption-name,
.caption-actions,
.caption-btn {
  position: relative;
  z-index: 3;
  color: var(--background-color);
}

/* показываем плашку при наведении на элемент сетки (только в сетке) */
.grid-item:hover .caption,
.grid-item:focus-within .caption,
.image-wrapper:focus-within .caption {
  opacity: 1;
  pointer-events: auto;
}

/* имя файла */
.caption-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 68%;
  padding-left: 0.25rem;
  letter-spacing: -0.01em;
}

/* кнопки справа */
.caption-actions {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
}

/* стиль кнопок */
.caption-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  min-height: 16px;
  padding: 0.15rem 0.4rem;
  border: 2px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: var(--background-color);
  text-decoration: none;
  font-size: 0.95rem;
  line-height: 1;
  transition: transform 0.12s ease, background 0.12s ease, border-color 0.12s;
  display: inline-grid;
  place-items: center;
}

/* hover / focus */
.caption-btn:hover,
.caption-btn:focus {
  background: rgba(255,255,255,0.14);
  border-color: var(--secondary-color);
  outline: none;
}

/* адаптивные размеры */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .grid-item {
    height: 150px;
  }

  .caption-name {
    max-width: 58%;
    font-size: 0.85rem;
  }

  .caption-btn {
    min-width: 30px;
    min-height: 30px;
    font-size: 0.9rem;
  }
}

/* Fullscreen styles */
.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
}

.fullscreen-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  cursor: default;
  border: 2px solid var(--primary-color);
  background: var(--background-color);
}
</style>
