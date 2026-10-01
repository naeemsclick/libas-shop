<script setup lang="ts">
import { computed } from 'vue';
import { Zap, ArrowRight } from 'lucide-vue-next';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import FlashSaleTimer from './FlashSaleTimer.vue';
import ProductCard from '@/components/product/ProductCard.vue';
import { useProductStore } from '@/stores/product';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = [Autoplay, Navigation, Pagination];
const productStore = useProductStore();
const flashProducts = computed(() => {
  const list = productStore.flashSaleProducts;
  return list.length > 0 ? list.slice(0, 8) : productStore.products.slice(0, 8);
});
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
          <Swiper
            :modules="modules"
            :slides-per-view="4"
            :space-between="18"
            :loop="true"
            :speed="700"
            :autoplay="{ delay: 1800, disableOnInteraction: false, pauseOnMouseEnter: true }"
            :navigation="true"
            :pagination="{ clickable: true, dynamicBullets: true, dynamicMainBullets: 3 }"
            :breakpoints="{
              0: { slidesPerView: 1.2, spaceBetween: 12 },
              480: { slidesPerView: 2, spaceBetween: 14 },
              768: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 18 }
            }"
            class="flash-swiper"
          >
            <SwiperSlide v-for="product in flashProducts" :key="product.id">
              <ProductCard :product="product" />
            </SwiperSlide>
          </Swiper>
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
  background: linear-gradient(135deg, #FDFBF7 0%, #F5F1E6 100%);
  border: 1px solid rgba(190, 145, 52, 0.35);
  border-radius: var(--radius-xl);
  padding: 32px 28px 28px;
  box-shadow: 0 10px 30px rgba(29, 42, 35, 0.06), 0 2px 12px rgba(190, 145, 52, 0.1);
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
      transparent 40%,
      rgba(190, 145, 52, 0.08) 47%,
      rgba(247, 239, 207, 0.3) 50%,
      rgba(190, 145, 52, 0.08) 53%,
      transparent 60%,
      transparent 100%
    );
    transform: rotate(30deg);
    animation: flashShineSwipe 6.0s infinite ease-in-out;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 20px 12px 16px;
  }
}

@keyframes flashShineSwipe {
  0% {
    transform: translateX(-130%) rotate(30deg);
  }
  65% {
    transform: translateX(130%) rotate(30deg);
  }
  100% {
    transform: translateX(130%) rotate(30deg);
  }
}

.flash-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  padding: 0 8px;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 0;
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
  font-size: 1.85rem;
  color: var(--color-charcoal);

  @media (max-width: 768px) {
    font-size: 1.45rem;
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
  box-shadow: 0 6px 18px rgba(190, 145, 52, 0.35);
}

.flash-products-wrapper {
  width: 100%;
  position: relative;
}

.flash-swiper {
  padding-left: 28px !important;
  padding-right: 28px !important;
  padding-bottom: 36px !important;
  padding-top: 4px;

  @media (max-width: 768px) {
    padding-left: 18px !important;
    padding-right: 18px !important;
  }

  :deep(.swiper-slide) {
    height: auto;
    display: flex;
  }

  :deep(.swiper-slide > *) {
    width: 100%;
  }

  /* Sleek Minimal Arrow Buttons inside padding gutter */
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 28px;
    height: 28px;
    background: transparent;
    border: none;
    box-shadow: none;
    color: var(--color-charcoal);
    transition: all 0.2s ease;
    margin-top: -24px;
    opacity: 0.65;

    &::after {
      font-size: 16px;
      font-weight: 900;
    }

    &:hover {
      opacity: 1;
      color: var(--color-accent);
      transform: scale(1.25);
    }
  }

  :deep(.swiper-button-prev) {
    left: -2px;
  }

  :deep(.swiper-button-next) {
    right: -2px;
  }

  /* Custom Pagination Bullets - Limited to 3-4 active/dynamic dots */
  :deep(.swiper-pagination) {
    bottom: 2px;
  }

  :deep(.swiper-pagination-bullet) {
    background: rgba(190, 145, 52, 0.35);
    opacity: 1;
    width: 8px;
    height: 8px;
    margin: 0 4px !important;
    transition: all 0.3s ease;
  }

  :deep(.swiper-pagination-bullet-active) {
    background: var(--color-accent);
    width: 22px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(190, 145, 52, 0.4);
  }
}
</style>

