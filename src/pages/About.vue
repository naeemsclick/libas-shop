<script setup lang="ts">
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-vue-next';
import { useSeo } from '@/composables/useSeo';

useSeo({
  title: 'About LIBAS Shop',
  description: 'Learn about LIBAS Shop brand story, slogan, values, and modest lifestyle e-commerce experience.'
});
</script>

<template>
  <div class="about-page section-spacing">
    <div class="container">
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span class="sep">/</span>
        <span class="current">About LIBAS Shop</span>
      </nav>

      <!-- Hero Header -->
      <div class="about-hero">
        <span class="brand-slogan-badge">“YOUR CHOICE OUR PROMISE”</span>
        <h1 class="hero-title">Welcome to LIBAS Shop</h1>
        <p class="hero-subtitle">
          LIBAS Shop is a modern Bangladeshi e-commerce destination for modest fashion and lifestyle products, offering quality, variety and a trustworthy shopping experience.
        </p>
      </div>

      <!-- Story Grid -->
      <div class="story-content-grid">
        <div class="image-box">
          <img
            src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80"
            alt="LIBAS Shop Modest Apparel Collection"
          />
        </div>

        <div class="text-box">
          <span class="sub-title">Our Brand Story</span>
          <h2 class="section-title">The Art of Modest Style</h2>
          <p>
            Founded with a commitment to quality, authenticity, and refined aesthetics, LIBAS Shop bridges traditional modest elegance with modern design value for men and women across Bangladesh.
          </p>
          <p>
            Whether you are looking for a tailored Jubba made of pure breathable cotton, a graceful Dubai Cherry fabric Abaya, pure alcohol-free Attar perfumes, or handcrafted footwear — LIBAS Shop promises exceptional craftsmanship in every detail.
          </p>

          <div class="stats-row">
            <div class="stat-item">
              <span class="stat-number">100%</span>
              <span class="stat-label">Genuine Quality</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">Fast</span>
              <span class="stat-label">Doorstep Delivery</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">7-Day</span>
              <span class="stat-label">Hassle-Free Exchange</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Spotlight -->
      <div class="spotlight-section">
        <h2 class="spotlight-title text-center">Our Core Collections</h2>
        <div class="spotlight-grid">
          <div class="spotlight-card">
            <h3 class="card-title">Jubba & Men's Clothing</h3>
            <p>Premium 100% cotton Jubbas, Punjabis, and tailored modest menswear built for comfort, daily prayers, and special occasions.</p>
          </div>
          <div class="spotlight-card">
            <h3 class="card-title">Abaya & Women's Collection</h3>
            <p>Graceful Dubai Cherry fabric Abayas, elegant modest wear, and premium scarves designed with dignity and beauty.</p>
          </div>
          <div class="spotlight-card">
            <h3 class="card-title">Attar, Watch & Sunnah Essentials</h3>
            <p>Pure alcohol-free oriental attar oils, classic wristwatches, handmade caps, and daily Sunnah lifestyle essentials.</p>
          </div>
        </div>
      </div>

      <!-- CTA Footer Banner -->
      <div class="about-cta-banner">
        <h2>Ready to Experience LIBAS Shop?</h2>
        <p>Explore our premium modest collection today — Your Choice, Our Promise.</p>
        <router-link to="/shop" class="btn btn--primary btn--lg">
          <span>Start Shopping Now</span>
          <ArrowRight :size="18" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--color-taupe);
  margin-bottom: 24px;

  .sep { opacity: 0.5; }
  .current { color: var(--color-charcoal); font-weight: 600; }
}

.text-center { text-align: center; }

.about-hero {
  text-align: center;
  max-width: 780px;
  margin: 0 auto 56px;
}

.brand-slogan-badge {
  display: inline-block;
  padding: 6px 16px;
  background: var(--color-beige);
  color: var(--color-primary-dark);
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  margin-bottom: 16px;
}

.hero-title {
  font-size: 2.8rem;
  color: var(--color-charcoal);
  margin-bottom: 16px;

  @media (max-width: 768px) { font-size: 2rem; }
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--color-taupe);
  line-height: 1.6;
}

.story-content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-bottom: 72px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.image-box {
  height: 420px;
  border-radius: var(--radius-xl);
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; }
}

.sub-title { font-size: 0.82rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase; margin-bottom: 6px; display: block; }
.section-title { font-size: 2rem; margin-bottom: 16px; }

.text-box p {
  font-size: 0.98rem;
  color: var(--color-taupe);
  line-height: 1.65;
  margin-bottom: 16px;
}

.stats-row {
  display: flex;
  gap: 24px;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-primary-dark);
}

.stat-label {
  font-size: 0.78rem;
  color: var(--color-taupe);
}

.spotlight-section {
  margin-bottom: 72px;
}

.spotlight-title {
  font-size: 2rem;
  margin-bottom: 36px;
}

.spotlight-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
}

.spotlight-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);

  .card-title { font-size: 1.2rem; color: var(--color-primary-dark); margin-bottom: 12px; }
  p { font-size: 0.9rem; color: var(--color-taupe); line-height: 1.55; }
}

.about-cta-banner {
  background: var(--color-primary-dark);
  color: white;
  border-radius: var(--radius-xl);
  padding: 56px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  h2 { font-size: 2.2rem; color: white; }
  p { font-size: 1.05rem; color: var(--color-beige); }
}
</style>
