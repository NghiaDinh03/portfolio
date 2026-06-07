import thehive0 from "../../../assets/images/projects/thehive/thehive-0.png";
import thehive1 from "../../../assets/images/projects/thehive/thehive-1.png";

import type { ProjectContent } from "../../types";

export default {
  title: "TheHive Migration",
  theme: "dark",
  tags: ["go", "next", "postgresql", "rabbitmq", "security"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/TheHive",
  source: "https://github.com/NghiaDinh03/TheHive",
  description:
    `🛡️ <strong>HỆ THỐNG QUẢN LÝ SỰ CỐ SOC CLOUD-NATIVE HIỆN ĐẠI HÓA</strong><br/>
    Dự án hiện đại hóa quy trình quản lý ca sự cố (case-management) tiêu chuẩn ngành TheHive 4, di chuyển từ ngăn xếp Scala/JanusGraph cồng kềnh sang kiến trúc cloud-native viết bằng Go + PostgreSQL.<br/><br/>
    
    <strong>💡 TẠI SAO PHÁT TRIỂN (ĐỘNG LỰC & GIÁ TRỊ DOANH NGHIỆP)</strong><br/>
    Hệ thống TheHive 4 cũ chạy Scala/Play và cơ sở dữ liệu đồ thị JanusGraph rất tốn bộ nhớ RAM, khó mở rộng theo chiều ngang và dễ gặp lỗi dữ liệu (brittle). Đối với các trung tâm giám sát an ninh mạng (SOC) hoạt động 24/7, việc hệ thống quản lý sự cố bị sập sẽ dẫn đến nguy cơ bỏ sót các cuộc tấn công nguy hiểm. Dự án áp dụng **mô hình di trú Strangler-Fig** để thay thế dần mã nguồn cũ sang backend Go stateless hiệu năng cao và frontend Next.js trực quan, đảm bảo hệ thống vận hành liên tục không gián đoạn (zero-downtime).<br/><br/>
    
    <strong>🛠️ TÍNH NĂNG NỔI BẬT</strong><br/>
    • <strong>Cơ Chế Chuyển Đổi Strangler-Fig:</strong> Chạy song song hệ thống mới bên cạnh backend Scala cũ, tự động đối chiếu kết quả ghi dữ liệu (shadow compare) để bảo đảm tính toàn vẹn chức năng trước khi chính thức tắt hệ thống cũ.<br/>
    • <strong>Quản Lý Vòng Đời Sự Cố Hợp Nhất:</strong> Theo dõi toàn diện Ca sự cố (Case), Cảnh báo (Alert), Nhiệm vụ (Task), Đối tượng điều tra (Observable) và liên kết bằng chứng bảo mật.<br/>
    • <strong>Đồng Bộ OpenSearch Qua Outbox Pattern:</strong> Lưu các sự kiện ghi chỉ mục tìm kiếm vào bảng outbox trong PostgreSQL, thực thi đồng bộ dữ liệu sang OpenSearch thông qua trigger giao dịch (transactional) để đảm bảo dữ liệu tìm kiếm luôn nhất quán.<br/>
    • <strong>Tích Hợp Bất Đồng Bộ Cortex/MISP:</strong> Gửi yêu cầu phân tích lỗ hổng sang Cortex và đồng bộ tri thức đe dọa (threat intelligence) từ MISP qua hàng đợi RabbitMQ, tối ưu hiệu năng gọi API.<br/>
    • <strong>Giám Sát & Chuẩn Hóa An Ninh:</strong> Xuất biểu đồ Prometheus, ghi log cấu trúc JSON (zap) phục vụ điều tra hệ thống, tích hợp sâu ma trận kỹ thuật tấn công MITRE ATT&CK.<br/><br/>
    
    <strong>💻 PHƯƠNG PHÁP VIẾT CODE & CÔNG NGHỆ SỬ DỤNG</strong><br/>
    • <strong>Backend API:</strong> Go 1.22, Echo framework, sqlx, golang-migrate (với 29 tệp migration SQL được phiên bản hóa), PostgreSQL 16.<br/>
    • <strong>Hàng Đợi & Tìm Kiếm:</strong> RabbitMQ 3.13, OpenSearch.<br/>
    • <strong>Frontend:</strong> Next.js 14, TypeScript, Tailwind CSS, giao diện tái cấu trúc chuẩn AdminLTE.`,
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: thehive0,
        alt: "Bảng điều khiển TheHive",
        caption: "[Ảnh minh họa do AI tạo] Bảng điều khiển quản lý sự cố SOC hiển thị các ca điều tra và mức độ nghiêm trọng.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: thehive1,
        alt: "Vòng đời cảnh báo",
        caption: "[Ảnh minh họa do AI tạo] Quy trình phân tích kỹ thuật và chuyển đổi các cảnh báo bảo mật thành các ca xử lý an ninh.",
      },
    },
  ],
} as const satisfies ProjectContent;
