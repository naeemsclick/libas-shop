<script setup lang="ts">
import { X, Heart, User, MapPin, Phone, Mail, Globe, Shirt, Sparkles, Watch, Footprints, Grid } from 'lucide-vue-next';
import CategoryIcons from '@/components/common/CategoryIcons.vue';
import { useUiStore } from '@/stores/ui';
import { useWishlistStore } from '@/stores/wishlist';
import { useLocaleStore } from '@/stores/locale';

const uiStore = useUiStore();
const wishlistStore = useWishlistStore();
const localeStore = useLocaleStore();

function close() {
  uiStore.closeMobileMenu();
}
</script>

<template>
  <Transition name="drawer">
    <div v-if="uiStore.isMobileMenuOpen" class="mobile-drawer-backdrop" @click.self="close">
      <div class="mobile-drawer">
        <!-- Header -->
        <div class="drawer-header">
          <router-link to="/" class="drawer-logo-link" title="LIBAS Shop Home" @click="close">
            <img src="/images/logo.png" alt="LIBAS Shop Logo" class="drawer-logo" />
          </router-link>
          <button type="button" class="close-btn" aria-label="Close menu" @click="close">
            <X :size="22" />
          </button>
        </div>

        <!-- Slogan -->
        <div class="drawer-slogan">
          <p>{{ localeStore.t('announcement.slogan') }}</p>
        </div>

        <!-- Scrollable Content -->
        <div class="drawer-content">
          <!-- Language Switcher Option in Mobile -->
          <div class="mobile-lang-switcher">
            <span class="lang-label">
              <Globe :size="16" />
              <span>Language / ভাষা:</span>
            </span>
            <div class="lang-toggle-btns">
              <button
                type="button"
                :class="['lang-pill', { active: localeStore.currentLocale === 'bn' }]"
                @click="localeStore.setLocale('bn')"
              >
                🇧🇩 বাংলা
              </button>
              <button
                type="button"
                :class="['lang-pill', { active: localeStore.currentLocale === 'en' }]"
                @click="localeStore.setLocale('en')"
              >
                🇺🇸 EN
              </button>
            </div>
          </div>

          <!-- Main Nav Links -->
          <div class="nav-group">
            <h4 class="group-title">Header Navigation Menu</h4>
            <ul class="nav-links">
              <li><router-link to="/" @click="close">{{ localeStore.t('nav.home') }}</router-link></li>
              <li><router-link to="/shop" @click="close">{{ localeStore.t('nav.shop') }}</router-link></li>
              
              <!-- ALL CATEGORY Accordion Group -->
              <li class="mobile-cat-group">
                <div class="mobile-cat-header">
                  <Grid :size="16" class="cat-header-icon" />
                  <span>{{ localeStore.t('nav.allCategories') }}</span>
                </div>
                <ul class="mobile-sub-links">
                  <li>
                    <router-link to="/category/clothing" @click="close">
                      <Shirt :size="15" class="sub-link-icon" />
                      <span>{{ localeStore.t('nav.clothing') }}</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/category/womens-collection" @click="close">
                      <CategoryIcons name="womens-collection" :size="15" class="sub-link-icon" />
                      <span>{{ localeStore.t('nav.womensCollection') }}</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/category/perfume" @click="close">
                      <Sparkles :size="15" class="sub-link-icon" />
                      <span>{{ localeStore.t('nav.perfume') }}</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/category/watch" @click="close">
                      <Watch :size="15" class="sub-link-icon" />
                      <span>{{ localeStore.t('nav.watch') }}</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/category/shoes" @click="close">
                      <Footprints :size="15" class="sub-link-icon" />
                      <span>{{ localeStore.t('nav.shoes') }}</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/category/sunnah" @click="close">
                      <CategoryIcons name="sunnah" :size="15" class="sub-link-icon" />
                      <span>{{ localeStore.t('nav.sunnah') }}</span>
                    </router-link>
                  </li>
                </ul>
              </li>

              <li><router-link to="/shop?sortBy=newest" @click="close">{{ localeStore.t('nav.newArrivals') }}</router-link></li>
              <li><router-link to="/offers" @click="close">{{ localeStore.t('nav.offers') }}</router-link></li>
              <li><router-link to="/blog" @click="close">{{ localeStore.t('nav.blog') }}</router-link></li>
              <li><router-link to="/about" @click="close">{{ localeStore.t('nav.about') }}</router-link></li>
              <li><router-link to="/contact" @click="close">{{ localeStore.t('nav.contact') }}</router-link></li>
            </ul>
          </div>

          <!-- Quick User Links -->
          <div class="user-quick-links">
            <router-link to="/wishlist" class="quick-link-btn" @click="close">
              <Heart :size="18" />
              <span>{{ localeStore.t('header.wishlist') }}</span>
              <span v-if="wishlistStore.count" class="badge-count">{{ wishlistStore.count }}</span>
            </router-link>
            <router-link to="/account" class="quick-link-btn" @click="close">
              <User :size="18" />
              <span>{{ localeStore.t('header.account') }}</span>
            </router-link>
          </div>

          <!-- Direct Contact -->
          <div class="drawer-contact-info">
            <h4 class="group-title">{{ localeStore.t('footer.contact') }}</h4>
            <a href="tel:+8801717000414" class="info-row">
              <Phone :size="16" />
              <span>+88 01717 000 414</span>
            </a>
            <a href="mailto:hello@libas.shop" class="info-row">
              <Mail :size="16" />
              <span>hello@libas.shop</span>
            </a>
            <div class="info-row">
              <MapPin :size="16" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.mobile-drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 17, 23, 0.65);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 1050;
  display: flex;
}

.mobile-drawer {
  width: 320px;
  max-width: 85vw;
  height: 100vh;
  background: var(--color-white);
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 1060;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.drawer-logo-link {
  display: flex;
  align-items: center;
}

.drawer-logo {
  height: 40px;
  max-width: 180px;
  object-fit: contain;
}

.close-btn {
  background: var(--color-off-white);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-charcoal);

  &:hover {
    background: var(--color-beige);
  }
}

.drawer-slogan {
  background: var(--color-primary-subtle);
  padding: 10px 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  text-align: center;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.drawer-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.mobile-lang-switcher {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--color-off-white);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.lang-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-charcoal);

  svg {
    color: var(--color-primary);
  }
}

.lang-toggle-btns {
  display: flex;
  gap: 6px;
}

.lang-pill {
  padding: 5px 12px;
  font-size: 0.78rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-charcoal);
  cursor: pointer;
  transition: var(--transition-fast);

  &.active {
    background: var(--color-primary);
    color: var(--color-white);
    border-color: var(--color-primary);
  }
}

.group-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-taupe);
  text-transform: uppercase;
  margin-bottom: 10px;
  letter-spacing: 0.04em;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  li a {
    display: block;
    padding: 11px 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-charcoal);
    border-bottom: 1px solid var(--color-border);
    transition: var(--transition-fast);

    &:hover {
      color: var(--color-primary);
      padding-left: 6px;
    }
  }
}

.user-quick-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.quick-link-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: var(--color-off-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-charcoal);
  position: relative;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
}

.badge-count {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--color-accent);
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-contact-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--color-taupe);
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;

  .mobile-drawer {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;

  .mobile-drawer {
    transform: translateX(-100%);
  }
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid var(--color-border);
}

.drawer-logo-link {
  display: flex;
  align-items: center;
}

.drawer-logo {
  height: 44px;
  max-width: 190px;
  object-fit: contain;
}

.close-btn {
  background: var(--color-off-white);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.drawer-slogan {
  background: var(--color-beige);
  padding: 10px 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-charcoal);
  text-align: center;
}

.drawer-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.mobile-lang-switcher {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: var(--color-off-white);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.lang-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-charcoal);

  svg {
    color: var(--color-primary);
  }
}

.lang-toggle-btns {
  display: flex;
  gap: 6px;
}

.lang-pill {
  padding: 4px 10px;
  font-size: 0.78rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-charcoal);
  cursor: pointer;
  transition: var(--transition-fast);

  &.active {
    background: var(--color-primary);
    color: var(--color-white);
    border-color: var(--color-primary);
  }
}

.group-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-taupe);
  text-transform: uppercase;
  margin-bottom: 12px;
  letter-spacing: 0.04em;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  li a {
    display: block;
    padding: 10px 0;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--color-charcoal);
    border-bottom: 1px solid var(--color-off-white);

    &:hover {
      color: var(--color-primary);
      padding-left: 4px;
    }
  }
}

.user-quick-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.quick-link-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background: var(--color-off-white);
  border-radius: var(--radius-md);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-charcoal);
  position: relative;
}

.badge-count {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--color-accent);
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-contact-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--color-taupe);
}

.mobile-cat-group {
  padding: 6px 0;
  border-bottom: 1px solid var(--color-border);
}

.mobile-cat-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--color-charcoal);
  padding: 6px 0;

  .cat-header-icon {
    color: var(--color-accent);
  }
}

.mobile-sub-links {
  list-style: none;
  padding: 4px 0 4px 14px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;

  li a {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-taupe);
    padding: 6px 0;
    border-bottom: none;

    .sub-link-icon {
      color: var(--color-primary);
      transition: color 0.2s ease;
    }

    &:hover {
      color: var(--color-accent);
      padding-left: 4px;

      .sub-link-icon {
        color: var(--color-accent);
      }
    }
  }
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;

  .mobile-drawer {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;

  .mobile-drawer {
    transform: translateX(-100%);
  }
}
</style>
