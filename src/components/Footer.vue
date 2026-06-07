<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ref as dbRef, get, runTransaction } from "firebase/database";
import { db } from "../utils/firebase";
import Social from "./Social.vue";
import Link from "./Link.vue";
import Clickable from "./Clickable.vue";
import LangSwitch from "./LangSwitch.vue";
import NotchSection from "./NotchSection.vue";
import { t } from "../i18n/utils/translate";
import { locale } from "../i18n/store";
import ButtonRound from "./ButtonRound.vue";
import { lenis } from "../composables/useScroll";
import ArrowRightLong from "./icons/ArrowRightLong.vue";

interface Props {
  withSocial?: boolean;
}

const handleBackToTop = () => {
  if (!lenis.value) return;
  lenis.value.scrollTo(0);
};

const { withSocial = true } = defineProps<Props>();

const viewCount = ref<number | string>("...");

onMounted(() => {
  // Load saved count from local storage immediately so UI is never stuck at "..."
  const savedCount = localStorage.getItem("saved_view_count");
  if (savedCount) {
    viewCount.value = parseInt(savedCount);
  }

  const viewsRef = dbRef(db, "views");

  // Fetch initial count from Firebase
  get(viewsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        viewCount.value = val;
        localStorage.setItem("saved_view_count", val.toString());
      }
    })
    .catch(() => {});

  // Increment after 10 seconds, enforcing a 16-hour cooldown per device
  setTimeout(() => {
    const COOLDOWN_HOURS = 16;
    const lastViewed = localStorage.getItem("last_viewed_portfolio");
    const now = Date.now();

    if (!lastViewed || now - parseInt(lastViewed) > COOLDOWN_HOURS * 60 * 60 * 1000) {
      runTransaction(viewsRef, (currentViews) => {
        return (currentViews || 0) + 1;
      })
        .then((result) => {
          if (result.committed) {
            const newCount = result.snapshot.val();
            viewCount.value = newCount;
            localStorage.setItem("last_viewed_portfolio", now.toString());
            localStorage.setItem("saved_view_count", newCount.toString());
          }
        })
        .catch(() => {});
    }
  }, 10000);
});
</script>

<template>
  <footer class="footer">
    <NotchSection class="footer-notch" />
    <div class="footer-content">
      <div
        class="footer-back-to-top"
        tabindex="0"
        @click="handleBackToTop"
        @keydown.enter="handleBackToTop"
        data-cursor="circle-white"
        data-sound="click"
      >
        <ButtonRound renderAs="div" variant="border" class="children-unclickable" data-hoversound="hover">
          <ArrowRightLong class="footer-back-to-top-icon" />
        </ButtonRound>
      </div>
      <div class="footer-top">
        <Social v-if="withSocial" />
        <div class="footer-top-links">
          <div class="footer-top-links-legal">
            <Clickable renderAs="div">
              <Link
                :href="locale === 'vi' ? '/vi/privacy' : '/privacy'"
                class="footer-link"
                :external="true"
                data-cursor="circle-white"
                data-sound="click"
                data-hoversound="hover"
                >{{ t("privacy") }}</Link
              >
            </Clickable>
            <Clickable renderAs="div">
              <Link
                :href="locale === 'vi' ? '/vi/legal' : '/legal'"
                class="footer-link children-unclickable"
                :external="true"
                data-cursor="circle-white"
                data-sound="click"
                data-hoversound="hover"
                >{{ t("legal") }}</Link
              >
            </Clickable>
          </div>
          <LangSwitch />
        </div>
      </div>
      <div class="footer-credits">
        <div class="footer-credits-music">
          <p>
            {{ t("music-produced-by") }}
          </p>
          <Clickable renderAs="div">
            <Link
              href="https://soundcloud.com/hmsurf"
              class="footer-link children-unclickable"
              external
              data-cursor="circle-white"
              data-hoversound="hover"
              >HM Surf</Link
            >
          </Clickable>
        </div>
        <div class="footer-views" style="margin-top: 10px;">
          <div style="background: rgba(10, 10, 10, 0.5); color: #fff; border-radius: 4px; padding: 4px 10px; font-size: 11px; display: inline-block; border: 1px solid rgba(0, 229, 255, 0.2); font-family: monospace;">
            <span style="background: rgba(0, 229, 255, 0.1); padding: 2px 6px; margin-right: 6px; border-radius: 3px; color: #00e5ff;">Profile Views</span> 
            <span style="font-weight: bold; color: #fff;">{{ viewCount }}</span>
          </div>
        </div>
        <p>© {{ new Date().getFullYear() }} Nghĩa Đinh</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--color-background-300, var(--color-beige-400));
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xl);
    width: 100%;
    max-width: calc(var(--breakpoint-xxxl));
    padding: calc(var(--space-outer) + var(--space-sm)) var(--space-outer);
    position: relative;
  }

  &-back-to-top {
    cursor: pointer;

    @include mixins.mq("md") {
      position: absolute;
      top: calc(var(--space-outer) + var(--space-sm));
      left: 50%;
      transform: translateX(-50%);
    }

    &-icon {
      transform: rotate(-90deg);
    }
  }

  &-top {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-xl);

    @include mixins.mq("md") {
      gap: var(--space-md);
      flex-direction: row;
    }

    &-links {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      gap: var(--space-md);

      &-legal {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
      }

      @include mixins.mq("md") {
        gap: var(--space-lg);
        flex-direction: row;
        position: relative;
        margin-left: auto;
      }
    }
  }

  &-link {
    font-weight: 700;
  }

  &-credits {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    width: 100%;
    font-size: var(--font-size-sm);
    text-align: center;

    &-built,
    &-music {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--space-xxs);
    }
  }

  &-notch {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    color: var(--color-background-300, var(--color-beige-400));
    --icon-color: var(--color-background-300, var(--color-beige-400));
  }
}
</style>
