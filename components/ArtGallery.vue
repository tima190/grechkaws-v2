<template>
  <div class="gallery">
    <div class="grid">
      <div 
        v-for="(img, index) in images" 
        :key="index"
        class="grid-item"
        @click="toggleFullscreen(img)"
      >
        <div class="image-wrapper">
          <img 
            :src="getImagePath(img)" 
            :alt="`Artwork ${index + 1}`"
            class="art-image"
          />
        </div>
      </div>
    </div>
    
    <!-- Fullscreen overlay -->
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
import { ref, onMounted } from 'vue';

const images = ref([]);
const fullscreenImage = ref(null);

// Получение списка изображений
onMounted(() => {
  const context = import.meta.glob(
    '/public/img/artworks/*.{jpg,jpeg,png,gif,webp,avif}',
    { eager: true, query: '?url', import: 'default' }
  );

  images.value = Object.keys(context).map(path => {
    return path.replace('/public', '');
  });
});

// Полный путь к изображению
const getImagePath = (imgPath) => {
  return imgPath.startsWith('/') ? imgPath : `/img/artworks/${imgPath}`;
};

// Переключение полноэкранного режима
const toggleFullscreen = (img) => {
  fullscreenImage.value = img;
};
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
  border: 1px solid var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px; /* Фиксированная высота */
  overflow: hidden;
}

.grid-item:hover {
  background-color: var(--link-color);
}

.image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.art-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
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
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .grid-item {
    height: 150px;
  }
}
</style>