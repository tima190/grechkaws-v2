<template>
  <div class="ascii">
    <slot />
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.ascii {
    display: block;
    font-family: monospace;
    white-space: pre;
    width: max-content;
    background: #096B68;
    color: #FFFBDE;
    padding: 8px;
    border-radius: 6px;
    overflow: auto;
  }
</style>