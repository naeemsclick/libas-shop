<script setup lang="ts">
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

function initScrollAnimations() {
  nextTick(() => {
    setTimeout(() => {
      const targets = document.querySelectorAll(
        '.section-header, .product-card, .category-card, .testimonial-card, .trust-card, .blog-card, .flash-banner-card, .womens-collection-banner, .newsletter-card, .about-card'
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
      );

      targets.forEach((el) => {
        if (!el.classList.contains('reveal-on-scroll')) {
          el.classList.add('reveal-on-scroll');
        }
        observer.observe(el);
      });
    }, 150);
  });
}

onMounted(() => {
  initScrollAnimations();
});

watch(() => route.fullPath, () => {
  initScrollAnimations();
});
</script>

<template>
  <router-view />
</template>

<style>
/* Main app styles imported in main.ts */
</style>
