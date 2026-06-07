<script setup lang="ts">
import { ref, computed } from "vue";
import { blogPosts, type BlogPost } from "../../../content/blogs";
import { marked } from "marked";
import { t } from "../../../i18n/utils/translate";
import { locale } from "../../../i18n/store";

const selectedPost = ref<BlogPost | null>(null);
const searchQuery = ref("");
const selectedTag = ref("All");

// Clean markdown content from frontmatter (--- ... ---)
const getCleanContent = (content: string) => {
  const cleaned = content.replace(/^---[\s\S]*?---\n/, "");
  return marked(cleaned);
};

const allTags = computed(() => {
  const tags = new Set<string>();
  blogPosts.forEach((post) => {
    if (post.lang === locale.value) {
      post.tags.forEach((tag) => tags.add(tag));
    }
  });
  return ["All", ...Array.from(tags)];
});

const filteredPosts = computed(() => {
  return blogPosts.filter((post) => {
    const matchesLang = post.lang === (locale.value || "en");
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesTag =
      selectedTag.value === "All" || post.tags.includes(selectedTag.value);
    return matchesLang && matchesSearch && matchesTag;
  });
});
</script>

<template>
  <div class="blog-section">
    <div class="blog-header">
      <h2 class="blog-title">{{ t("projects") }} & Insights</h2>
      <div class="blog-controls">
        <input
          type="text"
          v-model="searchQuery"
          :placeholder="locale === 'vi' ? 'Tìm kiếm bài viết...' : 'Search articles...'"
          class="blog-search"
        />
        <select v-model="selectedTag" class="blog-filter">
          <option value="All">
            {{ locale === "vi" ? "Tất cả chuyên mục" : "All Categories" }}
          </option>
          <option v-for="tag in allTags.filter(t => t !== 'All')" :key="tag" :value="tag">
            {{ tag.toUpperCase() }}
          </option>
        </select>
      </div>
    </div>

    <div class="blog-grid">
      <div
        v-for="post in filteredPosts"
        :key="post.slug"
        class="blog-card"
        data-sound="click"
        data-hoversound="hover"
        @click="selectedPost = post"
      >
        <div class="blog-card-image-wrapper">
          <img :src="post.thumbnail" :alt="post.title" class="blog-card-image" />
          <div class="blog-card-badge">{{ post.readTime }}</div>
          <div class="blog-card-overlay"></div>
        </div>
        
        <div class="blog-card-info">
          <div class="blog-card-meta">
            <span class="blog-card-date">📅 {{ post.date }}</span>
            <div class="blog-card-tags">
              <span v-for="tag in post.tags.slice(0, 2)" :key="tag" class="blog-card-tag">
                {{ tag }}
              </span>
            </div>
          </div>
          <h3 class="blog-card-title">{{ post.title }}</h3>
          <p class="blog-card-excerpt">{{ post.excerpt }}</p>
          <div class="blog-card-footer">
            <span class="blog-card-link">
              {{ locale === 'vi' ? 'Đọc bài viết' : 'Read article' }} &rarr;
            </span>
          </div>
        </div>
      </div>
      
      <div v-if="filteredPosts.length === 0" class="blog-empty">
        {{ locale === 'vi' ? 'Không tìm thấy bài viết nào phù hợp.' : 'No articles found matching your criteria.' }}
      </div>
    </div>

    <!-- Blog Detail Modal Overlay -->
    <div v-if="selectedPost" class="blog-modal-overlay" @click.self="selectedPost = null">
      <div class="blog-modal">
        <button class="blog-modal-close" @click="selectedPost = null">&times;</button>
        <div class="blog-modal-content">
          <div class="blog-modal-header-image">
            <img :src="selectedPost.thumbnail" :alt="selectedPost.title" />
            <div class="blog-modal-header-overlay"></div>
          </div>
          
          <div class="blog-modal-body-wrapper">
            <h2 class="blog-modal-title">{{ selectedPost.title }}</h2>
            <div class="blog-modal-meta">
              <span>📅 {{ selectedPost.date }} &nbsp;•&nbsp; ⏱️ {{ selectedPost.readTime }}</span>
              <div class="blog-modal-tags">
                <span v-for="tag in selectedPost.tags" :key="tag" class="blog-modal-tag">
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="blog-markdown-body" v-html="getCleanContent(selectedPost.content)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-section {
  width: 100%;
  padding: var(--space-outer);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  color: var(--color-white-400);
}

.blog-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-md);

  @include mixins.mq("md") {
    flex-direction: row;
    align-items: center;
  }
}

.blog-title {
  font-size: var(--font-size-title-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-cyan-400);
  text-shadow: 0 0 15px rgba(0, 229, 255, 0.2);
}

.blog-controls {
  display: flex;
  gap: var(--space-sm);
  width: 100%;

  @include mixins.mq("md") {
    width: auto;
  }
}

.blog-search {
  flex: 1;
  background: rgba(10, 10, 15, 0.7);
  border: var(--stroke-sm) solid rgba(0, 229, 255, 0.3);
  border-radius: var(--radius-md);
  color: var(--color-white-400);
  padding: var(--space-xs) var(--space-sm);
  outline: none;
  font-family: monospace;
  font-size: var(--font-size-sm);
  transition: all 0.3s ease;

  &:focus {
    border-color: var(--color-cyan-400);
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.25);
    background: rgba(10, 10, 15, 0.95);
  }
}

.blog-filter {
  background: rgba(10, 10, 15, 0.7);
  border: var(--stroke-sm) solid rgba(0, 229, 255, 0.3);
  border-radius: var(--radius-md);
  color: var(--color-white-400);
  padding: var(--space-xs) var(--space-sm);
  outline: none;
  font-family: monospace;
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: all 0.3s ease;

  &:focus, &:hover {
    border-color: var(--color-cyan-400);
    background: rgba(10, 10, 15, 0.95);
  }
}

.blog-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);

  @include mixins.mq("md") {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mixins.mq("lg") {
    grid-template-columns: repeat(2, 1fr);
  }
}

.blog-card {
  border: var(--stroke-sm) solid rgba(0, 229, 255, 0.12);
  border-radius: var(--radius-xl);
  background: rgba(10, 15, 30, 0.45);
  backdrop-filter: blur(12px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    border-color: var(--color-cyan-400);
    box-shadow: 0 12px 35px rgba(0, 229, 255, 0.22);
    transform: translateY(-6px);

    .blog-card-image {
      transform: scale(1.06);
    }

    .blog-card-image-wrapper .blog-card-overlay {
      background: rgba(0, 229, 255, 0.08);
    }

    .blog-card-link {
      color: var(--color-cyan-400);
      transform: translateX(4px);
    }
  }

  &-image-wrapper {
    width: 100%;
    height: 180px;
    position: relative;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.5);

    .blog-card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .blog-card-badge {
      position: absolute;
      top: var(--space-sm);
      right: var(--space-sm);
      background: rgba(10, 10, 15, 0.85);
      border: 1px solid rgba(0, 229, 255, 0.4);
      color: var(--color-cyan-400);
      font-size: 10px;
      font-family: monospace;
      padding: 4px 10px;
      border-radius: 20px;
      z-index: 2;
    }

    .blog-card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.25);
      transition: background 0.4s ease;
      z-index: 1;
    }
  }

  &-info {
    padding: var(--space-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    flex-grow: 1;
  }

  &-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--font-size-xs);
  }

  &-date {
    color: var(--color-white-400);
    opacity: 0.6;
    font-family: monospace;
  }

  &-tags {
    display: flex;
    gap: var(--space-xxs);
  }

  &-tag {
    font-size: 9px;
    background: rgba(0, 229, 255, 0.08);
    color: var(--color-cyan-400);
    border: 1px solid rgba(0, 229, 255, 0.25);
    padding: 2px 8px;
    border-radius: 10px;
    text-transform: uppercase;
    font-family: monospace;
  }

  &-title {
    font-size: var(--font-size-md);
    font-weight: 700;
    color: var(--color-white-400);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &-excerpt {
    font-size: var(--font-size-sm);
    color: var(--color-white-400);
    opacity: 0.75;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-grow: 1;
  }

  &-footer {
    margin-top: var(--space-xs);
    display: flex;
    justify-content: flex-start;
  }

  &-link {
    color: rgba(0, 229, 255, 0.7);
    font-weight: 700;
    font-family: monospace;
    font-size: var(--font-size-sm);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
  }
}

.blog-empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--space-xxl) 0;
  color: var(--color-white-400);
  opacity: 0.6;
  font-family: monospace;
}

.blog-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(3, 7, 18, 0.92);
  backdrop-filter: blur(14px);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-md);
}

.blog-modal {
  background: #090d14;
  width: 100%;
  max-width: 820px;
  max-height: 88vh;
  border-radius: var(--radius-xl);
  border: var(--stroke-sm) solid rgba(0, 229, 255, 0.25);
  box-shadow: 0 0 50px rgba(0, 229, 255, 0.18);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: modalScaleIn 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);

  &-close {
    position: absolute;
    top: var(--space-sm);
    right: var(--space-md);
    background: rgba(10, 10, 15, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    color: var(--color-white-400);
    width: 36px;
    height: 36px;
    font-size: 24px;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      color: var(--color-cyan-400);
      border-color: var(--color-cyan-400);
      background: rgba(0, 229, 255, 0.1);
    }
  }

  &-content {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  &-header-image {
    width: 100%;
    height: 240px;
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .blog-modal-header-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(9, 13, 20, 0.1) 0%, rgba(9, 13, 20, 1) 98%);
    }
  }

  &-body-wrapper {
    padding: var(--space-md) var(--space-md) var(--space-xl);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);

    @include mixins.mq("md") {
      padding: var(--space-lg) var(--space-xl) var(--space-xxl);
    }
  }

  &-title {
    font-size: var(--font-size-title-xs);
    font-weight: 700;
    color: var(--color-white-400);
    line-height: 1.3;
  }

  &-meta {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    padding-bottom: var(--space-md);
    font-size: var(--font-size-sm);
    font-family: monospace;
    opacity: 0.85;

    @include mixins.mq("sm") {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  &-tags {
    display: flex;
    gap: var(--space-xxs);
  }

  &-tag {
    font-size: 9px;
    background: rgba(0, 229, 255, 0.12);
    color: var(--color-cyan-400);
    border: 1px solid rgba(0, 229, 255, 0.3);
    padding: 2px 8px;
    border-radius: 10px;
    text-transform: uppercase;
  }
}

.blog-markdown-body {
  line-height: 1.85;
  font-size: var(--font-size-md);
  color: #e6edf3;

  :deep(h2) {
    font-size: var(--font-size-title-xxs);
    color: var(--color-cyan-400);
    margin-top: 1.6em;
    margin-bottom: 0.6em;
    font-weight: 700;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    padding-bottom: 6px;
  }

  :deep(h3) {
    font-size: var(--font-size-md);
    color: var(--color-white-400);
    margin-top: 1.3em;
    margin-bottom: 0.5em;
    font-weight: 700;
  }

  :deep(p) {
    margin-bottom: 1.3em;
    opacity: 0.9;
  }

  :deep(ul), :deep(ol) {
    margin-bottom: 1.3em;
    padding-left: 1.6em;
    opacity: 0.9;
  }

  :deep(li) {
    margin-bottom: 0.5em;
  }

  :deep(a) {
    color: var(--color-cyan-400);
    text-decoration: none;
    border-bottom: 1px dashed var(--color-cyan-400);
    transition: all 0.2s ease;

    &:hover {
      color: var(--color-white-400);
      border-bottom-color: var(--color-white-400);
    }
  }

  :deep(code) {
    background: rgba(0, 229, 255, 0.08);
    border: 1px solid rgba(0, 229, 255, 0.25);
    color: var(--color-cyan-400);
    padding: 2px 6px;
    border-radius: 5px;
    font-family: monospace;
    font-size: 88%;
  }

  :deep(pre) {
    background: #0f141c;
    padding: var(--space-md);
    border-radius: 10px;
    overflow-x: auto;
    margin-bottom: 1.3em;
    border: 1px solid rgba(0, 229, 255, 0.15);

    code {
      background: transparent;
      border: none;
      padding: 0;
      font-size: 90%;
      color: #e6edf3;
    }
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.4em;
    font-size: var(--font-size-sm);

    th, td {
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 10px 14px;
      text-align: left;
    }

    th {
      background: rgba(0, 229, 255, 0.06);
      color: var(--color-cyan-400);
      font-weight: 700;
    }

    tr:nth-child(even) {
      background: rgba(255, 255, 255, 0.02);
    }
  }
}

@keyframes modalScaleIn {
  from {
    opacity: 0;
    transform: scale(0.93) translateY(25px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
