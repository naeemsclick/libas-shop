import type { Category } from '@/types';

export const categoriesData: Category[] = [
  {
    id: 'cat-clothing',
    slug: 'clothing',
    name: 'Clothing',
    description: 'Explore our signature Jubba collection, Punjabi, and modern tailored clothing made with 100% premium cotton and superior craftsmanship.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    icon: 'Shirt',
    itemCount: 28,
    subcategories: [
      { name: "Premium Jubba", slug: 'jubba' },
      { name: "Casual Shirts & Panjabi", slug: 'panjabi' },
      { name: "Formal Trousers", slug: 'trousers' }
    ]
  },
  {
    id: 'cat-womens-collection',
    slug: 'womens-collection',
    name: "Women's Collection",
    description: 'Elegant Dubai Cherry fabric Abayas, modest three-piece sets, scarves, and signature women fashion attire.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    icon: 'ShoppingBag',
    itemCount: 22,
    subcategories: [
      { name: "Abaya Collection", slug: 'abaya' },
      { name: "Hijab & Scarves", slug: 'hijab' },
      { name: "Modest Dresses", slug: 'modest-dresses' }
    ]
  },
  {
    id: 'cat-perfume',
    slug: 'perfume',
    name: 'Perfume',
    description: 'Exquisite alcohol-free Attars, long-lasting oriental ouds, and French perfume oils that express pure luxury.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    icon: 'Sparkles',
    itemCount: 16,
    subcategories: [
      { name: "Attar Perfume Oils", slug: 'attar' },
      { name: "Oud & Dehn Al Oud", slug: 'oud' },
      { name: "Eau De Parfum", slug: 'edp' }
    ]
  },
  {
    id: 'cat-watch',
    slug: 'watch',
    name: 'Watch',
    description: 'Timeless mesh and genuine leather wristwatches blending classic elegance with modern precision.',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    icon: 'Watch',
    itemCount: 14,
    subcategories: [
      { name: "Chronograph Watches", slug: 'chronograph' },
      { name: "Leather Strap Watches", slug: 'leather-watches' },
      { name: "Minimalist Watches", slug: 'minimalist-watches' }
    ]
  },
  {
    id: 'cat-shoes',
    slug: 'shoes',
    name: 'Shoes',
    description: 'Handcrafted leather loafers, ergonomic cushion sneakers, and formal footwear for effortless comfort and style.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    icon: 'Footprints',
    itemCount: 18,
    subcategories: [
      { name: "Leather Loafers", slug: 'loafers' },
      { name: "Cushion Sneakers", slug: 'sneakers' },
      { name: "Formal Oxfords", slug: 'oxfords' }
    ]
  },
  {
    id: 'cat-sunnah',
    slug: 'sunnah',
    name: 'Sunnah',
    description: 'Essential Sunnah products including handmade prayer caps, Miswak, prayer rugs, and Islamic lifestyle products.',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    icon: 'Bookmark',
    itemCount: 20,
    subcategories: [
      { name: "Prayer Caps (Tupi)", slug: 'tupi' },
      { name: "Miswak & Oral Care", slug: 'miswak' },
      { name: "Prayer Rugs (Jainamaz)", slug: 'jainamaz' }
    ]
  }
];
