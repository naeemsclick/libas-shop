<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ProductGrid from '@/components/product/ProductGrid.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import SearchBar from '@/components/layout/SearchBar.vue';
import { useProductStore } from '@/stores/product';
import { useSeo } from '@/composables/useSeo';

const route = useRoute();
const productStore = useProductStore();

const query = computed(() => (route.query.q as string) || '');

const searchResults = computed(() => {
  if (!query.value.trim()) return [];
  return productStore.filterProducts({ searchQuery: query.value });
});

useSeo({
  title: query.value ? `Search Results for "${query.value}"` : 'Search Products',
  description: 'Search results on LIBAS Shop.'
});
</script>

<template>
  <div class="search-page section-spacing">
    <div class="container">
      <div class="search-header-box text-center">
        <h1 class="page-title">Search Results</h1>
        <p v-if="query" class="search-query-text">
          Showing results for "<strong>{{ query }}</strong>" ({{ searchResults.length }} items found)
        </p>
        <p v-else class="search-query-text">Type a product name or category below to begin searching</p>

        <div class="search-input-wrapper">
          <SearchBar />
        </div>
      </div>

      <div class="results-container">
        <div v-if="searchResults.length === 0 && query">
          <EmptyState
            :title="`No Results Found for '${query}'`"
            description="Try checking for spelling errors or searching with broader keywords like Headphones, Bag, or Serum."
            ctaText="Browse All Products"
            ctaLink="/shop"
          />
        </div>

        <ProductGrid v-else-if="searchResults.length" :products="searchResults" :columns="4" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.text-center { text-align: center; }

.search-header-box {
  max-width: 640px;
  margin: 0 auto 40px;
}

.page-title { font-size: 2.2rem; margin-bottom: 8px; }

.search-query-text {
  font-size: 1rem;
  color: var(--color-taupe);
  margin-bottom: 24px;
}

.search-input-wrapper {
  display: flex;
  justify-content: center;
}
</style>
