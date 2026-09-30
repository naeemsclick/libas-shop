import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { WishlistItem, Product } from '@/types';

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<WishlistItem[]>(JSON.parse(localStorage.getItem('libas_wishlist') || localStorage.getItem('rowha_wishlist') || '[]'));

  const count = computed(() => items.value.length);

  function saveToLocalStorage() {
    localStorage.setItem('libas_wishlist', JSON.stringify(items.value));
  }

  function isInWishlist(productId: string): boolean {
    return items.value.some((item) => item.product.id === productId);
  }

  function toggleWishlist(product: Product) {
    const index = items.value.findIndex((item) => item.product.id === product.id);
    if (index > -1) {
      items.value.splice(index, 1);
    } else {
      items.value.push({
        product,
        addedAt: new Date().toISOString()
      });
    }
    saveToLocalStorage();
  }

  function removeItem(productId: string) {
    items.value = items.value.filter((item) => item.product.id !== productId);
    saveToLocalStorage();
  }

  function clearWishlist() {
    items.value = [];
    saveToLocalStorage();
  }

  return {
    items,
    count,
    isInWishlist,
    toggleWishlist,
    removeItem,
    clearWishlist
  };
});
