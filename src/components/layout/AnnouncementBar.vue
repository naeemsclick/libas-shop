<script setup lang="ts">
import { computed } from 'vue';
import { Headphones, Sparkles, PackageCheck, Facebook, Instagram, Video, MessageCircle } from 'lucide-vue-next';
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue';
import { useLocaleStore } from '@/stores/locale';

const localeStore = useLocaleStore();

const tickerItems = computed(() => [
  { icon: Sparkles, text: localeStore.t('announcement.slogan'), highlight: false },
  { text: localeStore.t('announcement.freeDelivery'), highlight: true },
  { text: localeStore.t('announcement.bKashOffer'), highlight: false },
  { text: localeStore.t('announcement.specialOffer'), highlight: true }
]);
</script>

<template>
  <div class="announcement-bar">
    <div class="container announcement-content">
      <!-- Left: Social Icons -->
      <div class="top-socials">
        <a href="https://www.facebook.com/libasshopbd" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <Facebook :size="13" />
        </a>
        <a href="https://www.instagram.com/libasshopbd" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram :size="13" />
        </a>
        <a href="https://wa.me/8801717000414" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <MessageCircle :size="13" />
        </a>
      </div>

      <span class="divider">|</span>

      <!-- Center: Slow Marquee Scrolling Offers & Slogan -->
      <div class="marquee-ticker-wrapper">
        <div class="marquee-ticker-track">
          <!-- Duplicated items for seamless continuous looping -->
          <div v-for="n in 2" :key="n" class="marquee-group">
            <div
              v-for="(item, idx) in tickerItems"
              :key="`${n}-${idx}`"
              :class="['ticker-item', { 'ticker-item--highlight': item.highlight }]"
            >
              <component :is="item.icon" v-if="item.icon" :size="13" class="ticker-icon" />
              <span>{{ item.text }}</span>
              <span class="ticker-dot">•</span>
            </div>
          </div>
        </div>
      </div>

      <span class="divider">|</span>

      <!-- Right: Customer Care, Track Order & Language Switcher -->
      <div class="announcement-right">
        <a href="tel:+8801717000414" class="top-link customer-care-link" title="Customer Support">
          <Headphones :size="14" class="cc-icon" />
          <span>+88 01717 000 414</span>
        </a>
        <span class="divider">|</span>
        <router-link to="/track-order" class="top-link track-link">
          <PackageCheck :size="14" class="track-icon" />
          <span>{{ localeStore.t('announcement.trackOrder') }}</span>
        </router-link>

        <span class="divider">|</span>
        
        <!-- Language Switcher in Top Bar -->
        <LanguageSwitcher />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.announcement-bar {
  background-color: var(--color-primary-dark);
  color: var(--color-off-white);
  font-size: 0.76rem;
  padding: 5px 0;
  font-weight: 400;
  border-bottom: 1px solid rgba(229, 139, 139, 0.3);
  overflow: hidden;
}

.announcement-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.top-socials {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  a {
    color: rgba(255, 255, 255, 0.85);
    display: flex;
    align-items: center;
    transition: var(--transition-fast);

    &:hover {
      color: var(--color-accent);
    }
  }
}

.divider {
  opacity: 0.35;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
}

/* Slow Marquee Ticker */
.marquee-ticker-wrapper {
  flex: 1;
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
}

.marquee-ticker-track {
  display: flex;
  width: max-content;
  animation: marqueeScroll 28s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
}

.marquee-group {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-right: 24px;
}

.ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  color: var(--color-off-white);
  font-weight: 400;

  &--highlight {
    color: var(--color-beige);
    font-weight: 500;
  }

  .ticker-icon {
    color: var(--color-accent);
  }

  .ticker-dot {
    opacity: 0.4;
    margin-left: 12px;
  }
}

@keyframes marqueeScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.announcement-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  .top-link {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--color-off-white);
    transition: var(--transition-fast);

    &:hover {
      color: var(--color-accent);
    }
  }

  .customer-care-link {
    font-weight: 700;
    animation: phoneFlickerGold 6.0s ease-in-out infinite;

    .cc-icon {
      color: var(--color-accent);
    }
  }

@keyframes phoneFlickerGold {
  0%, 40%, 100% {
    color: #FFFFFF;
    text-shadow: none;
  }
  60%, 80% {
    color: #BE9134;
    text-shadow: 0 0 8px rgba(190, 145, 52, 0.45);
  }
}

  .track-link {
    color: var(--color-beige);
    font-weight: 600;

    .track-icon {
      color: var(--color-accent);
    }

    &:hover {
      color: var(--color-white);
    }
  }

  @media (max-width: 580px) {
    .track-link span {
      display: none;
    }
  }
}
</style>
