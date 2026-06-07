import thumbnailCyberAI from "../../../assets/thumbnails/cyberai-assessment.png";
import thumbnailPPTMasters from "../../../assets/thumbnails/ppt-masters.png";
import thumbnailAutoVietsub from "../../../assets/thumbnails/autovietsub-pipeline.png";
import thumbnailTheHive from "../../../assets/thumbnails/thehive-migration.png";
import thumbnailN8n from "../../../assets/thumbnails/n8n-automation.png";
import thumbnailGemmaChat from "../../../assets/thumbnails/gemma-chat.png";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "CyberAI Assessment",
    slug: "cyberai-assessment",
    thumbnail: thumbnailCyberAI,
    description: "AI-Powered Cybersecurity RAG Platform",
  },
  {
    title: "PPT Masters",
    slug: "ppt-masters",
    thumbnail: thumbnailPPTMasters,
    description: "Automated AI presentation slides creator",
  },
  {
    title: "Auto Vietsub Pipeline",
    slug: "autovietsub-pipeline",
    thumbnail: thumbnailAutoVietsub,
    description: "Automatic AI-powered video subtitle tool",
  },
  {
    title: "TheHive Migration",
    slug: "thehive-migration",
    thumbnail: thumbnailTheHive,
    description: "Incident response orchestration dashboard",
  },
  {
    title: "n8n Automation",
    slug: "n8n-automation",
    thumbnail: thumbnailN8n,
    description: "Security orchestration & automation workflows",
  },
  {
    title: "Gemma Chat Desktop",
    slug: "gemma-chat",
    thumbnail: thumbnailGemmaChat,
    description: "Electron desktop chat client for Google Gemma",
  },
] as const satisfies ProjectPreview[];
