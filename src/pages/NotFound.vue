<script setup lang="ts">
import { ShoppingBag, ArrowLeft } from 'lucide-vue-next';
import { useSeo } from '@/composables/useSeo';

useSeo({
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist on LIBAS Shop.'
});
</script>

<template>
  <div class="not-found-page section-spacing text-center">
    <div class="container">
      <div class="not-found-card">
        <div class="code-badge">404</div>
        <h1 class="title">Page Not Found</h1>
        <p class="desc">
          Sorry, the page you are looking for might have been removed, renamed, or is temporarily unavailable.
        </p>

        <div class="actions">
          <router-link to="/" class="btn btn--primary btn--md">
            <ArrowLeft :size="16" />
            <span>Return to Home</span>
          </router-link>
          <router-link to="/shop" class="btn btn--outline btn--md">
            <ShoppingBag :size="16" />
            <span>Browse Products</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.not-found-page { background: var(--color-off-white); }
.text-center { text-align: center; }

.not-found-card {
  max-width: 560px;
  margin: 40px auto;
  background: white;
  border-radius: var(--radius-xl);
  padding: 56px 32px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.code-badge {
  font-family: var(--font-heading);
  font-size: 4rem;
  font-weight: 800;
  color: var(--color-accent);
  line-height: 1;
  margin-bottom: 12px;
}

.title { font-size: 2rem; margin-bottom: 12px; }
.desc { font-size: 0.95rem; color: var(--color-taupe); line-height: 1.6; margin-bottom: 28px; }
.actions { display: flex; gap: 12px; }
</style>
