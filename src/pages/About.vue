<script setup lang="ts">
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight, Store } from 'lucide-vue-next';
import { useSeo } from '@/composables/useSeo';
import boutiqueInterior from '@/assets/images/boutique_interior.jpg';

useSeo({
  title: 'About LIBAS Shop | Modest Fashion & Lifestyle',
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

      <!-- Hero Header with Glass Banner -->
      <div class="about-hero glass-card">
        <div class="slogan-wrapper">
          <Sparkles :size="16" class="sparkle-gold" />
          <span class="brand-slogan-badge">“YOUR CHOICE OUR PROMISE”</span>
        </div>
        <h1 class="hero-title">Welcome to LIBAS Shop</h1>
        <p class="hero-subtitle">
          LIBAS Shop is a modern Bangladeshi e-commerce destination for modest fashion and lifestyle products, offering premium quality, variety, and a trustworthy shopping experience.
        </p>
      </div>

      <!-- Story Grid -->
      <div class="story-content-grid">
        <div class="image-box glass-image-container">
          <img
            :src="boutiqueInterior"
            alt="LIBAS Shop Luxury Islamic Boutique Store Interior"
            class="boutique-img"
          />
          <div class="image-glass-badge">
            <Store :size="16" />
            <span>LIBAS Flagship Boutique Interior</span>
          </div>
        </div>

        <div class="text-box glass-card">
          <span class="sub-title">Our Brand Story</span>
          <h2 class="section-title">The Art of Modest Style</h2>
          <p>
            Founded with a commitment to quality, authenticity, and refined aesthetics, LIBAS Shop bridges traditional modest elegance with modern design value for men and women across Bangladesh.
          </p>
          <p>
            Whether you are looking for a tailored Jubba made of pure breathable cotton, a graceful Dubai Cherry fabric Abaya, pure alcohol-free Attar perfumes, or handcrafted footwear — LIBAS Shop promises exceptional craftsmanship in every detail.
          </p>

          <div class="stats-row">
            <div class="stat-item glass-pill">
              <span class="stat-number">100%</span>
              <span class="stat-label">Genuine Quality</span>
            </div>
            <div class="stat-item glass-pill">
              <span class="stat-number">Fast</span>
              <span class="stat-label">Doorstep Delivery</span>
            </div>
            <div class="stat-item glass-pill">
              <span class="stat-number">7-Day</span>
              <span class="stat-label">Hassle-Free Exchange</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Spotlight -->
      <div class="spotlight-section">
        <div class="section-header-wrap text-center">
          <span class="sub-title">Excellence in Craft</span>
          <h2 class="spotlight-title text-center">Our Core Collections</h2>
        </div>

        <div class="spotlight-grid">
          <div class="spotlight-card glass-card">
            <div class="icon-avatar">
              <Award :size="24" />
            </div>
            <h3 class="card-title">Jubba & Men's Clothing</h3>
            <p>Premium 100% cotton Jubbas, Punjabis, and tailored modest menswear built for comfort, daily prayers, and special occasions.</p>
          </div>
          <div class="spotlight-card glass-card">
            <div class="icon-avatar">
              <Heart :size="24" />
            </div>
            <h3 class="card-title">Abaya & Women's Collection</h3>
            <p>Graceful Dubai Cherry fabric Abayas, elegant modest wear, and premium scarves designed with dignity and beauty.</p>
          </div>
          <div class="spotlight-card glass-card">
            <div class="icon-avatar">
              <ShieldCheck :size="24" />
            </div>
            <h3 class="card-title">Attar, Watch & Sunnah Essentials</h3>
            <p>Pure alcohol-free oriental attar oils, classic wristwatches, handmade caps, and daily Sunnah lifestyle essentials.</p>
          </div>
        </div>
      </div>

      <!-- CTA Footer Banner -->
      <div class="about-cta-banner glass-dark-banner">
        <h2>Ready to Experience LIBAS Shop?</h2>
        <p>Explore our premium modest collection today — Your Choice, Our Promise.</p>
        <router-link to="/shop" class="btn btn--accent btn--lg shine-hover-btn">
          <span>Start Shopping Now</span>
          <ArrowRight :size="18" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about-page {
  background: linear-gradient(180deg, #F9F7F2 0%, #F4F0E6 100%);
  min-height: 100vh;
}

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

.glass-card {
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid rgba(190, 145, 52, 0.25);
  box-shadow: 0 12px 32px rgba(29, 42, 35, 0.06), 0 2px 6px rgba(190, 145, 52, 0.08);
  border-radius: var(--radius-xl);
}

.about-hero {
  text-align: center;
  max-width: 840px;
  margin: 0 auto 56px;
  padding: 48px 36px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #BE9134 0%, #F7EFCF 50%, #BE9134 100%);
  }
}

.slogan-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.sparkle-gold {
  color: #BE9134;
}

.brand-slogan-badge {
  display: inline-block;
  padding: 6px 18px;
  background: rgba(190, 145, 52, 0.12);
  color: #8E661B;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  border-radius: var(--radius-full);
  border: 1px solid rgba(190, 145, 52, 0.3);
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
  line-height: 1.65;
}

.story-content-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 36px;
  align-items: center;
  margin-bottom: 72px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.glass-image-container {
  position: relative;
  height: 460px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(29, 42, 35, 0.12);
  border: 2px solid rgba(190, 145, 52, 0.3);

  .boutique-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover .boutique-img {
    transform: scale(1.04);
  }
}

.image-glass-badge {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  background: rgba(29, 42, 35, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #F7EFCF;
  padding: 12px 20px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(190, 145, 52, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  font-weight: 600;
}

.text-box {
  padding: 40px;

  @media (max-width: 768px) { padding: 24px; }
}

.sub-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: #BE9134;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
  display: block;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 16px;
  color: var(--color-charcoal);
}

.text-box p {
  font-size: 0.98rem;
  color: var(--color-taupe);
  line-height: 1.68;
  margin-bottom: 16px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1.5px solid rgba(190, 145, 52, 0.2);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.glass-pill {
  background: rgba(246, 243, 236, 0.7);
  border: 1px solid rgba(190, 145, 52, 0.25);
  border-radius: var(--radius-md);
  padding: 12px 10px;
  text-align: center;
  transition: all 0.25s ease;

  &:hover {
    background: #FFFFFF;
    border-color: #BE9134;
    transform: translateY(-2px);
  }
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--color-primary-dark);
  display: block;
}

.stat-label {
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--color-taupe);
}

.spotlight-section {
  margin-bottom: 72px;
}

.section-header-wrap {
  margin-bottom: 36px;
}

.spotlight-title {
  font-size: 2.1rem;
  color: var(--color-charcoal);
}

.spotlight-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 992px) { grid-template-columns: 1fr; }
}

.spotlight-card {
  padding: 32px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-6px);
    border-color: #BE9134;
    box-shadow: 0 16px 40px rgba(190, 145, 52, 0.22);
  }

  .icon-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(190, 145, 52, 0.14);
    color: #BE9134;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .card-title { font-size: 1.25rem; color: var(--color-primary-dark); margin-bottom: 12px; }
  p { font-size: 0.92rem; color: var(--color-taupe); line-height: 1.6; }
}

.glass-dark-banner {
  background: linear-gradient(135deg, rgba(29, 42, 35, 0.95) 0%, rgba(20, 30, 25, 0.98) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 2.5px solid #BE9134;
  color: white;
  border-radius: var(--radius-xl);
  padding: 56px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-shadow: 0 16px 40px rgba(190, 145, 52, 0.3);

  h2 { font-size: 2.2rem; color: white; }
  p { font-size: 1.05rem; color: var(--color-beige); }
}

.shine-hover-btn {
  box-shadow: 0 8px 24px rgba(190, 145, 52, 0.4);
}
</style>
