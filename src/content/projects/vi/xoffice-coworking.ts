import xoffice0 from "../../../assets/images/projects/xoffice/xoffice-0.png";
import xoffice1 from "../../../assets/images/projects/xoffice/xoffice-1.png";

import type { ProjectContent } from "../../types";

export default {
  title: "xOffice Coworking",
  theme: "dark",
  tags: ["cpp", "qt", "electron", "express", "postgresql"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/xOffice_Coworking",
  source: "https://github.com/NghiaDinh03/xOffice_Coworking",
  description:
    "Ứng dụng quản lý không gian làm việc chung (coworking space) đa nền tảng, thiết kế cho việc đặt chỗ làm việc, lên lịch tài nguyên và tối ưu hóa vận hành văn phòng hành chính một cách liền mạch.<br/><br/>Được phát triển với nhân desktop chạy C++ / Qt, giao diện người dùng Electron, máy chủ Node.js Express và cơ sở dữ liệu PostgreSQL bảo mật cao.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: xoffice0,
        alt: "xOffice Workspace Booking",
        caption: "Sơ đồ mặt bằng tương tác và bảng đặt vị trí ngồi trực tuyến",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: xoffice1,
        alt: "Admin Operations View",
        caption: "Trang quản trị viên phân tích và thống kê sử dụng không gian làm việc",
      },
    },
  ],
} as const satisfies ProjectContent;
