<script setup lang="ts">
import { ref, computed } from "vue";
import { blogPosts } from "../../../content/blogs";
import { t } from "../../../i18n/utils/translate";
import { locale } from "../../../i18n/store";
import { openBlogDetail } from "../store";

const searchQuery = ref("");
const selectedTag = ref("All");

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
        @click="openBlogDetail(post)"
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
  </div>
</template>

<style scoped lang="scss">
.blog-section {
  width: 100%;
  padding: var(--space-outer);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  color: var(--color-text-400);
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
  color: var(--color-text-400);
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
  background: #ffffff;
  border: var(--stroke-sm) solid var(--color-grayscale-500);
  border-radius: var(--radius-lg);
  color: var(--color-text-400);
  padding: var(--space-xs) var(--space-sm);
  outline: none;
  font-family: "Times New Roman", Times, serif;
  font-weight: 600;
  font-size: var(--font-size-sm);
  transition: all 0.25s ease-in-out;
  min-width: 180px;

  &::placeholder {
    color: var(--color-text-300);
  }

  &:focus {
    border-color: #263c70;
    box-shadow: 0 4px 12px rgba(38, 60, 112, 0.08);
  }
}

.blog-filter {
  background: #ffffff;
  border: var(--stroke-sm) solid var(--color-grayscale-500);
  border-radius: var(--radius-lg);
  color: var(--color-text-400);
  padding: var(--space-xs) var(--space-sm);
  outline: none;
  font-family: "Times New Roman", Times, serif;
  font-weight: 600;
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: all 0.25s ease-in-out;

  &:focus, &:hover {
    border-color: #263c70;
    box-shadow: 0 4px 12px rgba(38, 60, 112, 0.08);
  }
}

.blog-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);

  @include mixins.mq("md") {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mixins.mq("xl") {
    grid-template-columns: repeat(3, 1fr);
  }
}

.blog-card {
  --hover: 0;
  position: relative;
  border-radius: var(--radius-xl);
  overflow: visible;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding-bottom: var(--space-xs);
  transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);

  &::after {
    content: "";
    position: absolute;
    top: -8px;
    left: -8px;
    width: calc(100% + 16px);
    height: calc(100% + 16px);
    background-color: var(--color-grayscale-400);
    border-radius: var(--radius-xl);
    z-index: -1;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease-in-out;
  }

  &:hover {
    --hover: 1;

    &::after {
      opacity: 1;
    }

    .blog-card-image {
      transform: scale(1.02);
    }
  }

  &-image-wrapper {
    width: 100%;
    aspect-ratio: 5/3;
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-lg);
    background-color: var(--color-beige-500);
    max-height: 200px;

    .blog-card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .blog-card-badge {
      position: absolute;
      top: var(--space-sm);
      right: var(--space-sm);
      background: #263c70;
      color: var(--color-white-400);
      font-size: 10px;
      font-family: "Times New Roman", Times, serif;
      font-weight: 700;
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
      background: rgba(0, 0, 0, 0.05);
      transition: background 0.4s ease;
      z-index: 1;
    }
  }

  &-info {
    padding-top: var(--space-sm);
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
    flex-grow: 1;
  }

  &-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--font-size-xs);
    margin-bottom: var(--space-xxs);
  }

  &-date {
    color: var(--color-text-300);
    font-weight: 500;
  }

  &-tags {
    display: flex;
    gap: var(--space-xxs);
  }

  &-tag {
    font-size: 9px;
    background: var(--color-grayscale-400);
    color: var(--color-text-300);
    border: 1px solid var(--color-grayscale-500);
    padding: 2px 8px;
    border-radius: 10px;
    text-transform: uppercase;
    font-family: "Times New Roman", Times, serif;
    font-weight: 600;
  }

  &-title {
    font-size: var(--font-size-title-xs);
    font-weight: 700;
    color: var(--color-text-400);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: var(--space-xxs);
  }

  &-excerpt {
    font-size: var(--font-size-sm);
    color: var(--color-text-300);
    font-weight: 500;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-grow: 1;
    margin-bottom: var(--space-xs);
  }

  &-footer {
    display: flex;
    justify-content: flex-start;
  }

  &-link {
    color: #263c70;
    font-weight: 700;
    font-family: "Times New Roman", Times, serif;
    font-size: var(--font-size-sm);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;

    &:hover {
      transform: translateX(4px);
    }
  }
}

.blog-empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--space-xxl) 0;
  color: var(--color-text-300);
  font-weight: 500;
}
</style>
