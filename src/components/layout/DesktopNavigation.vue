<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { ChevronDown, ChevronRight, Shirt, ShoppingBag, Sparkles, Watch, Footprints, Bookmark } from 'lucide-vue-next';
import { useLocaleStore } from '@/stores/locale';

const route = useRoute();
const localeStore = useLocaleStore();

const isCategoryDropdownOpen = ref(false);

export interface SubCategoryItem {
  label: string;
  link: string;
}

export interface SubMenuItem {
  key: string;
  label: string;
  link: string;
  icon: any;
  subCategories?: SubCategoryItem[];
}

export interface NavItem {
  key: string;
  label: string;
  link: string;
  badge?: string;
  isDropdown?: boolean;
}

const categorySubMenu = computed<SubMenuItem[]>(() => [
  {
    key: 'clothing',
    label: localeStore.t('nav.clothing'),
    link: '/category/clothing',
    icon: Shirt,
    subCategories: [
      { label: 'Jubba & Thobe', link: '/category/clothing' },
      { label: 'Panjabi & Pajama', link: '/category/clothing' },
      { label: 'Dawah T-Shirt', link: '/category/clothing' },
      { label: 'Winter Koti & Hoodies', link: '/category/clothing' }
    ]
  },
  {
    key: 'womensCollection',
    label: localeStore.t('nav.womensCollection'),
    link: '/category/womens-collection',
    icon: ShoppingBag,
    subCategories: [
      { label: 'Dubai Cherry Abaya', link: '/category/womens-collection' },
      { label: 'Borka & Hijab Set', link: '/category/womens-collection' },
      { label: 'Modest Gown', link: '/category/womens-collection' }
    ]
  },
  {
    key: 'perfume',
    label: localeStore.t('nav.perfume'),
    link: '/category/perfume',
    icon: Sparkles,
    subCategories: [
      { label: 'Alcohol-Free Attar', link: '/category/perfume' },
      { label: 'Organic Cambodian Oud', link: '/category/perfume' },
      { label: 'Luxury Perfume Spray', link: '/category/perfume' }
    ]
  },
  {
    key: 'watch',
    label: localeStore.t('nav.watch'),
    link: '/category/watch',
    icon: Watch,
    subCategories: [
      { label: 'Premium Wrist Watches', link: '/category/watch' },
      { label: 'Watch & Pen Gift Sets', link: '/category/watch' }
    ]
  },
  {
    key: 'shoes',
    label: localeStore.t('nav.shoes'),
    link: '/category/shoes',
    icon: Footprints,
    subCategories: [
      { label: 'Leather Arabian Sandals', link: '/category/shoes' },
      { label: 'Handmade Nagra', link: '/category/shoes' }
    ]
  },
  {
    key: 'sunnah',
    label: localeStore.t('nav.sunnah'),
    link: '/category/sunnah',
    icon: Bookmark,
    subCategories: [
      { label: 'Islamic Cap & Tupi', link: '/category/sunnah' },
      { label: 'Natural Miswak & Surma', link: '/category/sunnah' },
      { label: 'Janamaz / Prayer Mat', link: '/category/sunnah' }
    ]
  }
]);

const navItems = computed<NavItem[]>(() => [
  { key: 'home', label: localeStore.t('nav.home'), link: '/' },
  { key: 'shop', label: localeStore.t('nav.shop'), link: '/shop' },
  { key: 'allCategories', label: localeStore.t('nav.allCategories'), link: '/shop', isDropdown: true },
  { key: 'newArrivals', label: localeStore.t('nav.newArrivals'), link: '/shop?sortBy=newest', badge: 'NEW' },
  { key: 'offers', label: localeStore.t('nav.offers'), link: '/offers', badge: 'HOT' },
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
              <li v-for="sub in categorySubMenu" :key="sub.key" class="dropdown-item-wrapper">
                <router-link :to="sub.link" class="dropdown-item" @click="isCategoryDropdownOpen = false">
                  <div class="item-icon-wrapper">
                    <component :is="sub.icon" :size="16" />
                  </div>
                  <span class="item-label">{{ sub.label }}</span>
                  <ChevronRight v-if="sub.subCategories?.length" :size="14" class="sub-arrow" />
                </router-link>

                <!-- Right Side Flyout Dropdown -->
                <div v-if="sub.subCategories?.length" class="sub-flyout-menu">
                  <ul class="sub-flyout-list">
                    <li v-for="(child, idx) in sub.subCategories" :key="idx">
                      <router-link :to="child.link" class="flyout-item" @click="isCategoryDropdownOpen = false">
                        <span>{{ child.label }}</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
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
  width: 250px;
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

.dropdown-item-wrapper {
  position: relative;

  &:hover {
    > .sub-flyout-menu {
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
    }
  }
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
    flex-shrink: 0;
  }

  .sub-arrow {
    margin-left: auto;
    color: var(--color-muted);
    transition: transform 0.2s ease;
  }

  &:hover {
    background: var(--color-bg-alt);
    color: var(--color-accent);

    .item-icon-wrapper {
      background: var(--color-accent);
      color: #FFFFFF;
    }

    .sub-arrow {
      color: var(--color-accent);
      transform: translateX(2px);
    }
  }
}

.sub-flyout-menu {
  position: absolute;
  top: -4px;
  left: 100%;
  width: 220px;
  background: #FFFFFF;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: 0 12px 32px rgba(29, 42, 35, 0.14);
  padding: 8px 0;
  opacity: 0;
  visibility: hidden;
  transform: translateX(6px);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1010;
}

.sub-flyout-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.flyout-item {
  display: block;
  padding: 9px 16px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-charcoal);
  text-decoration: none;
  transition: var(--transition-fast);

  &:hover {
    background: var(--color-bg-alt);
    color: var(--color-accent);
    padding-left: 20px;
  }
}

.nav-badge {
  font-size: 0.55rem;
  font-weight: 700;
  padding: 2px 6px;
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
    box-shadow: 0 2px 8px rgba(190, 145, 52, 0.5);
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
    opacity: 0.75;
    transform: scale(1.15);
  }
}
</style>
