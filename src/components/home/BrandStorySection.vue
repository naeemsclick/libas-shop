<script setup lang="ts">
import { Sparkles, ShieldCheck, Heart, Award } from 'lucide-vue-next';
</script>

<template>
  <section class="brand-story-section section-spacing">
    <div class="container">
      <div class="story-card">
        <div class="story-header">
          <div class="slogan-badge">
            <Sparkles :size="16" />
            <span>LIBAS Shop Brand Promise</span>
          </div>

          <h2 class="story-title">“YOUR CHOICE OUR PROMISE”</h2>

          <p class="story-subtitle">
            At LIBAS Shop, we are dedicated to offering high quality modest fashion and lifestyle products that reflect your personal style and values. From signature Jubba collections and graceful Abayas to pure oriental Attars, premium watches, and footwear — we ensure a trustworthy, stylish shopping experience.
          </p>
        </div>

        <div class="pillars-grid">
          <div class="pillar-item">
            <div class="pillar-icon">
              <Sparkles :size="24" />
            </div>
            <h3 class="pillar-title">Curated Quality</h3>
            <p class="pillar-text">Premium fabrics, superior stitching, and handpicked modest collections crafted to perfection.</p>
          </div>

          <div class="pillar-item">
            <div class="pillar-icon">
              <ShieldCheck :size="24" />
            </div>
            <h3 class="pillar-title">Authenticity First</h3>
            <p class="pillar-text">Directly sourced, 100% genuine products with transparent quality standards and guarantees.</p>
          </div>

          <div class="pillar-item">
            <div class="pillar-icon">
              <Heart :size="24" />
            </div>
            <h3 class="pillar-title">Customer Care</h3>
            <p class="pillar-text">Instant support via WhatsApp (+88 01717 000 414), fast nationwide delivery, and simple exchanges.</p>
          </div>

          <div class="pillar-item">
            <div class="pillar-icon">
              <Award :size="24" />
            </div>
            <h3 class="pillar-title">Accessible Value</h3>
            <p class="pillar-text">Refined luxury aesthetic and durable quality at accessible prices.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.brand-story-section {
  background: var(--color-white);
}

.story-card {
  background: var(--color-off-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 48px;

  @media (max-width: 768px) {
    padding: 28px 20px;
  }
}

.story-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 40px;
}

.slogan-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--color-beige);
  color: var(--color-primary-dark);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.story-title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  color: var(--color-primary-dark);
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
}

.story-subtitle {
  font-size: 1rem;
  color: var(--color-taupe);
  line-height: 1.65;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.pillar-item {
  background: var(--color-white);
  padding: 24px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: var(--transition-normal);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
}

.pillar-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--color-primary-subtle);
  color: var(--color-primary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.pillar-title {
  font-size: 1.05rem;
  color: var(--color-charcoal);
  margin-bottom: 8px;
}

.pillar-text {
  font-size: 0.88rem;
  color: var(--color-taupe);
  line-height: 1.5;
}
</style>
