import vietsub0 from "../../../assets/images/projects/autovietsub/autovietsub-0.png";
import vietsub1 from "../../../assets/images/projects/autovietsub/autovietsub-1.png";

import type { ProjectContent } from "../../types";

export default {
  title: "Auto Vietsub Pipeline",
  theme: "dark",
  tags: ["n8n", "ffmpeg", "gemini", "gemma", "automation"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/custom_ffmpeg_ND03",
  source: "https://github.com/NghiaDinh03/custom_ffmpeg_ND03",
  description:
    "Hệ thống tự động hóa hoàn toàn quy trình trích xuất âm thanh từ video, dịch thuật bằng mô hình AI (LLM), và chèn phụ đề tiếng Việt chính xác trực tiếp vào video (burn vietsub).<br/><br/>Điều phối tự động qua n8n, sử dụng FFmpeg để xử lý video và mô hình Gemini/Gemma để dịch nghĩa chính xác.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: vietsub0,
        alt: "Quy trình n8n",
        caption: "Tổng quan luồng tự động hóa n8n",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: vietsub1,
        alt: "Chèn Vietsub",
        caption: "FFmpeg render và mã hóa phụ đề vào video",
      },
    },
  ],
} as const satisfies ProjectContent;
