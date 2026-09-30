<script setup lang="ts">
import HeroSlider from '@/components/home/HeroSlider.vue';
import CategoryExplorer from '@/components/home/CategoryExplorer.vue';
import BestSellingSection from '@/components/home/BestSellingSection.vue';
import FlashSaleSection from '@/components/home/FlashSaleSection.vue';
import WomensCollectionBanner from '@/components/home/WomensCollectionBanner.vue';
import HomeCategorySection from '@/components/home/HomeCategorySection.vue';
import TestimonialSlider from '@/components/home/TestimonialSlider.vue';
import TrustFeatures from '@/components/home/TrustFeatures.vue';
import NewsletterSection from '@/components/home/NewsletterSection.vue';
import { useSeo } from '@/composables/useSeo';

useSeo({
  title: 'LIBAS Shop | YOUR CHOICE OUR PROMISE',
  description: 'YOUR CHOICE OUR PROMISE. Explore modern modest fashion, Jubba collections, Abayas, Perfumes, Watches, Shoes, and Sunnah essentials online.'
});
</script>

<template>
  <div class="home-page">
    <HeroSlider />
    <CategoryExplorer />
    
    <!-- Customer Favorites (1 row of 4 best sellers) -->
    <BestSellingSection />
    
    <!-- Limited Time Deals (Flash Sale) -->
    <FlashSaleSection />

    <!-- 1. EID COLLECTION'S -->
    <HomeCategorySection
      title="EID COLLECTION'S"
      titleBn="ঈদ বিশেষ কালেকশন"
      badge="FESTIVE SPECIAL"
      badgeBn="ঈদ স্পেশাল"
      categorySlug="clothing"
      link="/category/clothing"
      :filter-fn="p => p.name.toLowerCase().includes('eid') || p.name.includes('ঈদ') || p.categorySlug === 'clothing'"
    />

    <!-- 2. NEW ARRIVALS -->
    <HomeCategorySection
      title="NEW ARRIVALS"
      titleBn="নতুন আসা কালেকশন"
      badge="JUST ARRIVED"
      badgeBn="নতুন কালেকশন"
      link="/shop?sortBy=newest"
      :filter-fn="p => p.isNew || p.id.includes('7104') || p.id.includes('7230')"
    />

    <!-- 3. JUBBA -->
    <HomeCategorySection
      title="JUBBA"
      titleBn="প্রিমিয়াম জুব্বা কালেকশন"
      badge="SIGNATURE THOBE"
      badgeBn="প্রিমিয়াম জুব্বা"
      categorySlug="clothing"
      link="/category/clothing"
      :filter-fn="p => p.name.toLowerCase().includes('jubba') || p.name.includes('জুব্বা') || p.categorySlug === 'clothing'"
    />

    <!-- 4. WINTER COLLECTION -->
    <HomeCategorySection
      title="WINTER COLLECTION"
      titleBn="উইন্টার ও কটি কালেকশন"
      badge="PREMIUM WINTER WEAR"
      badgeBn="শীতের পোশাক"
      categorySlug="clothing"
      link="/category/clothing"
      :filter-fn="p => p.name.toLowerCase().includes('waistcoat') || p.name.toLowerCase().includes('koti') || p.name.toLowerCase().includes('winter')"
    />

    <!-- 5. ATTAR & PERFUMES -->
    <HomeCategorySection
      title="ATTAR & PERFUMES"
      titleBn="খাঁটি আতর ও সুগন্ধি"
      badge="ALCOHOL FREE PERFUME"
      badgeBn="অ্যালকোহল ফ্রি আতর"
      categorySlug="perfume"
      link="/category/perfume"
    />

    <!-- 6. WOMEN'S COLLECTION (Banner with 4 products) -->
    <WomensCollectionBanner />

    <!-- 7. WATCH & GIFT -->
    <HomeCategorySection
      title="WATCH & GIFT"
      titleBn="ঘড়ি ও প্রিমিয়াম অ্যাক্সেসরিজ"
      badge="TIMELESS ACCESSORIES"
      badgeBn="প্রিমিয়াম ঘড়ি"
      categorySlug="watch"
      link="/category/watch"
    />

    <!-- 8. DAWAH T-SHIRT -->
    <HomeCategorySection
      title="DAWAH T-SHIRT"
      titleBn="দাওয়াহ টি-শার্ট কালেকশন"
      badge="MODEST CASUAL WEAR"
      badgeBn="ক্যাজুয়াল টি-শার্ট"
      categorySlug="clothing"
      link="/category/clothing"
      :filter-fn="p => p.name.toLowerCase().includes('t-shirt') || p.name.toLowerCase().includes('shirt') || p.categorySlug === 'clothing'"
    />

    <!-- 9. SUNNAH ITEM -->
    <HomeCategorySection
      title="SUNNAH ITEM"
      titleBn="সুন্নাহ এসেনশিয়ালস"
      badge="ISLAMIC LIFESTYLE"
      badgeBn="সুন্নাহ অনুষঙ্গ"
      categorySlug="sunnah"
      link="/category/sunnah"
    />

    <!-- 10. COMBO PACK -->
    <HomeCategorySection
      title="COMBO PACK"
      titleBn="নবাবী ও এরাবিয়ান কম্বো প্যাক"
      badge="EXCLUSIVE GIFT PACKAGES"
      badgeBn="স্পেশাল গিফট প্যাকেজ"
      link="/category/sunnah"
      :filter-fn="p => p.name.toLowerCase().includes('package') || p.name.toLowerCase().includes('combo') || p.name.includes('প্যাকেজ')"
    />

    <TestimonialSlider />
    <TrustFeatures />
    <NewsletterSection />
  </div>
</template>

<style scoped lang="scss">
.home-page {
  overflow-x: hidden;
}
</style>
