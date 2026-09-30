<script setup lang="ts">
import { ArrowRight, CheckCircle } from 'lucide-vue-next';
</script>

<template>
  <section class="featured-collection section-spacing">
    <div class="container">
      <div class="promo-grid">
        <!-- Visual left panel -->
        <div class="visual-panel">
          <img
            src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80"
            alt="LIBAS Shop Editorial Collection"
            class="promo-img"
          />
          <div class="visual-badge">
            <span class="badge-title">CURATED SELECTION</span>
            <span class="badge-subtitle">2026 Edition</span>
          </div>
        </div>

        <!-- Content right panel -->
        <div class="content-panel">
          <span class="sub-heading">LIBAS Editorial</span>
          <h2 class="headline">Curated for Everyday Confidence</h2>
          <p class="description">
            Discover a thoughtfully assembled collection of everyday essentials. From high-grade vegan leather totes to smart wearables and organic botanical skincare, each choice is crafted to enhance your daily lifestyle.
          </p>

          <ul class="feature-checklist">
            <li>
              <CheckCircle :size="18" class="check-icon" />
              <span>Authentic, premium build quality backed by official warranty</span>
            </li>
            <li>
              <CheckCircle :size="18" class="check-icon" />
              <span>Timeless design aesthetics tailored for modern lifestyles</span>
            </li>
            <li>
              <CheckCircle :size="18" class="check-icon" />
              <span>Accessible pricing without compromising elegance</span>
            </li>
          </ul>

          <div class="actions">
            <router-link to="/shop" class="btn btn--primary btn--lg">
              <span>Shop Curated Collection</span>
              <ArrowRight :size="18" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.featured-collection {
  background: var(--color-white);
}

.promo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.visual-panel {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  height: 460px;
  box-shadow: var(--shadow-lg);

  @media (max-width: 768px) {
    height: 320px;
  }
}

.promo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.visual-badge {
  position: absolute;
  bottom: 24px;
  left: 24px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(6px);
  padding: 14px 22px;
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-md);
}

.badge-title {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  letter-spacing: 0.05em;
}

.badge-subtitle {
  font-size: 0.75rem;
  color: var(--color-taupe);
}

.content-panel {
  display: flex;
  flex-direction: column;
}

.sub-heading {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.headline {
  font-size: 2.2rem;
  color: var(--color-charcoal);
  line-height: 1.2;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
}

.description {
  font-size: 1rem;
  color: var(--color-taupe);
  line-height: 1.6;
  margin-bottom: 24px;
}

.feature-checklist {
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--color-charcoal);
  }
}

.check-icon {
  color: var(--color-primary);
  flex-shrink: 0;
}
</style>
