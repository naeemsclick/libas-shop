<script setup lang="ts">
import { computed } from 'vue';
import { Shirt, Sparkles, Watch, Footprints, LayoutGrid } from 'lucide-vue-next';
import CategoryIcons from '@/components/common/CategoryIcons.vue';
import { useLocaleStore } from '@/stores/locale';

const localeStore = useLocaleStore();

export interface CategoryCircleItem {
  id: string;
  name: string;
  nameBn?: string;
  link: string;
  isCustomIcon?: boolean;
  iconName?: string;
  lucideIcon?: any;
  bgTint: string;
  borderColor: string;
  glowColor: string;
}

const categoriesList = computed<CategoryCircleItem[]>(() => [
  {
    id: 'clothing',
    name: 'Clothing',
    nameBn: 'পোশাক',
    link: '/category/clothing',
    lucideIcon: Shirt,
    bgTint: '#EEF6F3',
    borderColor: '#3D8866',
    glowColor: 'rgba(61, 136, 102, 0.2)'
  },
  {
    id: 'womens-collection',
    name: "Women's Collection",
    nameBn: 'উইমেনস কালেকশন',
    link: '/category/womens-collection',
    isCustomIcon: true,
    iconName: 'womens-collection',
    bgTint: '#FDF2F4',
    borderColor: '#EE6D75',
    glowColor: 'rgba(238, 109, 117, 0.2)'
  },
  {
    id: 'perfume',
    name: 'Perfume',
    nameBn: 'পারফিউম ও আতর',
    link: '/category/perfume',
    lucideIcon: Sparkles,
    bgTint: '#F5F0FF',
    borderColor: '#9B51E0',
    glowColor: 'rgba(155, 81, 224, 0.2)'
  },
  {
    id: 'watch',
    name: 'Watch',
    nameBn: 'ঘড়ি',
    link: '/category/watch',
    lucideIcon: Watch,
    bgTint: '#F0F6FF',
    borderColor: '#2F80ED',
    glowColor: 'rgba(47, 128, 237, 0.2)'
  },
  {
    id: 'shoes',
    name: 'Shoes',
    nameBn: 'জুতা',
    link: '/category/shoes',
    lucideIcon: Footprints,
    bgTint: '#FFF8EC',
    borderColor: '#F2994A',
    glowColor: 'rgba(242, 153, 74, 0.2)'
  },
  {
    id: 'sunnah',
    name: 'Sunnah',
    nameBn: 'সুন্নাহ',
    link: '/category/sunnah',
    isCustomIcon: true,
    iconName: 'sunnah',
    bgTint: '#EFF9F2',
    borderColor: '#27AE60',
    glowColor: 'rgba(39, 174, 96, 0.2)'
  },
  {
    id: 'view-all',
    name: 'View All',
    nameBn: 'সব দেখুন',
    link: '/shop',
    lucideIcon: LayoutGrid,
    bgTint: '#F7F7F7',
    borderColor: '#BE9134',
    glowColor: 'rgba(190, 145, 52, 0.25)'
  }
]);
</script>

<template>
  <section class="category-explorer-bar">
    <div class="container">
      <div class="categories-row">
        <router-link
          v-for="item in categoriesList"
          :key="item.id"
          :to="item.link"
          class="category-circle-card"
        >
          <!-- Circular Icon Badge with Pastel Ring Glow -->
          <div
            class="circle-badge"
            :style="{
              backgroundColor: item.bgTint,
              boxShadow: `0 4px 14px ${item.glowColor}, inset 0 0 0 2px #ffffff`
            }"
          >
            <CategoryIcons
              v-if="item.isCustomIcon"
              :name="item.iconName!"
              :size="26"
              class="circle-icon"
              :style="{ color: item.borderColor }"
            />
            <component
              v-else
              :is="item.lucideIcon"
              :size="26"
              class="circle-icon"
              :style="{ color: item.borderColor }"
            />
          </div>

          <!-- Centered Title -->
          <span class="category-name">
            {{ localeStore.isBangla ? (item.nameBn || item.name) : item.name }}
          </span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.category-explorer-bar {
  background: #FFFFFF;
  padding: 24px 0;
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.categories-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 18px;
  overflow-x: auto;
  padding: 6px 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 992px) {
    justify-content: flex-start;
    gap: 16px;
    padding: 6px 8px;
  }
}

.category-circle-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  width: 96px;
  flex-shrink: 0;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-4px);

    .circle-badge {
      transform: scale(1.08);
      box-shadow: 0 8px 22px rgba(29, 42, 35, 0.18) !important;
    }

    .category-name {
      color: var(--color-accent);
    }
  }

  @media (max-width: 600px) {
    width: 78px;
    gap: 6px;
  }
}

.circle-badge {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;

  @media (max-width: 600px) {
    width: 64px;
    height: 64px;
  }
}

.circle-icon {
  transition: transform 0.25s ease;
}

.category-name {
  font-size: 0.86rem;
  font-weight: 700;
  color: var(--color-charcoal);
  text-align: center;
  white-space: nowrap;
  letter-spacing: -0.01em;
  transition: color 0.2s ease;

  @media (max-width: 600px) {
    font-size: 0.76rem;
  }
}
</style>
