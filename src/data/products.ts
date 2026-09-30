import type { Product } from '@/types';

export const productsData: Product[] = [
  // CLOTHING (Jubba & Panjabi)
  {
    id: 'prod-c1',
    slug: 'libas-premium-white-cotton-jubba',
    name: 'LIBAS Premium Pure Cotton White Jubba',
    category: 'Clothing',
    categorySlug: 'clothing',
    subcategory: 'jubba',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&h=1000&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&h=1000&q=80'
    ],
    price: 1490,
    compareAtPrice: 1990,
    discount: 25,
    rating: 4.9,
    reviewsCount: 64,
    stock: 25,
    isBestSeller: true,
    isFeatured: true,
    isFlashSale: true,
    badge: 'Best Seller',
    description: 'Crafted from 100% premium breathable Egyptian cotton with immaculate stitching, subtle cuff detailing, and ergonomic comfort fit. Perfect for daily prayers and Friday Jummah.',
    shortDescription: '100% Premium Egyptian Cotton • Comfort Fit • Breathable Fabric',
    specifications: {
      'Fabric': '100% Egyptian Breathable Cotton',
      'Fit': 'Comfort / Regular Fit',
      'Sleeve': 'Full Sleeve with Cuffs',
      'Sizes Available': 'M (38), L (40), XL (42), XXL (44)',
      'Warranty': '100% Quality Satisfaction Guarantee'
    },
    colors: ['Pure White', 'Soft Ivory', 'Deep Olive Green'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    tags: ['Jubba', 'Clothing', 'Islamic Fashion', 'Cotton', 'Men']
  },
  {
    id: 'prod-c2',
    slug: 'libas-royal-embroidered-black-jubba',
    name: 'LIBAS Royal Embroidered Black Jubba',
    category: 'Clothing',
    categorySlug: 'clothing',
    subcategory: 'jubba',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&h=1000&q=80'
    ],
    price: 1850,
    compareAtPrice: 2400,
    discount: 23,
    rating: 4.8,
    reviewsCount: 42,
    stock: 18,
    isNew: true,
    isFeatured: true,
    badge: 'New Arrival',
    description: 'Royal midnight black Jubba featuring intricate minimal embroidery along the collar and button placket. Tailored for special occasions and Eid celebrations.',
    shortDescription: 'Minimal Royal Neckline Embroidery • Premium Linen Blend • Elegant Look',
    specifications: {
      'Fabric': 'Cotton Linen Blend',
      'Embroidery': 'High-density silk thread placket detail',
      'Occasion': 'Eid & Formal Gatherings'
    },
    colors: ['Midnight Black', 'Navy Blue'],
    sizes: ['M', 'L', 'XL'],
    tags: ['Jubba', 'Black Jubba', 'Embroidery', 'Eid Collection']
  },

  // WOMEN'S COLLECTION (Abaya & Hijab)
  {
    id: 'prod-w1',
    slug: 'libas-dubai-cherry-luxury-abaya',
    name: 'LIBAS Dubai Cherry Fabric Luxury Front-Open Abaya',
    category: "Women's Collection",
    categorySlug: 'womens-collection',
    subcategory: 'abaya',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&h=1000&q=80',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1000&h=1000&q=80'
    ],
    price: 2650,
    compareAtPrice: 3500,
    discount: 24,
    rating: 4.9,
    reviewsCount: 78,
    stock: 20,
    isBestSeller: true,
    isFeatured: true,
    badge: 'Best Seller',
    description: 'Imported Dubai Cherry fabric Abaya featuring elegant drape, bell sleeves, and matching Georgette scarf. Lightweight, non-see-through, and graceful.',
    shortDescription: 'Original Dubai Cherry Fabric • Front Open Style • Includes Matching Scarf',
    specifications: {
      'Fabric': 'Imported Original Dubai Cherry Georgette',
      'Includes': 'Abaya + Matching Hijab Scarf',
      'Care': 'Hand wash or dry clean recommended'
    },
    colors: ['Forest Green', 'Mocha Brown', 'Midnight Black'],
    sizes: ['52', '54', '56'],
    tags: ['Abaya', 'Womens Fashion', 'Modest Wear', 'Dubai Cherry']
  },
  {
    id: 'prod-w2',
    slug: 'libas-chiffon-georgette-hijab-set',
    name: 'LIBAS Premium Chiffon Georgette Hijab 4-Piece Set',
    category: "Women's Collection",
    categorySlug: 'womens-collection',
    subcategory: 'hijab',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&h=1000&q=80'
    ],
    price: 990,
    compareAtPrice: 1400,
    discount: 29,
    rating: 4.8,
    reviewsCount: 35,
    stock: 45,
    isNew: true,
    badge: 'Combo Deal',
    description: 'Set of 4 versatile non-slip Georgette chiffon hijabs in curated harmonious earth tones. Breathable and wrinkle-resistant.',
    shortDescription: 'Pack of 4 Hijabs • Non-Slip Breathable Fabric • Curated Palette',
    specifications: {
      'Material': 'High Grade Premium Bubble Georgette',
      'Dimensions': '75cm x 180cm',
      'Colors Included': 'Ivory, Nude Mocha, Olive, Charcoal'
    },
    tags: ['Hijab', 'Scarves', 'Womens Collection', 'Combo']
  },

  // PERFUME (Attar & Oud)
  {
    id: 'prod-p1',
    slug: 'libas-signature-pure-dehn-al-oud-attar',
    name: 'LIBAS Signature Pure Dehn Al Oud Concentrated Attar (6ml)',
    category: 'Perfume',
    categorySlug: 'perfume',
    subcategory: 'attar',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&h=1000&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&h=1000&q=80'
    ],
    price: 1250,
    compareAtPrice: 1600,
    discount: 22,
    rating: 5.0,
    reviewsCount: 89,
    stock: 50,
    isBestSeller: true,
    isFeatured: true,
    isFlashSale: true,
    badge: '100% Pure',
    description: '100% alcohol-free concentrated oil perfume. Warm woody notes of Cambodian Oud blended with oriental amber and royal white musk. Stays on clothes for up to 48 hours.',
    shortDescription: 'Alcohol-Free Perfume Oil • 48-Hour Long-Lasting Scent • Royal Crystal Vial',
    specifications: {
      'Volume': '6ml Glass Octagon Bottle',
      'Type': 'Pure Concentrated Attar Oil',
      'Notes': 'Cambodian Oud, Amber, White Musk',
      'Alcohol Free': 'Yes (100% Halal Pure Oil)'
    },
    tags: ['Attar', 'Perfume', 'Oud', 'Fragrance', 'Halal']
  },
  {
    id: 'prod-p2',
    slug: 'libas-french-amber-rose-perfume-oil',
    name: 'LIBAS French Amber & Taif Rose Perfume Oil (12ml)',
    category: 'Perfume',
    categorySlug: 'perfume',
    subcategory: 'attar',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&h=1000&q=80'
    ],
    price: 1550,
    compareAtPrice: 2000,
    discount: 22,
    rating: 4.9,
    reviewsCount: 41,
    stock: 30,
    isNew: true,
    badge: 'Popular',
    description: 'Exquisite fusion of fresh Taif Rose petals, golden French Amber, and vanilla bean notes. Gentle on skin and long-lasting.',
    shortDescription: 'Taif Rose & French Amber • Roll-On Applicator • 12ml Deluxe Glass Bottle',
    specifications: {
      'Volume': '12ml',
      'Type': 'Luxury Roll-on Oil'
    },
    tags: ['Perfume', 'Rose Attar', 'Fragrance', 'Women Perfume']
  },

  // WATCH
  {
    id: 'prod-wt1',
    slug: 'libas-emerald-gold-mesh-strap-watch',
    name: 'LIBAS Classique Signature Emerald & Gold Mesh Watch',
    category: 'Watch',
    categorySlug: 'watch',
    subcategory: 'watches-jewelry',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&h=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&h=1000&q=80'
    ],
    price: 2190,
    compareAtPrice: 2800,
    discount: 22,
    rating: 4.8,
    reviewsCount: 47,
    stock: 16,
    isBestSeller: true,
    isFeatured: true,
    badge: 'Luxury Watch',
    description: 'Stunning sunray emerald green dial framed in polished 18K gold electroplated alloy with adjustable stainless steel mesh strap. Japanese Quartz Movement.',
    shortDescription: 'Japanese Quartz Movement • 3ATM Water Resistant • 18K Gold Plated Frame',
    specifications: {
      'Movement': 'Miyota Japanese Quartz',
      'Strap Material': 'Stainless Steel Gold Mesh',
      'Dial Diameter': '40mm',
      'Water Resistance': '3ATM (Rain & Splash Proof)',
      'Warranty': '1 Year Official LIBAS Warranty'
    },
    colors: ['Emerald & Gold', 'Black & Rose Gold'],
    tags: ['Watch', 'Gold Watch', 'Luxury', 'Accessories']
  },

  // SHOES
  {
    id: 'prod-s1',
    slug: 'libas-handcrafted-genuine-leather-loafers',
    name: 'LIBAS Handcrafted Genuine Leather Penny Loafers',
    category: 'Shoes',
    categorySlug: 'shoes',
    subcategory: 'loafers',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&h=1000&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&h=1000&q=80'
    ],
    price: 2950,
    compareAtPrice: 3800,
    discount: 22,
    rating: 4.9,
    reviewsCount: 53,
    stock: 14,
    isFeatured: true,
    badge: 'Real Leather',
    description: 'Handcrafted full-grain cowhide leather loafers with memory foam cushioned insoles and anti-slip rubber outsoles. Lightweight and incredibly comfortable.',
    shortDescription: '100% Genuine Cowhide Leather • Soft Memory Foam Insole • Anti-Slip Sole',
    specifications: {
      'Upper Material': '100% Full-Grain Cow Leather',
      'Insole': 'Cushioned Memory Foam',
      'Outsole': 'Flexible TPR Rubber',
      'Sizes Available': '39, 40, 41, 42, 43, 44'
    },
    colors: ['Deep Tan', 'Classic Black'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    tags: ['Shoes', 'Leather Loafers', 'Men Shoes', 'Footwear']
  },

  // SUNNAH
  {
    id: 'prod-sn1',
    slug: 'libas-sunnah-handcrafted-prayer-cap-miswak-set',
    name: 'LIBAS Hand-Knitted Sunnah Tupi & Natural Miswak Gift Set',
    category: 'Sunnah',
    categorySlug: 'sunnah',
    subcategory: 'tupi',
    images: [
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1000&h=1000&q=80'
    ],
    price: 750,
    compareAtPrice: 1100,
    discount: 31,
    rating: 4.9,
    reviewsCount: 62,
    stock: 40,
    isBestSeller: true,
    isFeatured: true,
    badge: 'Sunnah Essential',
    description: 'Handcrafted stretchable cotton prayer cap paired with 2 fresh organic Sewak/Miswak twigs in a velvet gift pouch.',
    shortDescription: '100% Cotton Hand-Knitted Cap • 2x Fresh Peelu Miswak Twigs • Velvet Pouch',
    specifications: {
      'Material': '100% Pure Soft Cotton',
      'Included': 'Hand-Knitted Tupi + 2 Fresh Miswak + Velvet Pouch',
      'Cap Size': 'Free Size (Stretchable)'
    },
    colors: ['White', 'Off-White Ivory'],
    tags: ['Sunnah', 'Prayer Cap', 'Tupi', 'Miswak', 'Gift Set']
  }
];
