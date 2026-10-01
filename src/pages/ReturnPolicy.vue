<script setup lang="ts">
import { RefreshCw, ShieldCheck, Truck, Headphones, CheckCircle2, AlertCircle } from 'lucide-vue-next';
import { useSeo } from '@/composables/useSeo';
import { useLocaleStore } from '@/stores/locale';

const localeStore = useLocaleStore();

useSeo({
  title: 'Return & Refund Policy | LIBAS Shop',
  description: 'Learn about LIBAS Shop 7-day hassle-free exchange, return policy, and instant refund terms.'
});
</script>

<template>
  <div class="policy-page section-spacing">
    <div class="container">
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span class="sep">/</span>
        <span class="current">Return & Refund Policy</span>
      </nav>

      <!-- Hero Header -->
      <div class="policy-hero glass-card text-center">
        <div class="hero-badge">
          <RefreshCw :size="16" class="icon-gold" />
          <span>CUSTOMER GUARANTEE</span>
        </div>
        <h1 class="hero-title">Return & Refund Policy</h1>
        <p class="hero-subtitle">
          At LIBAS Shop, your satisfaction is our priority — "YOUR CHOICE OUR PROMISE". We offer a 7-day hassle-free exchange and return policy for all our modest clothing, jubba, abayas, attar, watches, and shoes.
        </p>
      </div>

      <!-- Content Grid -->
      <div class="policy-content-grid">
        <!-- Main Policy Cards -->
        <div class="policy-section glass-card">
          <h2 class="section-title">
            <ShieldCheck :size="22" class="section-icon" />
            1. 7-Day Hassle-Free Exchange & Return
          </h2>
          <p>
            If you are not completely satisfied with your purchase (size misfit, color preference, or manufacturing defect), you can request an exchange or return within <strong>7 days</strong> of receiving your parcel.
          </p>
          <ul class="check-list">
            <li><CheckCircle2 :size="16" /> Unworn, unwashed, and undamaged items with original tags intact.</li>
            <li><CheckCircle2 :size="16" /> Original packaging box and invoice slip included.</li>
            <li><CheckCircle2 :size="16" /> Instant exchange available across Dhaka & all 64 districts in Bangladesh.</li>
          </ul>
        </div>

        <div class="policy-section glass-card">
          <h2 class="section-title">
            <Truck :size="22" class="section-icon" />
            2. Return Shipping & Exchange Process
          </h2>
          <p>
            Returning or exchanging your product with LIBAS Shop is quick and easy:
          </p>
          <ol class="step-list">
            <li>
              <strong>Step 1: Contact Us</strong> - Call us at <a href="tel:+8801717000414" class="inline-link">+88 01717 000 414</a> or message our <a href="https://wa.me/8801717000414" target="_blank" class="inline-link">WhatsApp Support</a> within 7 days.
            </li>
            <li>
              <strong>Step 2: Package Item</strong> - Place the item back inside the LIBAS Shop branded box with all original tags.
            </li>
            <li>
              <strong>Step 3: Doorstep Pickup / Courier Send</strong> - Our delivery agent will collect the item or deliver your replacement directly to your doorstep.
            </li>
          </ol>
        </div>

        <div class="policy-section glass-card">
          <h2 class="section-title">
            <RefreshCw :size="22" class="section-icon" />
            3. Instant Refund Methods & Timelines
          </h2>
          <p>
            If a replacement size or item is unavailable, or if you prefer a full refund:
          </p>
          <div class="info-box">
            <p><strong>bKash / Nagad / Bank Transfer:</strong> Processed within <strong>24 to 48 hours</strong> after we receive and inspect the returned item.</p>
            <p><strong>Cash on Delivery (COD):</strong> Refunded directly to your bKash or Nagad mobile account.</p>
          </div>
        </div>

        <div class="policy-section glass-card">
          <h2 class="section-title">
            <AlertCircle :size="22" class="section-icon" />
            4. Non-Returnable Items
          </h2>
          <p>
            For hygiene and safety reasons, the following items cannot be returned unless received broken or defective:
          </p>
          <ul class="bullet-list">
            <li>Opened or unsealed Attar perfume oil bottles.</li>
            <li>Used Miswak, prayer caps, or unsealed Sunnah items.</li>
            <li>Items damaged due to customer mishandling or washing.</li>
          </ul>
        </div>

        <!-- Customer Care Box -->
        <div class="support-banner glass-dark">
          <Headphones :size="32" class="support-icon" />
          <div class="support-text">
            <h3>Need Help with Returns?</h3>
            <p>Our customer care team is available 24/7 to assist you with instant exchanges.</p>
          </div>
          <a href="https://wa.me/8801717000414" target="_blank" rel="noopener" class="btn btn--accent">
            WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.policy-page {
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

.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid rgba(190, 145, 52, 0.25);
  box-shadow: 0 10px 30px rgba(29, 42, 35, 0.06);
  border-radius: var(--radius-xl);
  padding: 36px;
  margin-bottom: 24px;
}

.policy-hero {
  max-width: 800px;
  margin: 0 auto 40px;
  padding: 40px 32px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(190, 145, 52, 0.12);
  color: #8E661B;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  border-radius: var(--radius-full);
  margin-bottom: 14px;
}

.hero-title {
  font-size: 2.4rem;
  color: var(--color-charcoal);
  margin-bottom: 14px;
}

.hero-subtitle {
  font-size: 1.05rem;
  color: var(--color-taupe);
  line-height: 1.65;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.35rem;
  color: var(--color-primary-dark);
  margin-bottom: 16px;

  .section-icon {
    color: #BE9134;
  }
}

.policy-section p {
  font-size: 0.96rem;
  color: var(--color-taupe);
  line-height: 1.68;
  margin-bottom: 16px;
}

.check-list, .bullet-list {
  list-style: none;
  padding: 0;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.94rem;
    color: var(--color-charcoal);

    svg {
      color: #BE9134;
      flex-shrink: 0;
    }
  }
}

.bullet-list li {
  position: relative;
  padding-left: 18px;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #BE9134;
    font-weight: bold;
  }
}

.step-list {
  padding-left: 20px;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    font-size: 0.94rem;
    color: var(--color-charcoal);
    line-height: 1.6;
  }
}

.inline-link {
  color: #BE9134;
  font-weight: 600;
  text-decoration: underline;
}

.info-box {
  background: rgba(190, 145, 52, 0.08);
  border-left: 4px solid #BE9134;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  margin-top: 16px;

  p {
    margin-bottom: 8px;
    &:last-child { margin-bottom: 0; }
  }
}

.support-banner {
  background: linear-gradient(135deg, #1D2A23 0%, #141E19 100%);
  border: 2px solid #BE9134;
  color: white;
  border-radius: var(--radius-xl);
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }

  .support-icon {
    color: #BE9134;
  }

  .support-text {
    flex: 1;
    h3 { font-size: 1.25rem; color: white; margin-bottom: 4px; }
    p { font-size: 0.9rem; color: #B2D0C3; margin: 0; }
  }
}
</style>
