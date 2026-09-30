<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, CheckCircle, Quote } from 'lucide-vue-next';
import { testimonialsData } from '@/data/testimonials';

import 'swiper/css';
import 'swiper/css/pagination';

const modules = [Autoplay, Pagination];
</script>

<template>
  <section class="testimonial-section section-spacing">
    <div class="container">
      <div class="section-header text-center">
        <span class="sub-heading">Real Customer Experiences</span>
        <h2 class="main-title">What Our Customers Say</h2>
      </div>

      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="24"
        :breakpoints="{
          '768': { slidesPerView: 2 },
          '1024': { slidesPerView: 3 }
        }"
        :autoplay="{ delay: 4500, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        class="testimonials-swiper"
      >
        <SwiperSlide v-for="t in testimonialsData" :key="t.id">
          <div class="testimonial-card">
            <Quote :size="36" class="quote-icon" />
            
            <div class="stars">
              <Star v-for="i in t.rating" :key="i" :size="16" fill="#BE9134" class="star" />
            </div>

            <p class="comment">“{{ t.comment }}”</p>

            <div class="author-info">
              <div class="author-avatar">
                {{ t.name.charAt(0) }}
              </div>
              <div class="author-details">
                <div class="author-name-row">
                  <h4 class="author-name">{{ t.name }}</h4>
                  <span class="verified-badge">
                    <CheckCircle :size="11" class="verified-icon" />
                    <span>Verified</span>
                  </span>
                </div>
                <span class="author-location">{{ t.location }}</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style scoped lang="scss">
.testimonial-section {
  background: var(--color-off-white);
}

.text-center {
  text-align: center;
}

.sub-heading {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 6px;
}

.main-title {
  font-size: 1.8rem;
  color: var(--color-charcoal);
  margin-bottom: 36px;
}

.testimonials-swiper {
  padding-bottom: 44px;

  :deep(.swiper-wrapper) {
    align-items: stretch;
  }

  :deep(.swiper-slide) {
    height: auto;
    display: flex;
  }
}

.testimonial-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 28px;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-shadow: var(--shadow-sm);
}

.quote-icon {
  position: absolute;
  top: 24px;
  right: 24px;
  color: var(--color-beige);
  opacity: 0.8;
}

.stars {
  display: flex;
  gap: 3px;
  margin-bottom: 14px;
  color: #BE9134;
}

.comment {
  font-size: 0.95rem;
  color: var(--color-charcoal);
  line-height: 1.6;
  margin-bottom: 24px;
  flex: 1;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
}

.author-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--color-primary-subtle);
  color: var(--color-primary-dark);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.author-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.author-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-charcoal);
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px 6px;
  background: rgba(78, 133, 109, 0.1);
  border: 1px solid rgba(78, 133, 109, 0.25);
  color: #35604D;
  font-size: 0.66rem;
  font-weight: 700;
  border-radius: 999px;
  letter-spacing: 0.02em;
  line-height: 1.2;
}

.verified-icon {
  color: #4E856D;
}

.author-location {
  font-size: 0.78rem;
  color: var(--color-taupe);
  display: block;
  margin-top: 2px;
}
</style>
