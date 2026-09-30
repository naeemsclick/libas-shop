<script setup lang="ts">
import { ArrowRight, Sparkles } from 'lucide-vue-next';
import { useLocaleStore } from '@/stores/locale';

const localeStore = useLocaleStore();
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
        <router-link to="/category/womens-collection" class="banner-link">
          <img
            src="/images/banners/womens-collection-banner.png"
            alt="Women's Collection - Dubai Cherry Abayas & Modest Wear"
            class="banner-img"
          />
          <div class="banner-overlay"></div>

          <div class="banner-content">
            <span class="badge-pill">
              {{ localeStore.isBangla ? 'বিশেষ আবায়া ও থ্রি-পিস' : 'EXCLUSIVE ABAYA & THREE-PIECE' }}
            </span>
            <h3 class="banner-heading">
              {{ localeStore.isBangla ? 'শালীনতা ও অভিজাত্যের অনন্য প্রকাশ' : 'ELEGANCE & MODESTY REDEFINED' }}
            </h3>
            <p class="banner-subtext">
              {{ localeStore.isBangla ? 'দুবাই চেরি আবায়া, প্রিমিয়াম হিজাব এবং সুদৃশ্য ড্রেস কালেকশন' : 'Discover Dubai Cherry Abayas, Premium Hijabs & Designer Dresses' }}
            </p>
            <span class="shop-btn">
              <span>{{ localeStore.isBangla ? 'শপ করুন' : 'Shop Women Collection' }}</span>
              <ArrowRight :size="16" />
            </span>
          </div>
        </router-link>
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
    bottom: 16px;
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
</style>
