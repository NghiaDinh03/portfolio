import quibbo0 from "../../../assets/images/projects/quibbo/quibbo-0.webp";
import quibbo1 from "../../../assets/images/projects/quibbo/quibbo-1.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Auto Vietsub Pipeline",
  theme: "dark",
  tags: ["n8n", "ffmpeg", "gemini", "gemma", "automation"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/custom_ffmpeg_ND03",
  source: "https://github.com/NghiaDinh03/custom_ffmpeg_ND03",
  description:
    "A fully automated workflow for extracting audio, translating using LLM/AI models, and burning precise Vietnamese subtitles back into video files.<br/><br/>Orchestrated via n8n automation, utilizing FFmpeg for media processing and Gemini/Gemma for translation.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo0,
        alt: "n8n Workflow",
        caption: "n8n automation pipeline overview",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo1,
        alt: "Subtitle Burn",
        caption: "FFmpeg subtitle render and encoding",
      },
    },
  ],
} as const satisfies ProjectContent;
