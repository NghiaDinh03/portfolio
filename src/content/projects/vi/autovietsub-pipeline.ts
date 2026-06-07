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
    `🎬 <strong>HỆ THỐNG TỰ ĐỘNG DỊCH THUẬT & LÀM PHỤ ĐỀ VIDEO HÀNG LOẠT</strong><br/>
    Hệ thống bất đồng bộ dạng monorepo giúp tự động hóa khép kín quy trình sản xuất phụ đề video: tải video → nhận diện tiếng nói → dịch thuật AI → chèn cứng phụ đề (burn-in) cho các nhà sáng tạo nội dung YouTube/TikTok.<br/><br/>
    
    <strong>💡 TẠI SAO PHÁT TRIỂN (ĐỘNG LỰC & GIÁ TRỊ DOANH NGHIỆP)</strong><br/>
    Việc tự dịch và làm phụ đề video thủ công cực kỳ tốn thời gian, mất từ 1 đến vài tiếng cho một video ngắn. Các công cụ làm sub tự động trên cloud thì đắt đỏ và bị giới hạn tùy biến kiểu chữ, vị trí hiển thị. Hệ thống này được xây dựng để xử lý hàng loạt kênh video tự động, giúp giảm 90% chi phí vận hành bằng cách tận dụng năng lực CPU local để transcribe/render và tích hợp fallback API cloud thông minh.<br/><br/>
    
    <strong>🛠️ TÍNH NĂNG NỔI BẬT</strong><br/>
    • <strong>Kiến Trúc Master-Worker Bất Đồng Bộ:</strong> Sử dụng hàng đợi Redis (RQ) để tách biệt API endpoint nhận job với các worker xử lý nặng, tránh tình trạng treo hoặc sập container khi có nhiều yêu cầu render cùng lúc.<br/>
    • <strong>Nhận Diện Tiếng Nói Đa Ngữ (Speech-to-Text):</strong> Tích hợp mô hình faster-whisper (định dạng lượng hóa int8 tối ưu cho CPU) chạy local giúp dịch âm thanh thành văn bản cực nhanh với tài nguyên RAM tối thiểu.<br/>
    • <strong>Cơ Chế Fallback Dịch Thuật Thông Minh:</strong> Dịch các đoạn phụ đề gốc bằng mô hình Gemini 2.5 Flash thông qua API cloud. Khi bị giới hạn tần suất (rate limit) hoặc mất mạng, hệ thống tự động fallback sang Ollama chạy local (Gemma 3 4B) để dịch tiếp mà không làm gián đoạn pipeline.<br/>
    • <strong>Mã Hóa & Chèn Cứng Phụ Đề Bằng FFmpeg:</strong> Pipeline FFmpeg đa luồng tự động tách âm thanh mono, định dạng style SRT tùy biến (sử dụng thư viện libass) và render chèn cứng vào video <code>.mp4</code> đầu ra, đồng thời xuất file dự thảo CapCut để chỉnh sửa thủ công.<br/>
    • <strong>Giao Diện Quản Trị Web UI:</strong> Xây dựng trang Dashboard Next.js giúp theo dõi tiến độ công việc trực quan qua Server-Sent Events (SSE), cho phép biên tập lại các câu phụ đề đã nhận diện và bấm render lại chỉ với một click.<br/><br/>
    
    <strong>💻 PHƯƠNG PHÁP VIẾT CODE & CÔNG NGHỆ SỬ DỤNG</strong><br/>
    • <strong>Dịch Vụ Backend:</strong> FastAPI (Python 3.11), Redis RQ, PostgreSQL làm cơ sở lưu trữ metadata của n8n, quản lý vòng đời tác vụ (job lifecycle).<br/>
    • <strong>Bộ Xử Lý Media:</strong> FFmpeg 8.1, yt-dlp, faster-whisper, Ollama.<br/>
    • <strong>Frontend & Điều Phối:</strong> Next.js 14, TailwindCSS, n8n workflow liên kết các webhook tự động tải video khi kênh có bài đăng mới.`,
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: vietsub0,
        alt: "Quy trình n8n",
        caption: "[Ảnh minh họa do AI tạo] Sơ đồ quy trình tự động hóa n8n tải video tự động từ YouTube và điều phối qua API.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: vietsub1,
        alt: "Chèn Vietsub",
        caption: "[Ảnh minh họa do AI tạo] Tiến trình FFmpeg trích xuất âm thanh và chèn phụ đề dạng hard burn-in.",
      },
    },
  ],
} as const satisfies ProjectContent;
