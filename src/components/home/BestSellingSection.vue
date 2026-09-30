<script setup lang="ts">
import { computed } from 'vue';
import { ArrowRight, Flame } from 'lucide-vue-next';
import ProductGrid from '@/components/product/ProductGrid.vue';
import { useProductStore } from '@/stores/product';

const productStore = useProductStore();
const bestSellers = computed(() => productStore.bestSellers.slice(0, 4));
</script>

<template>
  <section class="best-selling-section section-spacing">
    <div class="container">
      <div class="section-header">
        <div>
          <span class="sub-heading">
            <Flame :size="14" class="flame-icon" /> Customer Favorites
          </span>
          <h2 class="main-title">Best Selling Products</h2>
        </div>
        <router-link to="/shop?sortBy=featured" class="btn btn--outline btn--sm">
          <span>View All Best Sellers</span>
          <ArrowRight :size="14" />
        </router-link>
      </div>

      <ProductGrid :products="bestSellers" :columns="4" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.best-selling-section {
  background: var(--color-white);
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

.sub-heading {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-accent-dark);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
}

.flame-icon {
  color: var(--color-accent);
}

.main-title {
  font-size: 1.8rem;
  color: var(--color-charcoal);

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
}
</style>
