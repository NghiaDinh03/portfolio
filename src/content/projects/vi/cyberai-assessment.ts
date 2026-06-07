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
    `🛡️ <strong>NỀN TẢNG ĐÁNH GIÁ AN NINH MẠNG & TUÂN THỦ TỰ ĐỘNG BẰNG AI</strong><br/>
    Hệ thống cấp doanh nghiệp giúp tự động hóa quy trình đánh giá tuân thủ và phân tích lỗ hổng bảo mật (theo tiêu chuẩn ISO 27001 / TCVN 11930) một cách an toàn trên hạ tầng on-premises.<br/><br/>
    
    <strong>💡 TẠI SAO PHÁT TRIỂN (ĐỘNG LỰC & GIÁ TRỊ DOANH NGHIỆP)</strong><br/>
    Các cuộc đánh giá an toàn thông tin truyền thống thường tốn nhiều tuần lễ, thực hiện thủ công và đòi hỏi chi phí tư vấn lớn. Việc gửi log hệ thống hoặc dữ liệu nhạy cảm lên cloud AI tiềm ẩn nguy cơ rò rỉ thông tin nghiêm trọng. Dự án này được thiết kế để tự động hóa đến 80% quy trình đánh giá tuân thủ hoàn toàn offline, giúp bảo vệ dữ liệu mối đe dọa và log nghiệp vụ trong phạm vi mạng nội bộ của doanh nghiệp.<br/><br/>
    
    <strong>🛠️ TÍNH NĂNG NỔI BẬT</strong><br/>
    • <strong>RAG Chatbot Đa Mô Hình:</strong> Hệ thống truy xuất tài liệu cục bộ (ChromaDB Vector Store) lập chỉ mục hơn 21 tiêu chuẩn bảo mật toàn cầu, hỗ trợ mở rộng truy vấn (multi-query expansion) và lọc độ tin cậy thông minh.<br/>
    • <strong>Quy Trình Đánh Giá AI 2 Pha:</strong> Pha 1 thực hiện phân tích GAP (khoảng cách bảo mật) tự động dựa trên tài liệu tải lên. Pha 2 tổng hợp báo cáo tuân thủ và khuyến nghị kỹ thuật hoàn chỉnh.<br/>
    • <strong>Bộ Phân Loại Ý Định Thông Minh:</strong> Định tuyến prompt linh hoạt để xử lý cục bộ trên các mô hình local (Llama 3.1, SecurityLLM) hoặc chuyển tiếp an toàn sang cloud API (Gemini/Claude) khi cần xử lý các ngữ cảnh phức tạp.<br/>
    • <strong>Giám Sát Prometheus:</strong> Đo lường hiệu năng thời gian thực bao gồm biểu đồ phân bổ độ trễ (latency histogram), session hoạt động, và tỷ lệ hit/miss của RAG.<br/><br/>
    
    <strong>💻 PHƯƠNG PHÁP VIẾT CODE & CÔNG NGHỆ SỬ DỤNG</strong><br/>
    • <strong>Backend:</strong> FastAPI (Python 3.11), ChromaDB, Ollama, LocalAI, xác thực Pydantic, phân quyền JWT RBAC, giới hạn tần suất (Rate-Limiting).<br/>
    • <strong>Frontend:</strong> Next.js 15, TailwindCSS, Server-Sent Events (SSE) để stream token phản hồi của chatbot thời gian thực.<br/>
    • <strong>Kiến Trúc:</strong> Thiết kế Modular sạch phân tách rõ ràng luồng nạp dữ liệu RAG, điều phối suy luận cục bộ, và cổng API Gateway, triển khai đóng gói hoàn chỉnh bằng Docker-Compose.`,
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: cyberai0,
        alt: "Giao diện điều khiển CyberAI",
        caption: "[Ảnh minh họa do AI tạo] Bảng điều khiển đánh giá tuân thủ an ninh mạng hiển thị điểm số và biểu đồ đo lường bảo mật.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cyberai1,
        alt: "RAG Chatbot",
        caption: "[Ảnh minh họa do AI tạo] RAG Chatbot phân tích log hệ thống và đối chiếu tiêu chuẩn bảo mật offline.",
      },
    },
  ],
} as const satisfies ProjectContent;
