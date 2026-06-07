import gemma0 from "../../../assets/images/projects/gemma-chat/gemma-chat-0.png";
import gemma1 from "../../../assets/images/projects/gemma-chat/gemma-chat-1.png";

import type { ProjectContent } from "../../types";

export default {
  title: "Gemma Chat Desktop",
  theme: "dark",
  tags: ["electron", "vite", "typescript", "tailwind", "gemma"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/gemma-chat",
  source: "https://github.com/NghiaDinh03/gemma-chat",
  description:
    "Ứng dụng máy tính bảo mật trò chuyện ngoại tuyến (offline) tích hợp mô hình ngôn ngữ lớn Google Gemma. Cho phép suy luận cục bộ bảo mật, tùy chỉnh giao diện và xuất lịch sử trò chuyện mà không gửi dữ liệu lên đám mây.<br/><br/>Được xây dựng bằng Electron, Vite, TypeScript và TailwindCSS, tối ưu hóa trải nghiệm tương tác với các mô hình chạy local.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: gemma0,
        alt: "Gemma Chat Interface",
        caption: "Giao diện trò chuyện chính với mô hình Gemma",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gemma1,
        alt: "Local LLM Integration",
        caption: "Cài đặt tham số và câu lệnh gợi ý offline",
      },
    },
  ],
} as const satisfies ProjectContent;
