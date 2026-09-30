<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { X, ShoppingBag, ArrowRight, Tag } from 'lucide-vue-next';
import { useUiStore } from '@/stores/ui';
import { useCartStore } from '@/stores/cart';
import { useLocaleStore } from '@/stores/locale';
import CartItem from './CartItem.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import { formatPrice } from '@/utils/formatters';

const router = useRouter();
const uiStore = useUiStore();
const cartStore = useCartStore();
const localeStore = useLocaleStore();

const couponInput = ref('');
const couponMsg = ref<{ success: boolean; text: string } | null>(null);

function close() {
  uiStore.closeCartDrawer();
}

function handleApplyCoupon() {
  if (!couponInput.value) return;
  const res = cartStore.applyCoupon(couponInput.value);
  couponMsg.value = { success: res.success, text: res.message };
}

function proceedToCheckout() {
  close();
  router.push('/checkout');
}

function goToCart() {
  close();
  router.push('/cart');
}
</script>

<template>
  <Transition name="drawer">
    <div v-if="uiStore.isCartDrawerOpen" class="cart-drawer-backdrop" @click.self="close">
      <div class="cart-drawer">
        <!-- Drawer Header -->
        <div class="drawer-header">
          <div class="title-with-badge">
            <ShoppingBag :size="20" class="header-icon" />
            <h3 class="drawer-title">{{ localeStore.t('cart.title') }}</h3>
            <span class="cart-count-badge">{{ cartStore.itemCount }}</span>
          </div>
          <button type="button" class="close-btn" aria-label="Close cart" @click="close">
            <X :size="20" />
          </button>
        </div>

        <!-- Drawer Body -->
        <div class="drawer-body">
          <div v-if="cartStore.items.length === 0" class="empty-cart-container">
            <EmptyState
              :title="localeStore.t('cart.empty')"
              :description="localeStore.isBangla ? 'আপনার কার্ট ফাঁকা রয়েছে। ফ্যাশন, স্মার্ট গ্যাজেট ও বিউটি পণ্য দেখতে সপ পেজে যান।' : 'Explore our Fashion, Gadgets, and Beauty collections to fill your cart.'"
              :ctaText="localeStore.t('hero.shopNow')"
              ctaLink="/shop"
              @click="close"
            />
          </div>

          <div v-else class="cart-items-list">
            <CartItem
              v-for="item in cartStore.items"
              :key="`${item.product.id}-${item.selectedSize}-${item.selectedColor}`"
              :item="item"
            />
          </div>
        </div>

        <!-- Drawer Footer -->
        <div v-if="cartStore.items.length > 0" class="drawer-footer">
          <!-- Coupon Input -->
          <div class="coupon-box">
            <div class="coupon-field">
              <Tag :size="16" class="tag-icon" />
              <input
                v-model="couponInput"
                type="text"
                :placeholder="localeStore.isBangla ? 'কুপন কোড (LIBAS10)' : 'Coupon code (LIBAS10)'"
                class="coupon-input"
              />
              <button type="button" class="apply-btn" @click="handleApplyCoupon">
                {{ localeStore.isBangla ? 'প্রয়োগ করুন' : 'Apply' }}
              </button>
            </div>
            <p v-if="couponMsg" :class="['coupon-msg', couponMsg.success ? 'success' : 'error']">
              {{ couponMsg.text }}
            </p>
          </div>

          <!-- Price Summary -->
          <div class="summary-rows">
            <div class="summary-row">
              <span>{{ localeStore.t('cart.subtotal') }}</span>
              <span>{{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            <div v-if="cartStore.discountAmount > 0" class="summary-row discount">
              <span>Discount ({{ cartStore.couponCode }})</span>
              <span>-{{ formatPrice(cartStore.discountAmount) }}</span>
            </div>
            <div class="summary-row">
              <span>{{ localeStore.t('cart.delivery') }}</span>
              <span>{{ formatPrice(cartStore.shippingFee) }}</span>
            </div>
            <div class="summary-row total-row">
              <span>{{ localeStore.t('cart.total') }}</span>
              <span class="total-val">{{ formatPrice(cartStore.total) }}</span>
            </div>
          </div>

          <!-- CTAs -->
          <div class="drawer-actions">
            <button type="button" class="btn btn--primary btn--lg w-full" @click="proceedToCheckout">
              <span>{{ localeStore.t('cart.checkout') }}</span>
              <ArrowRight :size="18" />
            </button>
            <button type="button" class="btn btn--ghost btn--sm w-full" @click="goToCart">
              {{ localeStore.isBangla ? 'সম্পূর্ণ কার্ট পেজ দেখুন' : 'View Full Cart Page' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.cart-drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(37, 38, 46, 0.6);
  backdrop-filter: blur(2px);
  z-index: 1060;
  display: flex;
  justify-content: flex-end;
}

.cart-drawer {
  width: 380px;
  max-width: 90vw;
  height: 100%;
  background: var(--color-white);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid var(--color-border);
}

.title-with-badge {
  display: flex;
  align-items: center;
  gap: 8px;

  .header-icon {
    color: var(--color-primary);
  }

  .drawer-title {
    font-size: 1.1rem;
    font-weight: 700;
  }
}

.cart-count-badge {
  background: var(--color-accent);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.close-btn {
  background: var(--color-off-white);
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
}

.drawer-footer {
  border-top: 1px solid var(--color-border);
  padding: 20px;
  background: var(--color-off-white);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.coupon-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.coupon-field {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 4px 6px 4px 12px;

  .tag-icon {
    color: var(--color-taupe);
  }
}

.coupon-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 6px;
  font-size: 0.82rem;
}

.apply-btn {
  background: var(--color-primary-subtle);
  color: var(--color-primary-dark);
  border: none;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.coupon-msg {
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 4px;

  &.success {
    color: var(--color-success);
  }
  &.error {
    color: var(--color-error);
  }
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.88rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  color: var(--color-taupe);

  &.discount {
    color: var(--color-success);
  }
}

.total-row {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-charcoal);
  border-top: 1px dashed var(--color-border);
  padding-top: 8px;
  margin-top: 4px;
}

.total-val {
  color: var(--color-primary-dark);
}

.drawer-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .w-full {
    width: 100%;
  }
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;

  .cart-drawer {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;

  .cart-drawer {
    transform: translateX(100%);
  }
}
</style>
