<script setup lang="ts">
import { Lock, ShieldCheck, CreditCard, EyeOff, Headphones, CheckCircle2 } from 'lucide-vue-next';
import { useSeo } from '@/composables/useSeo';
import { useLocaleStore } from '@/stores/locale';

const localeStore = useLocaleStore();

useSeo({
  title: 'Privacy Policy | LIBAS Shop',
  description: 'Learn about LIBAS Shop customer data protection, secure checkout, and privacy policy.'
});
</script>

<template>
  <div class="policy-page section-spacing">
    <div class="container">
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span class="sep">/</span>
        <span class="current">Privacy Policy</span>
      </nav>

      <!-- Hero Header -->
      <div class="policy-hero glass-card text-center">
        <div class="hero-badge">
          <Lock :size="16" class="icon-gold" />
          <span>DATA PROTECTION GUARANTEE</span>
        </div>
        <h1 class="hero-title">Privacy Policy</h1>
        <p class="hero-subtitle">
          LIBAS Shop is committed to upholding your trust ("YOUR CHOICE OUR PROMISE"). We respect your privacy and handle all customer personal information with maximum confidentiality and bank-grade data security.
        </p>
      </div>

      <!-- Content Grid -->
      <div class="policy-content-grid">
        <div class="policy-section glass-card">
          <h2 class="section-title">
            <ShieldCheck :size="22" class="section-icon" />
            1. Information We Collect
          </h2>
          <p>
            When you place an order or create an account on LIBAS Shop, we collect essential information strictly required to deliver your orders safely:
          </p>
          <ul class="check-list">
            <li><CheckCircle2 :size="16" /> <strong>Personal Details:</strong> Full Name, Mobile Number, and Delivery Address.</li>
            <li><CheckCircle2 :size="16" /> <strong>Order History:</strong> Product items ordered, delivery status, and order tracking IDs.</li>
            <li><CheckCircle2 :size="16" /> <strong>Communication Records:</strong> WhatsApp messages or customer care calls regarding your orders.</li>
          </ul>
        </div>

        <div class="policy-section glass-card">
          <h2 class="section-title">
            <CreditCard :size="22" class="section-icon" />
            2. Payment Security & Financial Data
          </h2>
          <p>
            Your financial transactions are 100% secure:
          </p>
          <div class="info-box">
            <p><strong>bKash / Nagad / Rocket Payments:</strong> All mobile payments are processed through official encrypted API gateways. <strong>LIBAS Shop never stores your bKash/Nagad PIN or OTP numbers.</strong></p>
            <p><strong>Cash on Delivery (COD):</strong> You pay cash safely directly to the courier agent upon physical receipt of your parcel.</p>
          </div>
        </div>

        <div class="policy-section glass-card">
          <h2 class="section-title">
            <EyeOff :size="22" class="section-icon" />
            3. Zero Data Sharing & Confidentiality
          </h2>
          <p>
            We strictly respect your privacy:
          </p>
          <ul class="bullet-list">
            <li>We <strong>NEVER</strong> sell, rent, or lease your personal information or mobile numbers to third-party telemarketers or advertisers.</li>
            <li>Your contact details are shared only with our trusted courier partner (e.g. Steadfast / Paperfly / Pathao) solely for doorstep parcel delivery.</li>
            <li>All customer data is encrypted and stored on secure cloud servers protected by firewall protocols.</li>
          </ul>
        </div>

        <div class="policy-section glass-card">
          <h2 class="section-title">
            <Lock :size="22" class="section-icon" />
            4. Your Rights & Data Removal
          </h2>
          <p>
            You have full control over your personal data on LIBAS Shop:
          </p>
          <p>
            You can request to view, update, or permanently delete your account and address records at any time by contacting our support team at <a href="mailto:hello@libas.shop" class="inline-link">hello@libas.shop</a> or via WhatsApp.
          </p>
        </div>

        <!-- Customer Support -->
        <div class="support-banner glass-dark">
          <Headphones :size="32" class="support-icon" />
          <div class="support-text">
            <h3>Questions About Our Privacy Policy?</h3>
            <p>Contact our dedicated privacy and support team anytime.</p>
          </div>
          <a href="tel:+8801717000414" class="btn btn--accent">
            Call +88 01717 000 414
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
