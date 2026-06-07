import cubewar0 from "../../../assets/images/projects/cubewar/cubewar-0.webp";
import cubewar1 from "../../../assets/images/projects/cubewar/cubewar-1.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "PPT Masters",
  theme: "dark",
  tags: ["python", "llm", "orchestration", "python-pptx"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/ppt-masters",
  source: "https://github.com/NghiaDinh03/ppt-masters",
  description:
    "Hệ thống AI tự động tạo slide trình chiếu PPTX có thể chỉnh sửa trực tiếp từ bất kỳ tài liệu văn bản nào. Quy trình xử lý khép kín: trích xuất nội dung → lập kế hoạch slide logic → kết xuất PPTX gốc → tạo tóm tắt thuyết minh bằng âm thanh.<br/><br/>Xây dựng bằng Python, điều phối LLM thông minh và thư viện python-pptx.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar0,
        alt: "Tạo Slide PPT",
        caption: "Tự động trích xuất nội dung và lập dàn ý slide",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar1,
        alt: "Kết xuất Slide",
        caption: "Bản xem trước slide PPTX được kết xuất",
      },
    },
  ],
} as const satisfies ProjectContent;
