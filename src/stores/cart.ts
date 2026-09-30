import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CartItem, Product } from '@/types';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(JSON.parse(localStorage.getItem('libas_cart') || localStorage.getItem('rowha_cart') || '[]'));
  const couponCode = ref<string>('');
  const discountPercent = ref<number>(0);
  const selectedArea = ref<'inside' | 'outside'>('inside');

  const insideDhakaShipping = 80;
  const outsideDhakaShipping = 130;

  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  const shippingFee = computed(() => {
    if (items.value.length === 0) return 0;
    return selectedArea.value === 'inside' ? insideDhakaShipping : outsideDhakaShipping;
  });

  const discountAmount = computed(() => {
    return Math.round((subtotal.value * discountPercent.value) / 100);
  });

  const total = computed(() => {
    return Math.max(0, subtotal.value - discountAmount.value + shippingFee.value);
  });

  function saveToLocalStorage() {
    localStorage.setItem('libas_cart', JSON.stringify(items.value));
  }

  function addItem(product: Product, quantity = 1, size?: string, color?: string) {
    const existing = items.value.find(
      (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      items.value.push({
        product,
        quantity,
        selectedSize: size,
        selectedColor: color
      });
    }
    saveToLocalStorage();
  }

  function updateQuantity(productId: string, quantity: number, size?: string, color?: string) {
    const item = items.value.find(
      (i) => i.product.id === productId && i.selectedSize === size && i.selectedColor === color
    );
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        removeItem(productId, size, color);
      } else {
        saveToLocalStorage();
      }
    }
  }

  function removeItem(productId: string, size?: string, color?: string) {
    items.value = items.value.filter(
      (i) => !(i.product.id === productId && i.selectedSize === size && i.selectedColor === color)
    );
    saveToLocalStorage();
  }

  function applyCoupon(code: string): { success: boolean; message: string } {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'LIBAS10' || cleanCode === 'ROWHA10') {
      couponCode.value = 'LIBAS10';
      discountPercent.value = 10;
      return { success: true, message: '10% discount coupon applied!' };
    } else if (cleanCode === 'LIBAS20' || cleanCode === 'BRIGHTER20') {
      couponCode.value = 'LIBAS20';
      discountPercent.value = 20;
      return { success: true, message: '20% special discount coupon applied!' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try LIBAS10 or LIBAS20' };
    }
  }

  function clearCart() {
    items.value = [];
    couponCode.value = '';
    discountPercent.value = 0;
    saveToLocalStorage();
  }

  return {
    items,
    itemCount,
    subtotal,
    shippingFee,
    selectedArea,
    discountAmount,
    couponCode,
    discountPercent,
    total,
    addItem,
    updateQuantity,
    removeItem,
    applyCoupon,
    clearCart
  };
});
