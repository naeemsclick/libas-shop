<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Phone, Mail, MessageCircle, MapPin, Send, CheckCircle, Clock, Sparkles } from 'lucide-vue-next';
import { useSeo } from '@/composables/useSeo';

useSeo({
  title: 'Contact Us | LIBAS Shop',
  description: 'Get in touch with LIBAS Shop customer support team.'
});

const isSubmitted = ref(false);
const isSubmitting = ref(false);

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
});

function handleSubmit() {
  if (!form.name || !form.phone || !form.message) return;

  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    isSubmitted.value = true;
    form.name = '';
    form.email = '';
    form.phone = '';
    form.message = '';
  }, 1000);
}
</script>

<template>
  <div class="contact-page section-spacing">
    <div class="container">
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span class="sep">/</span>
        <span class="current">Contact Us</span>
      </nav>

      <!-- Glass Header Box -->
      <div class="header-box text-center glass-header">
        <div class="header-badge">
          <Sparkles :size="14" />
          <span>24/7 DEDICATED SUPPORT</span>
        </div>
        <h1 class="page-title">Get in Touch with Us</h1>
        <p class="subtitle">Have questions about an order, product sizing, or delivery? We are here to help!</p>
      </div>

      <div class="contact-grid">
        <!-- Direct Contact Cards Left Column -->
        <div class="contact-cards-col">
          <!-- Card 1: Phone -->
          <div class="info-card glass-info-card">
            <div class="icon-circle phone-glow">
              <Phone :size="22" />
            </div>
            <div class="info-text">
              <h4 class="card-label">Phone Call</h4>
              <a href="tel:+8801717000414" class="card-val">+88 01717 000 414</a>
              <span class="card-sub">
                <Clock :size="12" class="inline-icon" />
                Sat - Thu (9:00 AM - 10:00 PM)
              </span>
            </div>
          </div>

          <!-- Card 2: WhatsApp -->
          <div class="info-card glass-info-card whatsapp-hover-card">
            <div class="icon-circle whatsapp-glow">
              <MessageCircle :size="22" />
            </div>
            <div class="info-text">
              <h4 class="card-label">WhatsApp Live Chat</h4>
              <a href="https://wa.me/8801717000414" target="_blank" rel="noopener" class="card-val">+88 01717 000 414</a>
              <span class="card-sub whatsapp-badge-text">Instant 1-on-1 assistance</span>
            </div>
          </div>

          <!-- Card 3: Email -->
          <div class="info-card glass-info-card">
            <div class="icon-circle email-glow">
              <Mail :size="22" />
            </div>
            <div class="info-text">
              <h4 class="card-label">Email Support</h4>
              <a href="mailto:hello@libas.shop" class="card-val">hello@libas.shop</a>
              <span class="card-sub">Send us your inquiry anytime</span>
            </div>
          </div>

          <!-- Card 4: Location Hub -->
          <div class="info-card glass-info-card">
            <div class="icon-circle location-glow">
              <MapPin :size="22" />
            </div>
            <div class="info-text">
              <h4 class="card-label">Main Logistics Hub</h4>
              <span class="card-val">Dhaka, Bangladesh</span>
              <span class="card-sub">Nationwide Fast Doorstep Express</span>
            </div>
          </div>
        </div>

        <!-- Contact Form Right Column -->
        <div class="form-card glass-form-card">
          <h2 class="form-title">Send Us a Direct Message</h2>

          <div v-if="isSubmitted" class="success-box glass-pill">
            <CheckCircle :size="42" class="success-icon" />
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out to LIBAS Shop. Our support representative will contact you shortly.</p>
            <button type="button" class="btn btn--outline btn--sm" @click="isSubmitted = false">
              Send Another Message
            </button>
          </div>

          <form v-else class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label>Your Name *</label>
              <input v-model="form.name" type="text" placeholder="Hasib R Rahman" required />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Phone Number *</label>
                <input v-model="form.phone" type="tel" placeholder="01717000414" required />
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input v-model="form.email" type="email" placeholder="hasib@domain.com" />
              </div>
            </div>

            <div class="form-group">
              <label>Message / Inquiry *</label>
              <textarea v-model="form.message" rows="5" placeholder="How can the LIBAS Shop team assist you today?" required></textarea>
            </div>

            <button type="submit" :disabled="isSubmitting" class="btn btn--primary btn--lg w-full send-cta-btn">
              <Send :size="18" />
              <span>{{ isSubmitting ? 'Sending Message...' : 'Send Message' }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-page {
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

.glass-header {
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid rgba(190, 145, 52, 0.25);
  box-shadow: 0 12px 32px rgba(29, 42, 35, 0.06);
  border-radius: var(--radius-xl);
  max-width: 760px;
  margin: 0 auto 48px;
  padding: 36px 24px;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 14px;
  background: rgba(190, 145, 52, 0.12);
  color: #8E661B;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  border-radius: var(--radius-full);
  margin-bottom: 12px;
  border: 1px solid rgba(190, 145, 52, 0.25);
}

.page-title { font-size: 2.3rem; margin-bottom: 8px; color: var(--color-charcoal); }
.subtitle { font-size: 1rem; color: var(--color-taupe); line-height: 1.6; }

.contact-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 32px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.contact-cards-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.glass-info-card {
  display: flex;
  align-items: center;
  gap: 18px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 22px;
  border-radius: var(--radius-lg);
  border: 1.5px solid rgba(190, 145, 52, 0.25);
  box-shadow: 0 8px 24px rgba(29, 42, 35, 0.05);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-4px);
    border-color: #BE9134;
    box-shadow: 0 14px 32px rgba(190, 145, 52, 0.2);
  }
}

.icon-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.25s ease;

  &.phone-glow {
    background: rgba(190, 145, 52, 0.15);
    color: #BE9134;
    box-shadow: 0 0 16px rgba(190, 145, 52, 0.25);
  }

  &.whatsapp-glow {
    background: rgba(37, 211, 102, 0.15);
    color: #25D366;
    box-shadow: 0 0 16px rgba(37, 211, 102, 0.25);
  }

  &.email-glow {
    background: rgba(45, 64, 53, 0.15);
    color: #2D4035;
    box-shadow: 0 0 16px rgba(45, 64, 53, 0.2);
  }

  &.location-glow {
    background: rgba(190, 145, 52, 0.15);
    color: #8E661B;
    box-shadow: 0 0 16px rgba(190, 145, 52, 0.25);
  }
}

.glass-info-card:hover .icon-circle {
  transform: scale(1.1);
}

.info-text {
  display: flex;
  flex-direction: column;
}

.card-label { font-size: 0.78rem; font-weight: 700; color: #BE9134; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 2px; }
.card-val { font-size: 1rem; font-weight: 700; color: var(--color-charcoal); margin-bottom: 4px; text-decoration: none; transition: color 0.2s; }
.card-val:hover { color: #BE9134; }
.card-sub { font-size: 0.78rem; color: var(--color-taupe); display: flex; align-items: center; gap: 4px; }
.inline-icon { opacity: 0.7; }
.whatsapp-badge-text { color: #25D366; font-weight: 600; }

.glass-form-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: var(--radius-xl);
  padding: 40px;
  border: 1.5px solid rgba(190, 145, 52, 0.25);
  box-shadow: 0 12px 36px rgba(29, 42, 35, 0.06);

  @media (max-width: 768px) { padding: 24px; }
}

.form-title { font-size: 1.5rem; color: var(--color-charcoal); margin-bottom: 24px; }

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label { font-size: 0.86rem; font-weight: 700; color: var(--color-charcoal); }
  input, textarea {
    padding: 14px 18px;
    border-radius: var(--radius-md);
    border: 1.5px solid rgba(226, 230, 227, 0.9);
    background: rgba(255, 255, 255, 0.95);
    outline: none;
    font-size: 0.94rem;
    transition: all 0.2s ease;

    &:focus {
      border-color: #BE9134;
      box-shadow: 0 0 12px rgba(190, 145, 52, 0.2);
      background: #FFFFFF;
    }
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
}

.w-full { width: 100%; }

.send-cta-btn {
  box-shadow: 0 8px 24px rgba(29, 42, 35, 0.25);
}

.success-box {
  text-align: center;
  padding: 40px 24px;
  background: rgba(246, 243, 236, 0.8);
  border-radius: var(--radius-lg);
  border: 1.5px solid rgba(190, 145, 52, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  .success-icon { color: #BE9134; }
  h3 { font-size: 1.5rem; color: var(--color-charcoal); }
  p { font-size: 0.95rem; color: var(--color-taupe); margin-bottom: 12px; }
}
</style>
