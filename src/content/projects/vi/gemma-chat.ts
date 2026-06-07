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
    `💬 <strong>TRÌNH TRÒ CHUYỆN & TÁC NHÂN LẬP TRÌNH AI CHẠY OFFLINE</strong><br/>
    Ứng dụng máy tính nguồn mở giúp trò chuyện và lập trình tự động (vibe coding) hoàn toàn offline trên phần cứng Apple Silicon sử dụng mô hình Google Gemma 4.<br/><br/>
    
    <strong>💡 TẠI SAO PHÁT TRIỂN (ĐỘNG LỰC & GIÁ TRỊ DOANH NGHIỆP)</strong><br/>
    Các công cụ AI phổ biến hiện nay luôn yêu cầu kết nối internet và gửi mã nguồn dự án lên các server đám mây, tạo ra rủi ro lộ mã nguồn và dữ liệu mật của công ty. Gemma Chat được thiết kế để chứng minh khả năng lập trình cục bộ. Người dùng có thể mô tả ý tưởng, viết code, tạo các file HTML/JS/CSS và xem kết quả trực quan (live preview) ngay trên máy tính mà không cần tới mạng Wi-Fi hay tài khoản API trả phí nào.<br/><br/>
    
    <strong>🛠️ TÍNH NĂNG NỔI BẬT</strong><br/>
    • <strong>Chế Độ Lập Trình Tác Nhân (Build Mode):</strong> Hệ thống thực thi tự động lập kế hoạch, sử dụng các công cụ cục bộ (tạo/ghi file, liệt kê thư mục, chạy lệnh bash) và cập nhật khung xem trước thời gian thực.<br/>
    • <strong>Giao Thức Tool Chạy Local Bằng XML:</strong> Sử dụng định dạng XML để ra lệnh cho mô hình nhỏ (Small Model) xử lý logic chính xác hơn thay vì định dạng JSON function calling thông thường vốn dễ bị lỗi cú pháp.<br/>
    • <strong>Pipeline Cập Nhật Live Preview:</strong> Tự động ghi đè nội dung file trong vùng đệm an toàn (sandbox) và làm mới iframe kết xuất mã nguồn tự động mỗi 450ms khi mô hình đang stream code.<br/>
    • <strong>Nhận Diện Giọng Nói Ngoại Tuyến:</strong> Tích hợp bộ chuyển đổi giọng nói thành văn bản (Speech-to-Text) cục bộ dựa trên Whisper (WASM chạy trực tiếp trên trình duyệt) đi kèm bộ công cụ bash, máy tính, fetch URL.<br/><br/>
    
    <strong>💻 PHƯƠNG PHÁP VIẾT CODE & CÔNG NGHỆ SỬ DỤNG</strong><br/>
    • <strong>Giao Diện & Vỏ App:</strong> Electron, React 19, Vite, TypeScript, TailwindCSS.<br/>
    • <strong>Hạ Tầng Suy Luận:</strong> Apple MLX-LM chạy trong môi trường ảo Python (venv) tự động khởi tạo trên thiết bị, tận dụng tối đa kiến trúc Bộ nhớ thống nhất (Unified Memory).<br/>
    • <strong>Sandbox Cục Bộ:</strong> Máy chủ tệp tĩnh HTTP cục bộ phục vụ kết xuất mã nguồn động trong môi trường cô lập, bảo vệ máy chủ chính.`,
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: gemma0,
        alt: "Gemma Chat Interface",
        caption: "[Ảnh minh họa do AI tạo] Giao diện trò chuyện chính và viết code offline với mô hình Gemma 4 chạy local.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gemma1,
        alt: "Local LLM Integration",
        caption: "[Ảnh minh họa do AI tạo] Bộ chuyển đổi mô hình và tinh chỉnh thông số suy luận cục bộ trong ứng dụng.",
      },
    },
  ],
} as const satisfies ProjectContent;
