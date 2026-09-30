<script setup lang="ts">
import { Heart, ShoppingBag, Trash2 } from 'lucide-vue-next';
import ProductGrid from '@/components/product/ProductGrid.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import { useWishlistStore } from '@/stores/wishlist';
import { useCartStore } from '@/stores/cart';
import { useUiStore } from '@/stores/ui';
import { useSeo } from '@/composables/useSeo';
import { formatPrice } from '@/utils/formatters';

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const uiStore = useUiStore();

useSeo({
  title: 'My Wishlist',
  description: 'Your saved LIBAS Shop items.'
});

function moveAllToCart() {
  wishlistStore.items.forEach((item) => {
    cartStore.addItem(item.product, 1);
  });
  wishlistStore.clearWishlist();
  uiStore.openCartDrawer();
}

function handleMoveSingleToCart(product: any) {
  cartStore.addItem(product, 1);
  wishlistStore.removeItem(product.id);
  uiStore.openCartDrawer();
}
</script>

<template>
  <div class="wishlist-page section-spacing">
    <div class="container">
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span class="sep">/</span>
        <span class="current">My Wishlist</span>
      </nav>

      <div class="header-row">
        <div>
          <h1 class="page-title">My Wishlist</h1>
          <p class="subtitle">Saved items you love</p>
        </div>

        <button
          v-if="wishlistStore.count > 0"
          type="button"
          class="btn btn--primary btn--sm"
          @click="moveAllToCart"
        >
          <ShoppingBag :size="16" />
          <span>Move All to Cart</span>
        </button>
      </div>

      <div v-if="wishlistStore.count === 0">
        <EmptyState
          title="Your Wishlist is Empty"
          description="Click the heart icon on any product card to save items to your wishlist."
          ctaText="Explore Products"
          ctaLink="/shop"
        />
      </div>

      <div v-else class="wishlist-grid">
        <div v-for="item in wishlistStore.items" :key="item.product.id" class="wishlist-item-card">
          <button
            type="button"
            class="remove-btn"
            aria-label="Remove from wishlist"
            @click="wishlistStore.removeItem(item.product.id)"
          >
            <Trash2 :size="16" />
          </button>

          <img :src="item.product.images[0]" :alt="item.product.name" class="item-img" />

          <div class="item-details">
            <span class="category">{{ item.product.category }}</span>
            <router-link :to="`/product/${item.product.slug}`" class="name">
              {{ item.product.name }}
            </router-link>
            <span class="price">{{ formatPrice(item.product.price) }}</span>

            <button
              type="button"
              class="btn btn--primary btn--sm add-btn"
              @click="handleMoveSingleToCart(item.product)"
            >
              <ShoppingBag :size="14" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
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
  margin-bottom: 16px;

  .sep { opacity: 0.5; }
  .current { color: var(--color-charcoal); font-weight: 600; }
}

.header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 32px;
}

.page-title { font-size: 2.2rem; margin-bottom: 4px; }
.subtitle { font-size: 0.9rem; color: var(--color-taupe); }

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.wishlist-item-card {
  position: relative;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.remove-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--color-off-white);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-taupe);

  &:hover { color: var(--color-error); }
}

.item-img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  margin-bottom: 12px;
}

.item-details {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.category { font-size: 0.75rem; font-weight: 600; color: var(--color-taupe); text-transform: uppercase; margin-bottom: 4px; }
.name { font-size: 0.92rem; font-weight: 600; color: var(--color-charcoal); margin-bottom: 8px; }
.price { font-size: 1.05rem; font-weight: 700; color: var(--color-primary-dark); margin-bottom: 14px; margin-top: auto; }
.add-btn { width: 100%; }
</style>
