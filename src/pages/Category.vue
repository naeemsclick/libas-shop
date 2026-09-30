<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ProductGrid from '@/components/product/ProductGrid.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import { useCategoryStore } from '@/stores/category';
import { useProductStore } from '@/stores/product';
import { useSeo } from '@/composables/useSeo';

const route = useRoute();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const categorySlug = computed(() => route.params.slug as string);
const subcategorySlug = computed(() => route.query.sub as string);

const category = computed(() => categoryStore.getCategoryBySlug(categorySlug.value));

const categoryProducts = computed(() => {
  return productStore.filterProducts({
    categorySlug: categorySlug.value,
    subcategorySlug: subcategorySlug.value
  });
});

useSeo({
  title: category.value?.name || 'Category',
  description: category.value?.description || 'Browse products'
});
</script>

<template>
  <div class="category-page section-spacing">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span class="sep">/</span>
        <router-link to="/shop">Shop</router-link>
        <span class="sep">/</span>
        <span class="current">{{ category?.name || categorySlug }}</span>
      </nav>

      <!-- Category Hero Banner -->
      <div class="category-hero" v-if="category">
        <div class="hero-bg">
          <img :src="category.image" :alt="category.name" />
          <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
          <span class="hero-badge">LIBAS SHOP COLLECTION</span>
          <h1 class="category-name">{{ category.name }}</h1>
          <p class="category-desc">{{ category.description }}</p>

          <!-- Subcategory Chips -->
          <div class="subcat-pills" v-if="category.subcategories.length">
            <router-link
              :to="`/category/${category.slug}`"
              :class="['subcat-pill', { active: !subcategorySlug }]"
            >
              All {{ category.name }}
            </router-link>
            <router-link
              v-for="sub in category.subcategories"
              :key="sub.slug"
              :to="`/category/${category.slug}?sub=${sub.slug}`"
              :class="['subcat-pill', { active: subcategorySlug === sub.slug }]"
            >
              {{ sub.name }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="category-products">
        <div v-if="categoryProducts.length === 0">
          <EmptyState
            title="No Products in this Category"
            description="We are currently restocking new arrivals for this collection."
            ctaText="View All Products"
            ctaLink="/shop"
          />
        </div>

        <ProductGrid v-else :products="categoryProducts" :columns="4" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--color-taupe);
  margin-bottom: 24px;

  .sep { opacity: 0.5; }
  .current { color: var(--color-charcoal); font-weight: 600; }
}

.category-hero {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  padding: 48px 36px;
  margin-bottom: 40px;
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
  }
}

.hero-bg {
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(37, 38, 46, 0.88) 0%,
      rgba(37, 38, 46, 0.55) 60%,
      rgba(37, 38, 46, 0.2) 100%
    );
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 620px;
}

.hero-badge {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--color-beige);
  margin-bottom: 8px;
  display: block;
}

.category-name {
  font-size: 2.4rem;
  color: white;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
}

.category-desc {
  font-size: 0.95rem;
  color: var(--color-beige);
  line-height: 1.55;
  margin-bottom: 24px;
}

.subcat-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.subcat-pill {
  padding: 6px 16px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(4px);
  color: white;
  font-size: 0.82rem;
  font-weight: 500;
  transition: var(--transition-fast);

  &:hover, &.active {
    background: white;
    color: var(--color-charcoal);
    font-weight: 600;
  }
}
</style>
