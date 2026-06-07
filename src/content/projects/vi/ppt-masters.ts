import ppt0 from "../../../assets/images/projects/ppt-masters/ppt-masters-0.png";
import ppt1 from "../../../assets/images/projects/ppt-masters/ppt-masters-1.png";

import type { ProjectContent } from "../../types";

export default {
  title: "PPT Masters",
  theme: "dark",
  tags: ["python", "llm", "orchestration", "python-pptx"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/ppt-masters",
  source: "https://github.com/NghiaDinh03/ppt-masters",
  description:
    `📊 <strong>CÔNG CỤ TỰ ĐỘNG SOẠN SLIDE THUYẾT TRÌNH BẰNG AI</strong><br/>
    Hệ thống phân tích tự động viết bằng Python giúp chuyển đổi các bài nghiên cứu dài, tài liệu kỹ thuật phức tạp thành các bản thuyết trình slide PowerPoint gốc có thể tùy biến chỉnh sửa và file audio thuyết minh tương ứng.<br/><br/>
    
    <strong>💡 TẠI SAO PHÁT TRIỂN (ĐỘNG LỰC & GIÁ TRỊ DOANH NGHIỆP)</strong><br/>
    Các kỹ sư và quản lý thường mất rất nhiều thời gian để chắt lọc nội dung từ các báo cáo dài và tự căn chỉnh bố cục slide theo cách thủ công. Các công cụ AI tạo slide hiện nay thường chỉ xuất ra file ảnh tĩnh không thể chỉnh sửa hoặc dùng template mẫu đơn điệu. PPT Masters giải quyết vấn đề này bằng cách sử dụng suy luận đa bước của LLM để lập kế hoạch dàn ý, định dạng bố cục slide trực tiếp trên file XML gốc, giúp tiết kiệm 90% thời gian thiết kế nhưng vẫn giữ lại khả năng chỉnh sửa văn bản hoàn toàn.<br/><br/>
    
    <strong>🛠️ TÍNH NĂNG NỔI BẬT</strong><br/>
    • <strong>Quy Trình Xử Lý Đa Bước Phân Tách:</strong> Trải qua 4 pha tự động: Trích xuất ngữ cảnh (đọc file PDF/Word) → Lập kế hoạch slide logic (phân bổ số lượng trang và bullet point phù hợp) → Kết xuất PPTX gốc → Tạo thuyết minh (tự tổng hợp file âm thanh giải thích cho từng slide).<br/>
    • <strong>Bộ Động Cơ Bố Cục Slide Động:</strong> Ánh xạ cấu trúc dữ liệu JSON từ bộ lập kế hoạch sang các tag XML PowerPoint bằng thư viện 'python-pptx', tự động tính toán kích thước hộp chữ và hình ảnh để tránh chồng chéo bố cục.<br/>
    • <strong>Thuyết Minh Âm Thanh Đồng Bộ:</strong> Tự động xuất file ghi âm giọng nói định dạng <code>.wav</code> tóm tắt nội dung slide, hỗ trợ tối đa khi chạy thử bài thuyết trình.<br/>
    • <strong>Điều Phối Chain of Thought:</strong> Kết chuỗi các câu lệnh gợi ý (prompt chain) gửi tới GPT-4/Gemini để đánh giá sự liền mạch giữa các trang, kiểm tra chính tả và tính thẩm mỹ trước khi ghi vào đĩa.<br/><br/>
    
    <strong>💻 PHƯƠNG PHÁP VIẾT CODE & CÔNG NGHỆ SỬ DỤNG</strong><br/>
    • <strong>Lõi Xử Lý:</strong> Python 3.10+, python-pptx, gTTS / pyttsx3 (để tổng hợp giọng nói), các thư viện phân tích PDF/docx.<br/>
    • <strong>Tích Hợp LLM API:</strong> Sử dụng cấu trúc Pydantic để kiểm soát chặt chẽ kiểu dữ liệu trả về từ LLM, ngăn chặn các lỗi hư hỏng file JSON (corrupted JSON) khi sinh dữ liệu động.`,
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: ppt0,
        alt: "Tạo Slide PPT",
        caption: "[Ảnh minh họa do AI tạo] Bộ trích xuất tự động tóm tắt ý chính từ tài liệu văn bản thành dàn ý slide cấu trúc.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: ppt1,
        alt: "Kết xuất Slide",
        caption: "[Ảnh minh họa do AI tạo] Bản xem trước các trang slide PowerPoint gốc được kết xuất động bằng mã nguồn python-pptx.",
      },
    },
  ],
} as const satisfies ProjectContent;
