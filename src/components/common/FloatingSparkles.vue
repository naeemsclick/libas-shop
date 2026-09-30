<script setup lang="ts">
import { Sparkles, Star } from 'lucide-vue-next';

const sparkles = [
  { id: 1, left: '8%', size: 14, duration: '12s', delay: '0s', opacity: 0.6 },
  { id: 2, left: '22%', size: 18, duration: '15s', delay: '2s', opacity: 0.75 },
  { id: 3, left: '38%', size: 12, duration: '10s', delay: '4s', opacity: 0.5 },
  { id: 4, left: '55%', size: 20, duration: '16s', delay: '1s', opacity: 0.8 },
  { id: 5, left: '72%', size: 14, duration: '11s', delay: '3s', opacity: 0.6 },
  { id: 6, left: '88%', size: 16, duration: '14s', delay: '5s', opacity: 0.7 },
  { id: 7, left: '94%', size: 10, duration: '9s', delay: '2.5s', opacity: 0.5 },
  { id: 8, left: '15%', size: 16, duration: '13s', delay: '6s', opacity: 0.65 }
];
</script>

<template>
  <div class="floating-sparkles-container" aria-hidden="true">
    <div
      v-for="item in sparkles"
      :key="item.id"
      class="sparkle-particle"
      :style="{
        left: item.left,
        animationDuration: item.duration,
        animationDelay: item.delay,
        opacity: item.opacity
      }"
    >
      <Sparkles v-if="item.id % 2 === 0" :size="item.size" class="sparkle-icon" />
      <Star v-else :size="item.size" fill="#BE9134" class="sparkle-icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.floating-sparkles-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.sparkle-particle {
  position: absolute;
  bottom: -30px;
  color: #BE9134;
  filter: drop-shadow(0 0 8px rgba(190, 145, 52, 0.6));
  animation: floatUpSparkle linear infinite;
}

.sparkle-icon {
  animation: sparkleTwinkle 2.5s ease-in-out infinite alternate;
}

@keyframes floatUpSparkle {
  0% {
    transform: translateY(0) scale(0.6) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 0.85;
  }
  80% {
    opacity: 0.85;
  }
  100% {
    transform: translateY(-110vh) scale(1.1) rotate(180deg);
    opacity: 0;
  }
}

@keyframes sparkleTwinkle {
  0% {
    transform: scale(0.8);
    filter: drop-shadow(0 0 4px rgba(190, 145, 52, 0.4));
  }
  100% {
    transform: scale(1.25);
    filter: drop-shadow(0 0 12px rgba(190, 145, 52, 0.85));
  }
}
</style>
