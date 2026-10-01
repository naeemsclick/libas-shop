import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: 'smooth' };
  },
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/pages/Home.vue')
        },
        {
          path: 'shop',
          name: 'Shop',
          component: () => import('@/pages/Shop.vue')
        },
        {
          path: 'category/:slug',
          name: 'Category',
          component: () => import('@/pages/Category.vue')
        },
        {
          path: 'product/:slug',
          name: 'ProductDetails',
          component: () => import('@/pages/ProductDetails.vue')
        },
        {
          path: 'search',
          name: 'Search',
          component: () => import('@/pages/Search.vue')
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('@/pages/Cart.vue')
        },
        {
          path: 'wishlist',
          name: 'Wishlist',
          component: () => import('@/pages/Wishlist.vue')
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: () => import('@/pages/Checkout.vue')
        },
        {
          path: 'track-order',
          name: 'OrderTracking',
          component: () => import('@/pages/OrderTracking.vue')
        },
        {
          path: 'account',
          name: 'Account',
          component: () => import('@/pages/Account.vue')
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('@/pages/About.vue')
        },
        {
          path: 'contact',
          name: 'Contact',
          component: () => import('@/pages/Contact.vue')
        },
        {
          path: 'blog',
          name: 'Blog',
          component: () => import('@/pages/BlogList.vue')
        },
        {
          path: 'blog/:slug',
          name: 'BlogDetail',
          component: () => import('@/pages/BlogDetail.vue')
        },
        {
          path: 'offers',
          name: 'Offers',
          component: () => import('@/pages/Shop.vue')
        },
        {
          path: 'return-policy',
          name: 'ReturnPolicy',
          component: () => import('@/pages/ReturnPolicy.vue')
        },
        {
          path: 'refund-policy',
          name: 'RefundPolicy',
          component: () => import('@/pages/ReturnPolicy.vue')
        },
        {
          path: 'privacy-policy',
          name: 'PrivacyPolicy',
          component: () => import('@/pages/PrivacyPolicy.vue')
        },
        {
          path: ':notFound(.*)*',
          name: 'NotFound',
          component: () => import('@/pages/NotFound.vue')
        }
      ]
    }
  ]
});

export default router;
