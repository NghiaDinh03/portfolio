import cyberai0 from "../../../assets/images/projects/cyberai/cyberai-0.png";
import cyberai1 from "../../../assets/images/projects/cyberai/cyberai-1.png";

import type { ProjectContent } from "../../types";

export default {
  title: "CyberAI Assessment",
  theme: "dark",
  tags: ["next", "fastapi", "rag", "localai", "security"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/CyberAI-Assessment-project",
  source: "https://github.com/NghiaDinh03/CyberAI-Assessment-project",
  description:
    `<strong>🎯 BÀI TOÁN CẦN GIẢI QUYẾT</strong>
    Kiểm toán an ninh mạng truyền thống tốn nhiều nhân lực, phụ thuộc chuyên gia, và rủi ro rò rỉ log nhạy cảm nếu gửi lên cloud AI. Platform này tự động hoá 80% quy trình đánh giá tuân thủ ISO 27001 / TCVN 11930 hoàn toàn nội bộ — không cần kết nối internet.

    <strong>⚡ TÍNH NĂNG CỐT LÕI</strong>
    • <strong>RAG Chatbot nội bộ:</strong> Truy vấn 21+ bộ tiêu chuẩn bảo mật toàn cầu (ChromaDB) với multi-query expansion — không gửi dữ liệu ra ngoài.
    • <strong>Pipeline đánh giá 2 pha:</strong> Pha 1 tự động GAP analysis; Pha 2 tổng hợp báo cáo kiểm toán chuyên nghiệp theo từng control.
    • <strong>Smart Intent Classifier:</strong> Router thông minh chuyển hướng prompt sang local model (Llama 3.1 / SecurityLLM) hoặc cloud API (Gemini/Claude) dự phòng.
    • <strong>Prometheus Metrics:</strong> Theo dõi latency, active sessions, và tỉ lệ RAG hit/miss theo thời gian thực.

    <strong>🛠️ TECH STACK</strong>
    • <strong>Backend:</strong> FastAPI · Python 3.11 · ChromaDB · Ollama · LocalAI · JWT RBAC · Rate-Limiting
    • <strong>Frontend:</strong> Next.js 15 · TailwindCSS · SSE streaming token real-time
    • <strong>DevOps:</strong> Docker Compose · Prometheus · Modular microservice architecture`,
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: cyberai0,
        alt: "CyberAI Dashboard",
        caption: "[AI Generated Conceptual Image] CyberAI Threat Assessment Dashboard showing security compliance score and metrics.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cyberai1,
        alt: "RAG Chatbot",
        caption: "[AI Generated Conceptual Image] Local RAG Chatbot analyzing security logs offline.",
      },
    },
  ],
} as const satisfies ProjectContent;
