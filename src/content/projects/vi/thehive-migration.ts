import sharkie0 from "../../../assets/images/projects/sharkie/sharkie-0.webp";
import sharkie1 from "../../../assets/images/projects/sharkie/sharkie-1.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Di trú Hệ thống TheHive",
  theme: "dark",
  tags: ["next", "docker", "api", "migration", "security"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/TheHive",
  source: "https://github.com/NghiaDinh03/TheHive",
  description:
    "Di trú hệ thống quản lý sự cố SOC (TheHive) cũ sang kiến trúc cloud-native hiện đại. Đảm bảo tương thích 100% chức năng, tái cấu trúc API sạch sẽ và tối ưu hóa vòng đời cảnh báo bảo mật.<br/><br/>Xây dựng với giao diện Next.js, REST API Python, hạ tầng Docker, và tích hợp cơ sở dữ liệu Elasticsearch.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie0,
        alt: "Bảng điều khiển TheHive",
        caption: "Giao diện quản lý case sự cố SOC",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie1,
        alt: "Vòng đời cảnh báo",
        caption: "Quy trình gom nhóm cảnh báo và leo thang xử lý sự cố",
      },
    },
  ],
} as const satisfies ProjectContent;
