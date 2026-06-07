import streakon0 from "../../../assets/images/projects/streakon/streakon-0.webp";
import streakon1 from "../../../assets/images/projects/streakon/streakon-1.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "CyberAI Assessment",
  theme: "dark",
  tags: ["next", "fastapi", "rag", "localai", "security"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/CyberAI-Assessment-project",
  source: "https://github.com/NghiaDinh03/CyberAI-Assessment-project",
  description:
    "An AI-Powered Cybersecurity Assessment Platform with a Multi-Model RAG Chatbot. It automates vulnerability scanning reports and threat intelligence gathering securely on-premises.<br/><br/>Built with Next.js, FastAPI, LocalAI, and specialized security models for threat analysis.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: streakon0,
        alt: "CyberAI Dashboard",
        caption: "CyberAI Threat Assessment Dashboard",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: streakon1,
        alt: "RAG Chatbot",
        caption: "Local RAG Chatbot for Log Analysis",
      },
    },
  ],
} as const satisfies ProjectContent;
