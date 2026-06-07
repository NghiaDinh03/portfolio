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
    "AI generates natively editable PPTX slide presentations from any input document. Features a complete pipeline: context extraction → logical slide planning → Native PPTX rendering → Audio overview creation.<br/><br/>Built using Python, advanced LLM orchestration, and python-pptx library.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar0,
        alt: "PPT Slide Generation",
        caption: "Automatic outline extraction and layout planning",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar1,
        alt: "Presentation Render",
        caption: "Rendered PPTX slide preview",
      },
    },
  ],
} as const satisfies ProjectContent;
