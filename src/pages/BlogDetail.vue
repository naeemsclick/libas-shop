<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Eye, MessageSquare, Calendar, User, Phone, Mail, Send, CheckCircle2, ArrowRight } from 'lucide-vue-next';
import { blogsData } from '@/data/blogs';
import type { BlogPost, BlogComment } from '@/types';
import { useLocaleStore } from '@/stores/locale';
import { useSeo } from '@/composables/useSeo';

const route = useRoute();
const localeStore = useLocaleStore();

const post = computed<BlogPost | undefined>(() => {
  return blogsData.find(b => b.slug === route.params.slug) || blogsData[0];
});

useSeo({
  title: post.value ? post.value.title : 'Blog Article | LIBAS Shop',
  description: post.value ? post.value.excerpt : 'Read our latest article on modest fashion.'
});

const recentPosts = computed(() => {
  return blogsData.filter(b => b.slug !== post.value?.slug).slice(0, 4);
});

// Comment Form State
const commentForm = reactive({
  name: '',
  phone: '',
  email: '',
  comment: ''
});

const isSubmittingComment = ref(false);
const commentSuccessMsg = ref(false);

function handleAddComment() {
  if (!commentForm.name || !commentForm.phone || !commentForm.email || !commentForm.comment) {
    alert('Please fill out Name, Phone, Email, and Comment message.');
    return;
  }

  isSubmittingComment.value = true;

  setTimeout(() => {
    if (post.value) {
      const newComment: BlogComment = {
        id: 'c-' + Date.now(),
        name: commentForm.name,
        phone: commentForm.phone,
        email: commentForm.email,
        comment: commentForm.comment,
        createdAt: new Date().toISOString()
      };
      post.value.comments.unshift(newComment);
      post.value.commentsCount += 1;
    }

    isSubmittingComment.value = false;
    commentSuccessMsg.value = true;

    commentForm.name = '';
    commentForm.phone = '';
    commentForm.email = '';
    commentForm.comment = '';
  }, 600);
}

onMounted(() => {
  if (post.value) {
    post.value.viewsCount += 1;
  }
});
</script>

<template>
  <div v-if="post" class="blog-detail-page section-spacing">
    <div class="container">
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span class="sep">/</span>
        <router-link to="/blog">Blog</router-link>
        <span class="sep">/</span>
        <span class="current">{{ post.title }}</span>
      </nav>

      <div class="blog-layout-grid">
        <!-- Main Article Column Left -->
        <article class="article-main-col">
          <header class="article-header">
            <span class="category-badge">{{ post.category }}</span>
            <h1 class="article-title">
              {{ localeStore.isBangla ? (post.titleBn || post.title) : post.title }}
            </h1>

            <div class="article-meta-bar">
              <div class="meta-item">
                <User :size="16" />
                <span>{{ post.author }}</span>
              </div>
              <div class="meta-item">
                <Calendar :size="16" />
                <span>{{ post.date }}</span>
              </div>
              <!-- Views Count with Eye Icon -->
              <div class="meta-item views-badge">
                <Eye :size="16" />
                <span>{{ post.viewsCount.toLocaleString() }} Views</span>
              </div>
              <div class="meta-item">
                <MessageSquare :size="16" />
                <span>{{ post.comments.length }} Comments</span>
              </div>
            </div>
          </header>

          <div class="hero-image-box">
            <img :src="post.image" :alt="post.title" class="article-hero-img" />
          </div>

          <!-- HTML Article Body -->
          <div
            class="article-body"
            v-html="localeStore.isBangla && post.contentBn ? post.contentBn : post.content"
          ></div>

          <!-- Tags Bar -->
          <div class="tags-row">
            <span class="tags-label">Tags:</span>
            <span v-for="tag in post.tags" :key="tag" class="tag-pill">#{{ tag }}</span>
          </div>

          <!-- Comments Section -->
          <section class="comments-section">
            <h3 class="comments-title">
              Comments ({{ post.comments.length }})
            </h3>

            <!-- Comments List -->
            <div v-if="post.comments.length === 0" class="no-comments">
              <p>Be the first to share your thoughts on this article!</p>
            </div>

            <div v-else class="comments-list">
              <div v-for="c in post.comments" :key="c.id" class="comment-item">
                <div class="avatar-circle">
                  {{ c.name.charAt(0).toUpperCase() }}
                </div>
                <div class="comment-content">
                  <div class="comment-header">
                    <span class="comment-author">{{ c.name }}</span>
                    <span class="comment-date">{{ new Date(c.createdAt).toLocaleDateString() }}</span>
                  </div>
                  <p class="comment-text">{{ c.comment }}</p>
                </div>
              </div>
            </div>

            <!-- Add Comment Form -->
            <div class="add-comment-card">
              <h4 class="form-heading">Leave a Reply / Comment</h4>
              <p class="form-sub">Your email and phone number will remain private.</p>

              <div v-if="commentSuccessMsg" class="comment-success">
                <CheckCircle2 :size="24" />
                <span>Thank you! Your comment has been published.</span>
                <button type="button" class="btn btn--sm btn--outline" @click="commentSuccessMsg = false">Write another comment</button>
              </div>

              <form v-else class="comment-form" @submit.prevent="handleAddComment">
                <div class="form-row">
                  <div class="form-group">
                    <label>Full Name *</label>
                    <input v-model="commentForm.name" type="text" placeholder="e.g. Naeem Nahiyan" required />
                  </div>
                  <div class="form-group">
                    <label>Phone Number *</label>
                    <input v-model="commentForm.phone" type="tel" placeholder="01700000000" required />
                  </div>
                </div>

                <div class="form-group">
                  <label>Email Address *</label>
                  <input v-model="commentForm.email" type="email" placeholder="name@domain.com" required />
                </div>

                <div class="form-group">
                  <label>Comment Message *</label>
                  <textarea v-model="commentForm.comment" rows="4" placeholder="Write your comment or thoughts..." required></textarea>
                </div>

                <button type="submit" :disabled="isSubmittingComment" class="btn btn--primary btn--md">
                  <Send :size="16" />
                  <span>{{ isSubmittingComment ? 'Posting...' : 'Post Comment' }}</span>
                </button>
              </form>
            </div>
          </section>
        </article>

        <!-- Sidebar Right -->
        <aside class="sidebar-col">
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
.blog-detail-page {
  background: var(--color-off-white);
}

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

.blog-layout-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 36px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.article-main-col {
  background: white;
  border-radius: var(--radius-xl);
  padding: 36px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    padding: 20px;
  }
}

.category-badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--color-accent);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 6px;
  margin-bottom: 12px;
}

.article-title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  line-height: 1.25;
  color: var(--color-charcoal);
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
}

.article-meta-bar {
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 0.84rem;
  color: var(--color-taupe);
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;

  &.views-badge {
    color: var(--color-accent-dark);
    font-weight: 700;
  }
}

.hero-image-box {
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 28px;
  aspect-ratio: 16 / 9;
}

.article-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-body {
  font-size: 1.02rem;
  color: var(--color-charcoal);
  line-height: 1.75;
  margin-bottom: 32px;

  :deep(h3) {
    font-family: var(--font-heading);
    font-size: 1.45rem;
    margin: 24px 0 12px;
  }

  :deep(p) {
    margin-bottom: 16px;
  }

  :deep(ul) {
    margin: 0 0 20px 20px;
    li { margin-bottom: 8px; }
  }
}

.tags-row {
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px solid var(--color-border);
  padding-top: 20px;
  margin-bottom: 40px;
}

.tags-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-taupe);
}

.tag-pill {
  font-size: 0.78rem;
  background: var(--color-off-white);
  padding: 4px 10px;
  border-radius: 999px;
  color: var(--color-charcoal);
}

/* Comments Section */
.comments-section {
  border-top: 2px solid var(--color-border);
  padding-top: 36px;
}

.comments-title {
  font-size: 1.4rem;
  margin-bottom: 24px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.comment-item {
  display: flex;
  gap: 14px;
  background: var(--color-off-white);
  padding: 16px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.avatar-circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  flex-shrink: 0;
}

.comment-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-author {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--color-charcoal);
}

.comment-date {
  font-size: 0.75rem;
  color: var(--color-taupe);
}

.comment-text {
  font-size: 0.9rem;
  color: var(--color-charcoal);
  line-height: 1.5;
}

.add-comment-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--color-border);
}

.form-heading {
  font-size: 1.15rem;
  margin-bottom: 4px;
}

.form-sub {
  font-size: 0.82rem;
  color: var(--color-taupe);
  margin-bottom: 20px;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.82rem;
    font-weight: 600;
  }

  input, textarea {
    padding: 10px 14px;
    border-radius: var(--radius-md);
    border: 1.5px solid var(--color-border);
    outline: none;
    font-size: 0.9rem;
    &:focus { border-color: var(--color-primary); }
  }
}

.comment-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px;
  text-align: center;
  color: var(--color-primary-dark);
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
