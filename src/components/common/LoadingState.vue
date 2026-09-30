<script setup lang="ts">
interface Props {
  message?: string;
}

withDefaults(defineProps<Props>(), {
  message: 'Loading LIBAS Shop items...'
});
</script>

<template>
  <div class="loading-state">
    <div class="spinner"></div>
    <p class="loading-text">{{ message }}</p>
  </div>
</template>

<style scoped lang="scss">
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.spinner {
  width: 44px;
  height: 44px;
  border: 3px solid var(--color-beige);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  margin-top: 16px;
  font-size: 0.95rem;
  color: var(--color-taupe);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
