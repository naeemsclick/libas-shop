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
  background: linear-gradient(135deg, #1D2A23 0%, #141E19 100%);
  border: 1.5px solid var(--color-accent);
  border-radius: var(--radius-xl);
  padding: 36px;
  box-shadow: 0 12px 32px rgba(29, 42, 35, 0.25);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      transparent 42%,
      rgba(255, 255, 255, 0.08) 48%,
      rgba(190, 145, 52, 0.3) 50%,
      rgba(255, 255, 255, 0.08) 52%,
      transparent 58%,
      transparent 100%
    );
    transform: rotate(30deg);
    animation: flashShineSwipe 5s infinite cubic-bezier(0.25, 1, 0.5, 1);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
}

@keyframes flashShineSwipe {
  0% {
    transform: translateX(-120%) rotate(30deg);
  }
  88% {
    transform: translateX(120%) rotate(30deg);
  }
  100% {
    transform: translateX(120%) rotate(30deg);
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
  color: #FFFFFF;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  width: fit-content;
}

.section-title {
  font-size: 1.9rem;
  color: #FFFFFF;

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
    color: #ECEFEA;
  }
}

.flash-cta {
  box-shadow: 0 6px 18px rgba(190, 145, 52, 0.35);
}
</style>
