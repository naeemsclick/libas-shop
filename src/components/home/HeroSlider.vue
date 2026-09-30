<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { ArrowRight } from 'lucide-vue-next';
import { heroSlidesData } from '@/data/heroSlides';
import { useLocaleStore } from '@/stores/locale';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const modules = [Autoplay, Pagination, Navigation, EffectFade];
const localeStore = useLocaleStore();
</script>

<template>
  <section class="hero-section">
    <div class="container">
      <div class="hero-grid">
        <!-- Left Side: Main Hero Slider (approx 68% width) -->
        <div class="hero-main-slider">
          <Swiper
            :modules="modules"
            :slides-per-view="1"
            :loop="true"
            :speed="2600"
            :effect="'fade'"
            :fadeEffect="{ crossFade: true }"
            :autoplay="{ delay: 7500, disableOnInteraction: false }"
            :pagination="{ clickable: true }"
            :navigation="true"
            class="hero-swiper background-slideshow"
          >
            <SwiperSlide v-for="slide in heroSlidesData" :key="slide.id">
              <div class="hero-slide-item">
                <img :src="slide.image" :alt="slide.title" class="slide-bg-img" />
                <div class="slide-overlay"></div>

                <div class="slide-content">
                  <span class="slide-badge">
                    {{ localeStore.isBangla ? (slide.eyebrowBn || slide.eyebrow) : slide.eyebrow }}
                  </span>

                  <h2 class="slide-title">
                    {{ localeStore.isBangla ? (slide.titleBn || slide.title) : slide.title }}
                  </h2>

                  <p class="slide-desc">
                    {{ localeStore.isBangla ? (slide.descriptionBn || slide.description) : slide.description }}
                  </p>

                  <router-link :to="slide.primaryCtaLink" class="slide-cta-btn">
                    <span>{{ localeStore.isBangla ? (slide.primaryCtaTextBn || slide.primaryCtaText) : slide.primaryCtaText }}</span>
                    <ArrowRight :size="16" />
                  </router-link>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <!-- Right Side: 2 Stacked Side Banners (approx 32% width) -->
        <div class="hero-side-banners">
          <!-- Top Card: Premium Modest Style Banner -->
          <div class="side-banner-card">
            <img src="/images/banners/hero-right-top.jpg" alt="Premium Modest Style" class="side-card-bg" />
            <div class="side-card-overlay"></div>
            <div class="side-card-content">
              <span class="side-badge">
                CLOTHING
              </span>
              <h3 class="side-title">
                {{ localeStore.isBangla ? 'প্রিমিয়াম শালীন ফ্যাশন ও পোশাক' : 'PREMIUM MODEST STYLE' }}
              </h3>
              <router-link to="/category/clothing" class="side-link">
                <span>{{ localeStore.isBangla ? 'অর্ডার করুন' : 'Shop Now' }}</span>
                <ArrowRight :size="14" />
              </router-link>
            </div>
          </div>

          <!-- Bottom Card: Shoes & Footwear Banner -->
          <div class="side-banner-card">
            <img src="/images/banners/hero-right-bottom.jpg" alt="Premium Shoes Collection" class="side-card-bg" />
            <div class="side-card-overlay"></div>
            <div class="side-card-content">
              <span class="side-badge">
                SHOES
              </span>
              <h3 class="side-title">
                {{ localeStore.isBangla ? 'প্রিমিয়াম জুতা ও স্যান্ডেল কালেকশন' : 'PREMIUM SHOES COLLECTION' }}
              </h3>
              <router-link to="/category/shoes" class="side-link">
                <span>{{ localeStore.isBangla ? 'অর্ডার করুন' : 'Shop Now' }}</span>
                <ArrowRight :size="14" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-section {
  width: 100%;
  padding: 20px 0 24px;
  background: var(--color-off-white);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 300px;
    gap: 16px;
  }

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

/* Left Main Hero Slider */
.hero-main-slider {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.hero-swiper {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;

  /* Custom Navigation Arrow Buttons */
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 42px;
    height: 42px;
    background: rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    color: #FFFFFF;
    transition: all 0.3s ease;
    margin-top: 0;
    transform: translateY(-50%);

    &::after {
      font-size: 15px;
      font-weight: 800;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.65);
      color: var(--color-charcoal);
      transform: translateY(-50%) scale(1.1);
    }
  }

  :deep(.swiper-button-prev) {
    left: 18px;
  }

  :deep(.swiper-button-next) {
    right: 18px;
  }

  /* Custom Pagination Bullets */
  :deep(.swiper-pagination) {
    bottom: 16px;
  }

  :deep(.swiper-pagination-bullet) {
    background: rgba(255, 255, 255, 0.55);
    opacity: 1;
    width: 8px;
    height: 8px;
    margin: 0 4px !important;
    transition: all 0.3s ease;
  }

  :deep(.swiper-pagination-bullet-active) {
    background: #FFFFFF;
    width: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
}

.hero-slide-item {
  position: relative;
  width: 100%;
  height: 430px;
  overflow: hidden;
  border-radius: 16px;

  @media (max-width: 1200px) {
    height: 390px;
  }

  @media (max-width: 768px) {
    height: 320px;
  }

  @media (max-width: 600px) {
    height: auto;
    aspect-ratio: 16 / 9;
    min-height: 215px;
    border-radius: 12px;
  }
}

.slide-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1);
  transition: transform 12s cubic-bezier(0.25, 1, 0.5, 1);
}

:deep(.swiper-slide-active) {
  .slide-bg-img {
    transform: scale(1.055);
  }

  .slide-content {
    animation: fadeInUpContent 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
}

@keyframes fadeInUpContent {
  0% {
    opacity: 0;
    transform: translateY(-44%) translateY(14px);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) translateY(0);
  }
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(15, 17, 23, 0.76) 0%, rgba(15, 17, 23, 0.42) 58%, transparent 100%);
  pointer-events: none;

  @media (max-width: 600px) {
    background: linear-gradient(180deg, rgba(15, 17, 23, 0.15) 0%, rgba(15, 17, 23, 0.88) 100%);
  }
}

.slide-content {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 48px;
  max-width: 500px;
  color: #FFFFFF;
  z-index: 5;

  @media (max-width: 1100px) {
    left: 36px;
    max-width: 440px;
  }

  @media (max-width: 768px) {
    left: 24px;
    right: 24px;
    max-width: 100%;
  }

  @media (max-width: 600px) {
    top: auto;
    bottom: 12px;
    left: 14px;
    right: 14px;
    transform: none;
  }
}

.slide-badge {
  display: inline-block;
  padding: 5px 14px;
  background: var(--color-accent);
  color: #FFFFFF;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 6px;
  margin-bottom: 14px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(190, 145, 52, 0.4);

  @media (max-width: 600px) {
    padding: 3px 8px;
    font-size: 0.65rem;
    margin-bottom: 6px;
  }
}

.slide-title {
  font-family: var(--font-heading);
  font-size: 2.3rem;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.22;
  margin-bottom: 12px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 1100px) {
    font-size: 1.95rem;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 600px) {
    font-size: 1.15rem;
    margin-bottom: 4px;
  }
}

.slide-desc {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.55;
  margin-bottom: 24px;
  max-width: 440px;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 600px) {
    font-size: 0.75rem;
    line-height: 1.35;
    margin-bottom: 8px;
    -webkit-line-clamp: 1;
  }
}

.slide-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: var(--color-accent);
  color: #FFFFFF;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 999px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 18px rgba(190, 145, 52, 0.4);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -100%;
    width: 60%;
    height: 200%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.55) 50%,
      transparent 100%
    );
    transform: rotate(25deg);
    transition: none;
    pointer-events: none;
  }

  &:hover {
    background: var(--color-accent-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(163, 121, 40, 0.5);

    &::after {
      animation: btnShineSwipe 0.75s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }

  @media (max-width: 600px) {
    padding: 6px 14px;
    font-size: 0.75rem;
  }
}

@keyframes btnShineSwipe {
  0% {
    left: -100%;
  }
  100% {
    left: 125%;
  }
}

/* Right Side Stacked Banners */
.hero-side-banners {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;

  @media (max-width: 991px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.side-banner-card {
  position: relative;
  flex: 1;
  min-height: 205px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);

  @media (max-width: 991px) {
    height: 190px;
    min-height: auto;
  }
}

.side-card-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.8s ease;
}

.side-banner-card:hover .side-card-bg {
  transform: scale(1.07);
}

.side-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(15, 17, 23, 0.75) 0%, rgba(15, 17, 23, 0.35) 75%, transparent 100%);
  pointer-events: none;
}

.side-card-content {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 24px;
  right: 20px;
  color: #FFFFFF;
  z-index: 5;
}

.side-badge {
  display: inline-block;
  padding: 4px 10px;
  background: var(--color-accent);
  color: #FFFFFF;
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: 4px;
  margin-bottom: 8px;
  letter-spacing: 0.03em;
  text-transform: uppercase;

  &.badge-accent {
    background: var(--color-primary);
  }
}

.side-title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.3;
  margin-bottom: 12px;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);

  @media (max-width: 1100px) {
    font-size: 1.05rem;
  }
}

.side-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  font-weight: 700;
  color: #FFFFFF;
  transition: all 0.2s ease;

  &:hover {
    color: var(--color-accent);
    transform: translateX(3px);
  }
}
</style>
