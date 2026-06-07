import { ref, computed } from "vue";
import type { BlogPost } from "../../content/blogs";

export const selectedBlogPost = ref<BlogPost | null>(null);

export const blogDetailVisible = computed(() => selectedBlogPost.value !== null);

export const openBlogDetail = (post: BlogPost) => {
  selectedBlogPost.value = post;
  document.body.style.overflow = "hidden";
};

export const closeBlogDetail = () => {
  selectedBlogPost.value = null;
  document.body.style.overflow = "";
};
