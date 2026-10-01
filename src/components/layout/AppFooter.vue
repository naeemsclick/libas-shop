<script setup lang="ts">
import { Phone, Mail, MessageCircle, MapPin, Facebook, Instagram, Video } from 'lucide-vue-next';
import { useLocaleStore } from '@/stores/locale';

const localeStore = useLocaleStore();
</script>

<template>
  <footer class="app-footer">
    <div class="container footer-main">
      <div class="footer-grid">
        <!-- Col 1: Brand Info -->
        <div class="footer-col brand-col">
          <router-link to="/" class="footer-logo-link" title="LIBAS Shop Home">
            <img src="/images/logo.png" alt="LIBAS Shop Logo" class="footer-logo" />
          </router-link>
          <p class="brand-slogan">{{ localeStore.t('footer.slogan') }}</p>
          <p class="brand-desc">
            {{ localeStore.t('footer.desc') }}
          </p>
          <div class="social-icons">
            <a href="https://www.facebook.com/libasshopbd" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Facebook">
              <Facebook :size="18" />
            </a>
            <a href="https://www.instagram.com/libasshopbd" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Instagram">
              <Instagram :size="18" />
            </a>
            <a href="https://wa.me/8801717000414" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="WhatsApp">
              <MessageCircle :size="18" />
            </a>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div class="footer-col">
          <h4 class="col-title">{{ localeStore.t('footer.quickLinks') }}</h4>
          <ul class="footer-links">
            <li><router-link to="/">{{ localeStore.t('nav.home') }}</router-link></li>
            <li><router-link to="/shop">{{ localeStore.t('nav.shop') }}</router-link></li>
            <li><router-link to="/shop?sortBy=newest">{{ localeStore.t('nav.newArrivals') }}</router-link></li>
            <li><router-link to="/offers">{{ localeStore.t('nav.offers') }}</router-link></li>
            <li><router-link to="/blog">{{ localeStore.t('nav.blog') }}</router-link></li>
            <li><router-link to="/about">{{ localeStore.t('nav.about') }}</router-link></li>
            <li><router-link to="/contact">{{ localeStore.t('nav.contact') }}</router-link></li>
          </ul>
        </div>

        <!-- Col 3: Categories -->
        <div class="footer-col">
          <h4 class="col-title">{{ localeStore.t('footer.categories') }}</h4>
          <ul class="footer-links">
            <li><router-link to="/category/clothing">{{ localeStore.t('nav.clothing') }}</router-link></li>
            <li><router-link to="/category/womens-collection">{{ localeStore.t('nav.womensCollection') }}</router-link></li>
            <li><router-link to="/category/perfume">{{ localeStore.t('nav.perfume') }}</router-link></li>
            <li><router-link to="/category/watch">{{ localeStore.t('nav.watch') }}</router-link></li>
            <li><router-link to="/category/shoes">{{ localeStore.t('nav.shoes') }}</router-link></li>
            <li><router-link to="/category/sunnah">{{ localeStore.t('nav.sunnah') }}</router-link></li>
          </ul>
        </div>

        <!-- Col 4: Customer Care -->
        <div class="footer-col">
          <h4 class="col-title">{{ localeStore.t('footer.customerCare') }}</h4>
          <ul class="footer-links">
            <li><router-link to="/track-order">{{ localeStore.t('announcement.trackOrder') }}</router-link></li>
            <li><router-link to="/cart">{{ localeStore.t('header.cart') }}</router-link></li>
            <li><router-link to="/wishlist">{{ localeStore.t('header.wishlist') }}</router-link></li>
            <li><router-link to="/account">{{ localeStore.t('header.account') }}</router-link></li>
            <li><router-link to="/contact">{{ localeStore.t('nav.contact') }}</router-link></li>
          </ul>
        </div>

        <!-- Col 5: Contact Info -->
        <div class="footer-col contact-col">
          <h4 class="col-title">{{ localeStore.t('footer.contact') }}</h4>
          <ul class="contact-list">
            <li>
              <Phone :size="16" class="contact-icon" />
              <a href="tel:+8801717000414">+88 01717 000 414</a>
            </li>
            <li>
              <MessageCircle :size="16" class="contact-icon" />
              <a href="https://wa.me/8801717000414" target="_blank" rel="noopener">WhatsApp Support</a>
            </li>
            <li>
              <Mail :size="16" class="contact-icon" />
              <a href="mailto:hello@libas.shop">hello@libas.shop</a>
            </li>
            <li>
              <MapPin :size="16" class="contact-icon" />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom copyright bar -->
    <div class="footer-bottom">
      <div class="container bottom-container">
        <p class="copyright">
          <template v-if="localeStore.isBangla">
            © ২০২৬ <span class="brand-name-gold">লিবাস শপ</span> | সর্বস্বত্ব সংরক্ষিত।
          </template>
          <template v-else>
            © 2026 <span class="brand-name-gold">LIBAS Shop</span> | All Rights Reserved.
          </template>
        </p>

        <!-- Center Policy Links -->
        <div class="footer-policy-links">
          <router-link to="/return-policy" class="footer-policy-link">
            {{ localeStore.t('footer.returnPolicy') }}
          </router-link>
          <span class="policy-divider">|</span>
          <router-link to="/privacy-policy" class="footer-policy-link">
            {{ localeStore.t('footer.privacyPolicy') }}
          </router-link>
        </div>

        <p class="creator">
          Design & Developed by |
          <a
            href="https://www.facebook.com/naeemdaprince/"
            target="_blank"
            rel="noopener noreferrer"
            class="creator-link"
          >
            Naeem Nahiyan
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.app-footer {
  background: linear-gradient(135deg, #1D2A23 0%, #141E19 60%, #0E1511 100%);
  color: #ECEFEA;
  padding-top: 64px;
  border-top: 4px solid var(--color-accent);
}

.footer-main {
  padding-bottom: 48px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 28px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 24px 18px;
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr 1fr;
    gap: 20px 14px;
  }
}

.brand-col {
  @media (max-width: 768px) {
    grid-column: 1 / -1;
    margin-bottom: 8px;
  }
}

.footer-logo-link {
  display: inline-block;
  margin-bottom: 18px;
}

.footer-logo {
  height: 58px;
  max-width: 260px;
  width: auto;
  object-fit: contain;
  background: #FFFFFF;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
  display: block;
}

.brand-slogan {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-beige);
  margin-bottom: 10px;
}

.brand-desc {
  font-size: 0.85rem;
  color: #B2D0C3;
  line-height: 1.6;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    display: none;
  }
}

.social-icons {
  display: flex;
  gap: 10px;
}

.social-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);

  &:hover {
    background: var(--color-accent);
    color: var(--color-white);
    transform: translateY(-2px);
  }
}

.col-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: 10px;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 24px;
    height: 2px;
    background: var(--color-accent);
    margin-top: 4px;
    border-radius: 2px;
  }
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;

  li a {
    font-size: 0.86rem;
    color: #B2D0C3;
    transition: var(--transition-fast);

    &:hover {
      color: #FFFFFF;
      padding-left: 4px;
    }
  }
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.86rem;
    color: #B2D0C3;

    a {
      color: #B2D0C3;
      &:hover {
        color: #FFFFFF;
      }
    }
  }

  .contact-icon {
    color: var(--color-accent);
  }
}

.footer-bottom {
  background: #14241E;
  padding: 20px 0;
  font-size: 0.85rem;
  color: #93B5A5;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  .brand-name-gold {
    color: var(--color-accent);
    font-weight: 700;
  }
}

.bottom-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}

.footer-policy-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-policy-link {
  color: #B2D0C3;
  font-size: 0.85rem;
  transition: var(--transition-fast);

  &:hover {
    color: var(--color-accent);
    text-decoration: underline;
  }
}

.policy-divider {
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.8rem;
}

.creator-link {
  color: var(--color-accent);
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
}
</style>
