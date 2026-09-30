export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  discount?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isFlashSale?: boolean;
  badge?: string;
  description: string;
  shortDescription?: string;
  specifications?: Record<string, string>;
  sizes?: string[];
  colors?: string[];
  tags?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  icon?: string;
  itemCount: number;
  subcategories: Array<{
    name: string;
    slug: string;
  }>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  area: string;
  orderNotes?: string;
  items: CartItem[];
  shippingFee: number;
  subtotal: number;
  discount: number;
  totalAmount: number;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  categorySlug?: string;
  subcategorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  discountOnly?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
  verified: boolean;
}

export interface HeroSlide {
  id: string;
  image: string;
  eyebrow: string;
  eyebrowBn?: string;
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  primaryCtaText: string;
  primaryCtaTextBn?: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  categoryTag: string;
}

export interface BlogComment {
  id: string;
  name: string;
  phone: string;
  email: string;
  comment: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleBn?: string;
  excerpt: string;
  excerptBn?: string;
  content: string;
  contentBn?: string;
  category: string;
  categorySlug: string;
  author: string;
  date: string;
  viewsCount: number;
  commentsCount: number;
  image: string;
  tags: string[];
  comments: BlogComment[];
}
