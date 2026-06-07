<script setup lang="ts">
import { ref, computed } from "vue";
import { blogPosts, type BlogPost } from "../../../content/blogs";
import { marked } from "marked";
import { t } from "../../../i18n/utils/translate";

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
    post.tags.forEach((tag) => tags.add(tag));
  });
  return ["All", ...Array.from(tags)];
});

const filteredPosts = computed(() => {
  return blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesTag =
      selectedTag.value === "All" || post.tags.includes(selectedTag.value);
    return matchesSearch && matchesTag;
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
          placeholder="Tìm kiếm bài viết..."
          class="blog-search"
        />
        <select v-model="selectedTag" class="blog-filter">
          <option v-for="tag in allTags" :key="tag" :value="tag">
            {{ tag === "All" ? "Tất cả chuyên mục" : tag }}
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
      >
        <div class="blog-card-tags">
          <span v-for="tag in post.tags" :key="tag" class="blog-card-tag">
            {{ tag }}
          </span>
        </div>
        <h3 class="blog-card-title">{{ post.title }}</h3>
        <p class="blog-card-date">{{ post.date }}</p>
        <p class="blog-card-excerpt">{{ post.excerpt }}</p>
        <button class="blog-card-btn" @click="selectedPost = post">
          Đọc bài viết &rarr;
        </button>
      </div>
      <div v-if="filteredPosts.length === 0" class="blog-empty">
        Không tìm thấy bài viết nào phù hợp.
      </div>
    </div>

    <!-- Blog Detail Modal Overlay -->
    <div v-if="selectedPost" class="blog-modal-overlay" @click.self="selectedPost = null">
      <div class="blog-modal">
        <button class="blog-modal-close" @click="selectedPost = null">&times;</button>
        <div class="blog-modal-content">
          <h2 class="blog-modal-title">{{ selectedPost.title }}</h2>
          <div class="blog-modal-meta">
            <span>📅 {{ selectedPost.date }}</span>
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
  background: var(--color-background-400, #0a0a0a);
  border: var(--stroke-sm) solid var(--color-cyan-400);
  border-radius: var(--radius-md);
  color: var(--color-white-400);
  padding: var(--space-xs) var(--space-sm);
  outline: none;
  font-family: monospace;
  font-size: var(--font-size-sm);

  &:focus {
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.3);
  }
}

.blog-filter {
  background: var(--color-background-400, #0a0a0a);
  border: var(--stroke-sm) solid var(--color-cyan-400);
  border-radius: var(--radius-md);
  color: var(--color-white-400);
  padding: var(--space-xs) var(--space-sm);
  outline: none;
  font-family: monospace;
  cursor: pointer;
  font-size: var(--font-size-sm);
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
  border: var(--stroke-sm) solid rgba(0, 229, 255, 0.15);
  border-radius: var(--radius-xl);
  background: rgba(10, 10, 10, 0.45);
  backdrop-filter: blur(12px);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    border-color: var(--color-cyan-400);
    box-shadow: 0 8px 30px rgba(0, 229, 255, 0.25);
    transform: translateY(-4px);
  }

  &-tags {
    display: flex;
    gap: var(--space-xxs);
    flex-wrap: wrap;
  }

  &-tag {
    font-size: 10px;
    background: rgba(0, 229, 255, 0.1);
    color: var(--color-cyan-400);
    border: 1px solid rgba(0, 229, 255, 0.3);
    padding: 2px 8px;
    border-radius: 12px;
    text-transform: uppercase;
  }

  &-title {
    font-size: var(--font-size-md);
    font-weight: 700;
    color: var(--color-white-400);
    line-height: 1.4;
  }

  &-date {
    font-size: var(--font-size-sm);
    color: var(--color-white-400);
    opacity: 0.6;
    font-family: monospace;
  }

  &-excerpt {
    font-size: var(--font-size-sm);
    color: var(--color-white-400);
    opacity: 0.8;
    line-height: 1.6;
    flex-grow: 1;
  }

  &-btn {
    background: transparent;
    border: none;
    color: var(--color-cyan-400);
    font-weight: 700;
    font-family: monospace;
    font-size: var(--font-size-sm);
    cursor: pointer;
    align-self: flex-start;
    padding: 0;
    margin-top: var(--space-xs);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateX(4px);
    }
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
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-md);
}

.blog-modal {
  background: #0d1117;
  width: 100%;
  max-width: 850px;
  max-height: 85vh;
  border-radius: var(--radius-xl);
  border: var(--stroke-sm) solid rgba(0, 229, 255, 0.3);
  box-shadow: 0 0 40px rgba(0, 229, 255, 0.25);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;

  &-close {
    position: absolute;
    top: var(--space-sm);
    right: var(--space-md);
    background: transparent;
    border: none;
    color: var(--color-white-400);
    font-size: 32px;
    cursor: pointer;
    z-index: 10;
    line-height: 1;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-cyan-400);
    }
  }

  &-content {
    padding: var(--space-lg) var(--space-md);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);

    @include mixins.mq("md") {
      padding: var(--space-xl);
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
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: var(--space-sm);
    font-size: var(--font-size-sm);
    font-family: monospace;
    opacity: 0.8;
  }

  &-tags {
    display: flex;
    gap: var(--space-xxs);
  }

  &-tag {
    font-size: 10px;
    background: rgba(0, 229, 255, 0.15);
    color: var(--color-cyan-400);
    padding: 2px 8px;
    border-radius: 12px;
    text-transform: uppercase;
  }
}

.blog-markdown-body {
  line-height: 1.8;
  font-size: var(--font-size-md);
  color: #e6edf3;

  :deep(h2) {
    font-size: var(--font-size-title-xxs);
    color: var(--color-cyan-400);
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: 700;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 4px;
  }

  :deep(h3) {
    font-size: var(--font-size-md);
    color: var(--color-white-400);
    margin-top: 1.2em;
    margin-bottom: 0.4em;
    font-weight: 700;
  }

  :deep(p) {
    margin-bottom: 1.2em;
  }

  :deep(ul), :deep(ol) {
    margin-bottom: 1.2em;
    padding-left: 1.5em;
  }

  :deep(li) {
    margin-bottom: 0.4em;
  }

  :deep(a) {
    color: var(--color-cyan-400);
    text-decoration: none;
    border-bottom: 1px dashed var(--color-cyan-400);

    &:hover {
      opacity: 0.8;
    }
  }

  :deep(code) {
    background: rgba(110, 118, 129, 0.2);
    padding: 3px 6px;
    border-radius: 6px;
    font-family: monospace;
    font-size: 85%;
  }

  :deep(pre) {
    background: #161b22;
    padding: var(--space-md);
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 1.2em;
    border: 1px solid rgba(255, 255, 255, 0.05);

    code {
      background: transparent;
      padding: 0;
      font-size: 90%;
    }
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.2em;

    th, td {
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 8px 12px;
      text-align: left;
    }

    th {
      background: rgba(255, 255, 255, 0.05);
      font-weight: 700;
    }
  }
}
</style>
