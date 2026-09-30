import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export type SupportedLocale = 'bn' | 'en';

const translations: Record<string, { bn: string; en: string }> = {
  // Announcement Bar
  'announcement.slogan': {
    bn: '“আপনার পছন্দ, আমাদের অঙ্গীকার।”',
    en: '“YOUR CHOICE OUR PROMISE”'
  },
  'announcement.freeDelivery': {
    bn: '🚚 সারা বাংলাদেশে ফ্রি হোম ডেলিভারি ৳২,০০০+ টাকার কেনাকাটায়!',
    en: '🚚 Free Home Delivery all over Bangladesh on orders above ৳2,000!'
  },
  'announcement.bKashOffer': {
    bn: '🔥 বিকাশ ও নগদ পেমেন্টে ১০% ইন্সট্যান্ট ছাড়!',
    en: '10% Instant Discount on bKash & Nagad Payments!'
  },
  'announcement.specialOffer': {
    bn: '⚡ নতুন কালেকশনে ২০% পর্যন্ত স্পেশাল অফার!',
    en: '⚡ Up to 20% Special Discount on New Collections!'
  },
  'announcement.customerCare': {
    bn: 'কাস্টমার কেয়ার',
    en: 'Customer Care'
  },
  'announcement.trackOrder': {
    bn: 'অর্ডার ট্র্যাকিং',
    en: 'Track My Order'
  },

  // Navigation
  'nav.home': { bn: 'হোম', en: 'HOME' },
  'nav.shop': { bn: 'সকল প্রোডাক্ট', en: 'ALL PRODUCTS' },
  'nav.allCategories': { bn: 'সকল ক্যাটাগরি', en: 'ALL CATEGORY' },
  'nav.clothing': { bn: 'পোশাক', en: 'CLOTHING' },
  'nav.womensCollection': { bn: 'উইমেনস কালেকশন', en: "WOMEN'S COLLECTION" },
  'nav.perfume': { bn: 'পারফিউম ও আতর', en: 'PERFUME' },
  'nav.watch': { bn: 'ঘড়ি', en: 'WATCH' },
  'nav.shoes': { bn: 'জুতা', en: 'SHOES' },
  'nav.sunnah': { bn: 'সুন্নাহ এসেনশিয়াল', en: 'SUNNAH' },
  'nav.newArrivals': { bn: 'নতুন কালেকশন', en: 'NEW ARRIVAL' },
  'nav.offers': { bn: 'স্পেশাল অফার', en: 'SPECIAL OFFERS' },
  'nav.about': { bn: 'আমাদের সম্পর্কে', en: 'ABOUT US' },
  'nav.contact': { bn: 'যোগাযোগ', en: 'CONTACT' },
  'nav.blog': { bn: 'ব্লগ ও খবর', en: 'BLOG' },

  // Header & Search
  'header.searchPlaceholder': {
    bn: 'জুব্বা, আবায়া, আতর, পারফিউম, জুতা, ঘড়ি খুঁজুন...',
    en: 'Search Jubba, Abaya, Perfumes, Watches, Shoes...'
  },
  'header.account': { bn: 'অ্যাকাউন্ট', en: 'Account' },
  'header.wishlist': { bn: 'উইশলিস্ট', en: 'Wishlist' },
  'header.cart': { bn: 'কার্ট', en: 'Cart' },

  // Hero Section
  'hero.slide1Tag': { bn: 'প্রিমিয়াম জুব্বা কালেকশন', en: 'PREMIUM JUBBA COLLECTION' },
  'hero.slide1Title': { bn: 'আভিজাত্য ও সুন্নাহর মেলবন্ধন', en: 'TRADITION IN A MODERN STYLE' },
  'hero.slide1Subtitle': { bn: 'লিবাস শপের এক্সক্লুসিভ প্রিমিয়াম সুতি জুব্বা ও আতর কালেকশনে বিশেষ ছাড়।', en: 'Experience comfort, elegance and modesty with our premium Jubba collection.' },
  'hero.slide2Tag': { bn: 'আবায়া ও উইমেনস কালেকশন', en: "ABAYA & WOMEN'S COLLECTION" },
  'hero.slide2Title': { bn: 'মার্জিত পোশাকের আধুনিক প্রকাশ', en: 'ELEGANCE REDEFINED FOR WOMEN' },
  'hero.slide2Subtitle': { bn: 'প্রিমিয়াম দুবাই চেরি ফ্যাব্রিক আবায়া ও আধুনিক মার্জিত থ্রি-পিস কালেকশন।', en: 'Modesty in every detail with our luxury Abaya & modesty line.' },
  'hero.slide3Tag': { bn: 'সুন্নাহ এসেনশিয়ালস', en: 'SUNNAH ESSENTIALS' },
  'hero.slide3Title': { bn: 'আতর, টুপি ও ইসলামিক লাইফস্টাইল', en: 'A LIFESTYLE CLOSER TO DEEN' },
  'hero.slide3Subtitle': { bn: 'অরিজিনাল অ্যালকোহল-ফ্রি আতর, হস্তশিল্পের টুপি ও সুন্নাহ অনুসরণে দৈনন্দিন অনুষঙ্গ।', en: 'Pure attar scents, handmade caps & lifestyle essentials for a better tomorrow.' },
  'hero.shopNow': { bn: 'এখনই কিনুন', en: 'Shop Now' },
  'hero.exploreCollection': { bn: 'কালেকশন দেখুন', en: 'Explore Collection' },

  // Home Sections & Buttons
  'section.shopByCategory': { bn: 'ক্যাটাগরি অনুযায়ী কেনাকাটা করুন', en: 'Shop by Category' },
  'section.featuredProducts': { bn: 'সেরা পছন্দের পণ্যসমূহ', en: 'Featured Products' },
  'section.bestSellers': { bn: 'জনপ্রিয় বেস্ট সেলার', en: 'Best Sellers' },
  'section.newArrivals': { bn: 'নতুন কালেকশন', en: 'New Arrival' },
  'section.flashSale': { bn: 'ধামাকা ফ্ল্যাশ সেল অফার', en: 'Special Offers' },
  'section.viewAll': { bn: 'সব দেখুন', en: 'View All' },
  'section.addToCart': { bn: 'কার্টে যোগ করুন', en: 'Add to Cart' },
  'section.buyNow': { bn: 'এখনই অর্ডার করুন', en: 'Buy Now' },
  'section.inStock': { bn: 'স্টকে আছে', en: 'In Stock' },
  'section.outOfStock': { bn: 'স্টক আউট', en: 'Out of Stock' },
  'section.reviews': { bn: 'রিভিউ', en: 'Reviews' },
  'section.quickView': { bn: 'কুইক ভিউ', en: 'Quick View' },

  // Trust Badges
  'trust.freeShippingTitle': { bn: 'ফ্রি হোম ডেলিভারি', en: 'Free Home Delivery' },
  'trust.freeShippingDesc': { bn: '৳২,০০০+ টাকার অর্ডারে সারা বাংলাদেশে ফ্রি ডেলিভারি', en: 'Free delivery all over Bangladesh on orders over ৳2,000' },
  'trust.originalTitle': { bn: '১০০% অরিজিনাল গ্যারান্টি', en: '100% Genuine Guarantee' },
  'trust.originalDesc': { bn: 'প্রিমিয়াম ফ্যাব্রিক ও সেরা কোয়ালিটি নিশ্চিত সোর্স থেকে', en: 'Sourced directly from verified premium craftsmenship' },
  'trust.paymentTitle': { bn: 'নিরাপদ ক্যাশ অন ডেলিভারি', en: 'Safe Cash on Delivery' },
  'trust.paymentDesc': { bn: 'পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধের সুযোগ', en: 'Pay cash safely at your doorstep after inspecting items' },
  'trust.supportTitle': { bn: '২৪/৭ কাস্টমার সাপোর্ট', en: '24/7 Dedicated Support' },
  'trust.supportDesc': { bn: 'হোয়াটসঅ্যাপ ও সরাসরি ফোনে সার্বক্ষণিক সহায়তা', en: 'Instant support via WhatsApp & direct phone calls' },

  // Cart Drawer
  'cart.title': { bn: 'আপনার শপিং কার্ট', en: 'Your Shopping Cart' },
  'cart.empty': { bn: 'আপনার কার্টে কোনো পণ্য নেই', en: 'Your cart is currently empty' },
  'cart.subtotal': { bn: 'মোট মূল্য:', en: 'Subtotal:' },
  'cart.delivery': { bn: 'ডেলিভারি চার্জ:', en: 'Delivery Charge:' },
  'cart.total': { bn: 'সর্বমোট:', en: 'Grand Total:' },
  'cart.checkout': { bn: 'অর্ডার সম্পন্ন করুন', en: 'Proceed to Checkout' },
  'cart.continue': { bn: 'আরও কেনাকাটা করুন', en: 'Continue Shopping' },

  // Checkout Page
  'checkout.title': { bn: 'অর্ডার কনফার্মেশন ও চেকআউট', en: 'Checkout & Order Confirmation' },
  'checkout.shippingTitle': { bn: 'ডেলিভারি তথ্য', en: 'Shipping & Delivery Info' },
  'checkout.fullName': { bn: 'আপনার সম্পূর্ণ নাম', en: 'Full Name' },
  'checkout.phone': { bn: 'মোবাইল নম্বর', en: 'Mobile Number' },
  'checkout.address': { bn: 'সম্পূর্ণ ঠিকানা (বাসা/রোড নম্বর)', en: 'Full Address' },
  'checkout.district': { bn: 'জেলা / এলাকা', en: 'District / Area' },
  'checkout.dhakaInside': { bn: 'ঢাকার ভেতরে (৳৬০)', en: 'Inside Dhaka (৳60)' },
  'checkout.dhakaOutside': { bn: 'ঢাকার বাইরে (৳১২০)', en: 'Outside Dhaka (৳120)' },
  'checkout.paymentMethod': { bn: 'পেমেন্ট পদ্ধতি', en: 'Payment Method' },
  'checkout.cod': { bn: 'ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে টাকা দিন)', en: 'Cash on Delivery' },
  'checkout.bKash': { bn: 'বিকাশ / নগদ (১০% ক্যাশব্যাক অফার)', en: 'bKash / Nagad Payment' },
  'checkout.placeOrder': { bn: 'অর্ডার কনফার্ম করুন', en: 'Place Order Now' },

  // Footer
  'footer.slogan': { bn: '“YOUR CHOICE OUR PROMISE”', en: '“YOUR CHOICE OUR PROMISE”' },
  'footer.desc': {
    bn: 'লিবাস শপ হচ্ছে আধুনিক মার্জিত পোশাক, প্রিমিয়াম জুব্বা, আবায়া, সুন্নাহ এসেনশিয়াল ও লাইফস্টাইল পণ্যের জন্য আপনার নির্ভরযোগ্য বিশ্বস্ত অনলাইন শপিং গন্তব্য।',
    en: 'LIBAS Shop is a modern e-commerce destination for modest fashion and lifestyle products, offering quality, variety and a trustworthy shopping experience.'
  },
  'footer.quickLinks': { bn: 'দ্রুত লিংক', en: 'Quick Links' },
  'footer.categories': { bn: 'শপ ক্যাটাগরি', en: 'Shop Categories' },
  'footer.customerCare': { bn: 'কাস্টমার কেয়ার', en: 'Customer Care' },
  'footer.contact': { bn: 'সরাসরি যোগাযোগ', en: 'Direct Contact' },
  'footer.rights': { bn: '© ২০২৬ লিবাস শপ | সর্বস্বত্ব সংরক্ষিত।', en: '© 2026 LIBAS Shop | All Rights Reserved.' },
  'footer.creator': { bn: 'Created by | Naeem Nahiyan', en: 'Created by | Naeem Nahiyan' }
};

export const useLocaleStore = defineStore('locale', () => {
  // Default locale is strictly 'en' (English)
  const savedLocale = localStorage.getItem('libas_locale_v1') as SupportedLocale;
  const currentLocale = ref<SupportedLocale>(savedLocale || 'en');

  function setLocale(locale: SupportedLocale) {
    currentLocale.value = locale;
    localStorage.setItem('libas_locale_v1', locale);
    document.documentElement.lang = locale;
  }

  function toggleLocale() {
    setLocale(currentLocale.value === 'bn' ? 'en' : 'bn');
  }

  const isBangla = computed(() => currentLocale.value === 'bn');

  function t(key: string): string {
    const entry = translations[key];
    if (!entry) return key;
    return entry[currentLocale.value] || entry.bn || key;
  }

  return {
    currentLocale,
    isBangla,
    setLocale,
    toggleLocale,
    t
  };
});
