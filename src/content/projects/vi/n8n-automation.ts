import pokedex0 from "../../../assets/images/projects/pokedex/pokedex-0.webp";
import pokedex1 from "../../../assets/images/projects/pokedex/pokedex-1.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Tự động hóa n8n SOC",
  theme: "dark",
  tags: ["n8n", "workflows", "automation", "soc", "security"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03",
  source: "https://github.com/NghiaDinh03",
  description:
    "Triển khai hạ tầng và cấu hình hệ thống n8n tự host (Self-hosted). Thiết kế và vận hành các quy trình tự động hóa nâng cao (Workflows) cho hoạt động giám sát an ninh SOC, lọc nạp dữ liệu log và gửi cảnh báo tức thì.<br/><br/>Sử dụng Docker-compose, tích hợp các API bảo mật, nút mã JavaScript tùy chỉnh, và webhook phản ứng sự cố.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex0,
        alt: "Bảng điều khiển n8n",
        caption: "Vận hành hạ tầng tự host n8n",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex1,
        alt: "Luồng cảnh báo",
        caption: "Tự động phân tích cảnh báo và gửi thông báo Telegram tức thì",
      },
    },
  ],
} as const satisfies ProjectContent;
