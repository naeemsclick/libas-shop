<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Search, PackageCheck, Truck, Clock, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-vue-next';
import { getOrderById } from '@/services/orders';
import type { Order } from '@/types';
import { useSeo } from '@/composables/useSeo';
import { formatPrice, formatDate } from '@/utils/formatters';

const route = useRoute();

useSeo({
  title: 'Track Your Order | LIBAS Shop',
  description: 'Track real-time status of your LIBAS Shop order.'
});

const orderIdInput = ref('');
const searchedOrder = ref<Order | null>(null);
const isLoading = ref(false);
const errorMsg = ref('');

const statusSteps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

function getStepIndex(status: string): number {
  return statusSteps.indexOf(status.toLowerCase());
}

async function handleTrackOrder() {
  if (!orderIdInput.value.trim()) return;

  isLoading.value = true;
  errorMsg.value = '';
  searchedOrder.value = null;

  try {
    const res = await getOrderById(orderIdInput.value.trim());
    if (res) {
      searchedOrder.value = res;
    } else {
      errorMsg.value = 'No order found matching this Order ID. Try demo order RM-123456';
    }
  } catch (err) {
    errorMsg.value = 'Error fetching order tracking details.';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  if (route.query.id) {
    orderIdInput.value = route.query.id as string;
    handleTrackOrder();
  }
});
</script>

<template>
  <div class="order-tracking-page section-spacing">
    <div class="container">
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span class="sep">/</span>
        <span class="current">Track Your Order</span>
      </nav>

      <div class="tracking-card glass-card">
        <div class="header-badge text-center">
          <Sparkles :size="14" />
          <span>REAL-TIME TRACKING SYSTEM</span>
        </div>
        <h1 class="page-title text-center">Track Your Order</h1>
        <p class="subtitle text-center">Enter your Order ID (e.g. LIB-849201) or Mobile Number (e.g. 01717000414) to check status.</p>

        <form class="tracking-form" @submit.prevent="handleTrackOrder">
          <input
            v-model="orderIdInput"
            type="text"
            placeholder="Enter Order ID or Mobile Number..."
            required
            class="tracking-input"
          />
          <button type="submit" :disabled="isLoading" class="btn btn--primary btn--md track-submit-btn">
            <Search :size="18" />
            <span>{{ isLoading ? 'Checking...' : 'Track Order' }}</span>
          </button>
        </form>

        <p v-if="errorMsg" class="error-msg text-center">{{ errorMsg }}</p>

        <!-- Tracking Timeline Result -->
        <div v-if="searchedOrder" class="tracking-results">
          <div class="result-header glass-header-inner">
            <div>
              <span class="order-label">Order Details</span>
              <h3 class="order-id-title">{{ searchedOrder.id }}</h3>
              <span class="order-date">Placed on {{ formatDate(searchedOrder.createdAt) }}</span>
            </div>
            <div class="status-pill-badge">
              Status: <strong>{{ searchedOrder.status.toUpperCase() }}</strong>
            </div>
          </div>

          <!-- Timeline -->
          <div class="timeline-wrapper">
            <div
              v-for="(step, idx) in statusSteps"
              :key="step"
              :class="[
                'timeline-step',
                {
                  completed: getStepIndex(searchedOrder.status) >= idx,
                  current: getStepIndex(searchedOrder.status) === idx
                }
              ]"
            >
              <div class="step-icon">
                <CheckCircle2 v-if="getStepIndex(searchedOrder.status) >= idx" :size="20" />
                <Clock v-else :size="20" />
              </div>
              <span class="step-title">{{ step }}</span>
            </div>
          </div>

          <!-- Order Summary Details -->
          <div class="order-summary-box glass-pill">
            <div class="summary-header">
              <ShieldCheck :size="18" class="shield-gold" />
              <h4>Delivery & Order Summary</h4>
            </div>
            <p class="customer-info"><strong>Recipient:</strong> {{ searchedOrder.customerName }} ({{ searchedOrder.phone }})</p>
            <p class="address-info"><strong>Address:</strong> {{ searchedOrder.address }}, {{ searchedOrder.area }}, {{ searchedOrder.city }}</p>
            <p class="amount">Total Amount: <strong>{{ formatPrice(searchedOrder.totalAmount) }}</strong> (Payment: {{ searchedOrder.paymentMethod }})</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-tracking-page {
  background: linear-gradient(180deg, #F9F7F2 0%, #F4F0E6 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

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

.text-center { text-align: center; }

.glass-card {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: var(--radius-xl);
  padding: 48px;
  border: 1.5px solid rgba(190, 145, 52, 0.25);
  box-shadow: 0 12px 36px rgba(29, 42, 35, 0.08);
  max-width: 780px;
  margin: 0 auto;

  @media (max-width: 768px) { padding: 28px 18px; }
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 14px;
  background: rgba(190, 145, 52, 0.12);
  color: #8E661B;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  border-radius: var(--radius-full);
  margin-bottom: 14px;
  border: 1px solid rgba(190, 145, 52, 0.25);
}

.page-title { font-size: 2.3rem; margin-bottom: 8px; color: var(--color-charcoal); }
.subtitle { font-size: 0.96rem; color: var(--color-taupe); margin-bottom: 32px; line-height: 1.55; }

.tracking-form {
  display: flex;
  gap: 12px;
  max-width: 560px;
  margin: 0 auto 32px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.tracking-input {
  flex: 1;
  padding: 14px 20px;
  border-radius: var(--radius-md);
  border: 1.5px solid rgba(226, 230, 227, 0.9);
  background: rgba(255, 255, 255, 0.95);
  outline: none;
  font-size: 0.96rem;
  transition: all 0.2s ease;

  &:focus {
    border-color: #BE9134;
    box-shadow: 0 0 14px rgba(190, 145, 52, 0.22);
    background: #FFFFFF;
  }
}

.track-submit-btn {
  box-shadow: 0 6px 18px rgba(29, 42, 35, 0.22);
}

.error-msg {
  color: var(--color-error);
  font-weight: 600;
  margin-top: 10px;
}

.tracking-results {
  margin-top: 36px;
  border-top: 1.5px solid rgba(190, 145, 52, 0.2);
  padding-top: 32px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  background: rgba(246, 243, 236, 0.7);
  padding: 18px 20px;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(190, 145, 52, 0.2);
}

.order-label { font-size: 0.78rem; font-weight: 700; color: #BE9134; text-transform: uppercase; letter-spacing: 0.04em; }
.order-id-title { font-size: 1.55rem; margin-bottom: 2px; color: var(--color-charcoal); }
.order-date { font-size: 0.84rem; color: var(--color-taupe); }

.status-pill-badge {
  background: #2D4035;
  color: #F7EFCF;
  padding: 6px 16px;
  border-radius: var(--radius-full);
  font-size: 0.84rem;
  border: 1px solid #BE9134;
  box-shadow: 0 4px 12px rgba(45, 64, 53, 0.25);
}

.timeline-wrapper {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 40px;

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 10%;
    right: 10%;
    height: 3px;
    background: rgba(190, 145, 52, 0.2);
    z-index: 1;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    &::before { display: none; }
  }
}

.timeline-step {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  .step-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: white;
    border: 2px solid rgba(190, 145, 52, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-taupe);
    transition: all 0.3s ease;
  }

  .step-title {
    font-size: 0.82rem;
    font-weight: 600;
    text-transform: capitalize;
    color: var(--color-taupe);
  }

  &.completed {
    .step-icon {
      background: #BE9134;
      border-color: #BE9134;
      color: white;
      box-shadow: 0 0 14px rgba(190, 145, 52, 0.45);
    }
    .step-title { color: var(--color-charcoal); font-weight: 700; }
  }
}

.glass-pill {
  background: rgba(246, 243, 236, 0.85);
  border: 1.5px solid rgba(190, 145, 52, 0.25);
  padding: 24px;
  border-radius: var(--radius-lg);
  font-size: 0.92rem;
  color: var(--color-charcoal);
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;

  .shield-gold { color: #BE9134; }
  h4 { font-size: 1.1rem; color: var(--color-charcoal); }
}

.customer-info, .address-info { margin-bottom: 6px; color: var(--color-taupe); }
.amount { margin-top: 12px; color: var(--color-charcoal); font-size: 1rem; border-top: 1px solid rgba(190, 145, 52, 0.2); padding-top: 10px; }
</style>
