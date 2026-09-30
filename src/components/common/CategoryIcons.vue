<script setup lang="ts">
interface Props {
  name: string;
  size?: number;
  customClass?: string;
}

withDefaults(defineProps<Props>(), {
  size: 20,
  customClass: ''
});
</script>

<template>
  <!-- Custom Tasbih Icon for Sunnah -->
  <svg
    v-if="name === 'tasbih' || name === 'sunnah'"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="customClass"
  >
    <circle cx="12" cy="4" r="1.4"/>
    <circle cx="16" cy="6" r="1.4"/>
    <circle cx="18.5" cy="9.5" r="1.4"/>
    <circle cx="18" cy="13.5" r="1.4"/>
    <circle cx="15.5" cy="16.8" r="1.4"/>
    <circle cx="12" cy="18" r="1.4"/>
    <circle cx="8.5" cy="16.8" r="1.4"/>
    <circle cx="6" cy="13.5" r="1.4"/>
    <circle cx="5.5" cy="9.5" r="1.4"/>
    <circle cx="8" cy="6" r="1.4"/>
    <path d="M12 19.4v3.6"/>
    <path d="M9.5 23h5"/>
  </svg>

  <!-- Custom Perfume Spray Bottle Icon for Perfume & Attar -->
  <svg
    v-else-if="name === 'perfume' || name === 'attar' || name === 'perfume-bottle'"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="customClass"
  >
    <rect x="6" y="9" width="12" height="12" rx="3"/>
    <path d="M10 9V6h4v3"/>
    <path d="M12 6V3"/>
    <circle cx="12" cy="3" r="1"/>
    <!-- Spray Mist Lines -->
    <path d="M16 2l2-1"/>
    <path d="M17 4h2"/>
    <path d="M16 6l2 1"/>
  </svg>

  <!-- Custom Women's Dress / Abaya Icon for Women's Collection -->
  <svg
    v-else-if="name === 'womensCloth' || name === 'womens-collection' || name === 'womens'"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="customClass"
  >
    <path d="M9 3h6l1.5 4h-9z"/>
    <path d="M7.5 7l-2.5 14h14l-2.5-14"/>
    <path d="M12 7v14"/>
    <path d="M9.5 11c1.5 1 3.5 1 5 0"/>
  </svg>
</template>
