<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, ShoppingBag, User, Search, X, Heart } from 'lucide-vue-next';
import AnnouncementBar from './AnnouncementBar.vue';
import SearchBar from './SearchBar.vue';
import DesktopNavigation from './DesktopNavigation.vue';
import MobileNavigation from './MobileNavigation.vue';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { useUiStore } from '@/stores/ui';
import { useLocaleStore } from '@/stores/locale';

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const uiStore = useUiStore();
const localeStore = useLocaleStore();

const isSearchOpen = ref(false);
const isScrolled = ref(false);

function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value;
}

function closeSearch() {
  isSearchOpen.value = false;
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isSearchOpen.value) {
    closeSearch();
  }
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header :class="['app-header-root', { 'is-scrolled': isScrolled }]">
    <!-- Top Announcement Bar -->
    <AnnouncementBar />

    <!-- Single Main Header Row (Logo + Menu + Action Icons) -->
    <div class="main-header-row">
      <div class="container header-flex-container">
        <!-- Mobile Hamburger Menu Button -->
        <button
          type="button"
          class="mobile-hamburger-btn"
          aria-label="Open Mobile Menu"
          @click="uiStore.toggleMobileMenu"
        >
          <Menu :size="24" />
        </button>

        <!-- Brand Logo (Left) -->
        <router-link to="/" class="brand-logo-link" title="LIBAS Shop Home">
          <img src="/images/logo.png" alt="LIBAS Shop Logo" class="brand-logo" />
        </router-link>

        <!-- Desktop Navigation Menu (Center) -->
        <div class="header-center-menu">
          <DesktopNavigation />
        </div>

        <!-- Header Action Icons (Right: Search + Account + Cart) -->
        <div class="header-actions">
          <!-- Search Icon Button -->
          <button
            type="button"
            :class="['action-icon-btn', 'search-toggle-btn', { active: isSearchOpen }]"
            title="Search Products"
            @click="toggleSearch"
          >
            <X v-if="isSearchOpen" :size="22" />
            <Search v-else :size="22" />
          </button>

          <!-- Account Icon Button -->
          <router-link to="/account" class="action-icon-btn account-link" title="My Account">
            <User :size="22" />
          </router-link>

          <!-- Wishlist Icon Button -->
          <router-link to="/wishlist" class="action-icon-btn wishlist-link-btn" title="View Wishlist">
            <div class="icon-badge-wrapper">
              <Heart :size="22" />
              <span v-if="wishlistStore.count > 0" class="action-badge action-badge--wishlist">
                {{ wishlistStore.count }}
              </span>
            </div>
          </router-link>

          <!-- Cart Icon Button -->
          <button
            type="button"
            class="action-icon-btn cart-toggle-btn"
            title="View Shopping Cart"
            @click="uiStore.openCartDrawer"
          >
            <div class="icon-badge-wrapper">
              <ShoppingBag :size="22" />
              <span v-if="cartStore.itemCount > 0" class="action-badge action-badge--cart">
                {{ cartStore.itemCount }}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Dropdown Overlay Search Bar when Search Icon is Clicked -->
    <Transition name="search-slide">
      <div v-if="isSearchOpen" class="header-search-overlay">
        <div class="container search-overlay-content">
          <SearchBar />
          <button type="button" class="close-search-btn" aria-label="Close Search" @click="closeSearch">
            <X :size="20" />
          </button>
        </div>
      </div>
    </Transition>

    <!-- Mobile Navigation Drawer Container -->
    <MobileNavigation />
  </header>
</template>

<style scoped lang="scss">
.app-header-root {
  position: sticky;
  top: 0;
  z-index: 950;
  background: transparent;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.main-header-row {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  padding: 8px 0;
  border-bottom: 1px solid rgba(226, 232, 228, 0.8);
  transition: all 0.3s ease;
}

.app-header-root.is-scrolled .main-header-row {
  background: rgba(255, 255, 255, 0.55) !important;
  backdrop-filter: blur(24px) saturate(200%) !important;
  -webkit-backdrop-filter: blur(24px) saturate(200%) !important;
  box-shadow: 0 10px 30px rgba(29, 42, 35, 0.12), 0 2px 10px rgba(190, 145, 52, 0.15) !important;
  border-bottom: 1.5px solid rgba(190, 145, 52, 0.4) !important;
}

.header-flex-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.mobile-hamburger-btn {
  display: none;
  background: none;
  border: none;
  color: var(--color-charcoal);
  cursor: pointer;
  padding: 4px;

  @media (max-width: 992px) {
    display: flex;
    align-items: center;
  }
}

.brand-logo-link {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.brand-logo {
  height: 33px;
  max-width: 160px;
  width: auto;
  object-fit: contain;
  display: block;

  @media (max-width: 768px) {
    height: 27px;
    max-width: 130px;
  }
}

.header-center-menu {
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 992px) {
    display: none;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    gap: 4px;
  }
}

.action-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--color-charcoal);
  cursor: pointer;
  text-decoration: none;
  padding: 6px;
  border-radius: 50%;
  transition: var(--transition-fast);

  &:hover, &.active {
    color: var(--color-primary);
    background: var(--color-primary-subtle);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    &.account-link {
      display: none;
    }
  }
}

.icon-badge-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-badge {
  position: absolute;
  top: -7px;
  right: -8px;
  background: var(--color-primary);
  color: var(--color-white);
  font-size: 0.65rem;
  font-weight: 700;
  min-width: 17px;
  height: 17px;
  padding: 0 3px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;

  &--cart {
    background: var(--color-accent);
  }
}

/* Dropdown Overlay Search Bar */
.header-search-overlay {
  background: var(--color-white);
  border-bottom: 2px solid var(--color-primary);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 14px 0;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 990;
}

.search-overlay-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.close-search-btn {
  background: var(--color-off-white);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-charcoal);

  &:hover {
    background: var(--color-primary);
    color: white;
  }
}

.search-slide-enter-active,
.search-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.search-slide-enter-from,
.search-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
