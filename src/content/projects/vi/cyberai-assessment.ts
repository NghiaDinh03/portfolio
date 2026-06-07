import streakon0 from "../../../assets/images/projects/streakon/streakon-0.webp";
import streakon1 from "../../../assets/images/projects/streakon/streakon-1.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Đánh giá An ninh mạng CyberAI",
  theme: "dark",
  tags: ["next", "fastapi", "rag", "localai", "security"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/CyberAI-Assessment-project",
  source: "https://github.com/NghiaDinh03/CyberAI-Assessment-project",
  description:
    "Nền tảng đánh giá an toàn thông tin tích hợp Trí tuệ nhân tạo (AI-Powered Cybersecurity Assessment). Hệ thống tự động hóa báo cáo quét lỗ hổng bảo mật và thu thập tri thức đe dọa (Threat Intelligence) sử dụng RAG Chatbot đa mô hình chạy offline.<br/><br/>Xây dựng trên nền tảng Next.js, FastAPI, LocalAI và các mô hình an ninh mạng chuyên dụng để phân tích mối đe dọa.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: streakon0,
        alt: "Giao diện điều khiển CyberAI",
        caption: "Bảng điều khiển giám sát CyberAI",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: streakon1,
        alt: "RAG Chatbot",
        caption: "Trò chuyện RAG nội bộ để phân tích log",
      },
    },
  ],
} as const satisfies ProjectContent;
