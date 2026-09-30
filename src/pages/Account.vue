<script setup lang="ts">
import { ref } from 'vue';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-vue-next';
import { useSeo } from '@/composables/useSeo';

useSeo({
  title: 'My Account',
  description: 'Manage your LIBAS Shop profile and order history.'
});

const activeTab = ref<'profile' | 'orders' | 'addresses'>('profile');

const demoUser = ref({
  name: 'Valued Customer',
  phone: '+88 01717 000 414',
  email: 'customer@libas.shop',
  address: 'House 14, Road 5, Dhanmondi, Dhaka'
});
</script>

<template>
  <div class="account-page section-spacing">
    <div class="container">
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span class="sep">/</span>
        <span class="current">My Account</span>
      </nav>

      <div class="account-grid">
        <!-- Sidebar Left -->
        <aside class="account-sidebar">
          <div class="user-avatar-box">
            <div class="avatar-circle">
              <User :size="32" />
            </div>
            <h3 class="user-name">{{ demoUser.name }}</h3>
            <span class="user-phone">{{ demoUser.phone }}</span>
          </div>

          <nav class="account-nav">
            <button
              type="button"
              :class="['nav-item', { active: activeTab === 'profile' }]"
              @click="activeTab = 'profile'"
            >
              <User :size="18" />
              <span>Personal Profile</span>
            </button>
            <button
              type="button"
              :class="['nav-item', { active: activeTab === 'orders' }]"
              @click="activeTab = 'orders'"
            >
              <Package :size="18" />
              <span>Order History</span>
            </button>
            <button
              type="button"
              :class="['nav-item', { active: activeTab === 'addresses' }]"
              @click="activeTab = 'addresses'"
            >
              <MapPin :size="18" />
              <span>Saved Address</span>
            </button>
            <router-link to="/wishlist" class="nav-item">
              <Heart :size="18" />
              <span>Wishlist</span>
            </router-link>
          </nav>
        </aside>

        <!-- Main Content Right -->
        <main class="account-content-card">
          <!-- Profile Tab -->
          <div v-if="activeTab === 'profile'" class="tab-pane">
            <h2 class="pane-title">Personal Profile</h2>
            <div class="profile-details-grid">
              <div class="detail-item">
                <label>Full Name</label>
                <p>{{ demoUser.name }}</p>
              </div>
              <div class="detail-item">
                <label>Phone Number</label>
                <p>{{ demoUser.phone }}</p>
              </div>
              <div class="detail-item">
                <label>Email Address</label>
                <p>{{ demoUser.email }}</p>
              </div>
              <div class="detail-item">
                <label>Default City</label>
                <p>Dhaka</p>
              </div>
            </div>
          </div>

          <!-- Orders Tab -->
          <div v-else-if="activeTab === 'orders'" class="tab-pane">
            <h2 class="pane-title">Order History</h2>
            <div class="orders-list">
              <div class="order-item-card">
                <div class="order-header">
                  <div>
                    <span class="id">Order #LIB-849201</span>
                    <span class="date">Placed on Sep 18, 2026</span>
                  </div>
                  <span class="status-badge delivered">Delivered</span>
                </div>
                <div class="order-body">
                  <p>1x LIBAS Premium Cotton Jubba</p>
                  <span class="total">Total: ৳3,510</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Address Tab -->
          <div v-else-if="activeTab === 'addresses'" class="tab-pane">
            <h2 class="pane-title">Shipping Address</h2>
            <div class="address-box">
              <h4>Primary Address</h4>
              <p>{{ demoUser.address }}</p>
            </div>
          </div>
        </main>
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
  margin-bottom: 24px;
  .sep { opacity: 0.5; }
  .current { color: var(--color-charcoal); font-weight: 600; }
}

.account-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 36px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.account-sidebar {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 24px;
  height: fit-content;
  box-shadow: var(--shadow-sm);
}

.user-avatar-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 20px;
}

.avatar-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--color-primary-subtle);
  color: var(--color-primary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.user-name { font-size: 1.1rem; }
.user-phone { font-size: 0.82rem; color: var(--color-taupe); }

.account-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: none;
  background: transparent;
  color: var(--color-charcoal);
  font-size: 0.92rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: var(--transition-fast);

  &:hover, &.active {
    background: var(--color-primary-subtle);
    color: var(--color-primary-dark);
    font-weight: 600;
  }
}

.account-content-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 36px;
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) { padding: 20px; }
}

.pane-title { font-size: 1.5rem; margin-bottom: 24px; }

.profile-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  .detail-item {
    background: var(--color-off-white);
    padding: 16px;
    border-radius: var(--radius-md);
    label { font-size: 0.78rem; font-weight: 700; color: var(--color-taupe); text-transform: uppercase; }
    p { font-size: 0.95rem; font-weight: 600; margin-top: 4px; }
  }
}

.order-item-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 16px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  .id { font-weight: 700; display: block; }
  .date { font-size: 0.78rem; color: var(--color-taupe); }
}

.status-badge {
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;

  &.delivered { background: #E2F0D9; color: var(--color-success); }
}

.order-body {
  font-size: 0.88rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-taupe);
  .total { font-weight: 700; color: var(--color-primary-dark); }
}

.address-box {
  background: var(--color-off-white);
  padding: 20px;
  border-radius: var(--radius-md);
  h4 { margin-bottom: 8px; }
  p { color: var(--color-taupe); font-size: 0.92rem; }
}
</style>
