<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { CheckCircle, ShieldCheck, Lock } from 'lucide-vue-next';
import PaymentMethods from '@/components/checkout/PaymentMethods.vue';
import { useCartStore } from '@/stores/cart';
import { createOrder } from '@/services/orders';
import { useSeo } from '@/composables/useSeo';
import { formatPrice } from '@/utils/formatters';

const router = useRouter();
const cartStore = useCartStore();

useSeo({
  title: 'Checkout Order',
  description: 'Complete your LIBAS Shop order securely.'
});

const isSubmitting = ref(false);
const orderCompleted = ref<any>(null);

const form = reactive({
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: 'Dhaka',
  area: 'Dhanmondi',
  orderNotes: '',
  paymentMethod: 'cod'
});

async function handleSubmitOrder() {
  if (!form.fullName || !form.phone || !form.address) {
    alert('Please complete all required shipping fields.');
    return;
  }

  isSubmitting.value = true;

  try {
    const orderData = await createOrder({
      customerName: form.fullName,
      phone: form.phone,
      email: form.email,
      address: form.address,
      city: form.city,
      area: form.area,
      orderNotes: form.orderNotes,
      items: [...cartStore.items],
      shippingFee: cartStore.shippingFee,
      subtotal: cartStore.subtotal,
      discount: cartStore.discountAmount,
      totalAmount: cartStore.total,
      paymentMethod: form.paymentMethod === 'cod' ? 'Cash on Delivery' : form.paymentMethod === 'mfs' ? 'bKash / MFS' : 'Card Payment'
    });

    orderCompleted.value = orderData;
    cartStore.clearCart();
  } catch (err) {
    alert('Could not place order. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="checkout-page section-spacing">
    <div class="container">
      <!-- Order Success State -->
      <div v-if="orderCompleted" class="order-success-card">
        <div class="icon-circle">
          <CheckCircle :size="48" />
        </div>
        <h1 class="success-title">Order Placed Successfully!</h1>
        <p class="order-id">Order ID: <strong>{{ orderCompleted.id }}</strong></p>
        <p class="success-desc">
          Thank you for shopping with LIBAS Shop! We have received your order and sent a confirmation SMS to <strong>{{ orderCompleted.phone }}</strong>. Our representative will contact you shortly.
        </p>

        <div class="actions">
          <router-link :to="`/track-order?id=${orderCompleted.id}`" class="btn btn--primary btn--md">
            Track Your Order
          </router-link>
          <router-link to="/shop" class="btn btn--outline btn--md">
            Continue Shopping
          </router-link>
        </div>
      </div>

      <!-- Checkout Form Grid -->
      <div v-else-if="cartStore.items.length > 0" class="checkout-grid">
        <!-- Customer Info Form Left -->
        <div class="form-card">
          <h2 class="card-title">1. Customer Information</h2>

          <form class="checkout-form" @submit.prevent="handleSubmitOrder">
            <div class="form-group">
              <label>Full Name *</label>
              <input v-model="form.fullName" type="text" placeholder="Hasib R Rahman" required />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Phone Number *</label>
                <input v-model="form.phone" type="tel" placeholder="01700000000" required />
              </div>
              <div class="form-group">
                <label>Email Address (Optional)</label>
                <input v-model="form.email" type="email" placeholder="name@domain.com" />
              </div>
            </div>

            <div class="form-group">
              <label>Delivery Address *</label>
              <textarea v-model="form.address" rows="3" placeholder="House no, Road no, Apartment, Area details..." required></textarea>
            </div>

            <!-- Delivery Zone Selector -->
            <div class="form-group shipping-option-group">
              <label>Delivery Zone *</label>
              <div class="zone-options">
                <label :class="['zone-card', { active: cartStore.selectedArea === 'inside' }]">
                  <input type="radio" v-model="cartStore.selectedArea" value="inside" />
                  <span>Inside Dhaka (৳80)</span>
                </label>
                <label :class="['zone-card', { active: cartStore.selectedArea === 'outside' }]">
                  <input type="radio" v-model="cartStore.selectedArea" value="outside" />
                  <span>Outside Dhaka (৳130)</span>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>Order Notes (Optional instructions for courier)</label>
              <input v-model="form.orderNotes" type="text" placeholder="e.g. Deliver after 3 PM" />
            </div>

            <!-- Payment Methods -->
            <div class="payment-methods-wrapper">
              <h2 class="card-title">2. Payment & Confirmation</h2>
              <PaymentMethods v-model="form.paymentMethod" />
            </div>

            <button type="submit" :disabled="isSubmitting" class="btn btn--primary btn--lg w-full submit-order-btn">
              <Lock :size="18" />
              <span>{{ isSubmitting ? 'Processing Order...' : `Confirm Order (${formatPrice(cartStore.total)})` }}</span>
            </button>
          </form>
        </div>

        <!-- Order Summary Sidebar Right -->
        <div class="summary-card">
          <h3 class="summary-title">Order Items ({{ cartStore.itemCount }})</h3>

          <div class="items-mini-list">
            <div v-for="item in cartStore.items" :key="item.product.id" class="mini-item">
              <img :src="item.product.images[0]" :alt="item.product.name" />
              <div class="mini-info">
                <span class="mini-name">{{ item.product.name }}</span>
                <span class="mini-qty">Qty: {{ item.quantity }}</span>
              </div>
              <span class="mini-price">{{ formatPrice(item.product.price * item.quantity) }}</span>
            </div>
          </div>

          <div class="calc-rows">
            <div class="calc-row">
              <span>Subtotal</span>
              <span>{{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            <div v-if="cartStore.discountAmount > 0" class="calc-row discount">
              <span>Discount</span>
              <span>-{{ formatPrice(cartStore.discountAmount) }}</span>
            </div>
            <div class="calc-row">
              <span>Shipping</span>
              <span>{{ formatPrice(cartStore.shippingFee) }}</span>
            </div>
            <div class="calc-row total-row">
              <span>Total Payable</span>
              <span class="total-val">{{ formatPrice(cartStore.total) }}</span>
            </div>
          </div>

          <div class="security-badge">
            <ShieldCheck :size="18" />
            <span>100% Guaranteed Doorstep Delivery</span>
          </div>
        </div>
      </div>

      <!-- Empty Cart Redirection -->
      <div v-else class="empty-checkout">
        <p>Your shopping cart is empty.</p>
        <router-link to="/shop" class="btn btn--primary btn--md">Return to Shop</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.checkout-page {
  background: var(--color-off-white);
}

.order-success-card {
  max-width: 600px;
  margin: 40px auto;
  background: white;
  border-radius: var(--radius-xl);
  padding: 48px 32px;
  text-align: center;
  box-shadow: var(--shadow-lg);

  .icon-circle {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: var(--color-primary-subtle);
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }

  .success-title { font-size: 1.8rem; margin-bottom: 8px; }
  .order-id { font-size: 1.1rem; color: var(--color-primary-dark); margin-bottom: 16px; }
  .success-desc { font-size: 0.95rem; color: var(--color-taupe); margin-bottom: 28px; line-height: 1.6; }
  .actions { display: flex; gap: 12px; justify-content: center; }
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 36px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.form-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 32px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) { padding: 20px; }
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 24px;

  &:nth-of-type(2) {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid var(--color-border);
  }
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-charcoal);
  }

  input, select, textarea {
    padding: 10px 14px;
    border-radius: var(--radius-md);
    border: 1.5px solid var(--color-border);
    outline: none;
    font-size: 0.9rem;
    background: white;

    &:focus {
      border-color: var(--color-primary);
    }
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.zone-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.zone-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.85rem;

  &.active {
    border-color: var(--color-primary);
    background: var(--color-primary-subtle);
  }
}

.w-full { width: 100%; }

.submit-order-btn {
  margin-top: 20px;
}

.summary-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 24px;
  border: 1px solid var(--color-border);
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.items-mini-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 280px;
  overflow-y: auto;
}

.mini-item {
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    background: var(--color-off-white);
    border-radius: var(--radius-sm);
  }
}

.mini-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  .mini-name { font-size: 0.82rem; font-weight: 500; }
  .mini-qty { font-size: 0.75rem; color: var(--color-taupe); }
}

.mini-price {
  font-size: 0.88rem;
  font-weight: 600;
}

.calc-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.88rem;
  border-top: 1px solid var(--color-border);
  padding-top: 16px;
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
  padding-top: 10px;
}

.total-val { color: var(--color-primary-dark); }

.security-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.78rem;
  color: var(--color-taupe);
}

.empty-checkout {
  text-align: center;
  padding: 60px;
}
</style>
