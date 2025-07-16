<template>
  <footer class="footer">
    <div class="footer-content">

      <div class="footer-section">
        <h4>текущая версия сайта - {{ version.tag || "не найдена" }}</h4>
        <ul>
          <li>{{ version.full }}</li>
        </ul>
      </div>

      <!-- <div class="footer-section">
        <h4>Связь</h4>
        <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        <p>GitHub: <a href="https://github.com/your-repo" target="_blank">your-repo</a></p>
      </div> -->
    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 GrechkaGK. Все права защищены.</p>
    </div>
  </footer>
</template>

<script setup>
import version from '@/version.json'
</script>

<style scoped>
.footer {
  background-color: var(--background-color);
  color: var(--primary-color);
  border-top: 2px solid var(--secondary-bg);
  padding: 0.5rem 1rem;
  margin-top: 4rem;
  font-size: 0.9rem;
}


.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
}

.footer-section {
  flex: 1 1 200px;
}

.footer-section h4 {
  color: var(--secondary-color);
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: var(--link-color);
  text-decoration: none;
}

.footer-section a:hover {
  color: var(--link-hover-color);
  text-decoration: underline;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-bottom {
  border-top: 2px solid var(--secondary-bg);
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  text-align: center;
  color: var(--preview-color);
}
</style>
