<script setup lang="ts">
import { computed } from 'vue';
import { Zap, ArrowRight } from 'lucide-vue-next';
import FlashSaleTimer from './FlashSaleTimer.vue';
import ProductGrid from '@/components/product/ProductGrid.vue';
import { useProductStore } from '@/stores/product';

const productStore = useProductStore();
const flashProducts = computed(() => productStore.flashSaleProducts.slice(0, 4));
</script>

<template>
  <section class="flash-sale-section section-spacing">
    <div class="container">
      <div class="flash-banner-card">
        <div class="flash-header">
          <div class="title-group">
            <div class="flash-badge">
              <Zap :size="16" />
              <span>LIMITED TIME DEALS</span>
            </div>
            <h2 class="section-title">LIBAS Special Offers</h2>
          </div>

          <div class="timer-wrapper">
            <span class="timer-label">Ends in:</span>
            <FlashSaleTimer />
          </div>

          <router-link to="/offers" class="btn btn--accent btn--md flash-cta">
            <span>Explore All Offers</span>
            <ArrowRight :size="16" />
          </router-link>
        </div>

        <div class="flash-products-wrapper">
          <ProductGrid :products="flashProducts" :columns="4" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.flash-sale-section {
  background: var(--color-off-white);
}

.flash-banner-card {
  background: linear-gradient(135deg, #FAF4EF 0%, #F5EAE1 100%);
  border: 1.5px solid var(--color-beige);
  border-radius: var(--radius-xl);
  padding: 36px;
  box-shadow: var(--shadow-md);

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
}

.flash-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
}

.title-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.flash-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--color-accent);
  color: white;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  width: fit-content;
}

.section-title {
  font-size: 1.9rem;
  color: var(--color-charcoal);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.timer-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;

  .timer-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-taupe);
  }
}

.flash-cta {
  box-shadow: 0 6px 18px rgba(229, 139, 139, 0.3);
}
</style>
