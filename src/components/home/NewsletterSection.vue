<script setup lang="ts">
import { ref } from 'vue';
import { Send, CheckCircle } from 'lucide-vue-next';

const email = ref('');
const isSubscribed = ref(false);

function handleSubscribe() {
  if (email.value && email.value.includes('@')) {
    isSubscribed.value = true;
    email.value = '';
    setTimeout(() => {
      isSubscribed.value = false;
    }, 4000);
  }
}
</script>

<template>
  <section class="newsletter-section">
    <div class="container">
      <div class="newsletter-card">
        <div class="card-content text-center">
          <span class="sub-heading">Stay Connected</span>
          <h2 class="title">Join LIBAS Shop</h2>
          <p class="desc">
            Subscribe to get exclusive previews of new modest collections, special offer alerts, and style updates directly in your inbox.
          </p>

          <form v-if="!isSubscribed" class="subscribe-form" @submit.prevent="handleSubscribe">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email address..."
              required
              class="newsletter-input"
            />
            <button type="submit" class="btn btn--accent btn--md newsletter-btn">
              <span>Subscribe</span>
              <Send :size="16" />
            </button>
          </form>

          <div v-else class="success-message">
            <CheckCircle :size="20" />
            <span>Thank you for subscribing to LIBAS Shop newsletter!</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.newsletter-section {
  padding: 60px 0;
  background: var(--color-off-white);
}

.newsletter-card {
  max-width: 1060px;
  margin: 0 auto;
  background: linear-gradient(135deg, #1C352C 0%, #27493C 50%, #193027 100%);
  color: white;
  border-radius: var(--radius-xl);
  padding: 56px 36px;
  box-shadow: 0 12px 36px rgba(28, 53, 44, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(238, 109, 117, 0.18) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 36px 20px;
    border-radius: var(--radius-lg);
  }
}

.card-content {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.sub-heading {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
  display: block;
}

.title {
  font-size: 2.2rem;
  color: white;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
}

.desc {
  font-size: 0.95rem;
  color: #D2E4DC;
  line-height: 1.6;
  margin-bottom: 28px;
}

.subscribe-form {
  display: flex;
  align-items: center;
  gap: 4px;
  background: white;
  padding: 5px 5px 5px 14px;
  border-radius: var(--radius-full);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);

  @media (max-width: 480px) {
    flex-direction: column;
    border-radius: var(--radius-lg);
    padding: 8px;
    gap: 8px;
  }
}

.newsletter-input {
  flex: 1;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
  padding: 10px 12px;
  font-size: 0.92rem;
  color: var(--color-charcoal);

  &::placeholder {
    color: var(--color-taupe);
  }
}

.newsletter-btn {
  border-radius: var(--radius-full);
  padding: 10px 26px;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
}

.sub-heading {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
  display: block;
}

.title {
  font-size: 2.2rem;
  color: white;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
}

.desc {
  font-size: 0.95rem;
  color: #D2E4DC;
  line-height: 1.6;
  margin-bottom: 28px;
}

.subscribe-form {
  display: flex;
  align-items: center;
  gap: 4px;
  background: white;
  padding: 5px 5px 5px 14px;
  border-radius: var(--radius-full);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);

  @media (max-width: 480px) {
    flex-direction: column;
    border-radius: var(--radius-lg);
    padding: 8px;
    gap: 8px;
  }
}

.newsletter-input {
  flex: 1;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
  padding: 10px 12px;
  font-size: 0.92rem;
  color: var(--color-charcoal);

  &::placeholder {
    color: var(--color-taupe);
  }
}

.newsletter-btn {
  border-radius: var(--radius-full);
  padding: 10px 26px;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
}

.success-message {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.15);
  padding: 12px 24px;
  border-radius: var(--radius-full);
  font-size: 0.92rem;
  color: white;
}
</style>
