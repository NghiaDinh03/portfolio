import thumbnailCyberAI from "../../../assets/thumbnails/cyberai-assessment.png";
import thumbnailPPTMasters from "../../../assets/thumbnails/ppt-masters.png";
import thumbnailAutoVietsub from "../../../assets/thumbnails/autovietsub-pipeline.png";
import thumbnailTheHive from "../../../assets/thumbnails/thehive-migration.png";
import thumbnailN8n from "../../../assets/thumbnails/n8n-automation.png";
import thumbnailGemmaChat from "../../../assets/thumbnails/gemma-chat.png";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "CyberAI Assessment",
    slug: "cyberai-assessment",
    thumbnail: thumbnailCyberAI,
    description: "Nền tảng đánh giá an ninh mạng AI RAG",
  },
  {
    title: "PPT Masters",
    slug: "ppt-masters",
    thumbnail: thumbnailPPTMasters,
    description: "Công cụ tạo slide thuyết trình tự động bằng AI",
  },
  {
    title: "Auto Vietsub Pipeline",
    slug: "autovietsub-pipeline",
    thumbnail: thumbnailAutoVietsub,
    description: "Hệ thống tự động tạo phụ đề video bằng AI",
  },
  {
    title: "TheHive Migration",
    slug: "thehive-migration",
    thumbnail: thumbnailTheHive,
    description: "Giải pháp giám sát và phản ứng sự cố an ninh mạng",
  },
  {
    title: "n8n Automation",
    slug: "n8n-automation",
    thumbnail: thumbnailN8n,
    description: "Hạ tầng tự động hóa quy trình nghiệp vụ bảo mật",
  },
  {
    title: "Gemma Chat Desktop",
    slug: "gemma-chat",
    thumbnail: thumbnailGemmaChat,
    description: "Ứng dụng máy tính trò chuyện ngoại tuyến với Google Gemma",
  },
] as const satisfies ProjectPreview[];
