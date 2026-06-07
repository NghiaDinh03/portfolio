<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Button from "../../../components/Button.vue";
import Banner from "../../../components/Banner.vue";
import { preloaderVisible } from "../../../composables/usePreloader";
import { t } from "../../../i18n/utils/translate";
import AppearingText from "../../../components/AppearingText.vue";

const roleKeys = ["job-title-1", "job-title-2", "job-title-3"];
const currentRoleIndex = ref(0);
const currentRole = computed(() => t(roleKeys[currentRoleIndex.value]));

let intervalId = null;

onMounted(() => {
  intervalId = setInterval(() => {
    currentRoleIndex.value = (currentRoleIndex.value + 1) % roleKeys.length;
  }, 4000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="hero">
    <div class="hero-content grid">
      <div class="hero-content-inner" id="hero-content-inner">
        <!-- Khung Sci-Fi Hologram trang trí bức tường bên trái -->
        <div class="hero-holo-frame" v-if="!preloaderVisible">
          <div class="holo-corner top-left"></div>
          <div class="holo-corner top-right"></div>
          <div class="holo-corner bottom-left"></div>
          <div class="holo-corner bottom-right"></div>
          
          <div class="holo-status">ND-03 // SYSTEM ACTIVE</div>

          <div class="hero-content-copys">
            <div class="hero-title-wrapper">
              <h1 class="hero-title">Nghĩa<br />Đinh</h1>
              <Banner class="hero-banner" :copy="currentRole" animated />
            </div>
            <div class="hero-slogan">
              <AppearingText :text="t('slogan')" :steps="2" :duration="0.8" @timeline:created="tl => tl.play()" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  max-height: calc(var(--lvh) * 100);
  height: calc(var(--lvh) * 100);
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;

  &-content {
    align-items: center;
    justify-content: center;
    height: 46%;

    @include mixins.landscape {
      height: 100%;

      @include mixins.mq("md") {
        padding-bottom: 30%;
      }

      @include mixins.mq("lg") {
        padding-bottom: 5%;
      }
    }

    &-inner {
      transform-origin: center center;
      grid-column: 1 / 13;
      gap: var(--space-xxl);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: fit-content;
      position: relative;
      left: 50%;
      transform: translateX(-50%);

      @include mixins.landscape {
        left: 0;
        transform: translateX(0);
        grid-column: 2 / 13;
        width: fit-content;
      }
    }

    &-copys {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);

      @include mixins.mq("md") {
        gap: var(--space-sm);
      }
    }

    &-button {
      width: fit-content;
    }
  }

  &-title-wrapper {
    position: relative;
    width: fit-content;
  }

  &-title {
    font-family: "Times New Roman", Times, serif;
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: var(--font-size-title-lg);

    @include mixins.landscape {
      font-size: var(--font-size-title-lg);
    }

    @include mixins.landscape-large {
      @include mixins.mq("sm") {
        font-size: var(--font-size-title-xl);
      }

      @include mixins.mq("xl") {
        font-size: var(--font-size-title-xxl);
      }
    }
  }

  &-banner {
    position: absolute;
    bottom: -6px;
    right: -24px;
    z-index: 10;
    transform: rotate(-5deg);

    @include mixins.mq("sm") {
      right: -32px;
      bottom: -8px;
    }

    @include mixins.mq("lg") {
      right: -40px;
      bottom: -10px;
    }
  }

  &-slogan {
    font-family: "Urbanist", sans-serif;
    font-weight: 700;
    font-size: var(--font-size-xxs);
    color: #263c70;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-top: 16px;
    z-index: 5;
    opacity: 0.85;

    @include mixins.mq("md") {
      font-size: var(--font-size-xs);
      margin-top: 20px;
    }

    @include mixins.mq("lg") {
      font-size: var(--font-size-sm);
      margin-top: 24px;
    }
  }

  &-holo-frame {
    position: relative;
    padding: var(--space-md) var(--space-lg);
    border: 1px solid rgba(0, 229, 255, 0.15);
    background: rgba(0, 229, 255, 0.01);
    border-radius: var(--radius-sm);
    backdrop-filter: blur(1px);
    animation: holoPulse 4s infinite ease-in-out;
    width: fit-content;

    @include mixins.mq("md") {
      padding: var(--space-lg) var(--space-xl);
    }
  }
}

.holo-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid #00e5ff;

  &.top-left {
    top: -2px;
    left: -2px;
    border-right: none;
    border-bottom: none;
  }
  &.top-right {
    top: -2px;
    right: -2px;
    border-left: none;
    border-bottom: none;
  }
  &.bottom-left {
    bottom: -2px;
    left: -2px;
    border-right: none;
    border-top: none;
  }
  &.bottom-right {
    bottom: -2px;
    right: -2px;
    border-left: none;
    border-top: none;
  }
}

.holo-status {
  position: absolute;
  top: -16px;
  left: 8px;
  font-family: "ProFontWindows", monospace;
  font-size: 9px;
  color: #00e5ff;
  letter-spacing: 0.1em;
  opacity: 0.8;
}

@keyframes holoPulse {
  0%, 100% {
    border-color: rgba(0, 229, 255, 0.12);
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.02);
  }
  50% {
    border-color: rgba(0, 229, 255, 0.25);
    box-shadow: 0 0 25px rgba(0, 229, 255, 0.06);
  }
}
</style>
