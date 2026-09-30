<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Phone, Mail, MessageCircle, MapPin, Send, CheckCircle } from 'lucide-vue-next';
import { useSeo } from '@/composables/useSeo';

useSeo({
  title: 'Contact LIBAS Shop',
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

      <div class="header-box text-center">
        <h1 class="page-title">Get in Touch</h1>
        <p class="subtitle">Have questions about an order or product? We are here to help!</p>
      </div>

      <div class="contact-grid">
        <!-- Direct Contact Cards Left -->
        <div class="contact-cards-col">
          <div class="info-card">
            <div class="icon-circle">
              <Phone :size="20" />
            </div>
            <div class="info-text">
              <h4 class="card-label">Phone Call</h4>
              <a href="tel:+8801717000414" class="card-val">+88 01717 000 414</a>
              <span class="card-sub">Available Saturday to Thursday</span>
            </div>
          </div>

          <div class="info-card">
            <div class="icon-circle whatsapp-icon">
              <MessageCircle :size="20" />
            </div>
            <div class="info-text">
              <h4 class="card-label">WhatsApp Live Chat</h4>
              <a href="https://wa.me/8801717000414" target="_blank" rel="noopener" class="card-val">+88 01717 000 414</a>
              <span class="card-sub">Instant response on WhatsApp</span>
            </div>
          </div>

          <div class="info-card">
            <div class="icon-circle">
              <Mail :size="20" />
            </div>
            <div class="info-text">
              <h4 class="card-label">Email Support</h4>
              <a href="mailto:hello@libas.shop" class="card-val">hello@libas.shop</a>
              <span class="card-sub">Send us your queries anytime</span>
            </div>
          </div>

          <div class="info-card">
            <div class="icon-circle">
              <MapPin :size="20" />
            </div>
            <div class="info-text">
              <h4 class="card-label">Main Hub</h4>
              <span class="card-val">Dhaka, Bangladesh</span>
              <span class="card-sub">Doorstep Delivery Nationwide</span>
            </div>
          </div>
        </div>

        <!-- Contact Form Right -->
        <div class="form-card">
          <h2 class="form-title">Send Us a Message</h2>

          <div v-if="isSubmitted" class="success-box">
            <CheckCircle :size="36" />
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out to LIBAS Shop. Our customer support team will reply to you shortly.</p>
            <button type="button" class="btn btn--outline btn--sm" @click="isSubmitted = false">
              Send Another Message
            </button>
          </div>

          <form v-else class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label>Your Name *</label>
              <input v-model="form.name" type="text" placeholder="e.g. Tanvir Hossain" required />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Phone Number *</label>
                <input v-model="form.phone" type="tel" placeholder="01700000000" required />
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input v-model="form.email" type="email" placeholder="name@domain.com" />
              </div>
            </div>

            <div class="form-group">
              <label>Message / Inquiry *</label>
              <textarea v-model="form.message" rows="5" placeholder="How can LIBAS Shop team assist you?" required></textarea>
            </div>

            <button type="submit" :disabled="isSubmitting" class="btn btn--primary btn--lg w-full">
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

.header-box {
  max-width: 600px;
  margin: 0 auto 48px;
}

.page-title { font-size: 2.2rem; margin-bottom: 8px; }
.subtitle { font-size: 1rem; color: var(--color-taupe); }

.contact-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 40px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.contact-cards-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: white;
  padding: 20px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.icon-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-primary-subtle);
  color: var(--color-primary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &.whatsapp-icon {
    background: #E6F9ED;
    color: #25D366;
  }
}

.info-text {
  display: flex;
  flex-direction: column;
}

.card-label { font-size: 0.8rem; font-weight: 700; color: var(--color-taupe); text-transform: uppercase; }
.card-val { font-size: 0.95rem; font-weight: 600; color: var(--color-charcoal); margin-bottom: 2px; }
.card-sub { font-size: 0.78rem; color: var(--color-taupe); }

.form-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 36px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) { padding: 24px; }
}

.form-title { font-size: 1.4rem; margin-bottom: 24px; }

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label { font-size: 0.85rem; font-weight: 600; }
  input, textarea {
    padding: 12px 16px;
    border-radius: var(--radius-md);
    border: 1.5px solid var(--color-border);
    outline: none;
    font-size: 0.92rem;
    &:focus { border-color: var(--color-primary); }
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
}

.w-full { width: 100%; }

.success-box {
  text-align: center;
  padding: 40px 20px;
  color: var(--color-primary-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  h3 { font-size: 1.4rem; color: var(--color-charcoal); }
  p { font-size: 0.95rem; color: var(--color-taupe); margin-bottom: 12px; }
}
</style>
