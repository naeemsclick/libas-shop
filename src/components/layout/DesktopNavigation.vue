<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { ChevronDown, Shirt, ShoppingBag, Sparkles, Watch, Footprints, Bookmark } from 'lucide-vue-next';
import { useLocaleStore } from '@/stores/locale';

const route = useRoute();
const localeStore = useLocaleStore();

const isCategoryDropdownOpen = ref(false);

export interface SubMenuItem {
  key: string;
  label: string;
  link: string;
  icon: any;
}

export interface NavItem {
  key: string;
  label: string;
  link: string;
  badge?: string;
  isDropdown?: boolean;
}

const categorySubMenu = computed<SubMenuItem[]>(() => [
  { key: 'clothing', label: localeStore.t('nav.clothing'), link: '/category/clothing', icon: Shirt },
  { key: 'womensCollection', label: localeStore.t('nav.womensCollection'), link: '/category/womens-collection', icon: ShoppingBag },
  { key: 'perfume', label: localeStore.t('nav.perfume'), link: '/category/perfume', icon: Sparkles },
  { key: 'watch', label: localeStore.t('nav.watch'), link: '/category/watch', icon: Watch },
  { key: 'shoes', label: localeStore.t('nav.shoes'), link: '/category/shoes', icon: Footprints },
  { key: 'sunnah', label: localeStore.t('nav.sunnah'), link: '/category/sunnah', icon: Bookmark }
]);

const navItems = computed<NavItem[]>(() => [
  { key: 'home', label: localeStore.t('nav.home'), link: '/' },
  { key: 'shop', label: localeStore.t('nav.shop'), link: '/shop' },
  { key: 'allCategories', label: localeStore.t('nav.allCategories'), link: '/shop', isDropdown: true },
  { key: 'newArrivals', label: localeStore.t('nav.newArrivals'), link: '/shop?sortBy=newest', badge: 'NEW' },
  { key: 'blog', label: localeStore.t('nav.blog'), link: '/blog' },
  { key: 'about', label: localeStore.t('nav.about'), link: '/about' },
  { key: 'contact', label: localeStore.t('nav.contact'), link: '/contact' }
]);

function isActive(link: string): boolean {
  if (link === '/') return route.path === '/';
  return route.fullPath === link || route.path.startsWith(link);
}

function isCategoryActive(): boolean {
  return route.path.startsWith('/category/');
}
</script>

<template>
  <nav class="desktop-navigation">
    <ul class="nav-list">
      <li
        v-for="item in navItems"
        :key="item.key"
        :class="['nav-item', { 'has-dropdown': item.isDropdown }]"
        @mouseenter="item.isDropdown ? (isCategoryDropdownOpen = true) : null"
        @mouseleave="item.isDropdown ? (isCategoryDropdownOpen = false) : null"
      >
        <!-- Standard Nav Link -->
        <router-link
          v-if="!item.isDropdown"
          :to="item.link"
          :class="['nav-link', { active: isActive(item.link) }]"
        >
          {{ item.label }}
          <span v-if="item.badge" :class="['nav-badge', `nav-badge--${item.badge.toLowerCase()}`]">
            {{ item.badge }}
          </span>
        </router-link>

        <!-- Dropdown Parent Link (ALL CATEGORY) -->
        <div
          v-else
          :class="['nav-link', 'dropdown-trigger', { active: isCategoryActive() }]"
        >
          <span>{{ item.label }}</span>
          <ChevronDown :size="14" :class="['chevron-icon', { open: isCategoryDropdownOpen }]" />
        </div>

        <!-- Dropdown Sub-Menu -->
        <Transition name="dropdown-fade" v-if="item.isDropdown">
          <div v-show="isCategoryDropdownOpen" class="dropdown-menu">
            <div class="dropdown-pointer"></div>
            <ul class="dropdown-list">
              <li v-for="sub in categorySubMenu" :key="sub.key">
                <router-link :to="sub.link" class="dropdown-item" @click="isCategoryDropdownOpen = false">
                  <div class="item-icon-wrapper">
                    <component :is="sub.icon" :size="16" />
                  </div>
                  <span class="item-label">{{ sub.label }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </Transition>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.desktop-navigation {
  background: transparent;
  border: none;
  box-shadow: none;

  @media (max-width: 1024px) {
    display: none;
  }
}

.nav-list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 1280px) {
    gap: 14px;
  }
}

.nav-item {
  position: relative;
  flex-shrink: 0;

  &.has-dropdown {
    padding-bottom: 6px;
    margin-bottom: -6px;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 0;
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--color-charcoal);
  white-space: nowrap;
  letter-spacing: 0.02em;
  transition: var(--transition-fast);
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2.5px;
    background-color: var(--color-accent);
    border-radius: 2px;
    transition: var(--transition-fast);
  }

  &:hover, &.active {
    color: var(--color-accent);

    &::after {
      width: 100%;
    }
  }
}

.dropdown-trigger {
  user-select: none;
}

.chevron-icon {
  transition: transform 0.25s ease;
  color: var(--color-muted);

  &.open {
    transform: rotate(180deg);
    color: var(--color-accent);
  }
}

/* Dropdown Menu Container */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 240px;
  background: #FFFFFF;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: 0 12px 32px rgba(29, 42, 35, 0.14);
  padding: 8px 0;
  z-index: 1000;
}

.dropdown-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  font-size: 0.83rem;
  font-weight: 600;
  color: var(--color-charcoal);
  text-decoration: none;
  transition: var(--transition-fast);

  .item-icon-wrapper {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--color-bg-alt);
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-fast);
  }

  &:hover {
    background: var(--color-bg-alt);
    color: var(--color-accent);

    .item-icon-wrapper {
      background: var(--color-accent);
      color: #FFFFFF;
    }
  }
}

.nav-badge {
  font-size: 0.55rem;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
  line-height: 1;
  text-transform: uppercase;
  animation: badgePulseBlink 1.6s infinite cubic-bezier(0.4, 0, 0.6, 1);
  display: inline-flex;
  align-items: center;

  &--new {
    background: linear-gradient(135deg, #1D2A23 0%, #34443A 100%);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(29, 42, 35, 0.4);
  }

  &--hot {
    background: linear-gradient(135deg, #BE9134 0%, #A37928 100%);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(190, 145, 52, 0.4);
  }
}

/* Animations */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}

@keyframes badgePulseBlink {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.12);
  }
}
</style>
