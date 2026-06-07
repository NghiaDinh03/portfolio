<script setup lang="ts">
import { computed } from "vue";
import { marked } from "marked";
import { selectedBlogPost, closeBlogDetail } from "../store";
import { locale } from "../../../i18n/store";

const post = computed(() => selectedBlogPost.value);

const getCleanContent = (content: string) => {
  const cleaned = content.replace(/^---[\s\S]*?---\n/, "");
  return marked(cleaned);
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") closeBlogDetail();
};
</script>

<template>
  <div v-if="post" class="blog-detail" @keydown="handleKeydown" tabindex="-1">
    <div class="blog-detail-hero">
      <img :src="post.thumbnail" :alt="post.title" class="blog-detail-hero-image" />
      <div class="blog-detail-hero-overlay"></div>
      <div class="blog-detail-hero-content">
        <button class="blog-detail-back" @click="closeBlogDetail" data-hoversound="hover">
          <span class="blog-detail-back-arrow">←</span>
          <span>{{ locale === 'vi' ? 'Quay lại' : 'Back' }}</span>
        </button>
        <div class="blog-detail-hero-tags">
          <span v-for="tag in post.tags" :key="tag" class="blog-detail-hero-tag">{{ tag }}</span>
        </div>
        <h1 class="blog-detail-hero-title">{{ post.title }}</h1>
        <div class="blog-detail-hero-meta">
          <span>📅 {{ post.date }}</span>
          <span class="blog-detail-hero-meta-sep">•</span>
          <span>⏱️ {{ post.readTime }}</span>
        </div>
      </div>
    </div>

    <div class="blog-detail-body">
      <div class="blog-detail-container">
        <div class="blog-markdown-body" v-html="getCleanContent(post.content)"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-detail {
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-background-300);
  color: var(--color-text-400);
  overflow-y: auto;
  outline: none;

  &-hero {
    position: relative;
    width: 100%;
    height: 420px;
    overflow: hidden;

    @include mixins.mq("md") {
      height: 520px;
    }
  }

  &-hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(3, 7, 18, 0.45) 0%,
      rgba(3, 7, 18, 0.75) 60%,
      rgba(3, 7, 18, 0.95) 100%
    );
  }

  &-hero-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: var(--space-xl) var(--space-outer);
    max-width: 860px;
    margin: 0 auto;
    left: 0;
    right: 0;
    gap: var(--space-sm);

    @include mixins.mq("md") {
      padding: var(--space-xxl) var(--space-outer);
    }
  }

  &-back {
    position: absolute;
    top: var(--space-md);
    left: var(--space-outer);
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 100px;
    color: #ffffff;
    font-size: var(--font-size-sm);
    font-weight: 600;
    padding: 8px 18px;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.22);
      transform: translateX(-3px);
    }
  }

  &-back-arrow {
    font-size: 1.1em;
    line-height: 1;
  }

  &-hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xxs);
  }

  &-hero-tag {
    font-size: 10px;
    background: rgba(255, 255, 255, 0.18);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 3px 10px;
    border-radius: 20px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.06em;
    backdrop-filter: blur(6px);
  }

  &-hero-title {
    font-size: var(--font-size-title-sm);
    font-weight: 900;
    color: #ffffff;
    line-height: 1.25;

    @include mixins.mq("md") {
      font-size: var(--font-size-title-md);
    }
  }

  &-hero-meta {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: var(--font-size-sm);
    color: rgba(255, 255, 255, 0.75);
    font-weight: 500;
  }

  &-hero-meta-sep {
    opacity: 0.5;
  }

  &-body {
    padding: var(--space-xl) var(--space-outer);
    max-width: 860px;
    margin: 0 auto;
  }

  &-container {
    background: #ffffff;
    border-radius: var(--radius-xl);
    padding: var(--space-xl);
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.06);

    @include mixins.mq("md") {
      padding: var(--space-xxl);
    }
  }
}

.blog-markdown-body {
  line-height: 1.85;
  font-size: var(--font-size-md);
  color: var(--color-text-400);

  :deep(h2) {
    font-size: var(--font-size-title-xxs);
    color: #263c70;
    margin-top: 1.6em;
    margin-bottom: 0.6em;
    font-weight: 700;
    border-bottom: 2px solid #e8e4db;
    padding-bottom: 6px;
  }

  :deep(h3) {
    font-size: var(--font-size-md);
    color: var(--color-text-400);
    margin-top: 1.3em;
    margin-bottom: 0.5em;
    font-weight: 700;
  }

  :deep(p) {
    margin-bottom: 1.3em;
    opacity: 0.9;
  }

  :deep(ul),
  :deep(ol) {
    margin-bottom: 1.3em;
    padding-left: 1.6em;
    opacity: 0.9;
  }

  :deep(li) {
    margin-bottom: 0.5em;
  }

  :deep(a) {
    color: #263c70;
    text-decoration: none;
    border-bottom: 1px dashed #263c70;
    transition: all 0.2s ease;

    &:hover {
      color: var(--color-text-400);
      border-bottom-color: var(--color-text-400);
    }
  }

  :deep(code) {
    background: #f0eee8;
    border: 1px solid #ddd9d0;
    color: #263c70;
    padding: 2px 6px;
    border-radius: 5px;
    font-family: monospace;
    font-size: 88%;
  }

  :deep(pre) {
    background: #f4f1ea;
    padding: var(--space-md);
    border-radius: 10px;
    overflow-x: auto;
    margin-bottom: 1.3em;
    border: 1px solid #ddd9d0;

    code {
      background: transparent;
      border: none;
      padding: 0;
      font-size: 90%;
      color: var(--color-text-400);
    }
  }

  :deep(blockquote) {
    border-left: 4px solid #263c70;
    padding: var(--space-sm) var(--space-md);
    background: #f0ede6;
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    margin: 1.3em 0;
    font-style: italic;
    color: var(--color-text-300);
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.4em;
    font-size: var(--font-size-sm);

    th,
    td {
      border: 1px solid #ddd9d0;
      padding: 10px 14px;
      text-align: left;
    }

    th {
      background: #f0ede6;
      color: #263c70;
      font-weight: 700;
    }

    tr:nth-child(even) {
      background: rgba(0, 0, 0, 0.015);
    }
  }

  :deep(hr) {
    border: none;
    border-top: 1px solid #ddd9d0;
    margin: 2em 0;
  }
}
</style>
