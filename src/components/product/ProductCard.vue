<script setup lang="ts">
import { ref } from 'vue';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-vue-next';
import type { Product } from '@/types';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { useUiStore } from '@/stores/ui';
import { useLocaleStore } from '@/stores/locale';
import { formatPrice } from '@/utils/formatters';

const props = defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const uiStore = useUiStore();
const localeStore = useLocaleStore();

const isHovered = ref(false);
const addedSuccess = ref(false);

function handleAddToCart(e: Event) {
  e.stopPropagation();
  e.preventDefault();
  cartStore.addItem(props.product, 1);
  addedSuccess.value = true;
  uiStore.openCartDrawer();
  setTimeout(() => {
    addedSuccess.value = false;
  }, 2000);
}

function handleToggleWishlist(e: Event) {
  e.stopPropagation();
  e.preventDefault();
  wishlistStore.toggleWishlist(props.product);
}

function handleQuickView(e: Event) {
  e.stopPropagation();
  e.preventDefault();
  uiStore.openQuickView(props.product);
}
</script>

<template>
  <div
    class="product-card"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Image Area -->
    <div class="card-image-wrapper">
      <router-link :to="`/product/${product.slug}`" class="image-link">
        <img
          :src="isHovered && product.images[1] ? product.images[1] : product.images[0]"
          :alt="product.name"
          class="product-image"
          loading="lazy"
        />
      </router-link>

      <!-- Badges -->
      <div class="badges-container">
        <span v-if="product.discount" class="badge badge--sale">-{{ product.discount }}%</span>
        <span v-else-if="product.badge" class="badge badge--new">{{ product.badge }}</span>
      </div>

      <!-- Quick Floating Action Buttons -->
      <div class="floating-actions">
        <button
          type="button"
          :class="['action-btn', { active: wishlistStore.isInWishlist(product.id) }]"
          aria-label="Wishlist"
          @click="handleToggleWishlist"
        >
          <Heart :size="17" :fill="wishlistStore.isInWishlist(product.id) ? '#E58B8B' : 'none'" />
        </button>

        <button
          type="button"
          class="action-btn"
          aria-label="Quick View"
          @click="handleQuickView"
        >
          <Eye :size="17" />
        </button>
      </div>

      <!-- Quick Add to Cart button reveal on hover -->
      <button
        type="button"
        :class="['hover-add-cart-btn', { success: addedSuccess }]"
        @click="handleAddToCart"
      >
        <Check v-if="addedSuccess" :size="16" />
        <ShoppingBag v-else :size="16" />
        <span>{{ addedSuccess ? (localeStore.isBangla ? 'কার্টে যোগ করা হয়েছে!' : 'Added to Cart!') : localeStore.t('section.addToCart') }}</span>
      </button>
    </div>

    <!-- Product Info Area -->
    <div class="card-info">
      <span class="product-category">{{ product.category }}</span>
      
      <router-link :to="`/product/${product.slug}`" class="title-link">
        <h3 class="product-title" :title="product.name">{{ product.name }}</h3>
      </router-link>

      <div class="rating-row">
        <div class="stars">
          <Star v-for="i in 5" :key="i" :size="12" class="star-icon" fill="#BE9134" />
        </div>
        <span class="rating-text">({{ product.reviewsCount }})</span>
      </div>

      <div class="price-row">
        <span class="current-price">{{ formatPrice(product.price) }}</span>
        <span v-if="product.compareAtPrice" class="old-price">{{ formatPrice(product.compareAtPrice) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-card {
  background: var(--color-white);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: var(--transition-normal);
  position: relative;

  &:hover {
    box-shadow: var(--shadow-card);
    transform: translateY(-4px);
    border-color: var(--color-border-hover);

    .hover-add-cart-btn {
      transform: translateY(0);
      opacity: 1;
    }

    .floating-actions {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: var(--color-off-white);
  overflow: hidden;

  .image-link {
    display: block;
    width: 100%;
    height: 100%;
  }

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 16px;
    transition: transform 0.4s ease;
  }
}

.badges-container {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 2;
}

.floating-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 3;
  opacity: 0;
  transform: translateX(8px);
  transition: var(--transition-fast);

  @media (max-width: 768px) {
    opacity: 1;
    transform: none;
  }
}

.action-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-charcoal);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-fast);

  &:hover {
    background: var(--color-white);
    transform: scale(1.1);
  }

  &.active {
    color: var(--color-accent);
  }
}

.hover-add-cart-btn {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  background: var(--color-taupe);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  font-size: 0.82rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  z-index: 3;
  opacity: 0;
  transform: translateY(10px);
  transition: var(--transition-fast);
  white-space: nowrap;

  &:hover {
    background: var(--color-primary-dark);
  }

  &.success {
    background: var(--color-success);
  }

  @media (max-width: 768px) {
    opacity: 1;
    transform: none;
    padding: 6px 10px;
    font-size: 0.78rem;
  }
}

.card-info {
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: 480px) {
    padding: 10px;
  }
}

.product-category {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-taupe);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.title-link {
  text-decoration: none;
}

.product-title {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--color-charcoal);
  line-height: 1.35;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    color: var(--color-primary);
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
}

.stars {
  display: flex;
  gap: 2px;
  color: #F4A261;
}

.rating-text {
  font-size: 0.72rem;
  color: var(--color-taupe);
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: auto;
}

.current-price {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-primary-dark);
}

.old-price {
  font-size: 0.82rem;
  color: var(--color-taupe);
  position: relative;
  text-decoration: none;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1.5px;
    background-color: var(--color-error);
    transform: translateY(-50%) scaleX(0);
    transform-origin: left center;
    animation: strikethroughExpand 0.55s 0.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
}

@keyframes strikethroughExpand {
  to {
    transform: translateY(-50%) scaleX(1);
  }
}

.badge--sale {
  animation: badgeSlideInRight 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes badgeSlideInRight {
  from {
    opacity: 0;
    transform: translateX(18px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}</style>
