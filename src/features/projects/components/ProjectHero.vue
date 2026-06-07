<script setup lang="ts">
import Tag from "../../../components/Tag.vue";
import Button from "../../../components/Button.vue";
import { t } from "../../../i18n/utils/translate";
import Link from "../../../components/Link.vue";
import { projectId } from "../../../composables/useRouteObserver";
import { ref, watch } from "vue";

import type { ProjectContent } from "../../../content/types";

const { content } = defineProps<{
  content: ProjectContent;
}>();

const animationKey = ref(0);

// Force animation restart when projectId changes
watch(projectId, () => {
  animationKey.value++;
});
</script>

<template>
  <div class="project-hero">
    <div class="project-hero-layout">
      <div class="project-hero-left">
        <div class="project-hero-top">
          <div class="project-hero-title-wrapper">
            <h1 class="project-hero-title" :key="animationKey">
              {{ content.title }}
            </h1>
          </div>
          <div class="project-hero-tags">
            <Tag v-for="tag in content.tags" :key="tag" :variant="tag" />
          </div>
        </div>
        <p class="project-hero-description" v-html="content.description"></p>
        <div class="project-hero-buttons">
          <Link v-if="content.live" :href="content.live" external class="project-hero-button" data-cursor="arrow-external">
            <Button renderAs="div" variant="accent" class="children-unclickable" data-hoversound="hover">{{ t("live-view") }}</Button>
          </Link>
          <Link
            v-if="content.source"
            :href="content.source"
            external
            class="project-hero-button"
            data-cursor="arrow-external"
          >
            <Button renderAs="div" variant="border" class="children-unclickable" data-hoversound="hover">{{ t("source-code") }}</Button>
          </Link>
        </div>
      </div>
      <div class="project-hero-right" v-if="content.components && content.components[0]">
        <div class="project-hero-image-card">
          <img
            :src="(content.components[0] as any).props.src"
            :alt="(content.components[0] as any).props.alt"
            class="project-hero-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-hero {
  padding: 0 var(--space-outer);
  padding-top: calc(var(--height-header) + 32px);
  padding-bottom: 48px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @include mixins.mq("md") {
    padding-bottom: 64px;
  }

  &-layout {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);

    @include mixins.mq("md") {
      flex-direction: row;
      align-items: flex-start;
      gap: var(--space-xxl);
    }
  }

  &-left {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    flex: 1;
    min-width: 0;

    @include mixins.mq("md") {
      flex: 1 1 55%;
    }
  }

  &-right {
    flex: 1;

    @include mixins.mq("md") {
      flex: 1 1 42%;
      position: sticky;
      top: calc(var(--height-header) + 24px);
    }
  }

  &-image-card {
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    border: var(--stroke-sm) solid var(--color-grayscale-500);
    background: var(--color-grayscale-400);
  }

  &-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }

  &-button {
    flex: 0.5;

    @include mixins.mq("md") {
      width: fit-content;
      flex: unset;
    }
  }

  &-buttons {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    width: 100%;
    flex-wrap: wrap;

    @include mixins.mq("md") {
      gap: var(--space-md);
      width: fit-content;
    }
  }

  &-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  &-title {
    font-size: var(--font-size-title-lg);
    color: var(--color-text-400);
    line-height: var(--line-height-title);
    transform: translateY(0%);
    animation: project-hero-title-visible 0.5s var(--ease-smooth);

    @include mixins.mq("md") {
      font-size: var(--font-size-title-xl);
    }

    @keyframes project-hero-title-visible {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }

    &-wrapper {
      overflow: hidden;
    }
  }

  &-description {
    color: var(--color-text-400);
    line-height: 1.9;
    font-size: var(--font-size-md);

    :deep(strong) {
      color: var(--color-text-400);
      display: block;
      margin-top: var(--space-md);
      margin-bottom: var(--space-xs);
      font-size: var(--font-size-sm);
      letter-spacing: 0.04em;
      opacity: 0.7;

      &:first-child {
        margin-top: 0;
      }
    }

    :deep(br) {
      display: none;
    }

    @include mixins.mq("lg") {
      font-size: var(--font-size-lg);
    }
  }

  &-top {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
}
</style>
