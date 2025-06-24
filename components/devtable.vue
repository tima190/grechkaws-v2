<template>
  <div class="tech-grid">
    <slot/>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 16px;
  padding: 1rem;
  justify-items: center;
  align-items: center;
}
</style>