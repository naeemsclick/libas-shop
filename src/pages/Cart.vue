<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRight, Trash2, Tag, ShieldCheck } from 'lucide-vue-next';
import EmptyState from '@/components/common/EmptyState.vue';
import { useCartStore } from '@/stores/cart';
import { useSeo } from '@/composables/useSeo';
import { formatPrice } from '@/utils/formatters';

const router = useRouter();
const cartStore = useCartStore();

useSeo({
  title: 'Shopping Cart',
  description: 'Review items in your LIBAS Shop shopping cart.'
});

const couponInput = ref('');
const couponMsg = ref<{ success: boolean; text: string } | null>(null);

function handleApplyCoupon() {
  if (!couponInput.value) return;
  const res = cartStore.applyCoupon(couponInput.value);
  couponMsg.value = { success: res.success, text: res.message };
}

function proceedToCheckout() {
  router.push('/checkout');
}
</script>

<template>
  <div class="cart-page section-spacing">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span class="sep">/</span>
        <span class="current">Shopping Cart</span>
      </nav>

      <h1 class="page-title">Your Shopping Cart</h1>

      <div v-if="cartStore.items.length === 0">
        <EmptyState
          title="Your Cart is Currently Empty"
          description="Looks like you haven't added any LIBAS Shop items to your cart yet."
          ctaText="Start Shopping"
          ctaLink="/shop"
        />
      </div>

      <div v-else class="cart-grid">
        <!-- Cart Items List Left -->
        <div class="cart-table-card">
          <table class="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in cartStore.items"
                :key="`${item.product.id}-${item.selectedSize}-${item.selectedColor}`"
              >
                <td class="product-td">
                  <img :src="item.product.images[0]" :alt="item.product.name" class="cart-img" />
                  <div class="prod-meta">
                    <router-link :to="`/product/${item.product.slug}`" class="prod-name">
                      {{ item.product.name }}
                    </router-link>
                    <span v-if="item.selectedColor || item.selectedSize" class="variant-info">
                      {{ item.selectedColor }} {{ item.selectedSize }}
                    </span>
                  </div>
                </td>
                <td class="price-td">{{ formatPrice(item.product.price) }}</td>
                <td class="qty-td">
                  <div class="qty-controls">
                    <button
                      type="button"
                      :disabled="item.quantity <= 1"
                      @click="cartStore.updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)"
                    >
                      -
                    </button>
                    <span>{{ item.quantity }}</span>
                    <button
                      type="button"
                      @click="cartStore.updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td class="subtotal-td">{{ formatPrice(item.product.price * item.quantity) }}</td>
                <td class="action-td">
                  <button
                    type="button"
                    class="remove-icon-btn"
                    aria-label="Remove item"
                    @click="cartStore.removeItem(item.product.id, item.selectedSize, item.selectedColor)"
                  >
                    <Trash2 :size="18" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="cart-table-footer">
            <button type="button" class="btn btn--ghost btn--sm" @click="cartStore.clearCart">
              Clear Entire Cart
            </button>
            <router-link to="/shop" class="btn btn--outline btn--sm">
              Continue Shopping
            </router-link>
          </div>
        </div>

        <!-- Cart Summary Right -->
        <div class="cart-summary-card">
          <h3 class="summary-title">Order Summary</h3>

          <!-- Shipping Location Selector -->
          <div class="shipping-selector">
            <label class="section-label">Select Delivery Location:</label>
            <div class="radio-options">
              <label class="radio-card">
                <input type="radio" v-model="cartStore.selectedArea" value="inside" />
                <div class="radio-info">
                  <span class="title">Inside Dhaka</span>
                  <span class="price">৳60 (24-48 Hrs)</span>
                </div>
              </label>
              <label class="radio-card">
                <input type="radio" v-model="cartStore.selectedArea" value="outside" />
                <div class="radio-info">
                  <span class="title">Outside Dhaka</span>
                  <span class="price">৳120 (2-4 Days)</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Coupon Code -->
          <div class="coupon-box">
            <label class="section-label">Have a Coupon?</label>
            <div class="coupon-field">
              <Tag :size="16" />
              <input v-model="couponInput" type="text" placeholder="e.g. ROWHA10" />
              <button type="button" @click="handleApplyCoupon">Apply</button>
            </div>
            <p v-if="couponMsg" :class="['coupon-msg', couponMsg.success ? 'success' : 'error']">
              {{ couponMsg.text }}
            </p>
          </div>

          <!-- Price Calculation -->
          <div class="summary-calc">
            <div class="calc-row">
              <span>Subtotal</span>
              <span>{{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            <div v-if="cartStore.discountAmount > 0" class="calc-row discount">
              <span>Discount</span>
              <span>-{{ formatPrice(cartStore.discountAmount) }}</span>
            </div>
            <div class="calc-row">
              <span>Shipping Fee</span>
              <span>{{ formatPrice(cartStore.shippingFee) }}</span>
            </div>
            <div class="calc-row total-row">
              <span>Total Amount</span>
              <span class="total-price">{{ formatPrice(cartStore.total) }}</span>
            </div>
          </div>

          <button type="button" class="btn btn--primary btn--lg w-full checkout-btn" @click="proceedToCheckout">
            <span>Proceed to Checkout</span>
            <ArrowRight :size="18" />
          </button>

          <div class="security-note">
            <ShieldCheck :size="18" />
            <span>Guaranteed Safe & Secure Checkout</span>
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

.page-title {
  font-size: 2.2rem;
  margin-bottom: 32px;
}

.cart-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 36px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.cart-table-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  height: fit-content;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 12px;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-taupe);
    text-transform: uppercase;
    border-bottom: 1px solid var(--color-border);
  }

  td {
    padding: 16px 12px;
    border-bottom: 1px solid var(--color-border);
    vertical-align: middle;
  }
}

.product-td {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-img {
  width: 64px;
  height: 64px;
  object-fit: contain;
  background: var(--color-off-white);
  border-radius: var(--radius-sm);
}

.prod-name {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--color-charcoal);

  &:hover { color: var(--color-primary); }
}

.variant-info {
  display: block;
  font-size: 0.78rem;
  color: var(--color-taupe);
}

.price-td, .subtotal-td {
  font-weight: 600;
  font-size: 0.95rem;
}

.subtotal-td { color: var(--color-primary-dark); }

.qty-controls {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);

  button {
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-weight: bold;
    &:disabled { opacity: 0.3; }
  }

  span {
    width: 28px;
    text-align: center;
    font-size: 0.85rem;
    font-weight: 600;
  }
}

.remove-icon-btn {
  background: none;
  border: none;
  color: var(--color-taupe);
  cursor: pointer;

  &:hover { color: var(--color-error); }
}

.cart-table-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
}

.cart-summary-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 28px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: fit-content;
}

.summary-title {
  font-size: 1.25rem;
}

.section-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-charcoal);
  margin-bottom: 8px;
}

.radio-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;

  input { accent-color: var(--color-primary); }
}

.radio-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.85rem;

  .title { font-weight: 600; }
  .price { color: var(--color-primary-dark); font-weight: 700; }
}

.coupon-field {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 4px 6px 4px 12px;

  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 6px;
    font-size: 0.85rem;
  }

  button {
    background: var(--color-primary-subtle);
    color: var(--color-primary-dark);
    border: none;
    padding: 6px 14px;
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 0.8rem;
    cursor: pointer;
  }
}

.coupon-msg {
  font-size: 0.78rem;
  margin-top: 4px;
  &.success { color: var(--color-success); }
  &.error { color: var(--color-error); }
}

.summary-calc {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.9rem;
}

.calc-row {
  display: flex;
  justify-content: space-between;
  color: var(--color-taupe);

  &.discount { color: var(--color-success); }
}

.total-row {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-charcoal);
  border-top: 1px dashed var(--color-border);
  padding-top: 12px;
}

.total-price {
  color: var(--color-primary-dark);
  font-size: 1.25rem;
}

.w-full { width: 100%; }

.security-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.78rem;
  color: var(--color-taupe);
}
</style>
