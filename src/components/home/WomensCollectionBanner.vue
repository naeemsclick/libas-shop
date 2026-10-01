<script setup lang="ts">
import { computed } from 'vue';
import { ArrowRight, Sparkles } from 'lucide-vue-next';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import ProductGrid from '@/components/product/ProductGrid.vue';
import { useProductStore } from '@/stores/product';
import { useLocaleStore } from '@/stores/locale';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const modules = [Autoplay, EffectFade, Pagination];
const localeStore = useLocaleStore();
const productStore = useProductStore();

const womensProducts = computed(() => {
  const items = productStore.getProductsByCategory('womens-collection');
  if (items.length > 0) return items.slice(0, 4);
  return productStore.products.slice(0, 4);
});

const banners = [
  {
    id: 1,
    image: '/images/banners/womens-collection-banner.png',
    badgeEn: 'EXCLUSIVE ABAYA & THREE-PIECE',
    badgeBn: 'বিশেষ আবায়া ও থ্রি-পিস',
    titleEn: 'ELEGANCE & MODESTY REDEFINED',
    titleBn: 'শালীনতা ও অভিজাত্যের অনন্য প্রকাশ',
    subEn: 'Discover Dubai Cherry Abayas, Premium Hijabs & Designer Dresses',
    subBn: 'দুবাই চেরি আবায়া, প্রিমিয়াম হিজাব এবং সুদৃশ্য ড্রেস কালেকশন'
  },
  {
    id: 2,
    image: '/images/banners/womens-collection-banner-2.jpg',
    badgeEn: 'NEW SEASON LUXURY WEAR',
    badgeBn: 'নতুন সিজন লাক্সারি ওয়্যার',
    titleEn: 'PREMIUM EMBROIDERED & FESTIVE COLLECTION',
    titleBn: 'প্রিমিয়াম এমব্রয়ডারি ও এথনিক থ্রি-পিস',
    subEn: 'Exquisite Crafts, Vibrant Colors & Luxurious Fabric Quality',
    subBn: 'নান্দনিক কারুকাজ, আকর্ষণীয় রঙ ও প্রিমিয়াম ফ্যাব্রিকের সমাহার'
  }
];
</script>

<template>
  <section class="womens-collection-section">
    <div class="container">
      <div class="section-header-row">
        <div class="header-title-group">
          <div class="category-badge">
            <Sparkles :size="15" />
            <span>{{ localeStore.isBangla ? 'প্রিমিয়াম ফিমেল ওয়্যার' : 'PREMIUM FEMALE WEAR' }}</span>
          </div>
          <h2 class="main-section-title">
            {{ localeStore.isBangla ? 'উইমেনস কালেকশন' : "WOMEN'S COLLECTION" }}
          </h2>
        </div>

        <router-link to="/category/womens-collection" class="view-all-link">
          <span>{{ localeStore.isBangla ? 'সকল কালেকশন দেখুন' : 'Explore All Collection' }}</span>
          <ArrowRight :size="16" />
        </router-link>
      </div>

      <div class="banner-wrapper">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :loop="true"
          :speed="1800"
          :effect="'fade'"
          :fadeEffect="{ crossFade: true }"
          :autoplay="{ delay: 2500, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          class="womens-banner-swiper"
        >
          <SwiperSlide v-for="banner in banners" :key="banner.id">
            <router-link to="/category/womens-collection" class="banner-link">
              <img
                :src="banner.image"
                :alt="banner.titleEn"
                class="banner-img"
              />
              <div class="banner-overlay"></div>

              <div class="banner-content">
                <span class="badge-pill">
                  {{ localeStore.isBangla ? banner.badgeBn : banner.badgeEn }}
                </span>
                <h3 class="banner-heading">
                  {{ localeStore.isBangla ? banner.titleBn : banner.titleEn }}
                </h3>
                <p class="banner-subtext">
                  {{ localeStore.isBangla ? banner.subBn : banner.subEn }}
                </p>
                <span class="shop-btn">
                  <span>{{ localeStore.isBangla ? 'শপ করুন' : 'Shop Women Collection' }}</span>
                  <ArrowRight :size="16" />
                </span>
              </div>
            </router-link>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- 4 Category Products Grid below banner -->
      <div class="womens-products-wrapper">
        <ProductGrid :products="womensProducts" :columns="4" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.womens-collection-section {
  padding: 40px 0 30px;
  background: var(--color-white);
}

.section-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

.header-title-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--color-primary-subtle);
  color: var(--color-primary-dark);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  width: fit-content;
  border: 1px solid var(--color-border);
}

.main-section-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-charcoal);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--color-accent);
  transition: all 0.2s ease;

  &:hover {
    color: var(--color-accent-dark);
    transform: translateX(4px);
  }
}

.banner-wrapper {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-border);
  margin-bottom: 28px;
}

.womens-banner-swiper {
  width: 100%;

  :deep(.swiper-pagination) {
    bottom: 14px;
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

.banner-link {
  display: block;
  position: relative;
  width: 100%;
  aspect-ratio: 21 / 8;
  overflow: hidden;
  text-decoration: none;

  @media (max-width: 992px) {
    aspect-ratio: 16 / 8;
  }

  @media (max-width: 600px) {
    aspect-ratio: 16 / 10;
  }
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.banner-link:hover .banner-img {
  transform: scale(1.05);
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(15, 17, 23, 0.72) 0%, rgba(15, 17, 23, 0.32) 60%, transparent 100%);

  @media (max-width: 600px) {
    background: linear-gradient(180deg, rgba(15, 17, 23, 0.15) 0%, rgba(15, 17, 23, 0.85) 100%);
  }
}

.banner-content {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 44px;
  max-width: 480px;
  color: #FFFFFF;
  z-index: 5;

  @media (max-width: 992px) {
    left: 28px;
    max-width: 400px;
  }

  @media (max-width: 600px) {
    top: auto;
    bottom: 24px;
    left: 16px;
    right: 16px;
    transform: none;
    max-width: 100%;
  }
}

.badge-pill {
  display: inline-block;
  padding: 4px 12px;
  background: var(--color-accent);
  color: #FFFFFF;
  font-size: 0.72rem;
  font-weight: 700;
  border-radius: 6px;
  margin-bottom: 12px;
  letter-spacing: 0.04em;

  @media (max-width: 600px) {
    margin-bottom: 6px;
    font-size: 0.65rem;
  }
}

.banner-heading {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1.25;
  color: #FFFFFF;
  margin-bottom: 8px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 992px) {
    font-size: 1.45rem;
  }

  @media (max-width: 600px) {
    font-size: 1.15rem;
    margin-bottom: 4px;
  }
}

.banner-subtext {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 0.78rem;
    margin-bottom: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.shop-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  background: var(--color-accent);
  color: #FFFFFF;
  font-size: 0.88rem;
  font-weight: 700;
  border-radius: 999px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(190, 145, 52, 0.4);

  &:hover {
    background: var(--color-accent-dark);
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    padding: 6px 14px;
    font-size: 0.75rem;
  }
}

.womens-products-wrapper {
  margin-top: 10px;
}
</style>
