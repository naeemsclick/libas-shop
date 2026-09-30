<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Search, PackageCheck, Truck, Clock, CheckCircle2 } from 'lucide-vue-next';
import { getOrderById } from '@/services/orders';
import type { Order } from '@/types';
import { useSeo } from '@/composables/useSeo';
import { formatPrice, formatDate } from '@/utils/formatters';

const route = useRoute();

useSeo({
  title: 'Track Your Order',
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
      <div class="tracking-card">
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
          <button type="submit" :disabled="isLoading" class="btn btn--primary btn--md">
            <Search :size="18" />
            <span>{{ isLoading ? 'Checking...' : 'Track Order' }}</span>
          </button>
        </form>

        <p v-if="errorMsg" class="error-msg text-center">{{ errorMsg }}</p>

        <!-- Tracking Timeline Result -->
        <div v-if="searchedOrder" class="tracking-results">
          <div class="result-header">
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
          <div class="order-summary-box">
            <h4>Delivery Address</h4>
            <p>{{ searchedOrder.customerName }} ({{ searchedOrder.phone }})</p>
            <p>{{ searchedOrder.address }}, {{ searchedOrder.area }}, {{ searchedOrder.city }}</p>
            <p class="amount">Total Amount: <strong>{{ formatPrice(searchedOrder.totalAmount) }}</strong> ({{ searchedOrder.paymentMethod }})</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-tracking-page {
  background: var(--color-off-white);
}

.text-center { text-align: center; }

.tracking-card {
  max-width: 760px;
  margin: 0 auto;
  background: white;
  border-radius: var(--radius-xl);
  padding: 44px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);

  @media (max-width: 768px) { padding: 24px 16px; }
}

.page-title { font-size: 2rem; margin-bottom: 8px; }
.subtitle { font-size: 0.92rem; color: var(--color-taupe); margin-bottom: 28px; }

.tracking-form {
  display: flex;
  gap: 10px;
  max-width: 520px;
  margin: 0 auto 32px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.tracking-input {
  flex: 1;
  padding: 12px 18px;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-border);
  outline: none;
  font-size: 0.95rem;

  &:focus { border-color: var(--color-primary); }
}

.error-msg {
  color: var(--color-error);
  font-weight: 500;
  margin-top: 10px;
}

.tracking-results {
  margin-top: 36px;
  border-top: 1px solid var(--color-border);
  padding-top: 32px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.order-label { font-size: 0.78rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase; }
.order-id-title { font-size: 1.5rem; margin-bottom: 2px; }
.order-date { font-size: 0.82rem; color: var(--color-taupe); }

.status-pill-badge {
  background: var(--color-primary-subtle);
  color: var(--color-primary-dark);
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
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
    background: var(--color-border);
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    border: 2px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-taupe);
  }

  .step-title {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: capitalize;
    color: var(--color-taupe);
  }

  &.completed {
    .step-icon {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: white;
    }
    .step-title { color: var(--color-charcoal); }
  }
}

.order-summary-box {
  background: var(--color-off-white);
  padding: 20px;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  color: var(--color-charcoal);

  h4 { margin-bottom: 8px; }
  p { margin-bottom: 4px; color: var(--color-taupe); }
  .amount { margin-top: 10px; color: var(--color-charcoal); }
}
</style>
