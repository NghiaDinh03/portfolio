<script setup lang="ts">
import { ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { t } from "../../../i18n/utils/translate";
import AppearingText from "../../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../../utils/sizes";
import { Vector3 } from "three";
import ProjectedElement from "../../../components/ProjectedElement.vue";
import GraduationIcon from "../../../components/icons/Graduation.vue";
import UserIcon from "../../../components/icons/UserIcon.vue";

const point = new Vector3(0.8, 1.3, 6.75);

const wrapperRef = ref<HTMLDivElement | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
let matchMedia: gsap.MatchMedia | null = null;

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

watchEffect((onInvalidate) => {
  const wrapperEl = wrapperRef.value;
  if (!wrapperEl) return;

  if (matchMedia) {
    matchMedia.revert();
    matchMedia = null;
  }

  matchMedia = gsap.matchMedia();

  matchMedia.add(
    {
      isMobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
      isDesktop: `(min-width: ${BREAKPOINTS.md}px)`,
    },
    (context) => {
      const { conditions } = context;
      const { isMobile } = conditions as { isMobile: boolean; isDesktop: boolean };

      const tl = gsap.timeline({
        paused: true,
      });

      // Only animate clipPath on desktop (hide on mobile)
      if (!isMobile) {
        tl.fromTo(
          wrapperEl,
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.35, ease: "none" },
          0,
        );
      } else {
        gsap.set(wrapperEl, { clipPath: "inset(0% 0% 0% 0%)" });
      }

      for (let i = 0; i < timelines.value.length; i++) {
        const item = timelines.value[i];
        if (!item) continue;
        tl.add(() => {
          item.timeline.restart(true);
        }, item.delay + 0.2);
      }

      emit("timeline:created", tl);

      return () => {
        tl.kill();
      };
    },
  );

  onInvalidate(() => {
    if (matchMedia) {
      matchMedia.revert();
      matchMedia = null;
    }
  });
});

onBeforeUnmount(() => {
  if (matchMedia) {
    matchMedia.revert();
  }
});

const handleTimelineCreated = (timeline: gsap.core.Timeline, delay: number) => {
  timelines.value = [...timelines.value, { timeline, delay }];
};
</script>

<template>
  <ProjectedElement :point="point">
    <div ref="wrapperRef" class="box-education">
      <div class="box-education-content">
        <div class="box-education-item">
          <GraduationIcon class="box-education-icon" />
          <div class="box-education-text-group">
            <span class="box-education-label">
              <AppearingText
                :text="t('education-label')"
                :steps="1"
                :duration="0.3"
                @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
              />
            </span>
            <span class="box-education-value">
              <span class="bullet">-</span>
              <AppearingText
                :text="t('education-school-1')"
                :steps="2"
                :duration="0.4"
                @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.15)"
              />
            </span>
            <span class="box-education-value">
              <span class="bullet">-</span>
              <AppearingText
                :text="t('education-school-2')"
                :steps="2"
                :duration="0.4"
                @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.3)"
              />
            </span>
          </div>
        </div>
        <div class="box-education-item">
          <UserIcon class="box-education-icon" />
          <div class="box-education-text-group">
            <span class="box-education-label">
              <AppearingText
                :text="t('age-label')"
                :steps="1"
                :duration="0.3"
                @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.2)"
              />
            </span>
            <span class="box-education-value">
              <AppearingText
                :text="t('age-value')"
                :steps="1"
                :duration="0.3"
                @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.35)"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </ProjectedElement>
</template>

<style scoped lang="scss">
.box-education {
  --line-length: min(48px, calc(var(--svw) * 5));

  display: none;

  @include mixins.landscape {
    display: block;
    position: relative;
    padding-left: var(--line-length);
    padding-top: 3px;
    width: 420px;
    max-width: calc(var(--svw) * 45);
    transform: translate(0, -50%);
  }

  @include mixins.landscape-large {
    width: 420px;
  }

  &::after,
  &::before {
    display: none;

    @include mixins.landscape {
      display: block;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 11px;
    height: 11px;
    background-color: var(--color-cyan-400);
    border-radius: 50%;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: var(--line-length);
    height: 0;
    border-top: var(--stroke-sm) solid var(--color-cyan-400);
  }

  &-content {
    border: var(--stroke-sm) solid var(--color-cyan-400);
    border-radius: var(--radius-md);
    background: linear-gradient(to bottom, var(--color-hologram-top) 0%, var(--color-hologram-bottom) 100%);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding: var(--space-xs) var(--space-sm);

    @include mixins.mq("md") {
      padding: var(--space-sm) var(--space-md);
    }
  }

  &-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    flex-direction: row;
  }

  &-icon {
    width: var(--icon-size-xs);
    height: var(--icon-size-xs);
    --icon-color: var(--color-white-400);
    flex-shrink: 0;
    transform: translateY(2px);

    @include mixins.mq("md") {
      width: var(--icon-size-sm);
      height: var(--icon-size-sm);
    }
  }

  &-text-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &-label {
    font-family: "Times New Roman", Times, serif;
    font-weight: 700;
    font-size: var(--font-size-xs);
    color: var(--color-text-cyan-400);
    text-transform: uppercase;
    letter-spacing: 0.05em;

    @include mixins.mq("md") {
      font-size: var(--font-size-sm);
    }
  }

  &-value {
    font-size: var(--font-size-sm);
    color: var(--color-white-400);
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    gap: 6px;

    .bullet {
      color: var(--color-cyan-400);
      flex-shrink: 0;
    }

    @include mixins.mq("md") {
      font-size: var(--font-size-md);
    }
  }
}
</style>
