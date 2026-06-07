import n8n0 from "../../../assets/images/projects/n8n-automation/n8n-automation-0.png";
import n8n1 from "../../../assets/images/projects/n8n-automation/n8n-automation-1.png";

import type { ProjectContent } from "../../types";

export default {
  title: "n8n Automation",
  theme: "dark",
  tags: ["n8n", "nocodb", "flask", "redis", "nginx", "docker"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/NCS_n8n_prd_version",
  source: "https://github.com/NghiaDinh03/NCS_n8n_prd_version",
  description:
    `⚙️ <strong>HẠ TẦNG TỰ ĐỘNG HÓA & ĐIỀU PHỐI AN NINH MẠNG PHÂN TÁN</strong><br/>
    Hệ thống tự động hóa quy trình nghiệp vụ an toàn thông tin (SOAR) cấp sản xuất, tích hợp cụm n8n đa worker, cơ sở dữ liệu quản trị NocoDB, Flask API tùy biến và Nginx SSL reverse proxy.<br/><br/>
    
    <strong>💡 TẠI SAO PHÁT TRIỂN (ĐỘNG LỰC & GIÁ TRỊ DOANH NGHIỆP)</strong><br/>
    Các đội ngũ an ninh mạng (SOC) phải tiếp nhận hàng nghìn cảnh báo mỗi ngày từ nhiều hệ thống rời rạc (SIEM, Firewall, Active Directory...). Việc lập trình tích hợp thủ công cho từng loại cảnh báo vô cùng tốn thời gian, trong khi các giải pháp SOAR thương mại có giá hàng trăm nghìn USD. Hệ thống này được xây dựng giúp tự động hóa điều phối liên kết các công cụ, xử lý bất đồng bộ qua cụm 4 worker chịu tải lớn, đồng thời giữ toàn bộ thông tin đăng nhập (credentials) và log an ninh an toàn trong mạng nội bộ.<br/><br/>
    
    <strong>🛠️ TÍNH NĂNG NỔI BẬT</strong><br/>
    • <strong>Cụm n8n Đa Worker Hiệu Năng Cao:</strong> Thiết lập cấu trúc gồm 1 node Master n8n điều phối chính và 4 node Worker chạy ngầm, giao tiếp qua Redis (Bull Queue) giúp xử lý tải phân tán song song, tránh nghẽn luồng xử lý cảnh báo.<br/>
    • <strong>Bảng Quản Trị Trực Quan (NocoDB):</strong> Tích hợp NocoDB để cung cấp giao diện bảng dữ liệu (spreadsheet-like) giúp chuyên viên SOC quản trị danh sách whitelist, theo dõi trạng thái job và bật/tắt luật tự động hóa dễ dàng mà không cần thao tác trực tiếp với SQL.<br/>
    • <strong>Cổng API Gateway Bảo Mật:</strong> Xây dựng Flask API tùy biến cung cấp 10 endpoint chức năng bảo mật, hỗ trợ xác thực Basic Auth và kiểm tra CORS chặt chẽ để nhận dữ liệu từ các thiết bị an ninh ngoài gọi vào.<br/>
    • <strong>SSL Reverse Proxy & CA Nội Bộ:</strong> Sử dụng Nginx cấu hình HTTPS bảo mật cho các domain nội bộ (ví dụ: 'n8n_hcm.ncsgroup.vn'), tự động cấp phát và tin cậy chứng chỉ SSL bằng hệ thống Step-CA tự host.<br/>
    • <strong>Sao Lưu Dữ Liệu Mã Hóa Chặt Chẽ:</strong> Thiết lập quy trình đóng gói dữ liệu PostgreSQL (lưu workflow) và volume n8n (lưu encryption key) an toàn, đảm bảo khôi phục thảm họa (Disaster Recovery) nhanh chóng.<br/><br/>
    
    <strong>💻 PHƯƠNG PHÁP VIẾT CODE & CÔNG NGHỆ SỬ DỤNG</strong><br/>
    • <strong>Ngăn Xếp Tự Động Hóa:</strong> n8n multi-worker, NocoDB, Flask Backend API (Python), PostgreSQL 16 (lưu metadata cấu hình), Redis 7 (làm message queue).<br/>
    • <strong>Hạ Tầng & Mạng:</strong> Nginx Reverse Proxy, Step-CA, Docker-Compose phân lớp mạng nội bộ (subnets) cô lập các dịch vụ backend khỏi cổng expose public.`,
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: n8n0,
        alt: "n8n Dashboard",
        caption: "[Ảnh minh họa do AI tạo] Giao diện quản trị hạ tầng n8n phân tán tự host phối hợp nhiều worker xử lý tác vụ.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: n8n1,
        alt: "Luồng cảnh báo",
        caption: "[Ảnh minh họa do AI tạo] Luồng tự động hóa bóc tách thông tin cảnh báo bảo mật từ Webhook và định tuyến xử lý.",
      },
    },
  ],
} as const satisfies ProjectContent;
