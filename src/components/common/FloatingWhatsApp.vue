<script setup lang="ts">
import { ref } from 'vue';
import { MessageCircle, Phone, MessageSquare, Headphones, X } from 'lucide-vue-next';

const isOpen = ref(false);

const contacts = [
  {
    label: 'WhatsApp Chat',
    icon: MessageCircle,
    url: 'https://wa.me/8801717000414',
    bg: '#25D366'
  },
  {
    label: 'Messenger Chat',
    icon: MessageSquare,
    url: 'https://m.me/libasshopbd',
    bg: '#0084FF'
  },
  {
    label: 'Direct Call',
    icon: Phone,
    url: 'tel:+8801717000414',
    bg: '#1D2A23'
  }
];
</script>

<template>
  <div class="floating-speed-dial" @mouseenter="isOpen = true" @mouseleave="isOpen = false">
    <!-- Action buttons stack -->
    <TransitionGroup name="speed-dial">
      <div v-if="isOpen" key="dial-actions" class="dial-actions-stack">
        <a
          v-for="item in contacts"
          :key="item.label"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="dial-action-item"
          :aria-label="item.label"
        >
          <span class="action-pill-label">{{ item.label }}</span>
          <div class="dial-icon-circle" :style="{ backgroundColor: item.bg }">
            <component :is="item.icon" :size="20" />
          </div>
        </a>
      </div>
    </TransitionGroup>

    <!-- Main Toggle Trigger Button -->
    <button
      type="button"
      :class="['dial-trigger-btn', { active: isOpen }]"
      aria-label="Contact Speed Dial Options"
      @click="isOpen = !isOpen"
    >
      <X v-if="isOpen" :size="24" />
      <Headphones v-else :size="26" />
      <span v-if="!isOpen" class="main-tooltip">Chat & Call Support</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.floating-speed-dial {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  z-index: 990;

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
}

.dial-actions-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  margin-bottom: 4px;
}

.dial-action-item {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  transition: var(--transition-fast);

  &:hover {
    transform: translateX(-4px);

    .action-pill-label {
      background: var(--color-primary-dark);
      color: var(--color-white);
    }

    .dial-icon-circle {
      transform: scale(1.1);
    }
  }
}

.action-pill-label {
  background: var(--color-charcoal);
  color: var(--color-white);
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  transition: var(--transition-fast);
}

.dial-icon-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  transition: var(--transition-fast);
}

.dial-trigger-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background-color: var(--color-primary-dark);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(104, 143, 122, 0.45);
  cursor: pointer;
  transition: var(--transition-normal);
  position: relative;

  &:hover {
    transform: scale(1.08);

    .main-tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateX(-8px);
    }
  }

  &.active {
    background-color: var(--color-charcoal);
    box-shadow: 0 8px 24px rgba(37, 38, 46, 0.4);
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
  }
}

.main-tooltip {
  position: absolute;
  right: 66px;
  white-space: nowrap;
  background: var(--color-charcoal);
  color: var(--color-white);
  padding: 6px 14px;
  border-radius: var(--radius-md);
  font-size: 0.82rem;
  font-weight: 600;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition-fast);
  pointer-events: none;

  @media (max-width: 768px) {
    display: none;
  }
}

/* Speed dial transitions */
.speed-dial-enter-active,
.speed-dial-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.speed-dial-enter-from,
.speed-dial-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
