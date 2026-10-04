<script setup lang="ts">
import { ref, computed } from 'vue';
import { X, Heart, ShoppingBag, Check } from 'lucide-vue-next';
import { useUiStore } from '@/stores/ui';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { formatPrice } from '@/utils/formatters';
import { getColorHex } from '@/utils/colors';

const uiStore = useUiStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const selectedImageIndex = ref(0);
const quantity = ref(1);
const selectedSize = ref('');
const selectedColor = ref('');
const addedNotification = ref(false);

const product = computed(() => uiStore.quickViewProduct);

function closeModal() {
  uiStore.closeQuickView();
  selectedImageIndex.value = 0;
  quantity.value = 1;
}

function handleAddToCart() {
  if (!product.value) return;
  cartStore.addItem(
    product.value,
    quantity.value,
    selectedSize.value || (product.value.sizes?.[0] ?? ''),
    selectedColor.value || (product.value.colors?.[0] ?? '')
  );
  addedNotification.value = true;
  uiStore.openCartDrawer();
  setTimeout(() => {
    addedNotification.value = false;
  }, 2500);
}

function handleToggleWishlist() {
  if (product.value) {
    wishlistStore.toggleWishlist(product.value);
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="uiStore.isQuickViewOpen && product" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-card">
        <button type="button" class="close-btn" aria-label="Close modal" @click="closeModal">
          <X :size="20" />
        </button>

        <div class="modal-grid">
          <!-- Gallery left -->
          <div class="gallery-col">
            <div class="main-image">
              <img :src="product.images[selectedImageIndex] || product.images[0]" :alt="product.name" />
              <span v-if="product.badge" class="badge badge--sale">{{ product.badge }}</span>
            </div>
            <div v-if="product.images.length > 1" class="thumbnails">
              <button
                v-for="(img, idx) in product.images"
                :key="idx"
                type="button"
                :class="['thumb-btn', { active: selectedImageIndex === idx }]"
                @click="selectedImageIndex = idx"
              >
                <img :src="img" :alt="`${product.name} thumb ${idx}`" />
              </button>
            </div>
          </div>

          <!-- Info right -->
          <div class="info-col">
            <span class="category-tag">{{ product.category }}</span>
            <h2 class="product-title">{{ product.name }}</h2>

            <div class="price-row">
              <span class="current-price">{{ formatPrice(product.price) }}</span>
              <span v-if="product.compareAtPrice" class="compare-price">{{ formatPrice(product.compareAtPrice) }}</span>
              <span v-if="product.discount" class="discount-pill">-{{ product.discount }}% OFF</span>
            </div>

            <p class="description">{{ product.shortDescription || product.description }}</p>

            <!-- Color options -->
            <div v-if="product.colors && product.colors.length" class="option-group">
              <label class="option-label">Color: <span>{{ selectedColor || product.colors[0] }}</span></label>
              <div class="option-pills">
                <button
                  v-for="color in product.colors"
                  :key="color"
                  type="button"
                  :class="['color-pill-btn', { active: (selectedColor || product.colors[0]) === color }]"
                  @click="selectedColor = color"
                >
                  <span
                    class="color-dot"
                    :style="{
                      backgroundColor: getColorHex(color),
                      border: color.toLowerCase().includes('white') || color.toLowerCase().includes('সাদা') ? '1px solid #CCCCCC' : 'none'
                    }"
                  ></span>
                  <span>{{ color }}</span>
                </button>
              </div>
            </div>

            <!-- Size options -->
            <div v-if="product.sizes && product.sizes.length" class="option-group">
              <label class="option-label">Size: <span>{{ selectedSize || product.sizes[0] }}</span></label>
              <div class="option-pills">
                <button
                  v-for="size in product.sizes"
                  :key="size"
                  type="button"
                  :class="['pill-btn', { active: (selectedSize || product.sizes[0]) === size }]"
                  @click="selectedSize = size"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- Actions -->
            <div class="actions-row">
              <div class="qty-selector">
                <button type="button" :disabled="quantity <= 1" @click="quantity--">-</button>
                <span>{{ quantity }}</span>
                <button type="button" @click="quantity++">+</button>
              </div>

              <button type="button" class="btn btn--primary btn--md add-btn" @click="handleAddToCart">
                <Check v-if="addedNotification" :size="18" />
                <ShoppingBag v-else :size="18" />
                {{ addedNotification ? 'Added to Cart!' : 'Add to Cart' }}
              </button>

              <button
                type="button"
                :class="['wishlist-icon-btn', { active: wishlistStore.isInWishlist(product.id) }]"
                @click="handleToggleWishlist"
              >
                <Heart :size="20" :fill="wishlistStore.isInWishlist(product.id) ? '#E58B8B' : 'none'" />
              </button>
            </div>

            <router-link :to="`/product/${product.slug}`" class="view-details-link" @click="closeModal">
              View Full Product Specifications &rarr;
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(37, 38, 46, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 32px;
  box-shadow: var(--shadow-lg);

  @media (max-width: 768px) {
    padding: 20px;
  }
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--color-off-white);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: var(--transition-fast);

  &:hover {
    background: var(--color-beige);
  }
}

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.gallery-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.main-image {
  position: relative;
  width: 100%;
  height: 340px;
  background: var(--color-off-white);
  border-radius: var(--radius-md);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 16px;
  }

  .badge {
    position: absolute;
    top: 12px;
    left: 12px;
  }
}

.thumbnails {
  display: flex;
  gap: 8px;

  .thumb-btn {
    width: 60px;
    height: 60px;
    border-radius: var(--radius-sm);
    border: 2px solid transparent;
    background: var(--color-off-white);
    padding: 4px;
    cursor: pointer;

    &.active {
      border-color: var(--color-primary);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.info-col {
  display: flex;
  flex-direction: column;
}

.category-tag {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.product-title {
  font-size: 1.35rem;
  margin-bottom: 12px;
}

.price-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary-dark);
}

.compare-price {
  font-size: 1rem;
  color: var(--color-taupe);
  text-decoration: line-through;
}

.discount-pill {
  background: #E53935;
  color: white;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
}

.description {
  font-size: 0.9rem;
  color: var(--color-taupe);
  line-height: 1.5;
  margin-bottom: 20px;
}

.option-group {
  margin-bottom: 16px;

  .option-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 6px;

    span {
      font-weight: 400;
      color: var(--color-taupe);
    }
  }

  .option-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .color-pill-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 12px 5px 7px;
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-full);
    background: white;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-charcoal);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

    .color-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
      flex-shrink: 0;
      transition: transform 0.2s ease;
    }

    &:hover {
      border-color: var(--color-accent);
      color: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(190, 145, 52, 0.18);

      .color-dot {
        transform: scale(1.15);
      }
    }

    &.active {
      border-color: var(--color-accent);
      background: linear-gradient(135deg, #1D2A23 0%, #2C3F35 100%);
      color: #FFFFFF;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(29, 42, 35, 0.25);

      .color-dot {
        transform: scale(1.1);
        box-shadow: 0 0 0 2px #FFFFFF;
      }
    }
  }

  .pill-btn {
    padding: 6px 14px;
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: white;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--color-charcoal);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      border-color: var(--color-accent);
      color: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(190, 145, 52, 0.18);
    }

    &.active {
      border-color: var(--color-accent);
      background: linear-gradient(135deg, #1D2A23 0%, #2C3F35 100%);
      color: #FFFFFF;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(29, 42, 35, 0.25);
    }
  }
}

.actions-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  margin-bottom: 20px;

  @media (max-width: 520px) {
    flex-wrap: wrap;
    gap: 10px;
  }
}

.qty-selector {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  button {
    width: 36px;
    height: 40px;
    border: none;
    background: transparent;
    font-size: 1.1rem;
    cursor: pointer;

    &:disabled {
      opacity: 0.4;
    }
  }

  span {
    width: 36px;
    text-align: center;
    font-weight: 600;
  }
}

.add-btn {
  flex: 1;
  white-space: nowrap;

  @media (max-width: 520px) {
    width: 100%;
    flex: 1 1 100%;
    order: 3;
    justify-content: center;
    padding: 12px 16px;
    font-size: 0.9rem;
  }
}

.wishlist-icon-btn {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-taupe);

  &.active {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }
}

.view-details-link {
  font-size: 0.85rem;
  color: var(--color-primary);
  font-weight: 600;
  margin-top: auto;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
