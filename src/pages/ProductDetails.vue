<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Heart, ShoppingBag, Star, Check, Truck, ShieldCheck, RefreshCw, MessageCircle } from 'lucide-vue-next';
import ProductGrid from '@/components/product/ProductGrid.vue';
import TestimonialSlider from '@/components/home/TestimonialSlider.vue';
import LoadingState from '@/components/common/LoadingState.vue';
import NotFound from '@/pages/NotFound.vue';
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { useUiStore } from '@/stores/ui';
import { useSeo } from '@/composables/useSeo';
import { formatPrice } from '@/utils/formatters';

import { getColorHex } from '@/utils/colors';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const uiStore = useUiStore();

const activeImageIndex = ref(0);
const quantity = ref(1);
const selectedSize = ref('');
const selectedColor = ref('');
const activeTab = ref<'desc' | 'specs' | 'shipping' | 'returns'>('desc');
const addedToCartSuccess = ref(false);

const product = computed(() => {
  const slug = route.params.slug as string;
  return productStore.getProductBySlug(slug);
});

const relatedProducts = computed(() => {
  if (!product.value) return [];
  return productStore
    .getProductsByCategory(product.value.categorySlug)
    .filter((p) => p.id !== product.value?.id)
    .slice(0, 4);
});

watch(
  product,
  (newProd) => {
    if (newProd) {
      activeImageIndex.value = 0;
      quantity.value = 1;
      selectedColor.value = newProd.colors?.[0] || '';
      selectedSize.value = newProd.sizes?.[0] || '';
      const prodImg = newProd.images[0]?.startsWith('http')
        ? newProd.images[0]
        : `https://libas.shop${newProd.images[0]}`;
      useSeo({
        title: newProd.name,
        description: newProd.shortDescription || newProd.description,
        image: prodImg,
        url: `https://libas.shop/product/${newProd.slug}`
      });
    }
  },
  { immediate: true }
);


function handleAddToCart() {
  if (!product.value) return;
  cartStore.addItem(
    product.value,
    quantity.value,
    selectedSize.value,
    selectedColor.value
  );
  addedToCartSuccess.value = true;
  uiStore.openCartDrawer();
  setTimeout(() => {
    addedToCartSuccess.value = false;
  }, 2500);
}

function handleBuyNow() {
  handleAddToCart();
  router.push('/checkout');
}

function handleWhatsAppOrder() {
  if (!product.value) return;
  const msg = encodeURIComponent(
    `Hello LIBAS Shop! I would like to order: ${product.value.name} (Price: ${formatPrice(product.value.price)})`
  );
  window.open(`https://wa.me/8801717000414?text=${msg}`, '_blank');
}
</script>

<template>
  <div v-if="product" class="product-details-page section-spacing">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span class="sep">/</span>
        <router-link to="/shop">Shop</router-link>
        <span class="sep">/</span>
        <router-link :to="`/category/${product.categorySlug}`">{{ product.category }}</router-link>
        <span class="sep">/</span>
        <span class="current">{{ product.name }}</span>
      </nav>

      <!-- Main Grid -->
      <div class="product-main-grid">
        <!-- Gallery Left -->
        <div class="gallery-column">
          <div class="main-image-box">
            <img :src="product.images[activeImageIndex] || product.images[0]" :alt="product.name" />
            <span v-if="product.badge" class="badge badge--sale">{{ product.badge }}</span>
          </div>

          <div v-if="product.images.length > 1" class="thumbnail-strip">
            <button
              v-for="(img, idx) in product.images"
              :key="idx"
              type="button"
              :class="['thumb-box', { active: activeImageIndex === idx }]"
              @click="activeImageIndex = idx"
            >
              <img :src="img" :alt="`${product.name} thumb ${idx}`" />
            </button>
          </div>
        </div>

        <!-- Info Right -->
        <div class="info-column">
          <span class="cat-pill">{{ product.category }}</span>
          <h1 class="prod-title">{{ product.name }}</h1>

          <div class="rating-stock-row">
            <div class="stars-group">
              <Star v-for="i in 5" :key="i" :size="14" fill="#F4A261" class="star-icon" />
              <span class="rating-num">{{ product.rating }}</span>
              <span class="reviews-count">({{ product.reviewsCount }} reviews)</span>
            </div>
            <span :class="['stock-badge', product.stock > 0 ? 'in-stock' : 'out-stock']">
              {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
            </span>
          </div>

          <div class="price-box">
            <span class="current-price">{{ formatPrice(product.price) }}</span>
            <span v-if="product.compareAtPrice" class="old-price">{{ formatPrice(product.compareAtPrice) }}</span>
            <span v-if="product.discount" class="discount-tag">-{{ product.discount }}% OFF</span>
          </div>

          <p class="short-desc">{{ product.shortDescription || product.description }}</p>

          <!-- Color options with visual swatches -->
          <div v-if="product.colors && product.colors.length" class="variant-group">
            <label class="variant-label">Color: <span>{{ selectedColor }}</span></label>
            <div class="variant-options">
              <button
                v-for="color in product.colors"
                :key="color"
                type="button"
                :class="['color-chip-btn', { active: selectedColor === color }]"
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
          <div v-if="product.sizes && product.sizes.length" class="variant-group">
            <label class="variant-label">Size: <span>{{ selectedSize }}</span></label>
            <div class="variant-options">
              <button
                v-for="size in product.sizes"
                :key="size"
                type="button"
                :class="['option-chip', { active: selectedSize === size }]"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Quantity + CTA Buttons -->
          <div class="action-buttons-group">
            <div class="qty-control">
              <button type="button" :disabled="quantity <= 1" @click="quantity--">-</button>
              <span>{{ quantity }}</span>
              <button type="button" @click="quantity++">+</button>
            </div>

            <button type="button" class="btn btn--primary btn--lg add-cart-btn" @click="handleAddToCart">
              <Check v-if="addedToCartSuccess" :size="18" />
              <ShoppingBag v-else :size="18" />
              <span>{{ addedToCartSuccess ? 'Added to Cart!' : 'Add to Cart' }}</span>
            </button>

            <button type="button" class="btn btn--accent btn--lg buy-now-btn" @click="handleBuyNow">
              Buy Now
            </button>

            <button
              type="button"
              :class="['wishlist-btn', { active: wishlistStore.isInWishlist(product.id) }]"
              @click="wishlistStore.toggleWishlist(product)"
            >
              <Heart :size="20" :fill="wishlistStore.isInWishlist(product.id) ? '#E58B8B' : 'none'" />
            </button>
          </div>

          <!-- Direct WhatsApp Order button -->
          <button type="button" class="whatsapp-order-btn" @click="handleWhatsAppOrder">
            <MessageCircle :size="18" />
            <span>Order via WhatsApp (+88 01717 000 414)</span>
          </button>

          <!-- Delivery Guarantee summary -->
          <div class="guarantees-bar">
            <div class="guarantee-item">
              <Truck :size="18" />
              <span>Fast Delivery (24-48 Hours)</span>
            </div>
            <div class="guarantee-item">
              <ShieldCheck :size="18" />
              <span>100% Genuine Product</span>
            </div>
            <div class="guarantee-item">
              <RefreshCw :size="18" />
              <span>7 Days Return Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabbed Details -->
      <div class="product-tabs-wrapper">
        <div class="tabs-nav">
          <button
            type="button"
            :class="['tab-btn', { active: activeTab === 'desc' }]"
            @click="activeTab = 'desc'"
          >
            Full Description
          </button>
          <button
            v-if="product.specifications"
            type="button"
            :class="['tab-btn', { active: activeTab === 'specs' }]"
            @click="activeTab = 'specs'"
          >
            Specifications
          </button>
          <button
            type="button"
            :class="['tab-btn', { active: activeTab === 'shipping' }]"
            @click="activeTab = 'shipping'"
          >
            Shipping Info
          </button>
          <button
            type="button"
            :class="['tab-btn', { active: activeTab === 'returns' }]"
            @click="activeTab = 'returns'"
          >
            Returns & Exchange
          </button>
        </div>

        <div class="tab-content">
          <div v-if="activeTab === 'desc'" class="tab-pane">
            <p>{{ product.description }}</p>
          </div>

          <div v-else-if="activeTab === 'specs' && product.specifications" class="tab-pane">
            <table class="specs-table">
              <tbody>
                <tr v-for="(val, key) in product.specifications" :key="key">
                  <td class="spec-key">{{ key }}</td>
                  <td class="spec-val">{{ val }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else-if="activeTab === 'shipping'" class="tab-pane">
            <p><strong>Inside Dhaka:</strong> Delivery within 24 to 48 hours. Shipping fee: ৳60 (Free shipping on orders above ৳2,000).</p>
            <p><strong>Outside Dhaka:</strong> Delivery within 2 to 4 business days via courier. Shipping fee: ৳120.</p>
          </div>

          <div v-else-if="activeTab === 'returns'" class="tab-pane">
            <p>LIBAS Shop offers a 7-day hassle-free product exchange policy for defective or wrong items received. Contact our customer service via WhatsApp (+88 01717 000 414) with your order ID for immediate assistance.</p>
          </div>
        </div>
      </div>

      <!-- Customer Testimonials -->
      <TestimonialSlider />

      <!-- Related Products -->
      <div v-if="relatedProducts.length" class="related-products-section">
        <h3 class="section-title">Related Products</h3>
        <ProductGrid :products="relatedProducts" :columns="4" />
      </div>
    </div>
  </div>

  <NotFound v-else />
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

.product-main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 56px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.gallery-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-image-box {
  position: relative;
  width: 100%;
  height: 440px;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 24px;
  }

  .badge {
    position: absolute;
    top: 16px;
    left: 16px;
  }

  @media (max-width: 480px) {
    height: 320px;
  }
}

.thumbnail-strip {
  display: flex;
  gap: 12px;

  .thumb-box {
    width: 72px;
    height: 72px;
    border-radius: var(--radius-md);
    border: 2px solid transparent;
    background: white;
    padding: 6px;
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

.info-column {
  display: flex;
  flex-direction: column;
}

.cat-pill {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}

.prod-title {
  font-size: 2rem;
  line-height: 1.25;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.rating-stock-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.stars-group {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #F4A261;

  .rating-num { font-weight: 700; color: var(--color-charcoal); margin-left: 4px; }
  .reviews-count { font-size: 0.82rem; color: var(--color-taupe); }
}

.stock-badge {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: var(--radius-full);

  &.in-stock { background: #E2F0D9; color: var(--color-success); }
  &.out-stock { background: #FCE8E8; color: var(--color-error); }
}

.price-box {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 20px;
}

.current-price {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-primary-dark);
}

.old-price {
  font-size: 1.1rem;
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
    height: 2px;
    background-color: var(--color-error);
    transform: translateY(-50%) scaleX(0);
    transform-origin: left center;
    animation: strikethroughExpand 0.75s 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
}

.discount-tag {
  background: var(--color-accent);
  color: white;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 700;
  animation: badgeSlideInRight 0.6s 0.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.color-chip-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px 6px 8px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  background: white;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-charcoal);
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);

  .color-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  &:hover {
    border-color: var(--color-accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(190, 145, 52, 0.2);

    .color-dot {
      transform: scale(1.18);
    }
  }

  &.active {
    border-color: var(--color-accent);
    background: linear-gradient(135deg, #1D2A23 0%, #2C3F35 100%);
    color: #FFFFFF;
    font-weight: 700;
    box-shadow: 0 4px 14px rgba(29, 42, 35, 0.25);
    transform: scale(1.05);

    .color-dot {
      transform: scale(1.1);
      box-shadow: 0 0 0 2px #FFFFFF;
    }
  }
}

.short-desc {
  font-size: 0.95rem;
  color: var(--color-taupe);
  line-height: 1.6;
  margin-bottom: 24px;
}

.variant-group {
  margin-bottom: 20px;

  .variant-label {
    display: block;
    font-size: 0.88rem;
    font-weight: 600;
    margin-bottom: 8px;

    span { font-weight: 400; color: var(--color-taupe); }
  }

  .variant-options {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .option-chip {
    padding: 8px 18px;
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-md);
    background: white;
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--color-charcoal);
    cursor: pointer;
    transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;

    &:hover {
      border-color: var(--color-accent);
      color: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(190, 145, 52, 0.2);
    }

    &.active {
      border-color: var(--color-accent);
      background: linear-gradient(135deg, #1D2A23 0%, #2C3F35 100%);
      color: #FFFFFF;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(29, 42, 35, 0.25);
      transform: scale(1.03);
    }
  }
}

.action-buttons-group {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
}

.qty-control {
  display: flex;
  align-items: center;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  background: white;

  button {
    width: 40px;
    height: 48px;
    border: none;
    background: transparent;
    font-size: 1.2rem;
    cursor: pointer;

    &:disabled { opacity: 0.4; }
  }

  span {
    width: 36px;
    text-align: center;
    font-weight: 600;
  }

  @media (max-width: 600px) {
    grid-column: 1 / 2;
    justify-content: space-between;
  }
}

.add-cart-btn, .buy-now-btn {
  flex: 1;
  white-space: nowrap;

  @media (max-width: 600px) {
    width: 100%;
    padding: 12px 10px;
    font-size: 0.88rem;
  }
}

.add-cart-btn {
  @media (max-width: 600px) {
    grid-column: 1 / 2;
  }
}

.buy-now-btn {
  @media (max-width: 600px) {
    grid-column: 2 / 3;
  }
}

.wishlist-btn {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-border);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.active { border-color: var(--color-accent); }

  @media (max-width: 600px) {
    grid-column: 2 / 3;
    width: 100%;
  }
}

.add-cart-btn, .buy-now-btn, .whatsapp-order-btn {
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

  &:hover::after {
    animation: btnShineSwipe 0.75s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

.whatsapp-order-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px;
  background: #25D366;
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  margin-bottom: 24px;
  transition: var(--transition-fast);

  &:hover { background: #1EBE5D; }
}

.guarantees-bar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: var(--color-off-white);
  border-radius: var(--radius-md);
}

.guarantee-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--color-charcoal);
  font-weight: 500;
}

.product-tabs-wrapper {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 32px;
  margin-bottom: 56px;
}

.tabs-nav {
  display: flex;
  gap: 16px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 24px;
}

.tab-btn {
  padding: 12px 18px;
  border: none;
  background: transparent;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-taupe);
  cursor: pointer;

  &.active {
    color: var(--color-primary-dark);
    border-bottom: 2px solid var(--color-primary);
  }
}

.tab-pane {
  font-size: 0.95rem;
  color: var(--color-charcoal);
  line-height: 1.65;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;

  td {
    padding: 10px 14px;
    border-bottom: 1px solid var(--color-border);
  }

  .spec-key { font-weight: 600; width: 35%; color: var(--color-charcoal); }
  .spec-val { color: var(--color-taupe); }
}

.related-products-section {
  .section-title {
    font-size: 1.6rem;
    margin-bottom: 24px;
  }
}
</style>
