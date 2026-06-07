import thehive0 from "../../../assets/images/projects/thehive/thehive-0.png";
import thehive1 from "../../../assets/images/projects/thehive/thehive-1.png";

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
        src: thehive0,
        alt: "Bảng điều khiển TheHive",
        caption: "Giao diện quản lý case sự cố SOC",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: thehive1,
        alt: "Vòng đời cảnh báo",
        caption: "Quy trình gom nhóm cảnh báo và leo thang xử lý sự cố",
      },
    },
  ],
} as const satisfies ProjectContent;
