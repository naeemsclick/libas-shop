<script setup lang="ts">
import { ref, computed } from 'vue';
import { Eye, MessageSquare, Calendar, User, Search, Tag, ArrowRight } from 'lucide-vue-next';
import { blogsData } from '@/data/blogs';
import { useLocaleStore } from '@/stores/locale';
import { useSeo } from '@/composables/useSeo';
import type { BlogPost } from '@/types';

const localeStore = useLocaleStore();

useSeo({
  title: 'LIBAS Journal & Blog | Modest Lifestyle & Guides',
  description: 'Read articles and guides on modest fashion, Jubba care, Attar perfumes, and Sunnah lifestyle.'
});

const searchQuery = ref('');
const selectedCategory = ref('all');

const categories = [
  { slug: 'all', name: 'All Articles', nameBn: 'সকল আর্টিকেল' },
  { slug: 'clothing', name: 'Jubba & Clothing', nameBn: 'জুব্বা ও পোশাক' },
  { slug: 'perfume', name: 'Attar & Perfumes', nameBn: 'আতর ও পারফিউম' },
  { slug: 'womens-collection', name: "Women's Collection", nameBn: 'উইমেনস কালেকশন' },
  { slug: 'shoes', name: 'Shoes & Footwear', nameBn: 'জুতা ও স্যান্ডেল' }
];

const filteredBlogs = computed(() => {
  return blogsData.filter(post => {
    const matchesCat = selectedCategory.value === 'all' || post.categorySlug === selectedCategory.value;
    const matchesSearch = !searchQuery.value.trim() ||
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (post.titleBn && post.titleBn.toLowerCase().includes(searchQuery.value.toLowerCase()));
    return matchesCat && matchesSearch;
  });
});

const recentPosts = computed(() => blogsData.slice(0, 4));
</script>

<template>
  <div class="blog-list-page section-spacing">
    <div class="container">
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span class="sep">/</span>
        <span class="current">Blog & Journal</span>
      </nav>

      <div class="header-box text-center">
        <span class="header-badge">LIBAS JOURNAL</span>
        <h1 class="page-title">Articles, Fashion & Sunnah Guides</h1>
        <p class="subtitle">Insights on modest wear, Jubba care, alcohol-free Attar scents, and Islamic lifestyle.</p>
      </div>

      <div class="blog-layout-grid">
        <!-- Main Blog Posts Column Left -->
        <div class="main-posts-col">
          <!-- Category Filter Bar -->
          <div class="category-tabs">
            <button
              v-for="cat in categories"
              :key="cat.slug"
              :class="['cat-tab', { active: selectedCategory === cat.slug }]"
              @click="selectedCategory = cat.slug"
            >
              {{ localeStore.isBangla ? (cat.nameBn || cat.name) : cat.name }}
            </button>
          </div>

          <div v-if="filteredBlogs.length === 0" class="no-posts">
            <p>No articles found matching your criteria.</p>
          </div>

          <div v-else class="posts-grid">
            <article v-for="post in filteredBlogs" :key="post.id" class="blog-card">
              <router-link :to="`/blog/${post.slug}`" class="card-img-link">
                <img :src="post.image" :alt="post.title" class="card-img" />
                <span class="cat-pill">{{ post.category }}</span>
              </router-link>

              <div class="card-body">
                <div class="meta-row">
                  <span class="meta-item">
                    <Calendar :size="14" />
                    <span>{{ post.date }}</span>
                  </span>
                  <span class="meta-item views-count">
                    <Eye :size="14" />
                    <span>{{ post.viewsCount.toLocaleString() }} Views</span>
                  </span>
                  <span class="meta-item">
                    <MessageSquare :size="14" />
                    <span>{{ post.comments.length }} Comments</span>
                  </span>
                </div>

                <h3 class="card-title">
                  <router-link :to="`/blog/${post.slug}`">
                    {{ localeStore.isBangla ? (post.titleBn || post.title) : post.title }}
                  </router-link>
                </h3>

                <p class="card-excerpt">
                  {{ localeStore.isBangla ? (post.excerptBn || post.excerpt) : post.excerpt }}
                </p>

                <router-link :to="`/blog/${post.slug}`" class="read-more-btn">
                  <span>{{ localeStore.isBangla ? 'বিস্তারিত পড়ুন' : 'Read Article' }}</span>
                  <ArrowRight :size="15" />
                </router-link>
              </div>
            </article>
          </div>
        </div>

        <!-- Sidebar Right -->
        <aside class="sidebar-col">
          <!-- Search Widget -->
          <div class="widget search-widget">
            <h4 class="widget-title">Search Articles</h4>
            <div class="search-input-box">
              <input v-model="searchQuery" type="text" placeholder="Search blog title..." />
              <Search :size="18" class="search-icon" />
            </div>
          </div>

          <!-- Recent Posts Widget -->
          <div class="widget recent-posts-widget">
            <h4 class="widget-title">Recent Posts</h4>
            <div class="recent-list">
              <router-link
                v-for="recent in recentPosts"
                :key="recent.id"
                :to="`/blog/${recent.slug}`"
                class="recent-item"
              >
                <img :src="recent.image" :alt="recent.title" class="recent-thumb" />
                <div class="recent-info">
                  <span class="recent-title">{{ localeStore.isBangla ? (recent.titleBn || recent.title) : recent.title }}</span>
                  <div class="recent-meta">
                    <Eye :size="12" />
                    <span>{{ recent.viewsCount }} views</span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-list-page {
  background: var(--color-off-white);
}

.text-center { text-align: center; }

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--color-taupe);
  margin-bottom: 24px;
  .sep { opacity: 0.5; }
  .current { color: var(--color-charcoal); font-weight: 600; }
}

.header-box {
  max-width: 680px;
  margin: 0 auto 40px;
}

.header-badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--color-primary-subtle);
  color: var(--color-primary-dark);
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 999px;
  margin-bottom: 8px;
  letter-spacing: 0.05em;
}

.page-title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 0.95rem;
  color: var(--color-taupe);
}

.blog-layout-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 36px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.category-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.cat-tab {
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: white;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--color-charcoal);
  cursor: pointer;
  transition: all 0.2s ease;

  &.active, &:hover {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.blog-card {
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
}

.card-img-link {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  display: block;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.card-img-link:hover .card-img {
  transform: scale(1.06);
}

.cat-pill {
  position: absolute;
  top: 14px;
  left: 14px;
  background: var(--color-accent);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.78rem;
  color: var(--color-taupe);
  margin-bottom: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;

  &.views-count {
    color: var(--color-accent-dark);
    font-weight: 700;
  }
}

.card-title {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 10px;
  color: var(--color-charcoal);

  a:hover {
    color: var(--color-accent);
  }
}

.card-excerpt {
  font-size: 0.86rem;
  color: var(--color-taupe);
  line-height: 1.55;
  margin-bottom: 18px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more-btn {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-accent);

  &:hover {
    color: var(--color-accent-dark);
  }
}

/* Sidebar */
.widget {
  background: white;
  border-radius: var(--radius-xl);
  padding: 24px;
  border: 1px solid var(--color-border);
  margin-bottom: 24px;
}

.widget-title {
  font-size: 1.05rem;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--color-accent);
  width: fit-content;
}

.search-input-box {
  position: relative;

  input {
    width: 100%;
    padding: 10px 36px 10px 14px;
    border-radius: var(--radius-md);
    border: 1.5px solid var(--color-border);
    outline: none;
    font-size: 0.88rem;
    &:focus { border-color: var(--color-primary); }
  }

  .search-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-taupe);
  }
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.recent-item {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;

  &:hover .recent-title {
    color: var(--color-accent);
  }
}

.recent-thumb {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  object-fit: cover;
  flex-shrink: 0;
}

.recent-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.recent-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-charcoal);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recent-meta {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.74rem;
  color: var(--color-accent-dark);
  font-weight: 600;
}
</style>
