<script setup lang="ts">
import { ChevronUp } from 'lucide-vue-next';
import { useScroll } from '@/composables/useScroll';

const { isScrolled, scrollToTop } = useScroll(300);
</script>

<template>
  <Transition name="fade">
    <button
      v-if="isScrolled"
      type="button"
      class="back-to-top"
      aria-label="Back to Top"
      @click="scrollToTop"
    >
      <ChevronUp :size="22" />
    </button>
  </Transition>
</template>

<style scoped lang="scss">
.back-to-top {
  position: fixed;
  bottom: 90px;
  right: 24px;
  width: 48px;
  height: 48px;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: 2px solid var(--color-primary-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(104, 143, 122, 0.35);
  cursor: pointer;
  z-index: 980;
  transition: var(--transition-normal);

  &:hover {
    background-color: var(--color-accent);
    color: var(--color-white);
    border-color: var(--color-accent-dark);
    transform: translateY(-4px) scale(1.08);
    box-shadow: 0 10px 24px rgba(190, 145, 52, 0.55);
  }

  @media (max-width: 768px) {
    bottom: 84px;
    right: 20px;
    width: 42px;
    height: 42px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
