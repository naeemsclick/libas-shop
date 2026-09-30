<script setup lang="ts">
import { computed } from 'vue';
import { ArrowRight, Tag } from 'lucide-vue-next';
import ProductGrid from '@/components/product/ProductGrid.vue';
import { useProductStore } from '@/stores/product';
import { useLocaleStore } from '@/stores/locale';
import type { Product } from '@/types';

const props = defineProps<{
  title: string;
  titleBn?: string;
  badge: string;
  badgeBn?: string;
  categorySlug?: string;
  link: string;
  filterFn?: (p: Product) => boolean;
}>();

const localeStore = useLocaleStore();
const productStore = useProductStore();

const filteredProducts = computed(() => {
  let list: Product[] = [];
  if (props.filterFn) {
    list = productStore.products.filter(props.filterFn);
  } else if (props.categorySlug) {
    list = productStore.getProductsByCategory(props.categorySlug);
  }
  
  if (list.length < 4) {
    // Fill up to 4 if category list is smaller
    const remainder = productStore.products.filter(p => !list.includes(p));
    list = [...list, ...remainder];
  }
  
  return list.slice(0, 4);
});
</script>

<template>
  <section class="home-category-section section-spacing">
    <div class="container">
      <div class="section-header">
        <div>
          <span class="sub-heading">
            <Tag :size="14" class="tag-icon" />
            <span>{{ localeStore.isBangla ? (badgeBn || badge) : badge }}</span>
          </span>
          <h2 class="main-title">
            {{ localeStore.isBangla ? (titleBn || title) : title }}
          </h2>
        </div>
        <router-link :to="link" class="btn btn--outline btn--sm">
          <span>{{ localeStore.isBangla ? 'সব দেখুন' : 'View All' }}</span>
          <ArrowRight :size="14" />
        </router-link>
      </div>

      <ProductGrid :products="filteredProducts" :columns="4" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.home-category-section {
  background: var(--color-white);
  border-top: 1px solid var(--color-border);
  padding: 44px 0;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 28px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

.sub-heading {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-accent-dark);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.tag-icon {
  color: var(--color-accent);
}

.main-title {
  font-family: var(--font-heading);
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--color-charcoal);
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.45rem;
  }
}
</style>
