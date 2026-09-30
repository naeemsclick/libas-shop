<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useLocaleStore } from '@/stores/locale';

const props = defineProps<{
  targetDate?: string;
}>();

const localeStore = useLocaleStore();

const hours = ref('08');
const minutes = ref('45');
const seconds = ref('12');

let targetTimestamp = 0;
let timerInterval: ReturnType<typeof setInterval> | null = null;

function initTarget() {
  if (props.targetDate) {
    targetTimestamp = new Date(props.targetDate).getTime();
  } else {
    // 12 hours, 45 mins countdown target from initial page load
    targetTimestamp = Date.now() + 12 * 3600 * 1000 + 45 * 60 * 1000;
  }
}

function updateCountdown() {
  const now = Date.now();
  let diff = targetTimestamp - now;

  if (diff <= 0) {
    hours.value = '00';
    minutes.value = '00';
    seconds.value = '00';
    return;
  }

  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  hours.value = h < 10 ? `0${h}` : `${h}`;
  minutes.value = m < 10 ? `0${m}` : `${m}`;
  seconds.value = s < 10 ? `0${s}` : `${s}`;
}

onMounted(() => {
  initTarget();
  updateCountdown();
  timerInterval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<template>
  <div class="flash-sale-timer">
    <div class="time-block">
      <span class="time-val">{{ hours }}</span>
      <span class="time-unit">{{ localeStore.isBangla ? 'ঘণ্টা' : 'Hours' }}</span>
    </div>
    <span class="colon">:</span>
    <div class="time-block">
      <span class="time-val">{{ minutes }}</span>
      <span class="time-unit">{{ localeStore.isBangla ? 'মিনিট' : 'Mins' }}</span>
    </div>
    <span class="colon">:</span>
    <div class="time-block">
      <span class="time-val">{{ seconds }}</span>
      <span class="time-unit">{{ localeStore.isBangla ? 'সেকেন্ড' : 'Secs' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flash-sale-timer {
  display: flex;
  align-items: center;
  gap: 8px;
}

.time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-dark);
  color: var(--color-white);
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 14px rgba(29, 42, 35, 0.25);
  border: 1px solid rgba(190, 145, 52, 0.3);

  @media (max-width: 480px) {
    width: 46px;
    height: 46px;
  }
}

.time-val {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1;
  color: #FFFFFF;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
}

.time-unit {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-top: 3px;

  @media (max-width: 480px) {
    font-size: 0.58rem;
  }
}

.colon {
  font-weight: 800;
  font-size: 1.4rem;
  color: var(--color-primary-dark);
}
</style>
