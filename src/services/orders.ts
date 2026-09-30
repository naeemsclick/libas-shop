import type { Order } from '@/types';
import { apiFetch } from './api';

export async function createOrder(orderPayload: Partial<Order>): Promise<Order> {
  try {
    return await apiFetch<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderPayload)
    });
  } catch {
    // Return mock order response for frontend demonstration
    const mockOrder: Order = {
      id: 'LIB-' + Math.floor(100000 + Math.random() * 900000),
      customerName: orderPayload.customerName || 'Valued Customer',
      phone: orderPayload.phone || '+8801717000414',
      email: orderPayload.email,
      address: orderPayload.address || 'Dhaka',
      city: orderPayload.city || 'Dhaka',
      area: orderPayload.area || 'Dhaka',
      items: orderPayload.items || [],
      shippingFee: orderPayload.shippingFee || 80,
      subtotal: orderPayload.subtotal || 0,
      discount: orderPayload.discount || 0,
      totalAmount: orderPayload.totalAmount || 0,
      paymentMethod: orderPayload.paymentMethod || 'Cash on Delivery',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to local storage for tracking lookup
    const existingOrders = JSON.parse(localStorage.getItem('libas_orders') || localStorage.getItem('rowha_orders') || '[]');
    existingOrders.push(mockOrder);
    localStorage.setItem('libas_orders', JSON.stringify(existingOrders));

    return mockOrder;
  }
}

export async function getOrderById(query: string): Promise<Order | null> {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return null;

  try {
    return await apiFetch<Order>(`/orders/${cleanQuery}`);
  } catch {
    const existingOrders: Order[] = JSON.parse(localStorage.getItem('libas_orders') || localStorage.getItem('rowha_orders') || '[]');
    const found = existingOrders.find(
      (o) => o.id.toLowerCase() === cleanQuery || o.phone.replace(/[^0-9]/g, '').includes(cleanQuery.replace(/[^0-9]/g, ''))
    );
    if (found) return found;

    // Default fallback demo order if requested order ID or phone matches format
    if (cleanQuery.startsWith('lib-') || cleanQuery.startsWith('rm-') || cleanQuery.length >= 11 || cleanQuery.includes('017')) {
      return {
        id: cleanQuery.toUpperCase().startsWith('LIB-') ? cleanQuery.toUpperCase() : 'LIB-849201',
        customerName: 'Naeem Nahiyan',
        phone: cleanQuery.length >= 10 ? cleanQuery : '01717000414',
        address: 'Dhaka, Bangladesh',
        city: 'Dhaka',
        area: 'Inside Dhaka',
        items: [],
        shippingFee: 80,
        subtotal: 2450,
        discount: 0,
        totalAmount: 2530,
        paymentMethod: 'Cash on Delivery',
        status: 'shipped',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    return null;
  }
}
